(() => {
 const form=document.querySelector('#corporate-estimate');if(!form)return;
 const quantity=document.querySelector('#corporate-devices'),period=document.querySelector('#corporate-period');
 const total=document.querySelector('#corporate-total'),rate=document.querySelector('#corporate-rate'),link=document.querySelector('#corporate-link');
 const prices={30:[1199,899],90:[2157,1617],365:[6000,4500]};
 const money=cents=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
 function update(){
  const count=Number(quantity.value),days=Number(period.value),pair=prices[days];
  if(!Number.isInteger(count)||count<21||count>1000||!pair){total.textContent='Escolha de 21 a 1.000 aparelhos.';rate.textContent='';link.setAttribute('aria-disabled','true');link.href='#corporativo';return;}
  const cents=Math.min(100,count)*pair[0]+Math.max(0,count-100)*pair[1];
  total.textContent=money(cents)+' pelo período completo de '+days+' dias · '+count+' aparelhos';
  rate.textContent='Primeiros 100: '+money(pair[0])+' por aparelho/período. Adicionais: '+money(pair[1])+' por aparelho/período.';
  const url=new URL('https://autokyro-cloud.autokyro-license-center.workers.dev/cliente');url.searchParams.set('devices',String(count));url.searchParams.set('periodDays',String(days));
  link.href=url.href;link.removeAttribute('aria-disabled');
 }
 quantity.addEventListener('input',update);period.addEventListener('change',update);form.addEventListener('submit',event=>{event.preventDefault();if(form.reportValidity()){update();link.click();}});update();
})();
