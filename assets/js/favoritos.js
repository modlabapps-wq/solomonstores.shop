
async function showFavs(){const out=$('#favResults');if(!out)return;try{const all=await loadCatalog();const ids=favs();renderList(out,all.filter(p=>ids.includes(p.id)&&p.ativo),100)}catch{out.innerHTML='<div class="empty">Não foi possível carregar seus favoritos.</div>'}}
document.addEventListener('DOMContentLoaded',showFavs);document.addEventListener('favchange',showFavs);
