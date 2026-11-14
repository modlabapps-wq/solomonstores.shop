import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../src/worker.js',import.meta.url),'utf8');
const email=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {licenseHtml,otpHtml};').toString('base64'));
const base={name:'AutoKyro Mensal',devices:1,code:'EXEMPLO <>&',validUntil:'2026-12-31T12:00:00Z',periodDays:30,portal:'https://central.example',download:'https://central.example/download.apk'};
for(const data of [base,{...base,trialDays:30,pendingTrial:true},{...base,permanent:true,validUntil:null}]){
 const html=email.licenseHtml(data);assert.match(html,/Automatize Fácil/);assert.match(html,/#2563eb/);assert.match(html,/1 celular Android/);assert.match(html,/EXEMPLO &lt;&gt;&amp;/);assert.match(html,/https:\/\/central.example\/cliente/);assert.match(html,/solomonstores.shop\/suporte/);assert.doesNotMatch(html,/Para a equipe|aparelho\(s\)|8hsnajf|AUTOKYRO/);
 if(data.permanent)assert.match(html,/Permanente/);
}
const otp=email.otpHtml('000000');assert.match(otp,/10 minutos/);assert.match(otp,/único uso/);assert.match(otp,/Automatize Fácil/);
assert.match(source,/\/downloads\/Autokyro-1\.1\.1\.apk/);
console.log('PASS: blue transactional emails, one-phone instructions, trial and permanent validity, escaping, OTP wording and protected legacy APK route. Synthetic data only; no email sent.');
