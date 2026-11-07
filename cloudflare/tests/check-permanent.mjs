import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
const source=fs.readFileSync(new URL('../src/worker.js',import.meta.url),'utf8');
const {default:worker,permission}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {permission};').toString('base64'));
const db=new DatabaseSync(':memory:');
db.exec(`CREATE TABLE cloud_licenses(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL,plan_id TEXT NOT NULL,code_hash TEXT NOT NULL,code_encrypted TEXT NOT NULL,status TEXT DEFAULT 'pending',valid_until TEXT,manual_block INTEGER DEFAULT 0,max_devices INTEGER,provider_subscription_id TEXT UNIQUE,created_at TEXT,updated_at TEXT,trial_days INTEGER DEFAULT 0,trial_started_at TEXT,trial_installation_hash TEXT);
CREATE TABLE cloud_plans(id TEXT PRIMARY KEY,name TEXT,max_devices INTEGER,device_limit INTEGER);
CREATE TABLE cloud_customers(id TEXT PRIMARY KEY,email TEXT UNIQUE,name TEXT,company TEXT,blocked INTEGER DEFAULT 0);
CREATE TABLE cloud_sessions(token_hash TEXT PRIMARY KEY,customer_id TEXT,role TEXT,expires_at TEXT,created_at TEXT,scope_license_id TEXT,scope_installation_hash TEXT);
CREATE TABLE cloud_audit(id TEXT PRIMARY KEY,actor TEXT,action TEXT,entity_id TEXT,detail TEXT,created_at TEXT);
CREATE TABLE rate_limits(key_hash TEXT PRIMARY KEY,window_at INTEGER,count INTEGER);
CREATE TABLE cloud_settings(id TEXT PRIMARY KEY,value TEXT);
CREATE TABLE cloud_devices(id TEXT PRIMARY KEY,license_id TEXT,installation_hash TEXT,session_hash TEXT,device_name TEXT,activated_at TEXT,last_seen_at TEXT,revoked_at TEXT,UNIQUE(license_id,installation_hash));
INSERT INTO cloud_plans VALUES('mensal','AutoKyro Mensal',1,1);
INSERT INTO cloud_customers VALUES('owner','rignis1212@gmail.com','','',0),('other','other@example.com','','',0);
INSERT INTO cloud_settings VALUES('offlineHours','72');
INSERT INTO cloud_licenses(id,customer_id,plan_id,code_hash,code_encrypted,status,valid_until,max_devices) VALUES('untouched','other','mensal','fixture-hash','fixture-encrypted','blocked','2026-01-01T00:00:00.000Z',1);`);
const before=db.prepare('SELECT * FROM cloud_licenses WHERE id=?').get('untouched');
db.exec(fs.readFileSync(new URL('../migrations/001-permanent.sql',import.meta.url),'utf8'));
db.exec(fs.readFileSync(new URL('../migrations/002-archive.sql',import.meta.url),'utf8'));
db.exec(fs.readFileSync(new URL('../migrations/004-admin-identity.sql',import.meta.url),'utf8'));
assert.deepEqual({...db.prepare('SELECT * FROM cloud_licenses WHERE id=?').get('untouched')},{...before,is_permanent:0,archived_at:null});
const hash=s=>createHash('sha256').update(s).digest('hex');
const secrets={admin:'a'.repeat(64),support:'b'.repeat(64),customer:'c'.repeat(64),other:'d'.repeat(64)};
for(const [role,secret] of Object.entries(secrets))db.prepare('INSERT INTO cloud_sessions(token_hash,customer_id,role,expires_at,created_at,scope_license_id,scope_installation_hash) VALUES(?,?,?,?,?,?,?)').run(hash(secret),role==='customer'?'owner':role==='other'?'other':null,role==='other'?'customer':role,'2100-01-01T00:00:00.000Z','2026-01-01',null,null);
const env={AUTH_PEPPER:'local-only-test-pepper-not-a-secret-00000000',ENVIRONMENT:'production',ASSETS:{fetch:async()=>new Response('APK-fixture')},DB:{prepare(sql){let values=[];return{bind(...a){values=a;return this;},async first(){return db.prepare(sql).get(...values)??null;},async all(){return{results:db.prepare(sql).all(...values)};},async run(){return{meta:{changes:Number(db.prepare(sql).run(...values).changes)}};}}}}};
db.exec("UPDATE cloud_sessions SET admin_email='rignis1212@gmail.com' WHERE role='admin'");
const origin='https://example.com';
async function req(path,role='admin',data){return worker.fetch(new Request(origin+path,{method:data?'POST':'GET',headers:{Authorization:'Bearer '+secrets[role],Origin:origin,'Content-Type':'application/json'},...(data?{body:JSON.stringify(data)}:{})}),env,{});}
const body={email:'rignis1212@gmail.com'};
assert.equal((await req('/api/v2/admin/license/permanent','customer',body)).status,401);
assert.equal((await req('/api/v2/admin/license/permanent','support',body)).status,403);
assert.equal((await req('/api/v2/admin/license/permanent','admin',{email:'other@example.com'})).status,403);
const made=await req('/api/v2/admin/license/permanent','admin',body);assert.equal(made.status,200);const {id}=await made.json();
const again=await req('/api/v2/admin/license/permanent','admin',body);assert.deepEqual(await again.json(),{ok:true,id,permanent:true,maxDevices:1,created:false});
assert.equal(db.prepare("SELECT COUNT(*) n FROM cloud_audit WHERE action='license.permanent.create'").get().n,1);
const stored=db.prepare('SELECT * FROM cloud_licenses WHERE id=?').get(id);assert.equal(stored.valid_until,null);assert.equal(stored.max_devices,1);assert.equal(stored.is_permanent,1);assert.equal(stored.trial_days,0);assert.equal(stored.provider_subscription_id,null);
const me=await (await req('/api/v2/me','customer')).json();assert.equal(me.licenses[0].is_permanent,1);assert.equal(me.licenses[0].valid_until,null);
const install='11111111-1111-1111-1111-111111111111';
const activate=await req('/api/v2/license/activate','customer',{activationCode:me.licenses[0].code,installationId:install,deviceName:'Test fixture'});assert.equal(activate.status,200);const grant=(await activate.json()).license;assert.equal(grant.permanent,true);assert.equal(grant.status,'active');assert.equal(grant.maxDevices,1);assert.ok(Date.parse(grant.validUntil)>Date.now());assert.ok(Date.parse(grant.validUntil)<=Date.now()+72*3600000);assert.equal(grant.validUntil,grant.offlineUntil);
assert.equal((await req('/api/v2/license/activate','customer',{activationCode:me.licenses[0].code,installationId:'22222222-2222-2222-2222-222222222222'})).status,409);
assert.equal((await req('/api/v2/license/check','other',{licenseId:id,installationId:install})).status,403);
assert.equal((await req('/downloads/app.apk','customer')).status,200);
for(const change of [{maxDevices:2},{validUntil:'2099-01-01'},{planId:'other'}])assert.equal((await req('/api/v2/admin/license/update','admin',{id,...change})).status,400);
const realNow=Date.now;try{Date.now=()=>realNow()+20*365*86400000;const future=await permission(env,stored);assert.equal(future.status,'active');assert.ok(Date.parse(future.offlineUntil)>Date.now());assert.equal(stored.valid_until,null);}finally{Date.now=realNow;}
for(const restriction of [{manual_block:1},{blocked:1},{status:'refunded'},{status:'expired'}]){const denied=await permission(env,{...stored,...restriction});assert.ok(Date.parse(denied.offlineUntil)<=Date.now());}
const ordinary=await permission(env,{...stored,is_permanent:0,valid_until:'2020-01-01T00:00:00Z'});assert.equal(ordinary.status,'expired');
await req('/api/v2/admin/license/update','admin',{id,blocked:true});assert.equal((await req('/downloads/app.apk','customer')).status,403);
const denied=await (await req('/api/v2/license/check','customer',{licenseId:id,installationId:install})).json();assert.equal(denied.license.status,'blocked');
assert.deepEqual({...db.prepare('SELECT * FROM cloud_licenses WHERE id=?').get('untouched')},{...before,is_permanent:0,archived_at:null});
assert.equal(db.prepare("SELECT role FROM cloud_sessions WHERE token_hash=?").get(hash(secrets.customer)).role,'customer');
console.log('PASS: explicit permanent storage with NULL expiry; renewable legacy-APK lease; 20-year clock advance; idempotent owner-only issuance; one-device limit; blocking; unchanged customer privileges and other license. SQLite and HTTP handler tests, no real activation.');


export {db,env,req,secrets};
