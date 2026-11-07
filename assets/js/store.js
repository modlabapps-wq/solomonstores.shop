const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
if(toggle&&nav){
 toggle.addEventListener('click',()=>{const opened=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!opened));toggle.setAttribute('aria-label',opened?'Abrir menu':'Fechar menu');nav.classList.toggle('open',!opened);});
 nav.addEventListener('click',event=>{if(event.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');toggle.focus();}});
}
document.querySelectorAll('[data-year]').forEach(element=>{element.textContent=String(new Date().getFullYear());});
