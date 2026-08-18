
async function loadProduct(){
 const host=$('#productHost');if(!host)return;
 const id=new URLSearchParams(location.search).get('id');if(!id){host.innerHTML='<div class="empty">Produto não informado.</div>';return}
 try{
  const p=await fetch(`data/produtos/${encodeURIComponent(id)}.json`,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error();return r.json()});
  document.title=`${p.nome} | Solomon Stores`;
  $('#crumb').textContent=p.nome;
  if(!p.ativo){host.innerHTML='<div class="notice">Esta oferta não está disponível no momento.</div>';return}
  const gal=document.createElement('div');gal.className='gallery';
  const main=document.createElement('div');main.className='main-image';const img=document.createElement('img');img.src=safeUrl(p.imagem);img.alt=p.nome;main.append(img);
  const thumbs=document.createElement('div');thumbs.className='thumbs';(p.imagens||[p.imagem]).forEach(u=>{const b=document.createElement('button');const im=document.createElement('img');im.src=safeUrl(u);im.alt=p.nome;b.append(im);b.onclick=()=>img.src=safeUrl(u);thumbs.append(b)});
  gal.append(main,thumbs);
  const info=document.createElement('section');info.className='product-info';
  const eye=document.createElement('div');eye.className='eyebrow';eye.textContent=`${p.marca} · ${p.categoria}`;
  const h=document.createElement('h1');h.textContent=p.nome;
  const rat=document.createElement('div');rat.className='rating';rat.textContent=`★ ${p.avaliacao} (${Number(p.quantidade_avaliacoes||0).toLocaleString('pt-BR')} avaliações)`;
  const old=document.createElement('div');old.className='price-old';old.textContent=`De ${fmt(p.preco_anterior)}`;
  const price=document.createElement('div');price.className='product-price';price.textContent=fmt(p.preco);
  const discount=document.createElement('div');discount.className='notice';discount.textContent=`${p.desconto}% de desconto · atualização ${new Date(p.ultima_atualizacao).toLocaleString('pt-BR')}`;
  const perks=document.createElement('div');perks.className='perks';if(p.prime){const x=document.createElement('span');x.className='perk';x.textContent='Prime';perks.append(x)}if(p.frete_gratis){const x=document.createElement('span');x.className='perk';x.textContent='Frete grátis';perks.append(x)}
  const ul=document.createElement('ul');ul.className='features';(p.caracteristicas||[]).forEach(t=>{const li=document.createElement('li');li.textContent=t;ul.append(li)});
  const a=document.createElement('a');a.className='btn gold';a.href=safeUrl(p.link_afiliado);a.target='_blank';a.rel='nofollow sponsored noopener noreferrer';a.textContent=`VER OFERTA NA ${String(p.loja).toUpperCase()}`;a.onclick=()=>registrarClique(p.id,p.loja,'produto');
  info.append(eye,h,rat,old,price,discount,perks,ul,a);
  host.innerHTML='';host.append(gal,info);
  drawPrice(p);
  related(p);
 }catch(e){host.innerHTML='<div class="empty">Não foi possível carregar este produto.</div>';console.error(e)}
}
function drawPrice(p){
 const hist=p.historico_preco||[];if(!hist.length)return;
 const box=$('#priceBox');box.hidden=false;const vals=hist.map(x=>Number(x.preco));$('#minPrice').textContent=fmt(Math.min(...vals));$('#maxPrice').textContent=fmt(Math.max(...vals));$('#nowPrice').textContent=fmt(p.preco);
 const c=$('#priceChart'),ctx=c.getContext('2d');c.width=c.clientWidth*devicePixelRatio;c.height=260*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);
 const w=c.clientWidth,h=260,pad=30,min=Math.min(...vals),max=Math.max(...vals),range=Math.max(1,max-min);ctx.clearRect(0,0,w,h);ctx.strokeStyle='#d1d5db';ctx.beginPath();ctx.moveTo(pad,h-pad);ctx.lineTo(w-pad,h-pad);ctx.stroke();ctx.strokeStyle='#111827';ctx.lineWidth=3;ctx.beginPath();
 vals.forEach((v,i)=>{const x=pad+(w-pad*2)*(i/Math.max(1,vals.length-1));const y=h-pad-((v-min)/range)*(h-pad*2);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();
}
async function related(p){try{const all=await loadCatalog();const rel=all.filter(x=>x.ativo&&x.id!==p.id&&x.categoria===p.categoria).slice(0,6);renderList($('#related'),rel,6)}catch{}}
document.addEventListener('DOMContentLoaded',loadProduct);
