import {db,env,req,secrets} from './check-permanent.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
db.exec(`PRAGMA foreign_keys=ON;
ALTER TABLE cloud_customers ADD COLUMN created_at TEXT;
ALTER TABLE cloud_customers ADD COLUMN updated_at TEXT;
ALTER TABLE cloud_plans ADD COLUMN enabled INTEGER DEFAULT 1;
ALTER TABLE cloud_plans ADD COLUMN period_days INTEGER DEFAULT 30;
CREATE TABLE cloud_outbox(id TEXT PRIMARY KEY,license_id TEXT REFERENCES cloud_licenses(id),status TEXT DEFAULT 'pending',attempts INTEGER DEFAULT 0,locked_until TEXT,error_code TEXT,created_at TEXT,sent_at TEXT);`);
db.exec(fs.readFileSync(new URL('../migrations/003-trial-invites.sql',import.meta.url),'utf8'));
env.DB.batch=async statements=>{db.exec('BEGIN');try{const result=[];for(const s of statements)result.push(await s.run());db.exec('COMMIT');return result;}catch(e){db.exec('ROLLBACK');throw e;}};
Object.assign(env,{RESEND_API_KEY:'mock-provider-secret',MAIL_FROM:'test@example.com',PORTAL_URL:'https://example.com',DOWNLOAD_URL:'https://example.com/downloads/app.apk',SUPPORT_URL:'https://example.com/help'});
const nativeFetch=globalThis.fetch;const sent=[];
globalThis.fetch=async(url,opt)=>{assert.equal(url,'https://api.resend.com/emails');sent.push(JSON.parse(opt.body));return new Response('{}',{status:200});};
const input={requestId:'11111111-2222-3333-4444-555555555555',emails:['one@example.com','two@example.com','one@example.com']};
try{
 const {default:handler}=await import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(new URL('../src/worker.js',import.meta.url),'utf8')).toString('base64'));
 const both=`autokyro_admin_session=${secrets.admin}; autokyro_session=${secrets.customer}`;
 const adminSession=await handler.fetch(new Request('https://example.com/api/v2/admin/session',{headers:{Cookie:both}}),env,{});assert.equal(adminSession.status,200);assert.equal((await adminSession.json()).adminEmail,'rignis1212@gmail.com');
 const customerSession=await handler.fetch(new Request('https://example.com/api/v2/me',{headers:{Cookie:both}}),env,{});assert.equal(customerSession.status,200);assert.equal((await customerSession.json()).customer.email,'rignis1212@gmail.com');
 db.exec("UPDATE cloud_sessions SET admin_email='another-admin@example.com' WHERE role='admin'");assert.equal((await req('/api/v2/admin/trials/send','admin',input)).status,403);db.exec("UPDATE cloud_sessions SET admin_email='rignis1212@gmail.com' WHERE role='admin'");
 assert.equal((await req('/api/v2/admin/trials/send','customer',input)).status,401);
 assert.equal((await req('/api/v2/admin/trials/send','support',input)).status,403);
 assert.equal((await req('/api/v2/admin/trials/send','admin',{...input,emails:['valid@example.com','invalid']})).status,400);
 assert.equal(db.prepare('SELECT COUNT(*) n FROM cloud_trial_invites').get().n,0);
 let r=await req('/api/v2/admin/trials/send','admin',input);assert.equal(r.status,200);let result=await r.json();assert.equal(result.rows.length,2);assert.ok(result.rows.every(x=>x.status==='sent'));assert.equal(sent.length,2);
 const rows=db.prepare('SELECT l.* FROM cloud_licenses l JOIN cloud_trial_invites i ON i.license_id=l.id').all();for(const l of rows){assert.equal(l.status,'pending');assert.equal(l.trial_days,30);assert.equal(l.valid_until,null);assert.equal(l.trial_started_at,null);assert.equal(l.max_devices,1);assert.equal(l.is_permanent,0);}
 assert.equal(db.prepare('SELECT COUNT(*) n FROM cloud_devices WHERE license_id IN(SELECT license_id FROM cloud_trial_invites)').get().n,0);
 const count=db.prepare('SELECT COUNT(*) n FROM cloud_licenses').get().n;
 r=await req('/api/v2/admin/trials/send','admin',input);assert.equal(r.status,200);assert.equal(sent.length,2);assert.equal(db.prepare('SELECT COUNT(*) n FROM cloud_licenses').get().n,count);assert.equal(db.prepare("SELECT COUNT(*) n FROM cloud_audit WHERE action='trial.invite'").get().n,2);
 db.exec("UPDATE cloud_customers SET blocked=1 WHERE email='two@example.com'");assert.equal((await req('/api/v2/admin/trials/send','admin',{...input,requestId:'66666666-2222-3333-4444-555555555555'})).status,403);assert.equal(db.prepare('SELECT COUNT(*) n FROM cloud_licenses').get().n,count);
 globalThis.fetch=async()=>new Response('{}',{status:503});
 r=await req('/api/v2/admin/trials/send','admin',{requestId:'77777777-2222-3333-4444-555555555555',emails:['failure@example.com']});assert.equal(r.status,200);result=await r.json();assert.equal(result.rows[0].status,'failed');assert.equal(db.prepare('SELECT COUNT(*) n FROM cloud_trial_invites').get().n,3);
 // Default device view excludes revoked fixtures; history remains explicitly available.
 const active=await (await req('/api/v2/devices','customer')).json(),history=await (await req('/api/v2/devices?history=1','customer')).json();assert.ok(history.total>=active.total);
 console.log('PASS: trial batch validation, deduplication, transactional issuance, foreign keys, 30-day pending trial, zero devices, scoped mock email sending, retry idempotency, blocked customer refusal, and email failure reporting. No real email sent.');
}finally{globalThis.fetch=nativeFetch;}

