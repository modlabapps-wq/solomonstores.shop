
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const fmt=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v||0));
const safeUrl=u=>{try{const x=new URL(u,location.href);return ['http:','https:'].includes(x.protocol)?x.href:'#'}catch{return '#'}};
function getUTM(){const p=new URLSearchParams(location.search);const src=p.get('utm_source');if(src)sessionStorage.setItem('utm_source',src);return sessionStorage.getItem('utm_source')||'direto'}
function registrarClique(produtoId,loja,origem='site'){const evt={produto:produtoId,loja,origem,utm_source:getUTM(),data:new Date().toISOString()};const a=JSON.parse(localStorage.getItem('solomon_clicks')||'[]');a.push(evt);localStorage.setItem('solomon_clicks',JSON.stringify(a));console.log('Clique registrado',evt)}
function favs(){return JSON.parse(localStorage.getItem('solomon_favs')||'[]')}
function toggleFav(id){let a=favs();a=a.includes(id)?a.filter(x=>x!==id):[...a,id];localStorage.setItem('solomon_favs',JSON.stringify(a));document.dispatchEvent(new CustomEvent('favchange'))}
function productCard(p){
 const el=document.createElement('article');el.className='card';
 const media=document.createElement('div');media.className='card-media';
 const img=document.createElement('img');img.loading='lazy';img.width=700;img.height=700;img.alt=p.nome||'Produto';img.src=safeUrl(p.imagem);img.onerror=()=>img.src='assets/img/placeholder.svg';
 const off=document.createElement('span');off.className='badge off';off.textContent=`${Number(p.desconto||0)}% OFF`;
 const f=document.createElement('button');f.className='fav';f.type='button';f.setAttribute('aria-label','Favoritar produto');f.textContent=favs().includes(p.id)?'♥':'♡';f.onclick=e=>{e.preventDefault();toggleFav(p.id);f.textContent=favs().includes(p.id)?'♥':'♡'};
 media.append(img,off,f);
 const body=document.createElement('div');body.className='card-body';
 const eye=document.createElement('div');eye.className='eyebrow';eye.textContent=`${p.loja||''} · ${p.categoria||''}`;
 const h=document.createElement('h3');h.textContent=p.nome||'Produto';
 const rat=document.createElement('div');rat.className='rating';rat.textContent=`★ ${p.avaliacao||'-'} (${Number(p.quantidade_avaliacoes||0).toLocaleString('pt-BR')})`;
 const old=document.createElement('div');old.className='price-old';old.textContent=p.preco_anterior?`De ${fmt(p.preco_anterior)}`:'';
 const price=document.createElement('div');price.className='price';price.textContent=fmt(p.preco);
 const perks=document.createElement('div');perks.className='perks';if(p.prime){const x=document.createElement('span');x.className='perk';x.textContent='Prime';perks.append(x)}if(p.frete_gratis){const x=document.createElement('span');x.className='perk';x.textContent='Frete grátis';perks.append(x)}
 const a=document.createElement('a');a.className='btn';a.href=`produto.html?id=${encodeURIComponent(p.id)}`;a.textContent='VER OFERTA';
 body.append(eye,h,rat,old,price,perks,a);el.append(media,body);return el;
}
function setupHeader(){
 const q=$('#globalSearch');if(q)q.addEventListener('keydown',e=>{if(e.key==='Enter')location.href=`busca.html?q=${encodeURIComponent(q.value.trim())}`});
 const back=$('#backtop');if(back){window.addEventListener('scroll',()=>back.style.display=scrollY>500?'block':'none');back.onclick=()=>scrollTo({top:0,behavior:'smooth'})}
 getUTM();
}
document.addEventListener('DOMContentLoaded',setupHeader);
