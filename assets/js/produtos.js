
let ALL_PRODUCTS=[];
async function loadCatalog(){
 const cached=sessionStorage.getItem('solomon_catalog');
 if(cached){try{ALL_PRODUCTS=JSON.parse(cached);return ALL_PRODUCTS}catch{}}
 const index=await fetch('data/index.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('index');return r.json()});
 const out=[];
 for(const item of index){try{const p=await fetch(`data/produtos/${encodeURIComponent(item.id)}.json`,{cache:'no-store'}).then(r=>r.json());out.push(p)}catch(e){console.error('Produto não carregado',item.id,e)}}
 ALL_PRODUCTS=out;sessionStorage.setItem('solomon_catalog',JSON.stringify(out));return out;
}
function renderList(el,items,limit=12){el.innerHTML='';const slice=items.slice(0,limit);if(!slice.length){el.innerHTML='<div class="empty">Nenhum produto encontrado.</div>';return}slice.forEach(p=>el.append(productCard(p)))}
async function homepage(){
 const deals=$('#deals'),discount=$('#discounts'),recent=$('#recent');if(!deals)return;
 try{
  const all=(await loadCatalog()).filter(p=>p.ativo);
  const newest=[...all].sort((a,b)=>new Date(b.data_cadastro)-new Date(a.data_cadastro));
  const best=[...all].sort((a,b)=>(b.desconto||0)-(a.desconto||0));
  renderList(deals,newest,8);renderList(discount,best,8);renderList(recent,newest,8);
 }catch(e){deals.innerHTML='<div class="empty">Não foi possível carregar as ofertas.</div>';console.error(e)}
}
document.addEventListener('DOMContentLoaded',homepage);
