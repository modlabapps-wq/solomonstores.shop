import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {createHmac} from 'node:crypto';
const source=fs.readFileSync(new URL('../src/worker.js',import.meta.url),'utf8');
const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const origin='https://example.com';
function setup(){
 const db=new DatabaseSync(':memory:');
 db.exec(`CREATE TABLE cloud_challenges(id TEXT PRIMARY KEY,email TEXT NOT NULL,code_hash TEXT NOT NULL,expires_at TEXT NOT NULL,created_at TEXT NOT NULL,dev_code TEXT,attempts INTEGER NOT NULL DEFAULT 0,used_at TEXT);
 CREATE TABLE cloud_sessions(token_hash TEXT PRIMARY KEY,customer_id TEXT,role TEXT NOT NULL,expires_at TEXT NOT NULL,created_at TEXT NOT NULL,scope_license_id TEXT,scope_installation_hash TEXT,admin_email TEXT);
 CREATE TABLE cloud_audit(id TEXT PRIMARY KEY,actor TEXT NOT NULL,action TEXT NOT NULL,entity_id TEXT NOT NULL,detail TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE rate_limits(key_hash TEXT PRIMARY KEY,window_at INTEGER NOT NULL,count INTEGER NOT NULL);
 CREATE TABLE cloud_customers(id TEXT PRIMARY KEY,email TEXT UNIQUE,name TEXT,created_at TEXT,updated_at TEXT,blocked INTEGER DEFAULT 0);`);
 const env={ENVIRONMENT:'development',MAIL_MODE:'local',AUTH_PEPPER:'test-only-pepper-not-a-production-secret-0000',DB:{prepare(sql){let values=[];return {bind(...args){values=args;return this;},async first(){return db.prepare(sql).get(...values)??null;},async run(){const r=db.prepare(sql).run(...values);return {meta:{changes:Number(r.changes)}};},async all(){return {results:db.prepare(sql).all(...values)};}};}}};
 return {db,env};
}
async function post(env,path,body,headers={}){return worker.fetch(new Request(origin+'/api/v2'+path,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,...headers},body:JSON.stringify(body)}),env,{});}
async function challenge(env,email='rignis1212@gmail.com'){const response=await post(env,'/admin/auth/request',{email});assert.equal(response.status,200);return (await response.json()).challengeId;}
const request=x=>({challengeId:x.id,code:x.dev_code});
{
 const {db,env}=setup(),id=await challenge(env),otp=db.prepare('SELECT * FROM cloud_challenges WHERE id=?').get(id);
 assert.match(id,/^admin:/);assert.equal(otp.email,'rignis1212@gmail.com');
 const r=await post(env,'/admin/auth/verify',request(otp));assert.equal(r.status,200);assert.deepEqual(await r.json(),{role:'admin',adminEmail:'rignis1212@gmail.com'});assert.match(r.headers.get('Set-Cookie'),/HttpOnly; Secure; SameSite=Strict; Max-Age=28800/);
 assert.equal(db.prepare('SELECT role FROM cloud_sessions').get().role,'admin');assert.equal(db.prepare('SELECT action FROM cloud_audit').get().action,'login.email');
 assert.equal((await post(env,'/admin/auth/verify',request(otp))).status,401,'OTP replay rejected');
}
{
 const {db,env}=setup();await challenge(env,'cliente@example.com');assert.equal(db.prepare('SELECT COUNT(*) n FROM cloud_challenges').get().n,0);assert.equal(db.prepare('SELECT COUNT(*) n FROM cloud_sessions').get().n,0);
 const r=await post(env,'/auth/request',{email:'rignis1212@gmail.com'});const {challengeId}=await r.json();const row=db.prepare('SELECT * FROM cloud_challenges WHERE id=?').get(challengeId);
 assert.equal((await post(env,'/admin/auth/verify',request(row))).status,401,'Customer OTP cannot authenticate an admin');
 const customer=await post(env,'/auth/verify',request(row));assert.equal(customer.status,200);assert.equal(db.prepare('SELECT role FROM cloud_sessions').get().role,'customer','Normal customer login remains customer-only');
 const id=await challenge(env),adminOtp=db.prepare('SELECT * FROM cloud_challenges WHERE id=?').get(id);assert.equal((await post(env,'/auth/verify',request(adminOtp))).status,400,'Admin OTP cannot authenticate through customer route');
}
{
 const {db,env}=setup(),id=await challenge(env),otp=db.prepare('SELECT * FROM cloud_challenges WHERE id=?').get(id);
 db.prepare("UPDATE cloud_challenges SET expires_at='2000-01-01T00:00:00.000Z' WHERE id=?").run(id);
 assert.equal((await post(env,'/admin/auth/verify',request(otp))).status,401,'Expired code rejected');
}
{
 const {db,env}=setup(),id=await challenge(env),otp=db.prepare('SELECT * FROM cloud_challenges WHERE id=?').get(id);
 for(let i=0;i<5;i++)assert.equal((await post(env,'/admin/auth/verify',{challengeId:id,code:otp.dev_code==='000000'?'111111':'000000'})).status,401);
 assert.equal((await post(env,'/admin/auth/verify',request(otp))).status,401,'Five failures exhaust challenge');
}
{
 const {db,env}=setup(),old=await challenge(env),otp=db.prepare('SELECT * FROM cloud_challenges WHERE id=?').get(old);await challenge(env);
 assert.equal((await post(env,'/admin/auth/verify',request(otp))).status,401,'Resend invalidates previous code');
 for(let i=0;i<3;i++)await challenge(env);
 assert.equal((await post(env,'/admin/auth/request',{email:'rignis1212@gmail.com'})).status,429,'Request rate limit enforced');
}
{
 const {env}=setup();assert.equal((await post(env,'/admin/auth/request',{email:'rignis1212@gmail.com'},{Origin:'https://attacker.example'})).status,403,'Foreign origin rejected');
 env.ADMIN_PASSWORD_HASH=createHmac('sha256',env.AUTH_PEPPER).update('admin-password:test-only-password').digest('hex');assert.equal((await post(env,'/admin/login',{password:'test-only-password'})).status,200,'Existing password login preserved');
}
{
 const {db,env}=setup();env.ENVIRONMENT='production';env.MAIL_MODE='resend';env.RESEND_API_KEY='fake-test-value';env.MAIL_FROM='test@example.com';
 const originalFetch=globalThis.fetch;let envelope;
 try{globalThis.fetch=async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');envelope=JSON.parse(options.body);return new Response('{}',{status:500});};
 assert.equal((await post(env,'/admin/auth/request',{email:'rignis1212@gmail.com'})).status,503);assert.deepEqual(envelope.to,['rignis1212@gmail.com']);assert.match(envelope.subject,/administrativo/);assert.ok(db.prepare('SELECT used_at FROM cloud_challenges').get().used_at,'Failed delivery invalidates its code');
 }finally{globalThis.fetch=originalFetch;}
}
console.log('PASS: owner email allowlist, customer/admin separation, one-time code, expiration, five-attempt limit, resend invalidation, rate limit, origin checks, session cookie and existing password login. Local SQLite tests; no email sent.');
