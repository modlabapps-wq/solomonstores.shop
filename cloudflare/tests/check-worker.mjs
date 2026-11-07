import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../src/worker.js',import.meta.url),'utf8');
const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const env={ENVIRONMENT:'production',ASSETS:{fetch:async(req)=>new Response(new URL(req.url).pathname,{headers:{'Content-Type':'text/plain'}})}};
for(const path of ['/app.js','/style.css']){const r=await worker.fetch(new Request('https://example.com'+path),env,{});assert.equal(r.status,200);const text=await r.text();assert.equal(text,fs.readFileSync(new URL('../public'+path,import.meta.url),'utf8'));assert.equal(r.headers.get('X-Content-Type-Options'),'nosniff');}
for(const path of ['/api/v2/corporate/pricing','/api/v2/corporate/checkout']){const r=await worker.fetch(new Request('https://example.com'+path),env,{});assert.equal(r.status,410);}
const page=await worker.fetch(new Request('https://example.com/cliente'),env,{});assert.equal(await page.text(),'/index.html');assert.match(page.headers.get('Content-Security-Policy'),/script-src 'self'/);
const health=await worker.fetch(new Request('https://example.com/health'),env,{});assert.equal((await health.json()).ok,true);
console.log('PASS: UI assets exact; corporate endpoints retired; existing ASSETS routing, CSP and health preserved. Offline test only.');
