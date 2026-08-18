
function debounce(fn,ms=250){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}}
async function initSearch(){
 const out=$('#searchResults'),q=$('#searchInput'),cat=$('#filterCategory'),sort=$('#filterSort'),prime=$('#filterPrime');if(!out)return;
 const all=(await loadCatalog()).filter(p=>p.ativo);
 [...new Set(all.map(p=>p.categoria))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;cat.append(o)});
 const urlQ=new URLSearchParams(location.search).get('q')||'';q.value=urlQ;
 const apply=()=>{let a=[...all],term=q.value.trim().toLowerCase();if(term)a=a.filter(p=>[p.nome,p.marca,p.categoria,p.subcategoria,...(p.caracteristicas||[])].join(' ').toLowerCase().includes(term));if(cat.value)a=a.filter(p=>p.categoria===cat.value);if(prime.checked)a=a.filter(p=>p.prime);if(sort.value==='discount')a.sort((x,y)=>y.desconto-x.desconto);if(sort.value==='priceLow')a.sort((x,y)=>x.preco-y.preco);if(sort.value==='priceHigh')a.sort((x,y)=>y.preco-x.preco);if(sort.value==='rating')a.sort((x,y)=>y.avaliacao-x.avaliacao);if(sort.value==='recent')a.sort((x,y)=>new Date(y.data_cadastro)-new Date(x.data_cadastro));renderList(out,a,100)}
 q.addEventListener('input',debounce(apply));cat.onchange=sort.onchange=prime.onchange=apply;apply();
}
document.addEventListener('DOMContentLoaded',initSearch);
