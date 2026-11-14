// UI assets recovered from production before editing. Original ASSETS binding and Android release preserved.
const AUTOKYRO_APP="const app=document.querySelector('#app'),dialog=document.querySelector('#dialog'),dialogForm=document.querySelector('#dialog-form');\r\nconst state={serviceStatus:null,mode:location.pathname.startsWith('/cliente')?'customer':'admin',view:'dashboard',role:null,page:1,q:'',rows:[],customer:null};\r\nconst esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]));\r\nconst money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v??0)/100);\r\nconst date=v=>v?new Date(v).toLocaleDateString('pt-BR'):'—';\r\nconst stamp=v=>v?new Date(v).toLocaleString('pt-BR'):'—';\r\nconst names={active:'Ativa',pending:'Pendente',expired:'Vencida',blocked:'Suspensa',canceled:'Cancelada',refunded:'Reembolsada',past_due:'Em atraso',grace:'Tolerância',paid:'Pago',refused:'Recusado',chargedback:'Chargeback',processed:'Processado',ignored:'Ignorado',failed:'Falha',sent:'Enviado',sending:'Enviando',processing:'Processando'};\r\nconst badge=v=>`<span class=\"badge ${/^[a-z_]+$/.test(v)?v:''}\">${esc(names[v]??v)}</span>`;\r\nconst paths={grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M20 8v6 M17 11h6',key:'M14 7a5 5 0 1 0-4 8l4-4h3V8h4V3h-5z',phone:'M7 2h10v20H7z M10 18h4',plans:'M12 3 2 8l10 5 10-5-10-5z M2 12l10 5 10-5 M2 16l10 5 10-5',money:'M3 5h18v14H3z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',history:'M3 12a9 9 0 1 0 3-7 M3 3v6h6 M12 7v5l3 2',mail:'M3 5h18v14H3z M3 5l9 8 9-8',settings:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2',search:'M21 21l-6-6 M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14',arrow:'M5 12h14 M13 6l6 6-6 6',shield:'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6z M8 12l3 3 5-6'};\r\nconst icon=n=>`<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"${paths[n]??paths.grid}\"/></svg>`;\r\nconst brand=`<div class=\"brand\"><img src=\"/brand/automatize-facil-icon.png?v=20261113\" alt=\"\"><span>Automatize Fácil<small>CENTRAL DE ACESSO</small></span></div>`;\r\nlet toastTimer;\r\nfunction toast(message){const t=document.querySelector('#toast');t.textContent=message;t.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.style.display='none',6000);}\r\nconst errorText=code=>({unauthorized:'Sua sessão expirou. Entre novamente.',invalid_credentials:'Senha incorreta ou acesso administrativo ainda não configurado.',invalid_code:'Código incorreto ou expirado.',invalid_email:'Informe um e-mail válido.',configuration_pending:'O serviço ainda precisa ser configurado.',too_many_attempts:'Muitas tentativas. Aguarde e tente novamente.',forbidden:'Seu perfil não permite esta operação.',invalid_license:'Licença não encontrada para este e-mail.',revoke_devices_before_downgrade:'Remova os aparelhos excedentes antes de reduzir o limite.',invalid_date:'Informe uma data válida.',invalid_origin:'Não foi possível confirmar a origem da solicitação.',price_changed:'O preço foi atualizado. Atualize os planos e confira o valor novamente.',corporate_configuration_pending:'As compras corporativas estão em preparação.',corporate_review_required:'Esta oferta precisa de conferência do suporte. Nenhuma cobrança foi feita.',sales_closed:'As vendas ainda estão fechadas.',invalid_enrollment:'Código de vínculo inválido, expirado ou já utilizado.',email_unavailable:'O envio de e-mail está indisponível.',customer_blocked:'Seu acesso foi suspenso. Contate o suporte.'}[code]??'Não foi possível concluir a operação. Confira os dados e tente novamente.');\r\nasync function api(path,body){let r;try{r=await fetch('/api/v2'+path,{method:body===undefined?'GET':'POST',credentials:'same-origin',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});}catch{throw Error('Sem conexão com o serviço. Tente novamente.');}let data;try{data=await r.json();}catch{throw Error('O serviço está indisponível. Tente novamente.');}if(!r.ok){const e=Error(errorText(data.error?.code));e.status=r.status;throw e;}return data;}\r\nfunction safeLink(url,label){try{const u=new URL(url);if(u.protocol!=='https:')return '';return `<a href=\"${esc(u.href)}\" target=\"_blank\" rel=\"noopener noreferrer\">${esc(label)}</a>`;}catch{return '';}}\r\nconst nav=[['dashboard','Visão geral','grid'],['customers','Clientes e empresas','users'],['licenses','Licenças','key'],['trials','Testes de 30 dias','mail'],['devices','Celulares','phone'],['plans','Produtos e planos','plans'],['payments','Pagamentos','money'],['events','Eventos Cakto','history'],['deliveries','Entrega de licenças','mail'],['audit','Histórico administrativo','shield'],['settings','Configurações','settings']];\r\nconst titles={dashboard:['Visão geral','Acompanhe sua operação em um só lugar.'],customers:['Clientes e empresas','Cadastros, acessos e histórico comercial.'],licenses:['Licenças','Controle a validade e os celulares de cada assinatura.'],devices:['Celulares autorizados','Consulte ativações e substitua aparelhos antigos.'],plans:['Produtos e planos','Três períodos de assinatura para 1 celular.'],payments:['Pagamentos','Compras e renovações confirmadas pelo servidor.'],events:['Eventos Cakto','Acompanhe o recebimento e o processamento dos webhooks.'],deliveries:['Entrega de licenças','Acompanhe os e-mails enviados após a compra.'],audit:['Histórico administrativo','Registro das operações e alterações de acesso.'],settings:['Configurações','Políticas de funcionamento da sua central.']};\r\nfunction shell(content){const customer=state.mode==='customer';app.innerHTML=`<div class=\"shell\"><aside class=\"sidebar\">${brand}<div class=\"nav-group\">${customer?'MINHA CONTA':'GESTÃO DA OPERAÇÃO'}</div><nav>${customer?`<button class=\"active\">${icon('key')}Minha assinatura</button>`:nav.filter(([id])=>id!=='trials'||(state.role==='admin'&&state.adminEmail==='rignis1212@gmail.com')).map(([id,label,ico])=>`<button data-nav=\"${id}\" class=\"${state.view===id?'active':''}\">${icon(ico)}${label}</button>`).join('')}</nav><footer><b>${customer?'Seu atendimento, organizado.':'Automatize Fácil'}</b>${customer?'Licenças e celulares em um só lugar.':'Central de licenças e assinaturas.'}<br>WhatsApp · WhatsApp Business</footer></aside><section class=\"workspace\"><header class=\"topbar\"><button class=\"mobile-menu secondary\" data-action=\"menu\" aria-label=\"Abrir menu\">☰</button><span>Automatize Fácil <span aria-hidden=\"true\"> / </span> <strong>${customer?'Área do cliente':titles[state.view][0]}</strong></span><div class=\"account\"><div class=\"avatar\">${customer?'CL':state.role==='support'?'SP':'AD'}</div><strong>${customer?'Minha conta':state.role==='support'?'Suporte':'Administrador'}</strong><button data-action=\"logout\">Sair</button></div></header><main class=\"main\">${content}<div class=\"footer-note\">Automatize Fácil · Gestão de licenças · <a href=\"https://solomonstores.shop/\">Visitar o site ↗</a></div></main></section></div>`;}\r\nfunction heading(){const [title,description]=titles[state.view];let action='';if(state.role==='admin'){\r\n if(state.view==='customers')action='<button data-action=\"new-customer\">+ Cadastrar cliente</button>';\r\n if(state.view==='licenses')action='<button data-action=\"new-license\">+ Gerar licença</button>';\r\n if(state.view==='plans')action='<button data-action=\"new-plan\">+ Cadastrar plano</button>';\r\n }return `<div class=\"eyebrow\">AUTOKYRO CLOUD</div><div class=\"heading\"><div><h1>${title}</h1><p>${description}</p></div><div class=\"heading-actions\"><button class=\"secondary\" data-action=\"refresh\">Atualizar</button>${action}</div></div>`;}\r\nfunction empty(label='Nenhum registro encontrado.'){return `<div class=\"empty\">${icon('plans')}${esc(label)}</div>`;}\r\nfunction table(headers,rows){if(!rows.length)return empty();return `<div class=\"table-wrap\"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}\r\nfunction metric(label,value,note,ico){return `<article class=\"metric\"><div class=\"metric-head\">${label}<span class=\"metric-icon\">${icon(ico)}</span></div><strong>${esc(value)}</strong><small>${esc(note)}</small></article>`;}\r\nasync function dashboard(){const d=await api('/admin/dashboard'),c=d.counts;\r\n shell(heading()+`<section class=\"welcome\"><div><h2>Seu negócio em movimento.</h2><p>Gerencie assinaturas, acompanhe pagamentos e mantenha seus clientes conectados ao Automatize Fácil.</p></div><div class=\"signal\"><i></i>Central conectada</div></section><section class=\"metrics\">${metric('Clientes cadastrados',c.customers,'Pessoas e empresas','users')}${metric('Licenças ativas',c.active,`${c.licenses} licenças no total`,'key')}${metric('Celulares autorizados',c.devices,'Aparelhos vinculados às licenças','phone')}${metric('Receita recorrente estimada',money(c.mrr_cents),'Valor bruto dos planos vigentes / mês','money')}</section><div class=\"dashboard-grid\"><section class=\"panel\"><div class=\"panel-head\"><div><h2>Últimas compras</h2><p>Pagamentos recebidos pela Cakto</p></div><button class=\"secondary\" data-nav=\"payments\">Ver todos →</button></div>${table(['Cliente','Valor','Situação'],d.recentPurchases.map(p=>[esc(p.email),money(p.amount_cents),badge(p.status)]))}</section><section class=\"panel\"><div class=\"panel-head\"><div><h2>Saúde das assinaturas</h2><p>Acompanhe os acessos da sua base</p></div>${icon('shield')}</div><div class=\"status-list\"><div><span>Assinaturas recorrentes ativas</span><b>${c.subscriptions}</b></div><div><span>Licenças vencidas</span><b>${c.expired}</b></div><div><span>Licenças suspensas</span><b>${c.suspended}</b></div><div><span>Vendas brutas do mês (UTC)</span><b>${money(c.monthly_sales_cents)}</b></div><div><span>Eventos com falha</span><b>${d.failedEvents.total}</b></div><div><span>E-mails pendentes</span><b>${d.pendingDeliveries.total}</b></div></div></section></div><section class=\"panel\"><div class=\"panel-head\"><div><h2>Últimas ativações</h2><p>Celulares autorizados recentemente</p></div><button class=\"secondary\" data-nav=\"devices\">Ver celulares →</button></div>${table(['Licença','Operação','Data'],d.recentActivations.map(a=>[esc(a.entity_id),esc(a.action),stamp(a.created_at)]))}</section>`);}\r\nconst actionButton=(name,id,label,danger=false)=>`<button class=\"${danger?'danger':'secondary'}\" data-action=\"${name}\" data-id=\"${esc(id)}\">${label}</button>`;\r\nfunction rowCells(view,r){const admin=state.role==='admin';switch(view){\r\n case 'customers':return [esc(r.name||'Sem nome'),esc(r.email),esc(r.company||'—'),badge(r.blocked?'blocked':'active'),`${actionButton('customer-licenses',r.email,'Licenças')}${admin?actionButton('edit-customer',r.id,'Editar'):''}`];\r\n case 'licenses':return [esc(r.email),esc(r.is_permanent?'Automatize Fácil pessoal · 1 celular':String(r.plan_name).replace(/autokyro/gi,'Automatize Fácil'))+(r.trial_days?'<br><small>Teste de '+esc(r.trial_days)+' dias · uso único</small>':''),badge(r.manual_block?'blocked':r.valid_until&&Date.parse(r.valid_until)<=Date.now()?'expired':r.status),r.is_permanent?'Permanente':date(r.valid_until),`${r.active_devices} / ${r.max_devices}`,admin?`${actionButton('edit-license',r.id,'Gerenciar')}${actionButton('show-code',r.id,'Código')}`:'Somente consulta'];\r\n case 'devices':return [esc(r.device_name),esc(r.email),esc(r.license_id),stamp(r.activated_at),stamp(r.last_seen_at),badge(r.revoked_at?'blocked':'active'),admin&&!r.revoked_at?actionButton('revoke-device',r.id,'Remover',true):'—'];\r\n case 'payments':return [esc(r.email),esc(r.order_id),money(r.amount_cents),esc(r.currency),badge(r.status),date(r.paid_at)];\r\n case 'events':return [esc(r.event_type),esc(r.order_id),badge(r.status),r.attempts,esc(r.error_code||'—'),stamp(r.received_at),admin&&r.status==='failed'?actionButton('retry-event',r.id,'Tentar novamente'):'—'];\r\n case 'deliveries':return [esc(r.email),badge(r.status),r.attempts,esc(r.error_code||'—'),stamp(r.sent_at||r.created_at),admin&&r.status!=='sent'?actionButton('retry-delivery',r.id,'Tentar novamente'):'—'];\r\n case 'audit':return [esc(r.actor),esc(r.action),esc(r.entity_id),esc(r.detail),stamp(r.created_at)];\r\n default:return [];\r\n}}\r\ntitles.trials=['Testes de 30 dias','Envie um teste gratuito para um ou vários clientes.'];\nconst headers={customers:['Nome','E-mail','Empresa','Acesso','Ações'],licenses:['Cliente','Plano','Situação','Validade','Celulares','Ações'],devices:['Aparelho','Cliente','Licença','Ativação','Última verificação','Situação','Ações'],payments:['Cliente','Pedido','Valor','Moeda','Situação','Pagamento'],events:['Evento','Pedido','Situação','Tentativas','Detalhe','Recebimento','Ações'],deliveries:['Cliente','Situação','Tentativas','Detalhe','Data','Ações'],audit:['Responsável','Operação','Registro','Detalhes','Data']};\r\nasync function listing(){const data=await api(`/admin/${state.view}?q=${encodeURIComponent(state.q)}&page=${state.page}${state.showArchived?'&archived=1':''}`);state.rows=data.rows;\r\n shell(heading()+`<div class=\"toolbar\"><form id=\"search\" class=\"search\">${icon('search')}<input name=\"q\" aria-label=\"Buscar registros\" placeholder=\"Buscar registros…\" value=\"${esc(state.q)}\"></form><span class=\"muted\">${data.rows.length} registros nesta página</span>${state.view==='licenses'?'<button class=\"secondary\" data-action=\"toggle-archived\">'+(state.showArchived?'Ocultar arquivadas':'Incluir arquivadas')+'</button>':''}</div><section class=\"panel\">${table(headers[state.view],data.rows.map(r=>rowCells(state.view,r)))}<div class=\"pagination\"><button class=\"secondary\" data-action=\"prev\" ${state.page===1?'disabled':''}>Anterior</button><span>Página ${state.page}</span><button class=\"secondary\" data-action=\"next\" ${data.rows.length<50?'disabled':''}>Próxima</button></div></section>`);}\r\nfunction planCard(p){return `<article class=\"plan-card\">${badge(p.enabled?'active':'blocked')}<h2>${esc(p.name)}</h2><div class=\"price\">${money(p.price_cents)}<small> / ${p.period_days||30} dias</small></div><p>Até ${p.max_devices} ${p.max_devices===1?'celular autorizado':'celulares autorizados'}</p><p>WhatsApp e WhatsApp Business · Respostas e palavras-chave ilimitadas</p>${state.role==='admin'?actionButton('edit-plan',p.id,'Gerenciar plano'):''}<p class=\"field-note\">${p.provider_offer_id?'Oferta: '+esc(p.provider_offer_id):'Sem oferta Cakto vinculada'}</p></article>`;}\nasync function plans(){const data=await api('/admin/plans');state.rows=data.rows;const active=data.rows.filter(p=>p.enabled),archived=data.rows.filter(p=>!p.enabled);shell(heading()+`<div class=\"notice\">Três assinaturas oficiais para 1 celular, com taxa de R$ 0,99 incluída. Preços e checkouts devem corresponder às ofertas Cakto.</div><div class=\"plans\">${active.map(planCard).join('')}</div><details class=\"archived-plans\"><summary>Planos históricos suspensos (${archived.length})</summary><p>Preservados para consulta e histórico das licenças. Indisponíveis para novas compras.</p><div class=\"plans\">${archived.map(planCard).join('')}</div></details>`);}\nlet trialRequestId;\nfunction trialPage(){if(state.role!=='admin'||state.adminEmail!=='rignis1212@gmail.com')return shell(heading()+'<div class=\"notice\">Acesso exclusivo do administrador proprietário.</div>');trialRequestId=crypto.randomUUID();shell(heading()+`<section class=\"panel customer-card\"><h2>Convidar clientes para testar</h2><p>O cliente recebe por e-mail a licença e as instruções. São 30 dias gratuitos para 1 celular, contados a partir da primeira ativação. Não há cobrança automática.</p><form id=\"trial-invite-form\"><label>E-mails dos clientes<textarea name=\"emails\" rows=\"5\" required placeholder=\"Um e-mail por linha · até 10 clientes por envio\" autocomplete=\"off\"></textarea></label><p class=\"field-note\">Confira os destinatários antes de enviar. O envio cria uma licença individual por e-mail. O cliente confirma seu próprio e-mail na central e no aplicativo.</p><div id=\"trial-error\" class=\"error\" role=\"alert\"></div><button ${state.role!=='admin'?'disabled':''}>Criar testes e enviar por e-mail</button></form><div id=\"trial-results\" aria-live=\"polite\"></div></section>`);}\nasync function settings(){const data=await api('/admin/settings');const hours=data.rows.find(x=>x.id==='offlineHours')?.value||'72';shell(heading()+`<section class=\"panel customer-card\"><h2>Autorização offline</h2><p class=\"muted\">O app pode usar a última autorização confirmada até o limite abaixo, sempre respeitando o vencimento da licença. Depois de reiniciar o celular, é necessária uma nova verificação online. Uma suspensão passa a valer no app na próxima consulta ou ao fim do cache.</p><form id=\"settings-form\"><label>Tempo máximo sem conexão (horas)<input name=\"offlineHours\" type=\"number\" min=\"1\" max=\"72\" value=\"${esc(hours)}\" required></label><br><button ${state.role!=='admin'?'disabled':''}>Salvar política</button></form></section><section class=\"panel customer-card\"><h2>Infraestrutura e segurança</h2><p class=\"muted\">Credenciais ficam nos Secrets do Cloudflare. Consulte o guia de publicação do projeto para configurar envio de e-mail, assinatura Android e backups do D1. Nunca informe segredos em campos de clientes ou planos.</p></section>`);}\r\nasync function render(){try{if(state.mode==='customer')return await customerPage();if(state.view==='dashboard')return await dashboard();if(state.view==='plans')return await plans();if(state.view==='settings')return await settings();if(state.view==='trials')return trialPage();return await listing();}catch(error){if(error.status===401)return login();shell(heading()+`<div class=\"notice\">${esc(error.message)} <button class=\"secondary\" data-action=\"refresh\">Tentar novamente</button></div>`);}}\r\nfunction login(){state.role=null;const customer=state.mode==='customer';const preparing=customer&&state.serviceStatus?.emailReady!==true;app.innerHTML=`<div class=\"login-page\"><aside class=\"login-aside\">${brand}<div><div class=\"eyebrow\">${customer?'SEU ATENDIMENTO, MAIS FÁCIL':'CONTROLE PARA CRESCER'}</div><h1>${customer?'Seu atendimento.<br>Mais fácil.':'Seu atendimento.<br>Uma nova escala.'}</h1><p>Licenças, assinaturas e celulares organizados em uma central segura. Mais controle para você, mais agilidade para seu negócio.</p></div><footer>Automatize Fácil · WhatsApp e WhatsApp Business<br><a class=\"site-return\" href=\"https://solomonstores.shop/\">Conhecer o aplicativo ↗</a></footer></aside><main class=\"login-main\"><section class=\"login-box\"><div class=\"eyebrow\">${customer?'ÁREA DO CLIENTE':'PAINEL ADMINISTRATIVO'}</div><h2>${customer?'Acesse sua conta':'Bem-vindo de volta'}</h2><p>${customer?'Use o mesmo e-mail informado na compra. Enviaremos um código para confirmar seu acesso.':'Acesse sua conta para gerenciar licenças, assinaturas e convites de teste.'}</p><form id=\"login-form\"><fieldset ${preparing?'disabled':''}>${customer?'<label>E-mail da compra<input name=\"email\" type=\"email\" autocomplete=\"email\" placeholder=\"voce@empresa.com.br\" required></label>':'<label>Senha de acesso<input name=\"password\" type=\"password\" autocomplete=\"current-password\" placeholder=\"Sua senha administrativa\" required></label>'}<div id=\"login-error\" class=\"error\" role=\"alert\"></div><button>${customer?'Receber código de acesso':'Entrar no painel'}</button></fieldset>${preparing?'<p class=\"field-note\">O acesso de clientes está em preparação. O envio de códigos por e-mail ainda não está disponível. As vendas continuam fechadas.</p>':''}</form><div class=\"access-recovery\"><button type=\"button\" class=\"secondary\" data-action=\"recover-access\">${customer?'Não consigo acessar / recuperar acesso':'Entrar com código por e-mail'}</button></div><div class=\"login-switch\">${customer?'Gerencia a operação? <a href=\"/admin\">Acesso administrativo</a>':'É cliente Automatize Fácil? <a href=\"/cliente\">Acesse sua assinatura</a>'}</div></section></main></div>`;}\r\nconst customerDevices={page:1,q:'',licenseId:'',rows:[]};\r\nasync function customerPage(){\r\n const d=await api('/me');state.customer=d;state.rows=d.licenses;\r\n const devices=await api(`/devices?page=${customerDevices.page}&q=${encodeURIComponent(customerDevices.q)}&licenseId=${encodeURIComponent(customerDevices.licenseId)}${customerDevices.history?\"&history=1\":\"\"}`);customerDevices.rows=devices.rows;\r\n const p=await api('/plans');\r\n const cards=d.licenses.map(l=>`<section class=\"panel customer-card\"><div class=\"flex-between\"><h2>${esc(l.is_permanent?'Automatize Fácil pessoal · 1 celular':l.max_devices===1 && /Start Mensal/.test(l.plan_name)?'Automatize Fácil Mensal · 1 celular':String(l.plan_name).replace(/autokyro/gi,'Automatize Fácil'))}</h2>${badge(d.customer.blocked||l.manual_block?'blocked':l.valid_until&&Date.parse(l.valid_until)<=Date.now()?'expired':l.status)}</div><p>${l.is_permanent?'Licença permanente · sem renovação e sem cobrança':l.trial_days&&!l.trial_started_at?'Teste de '+l.trial_days+' dias · começa na primeira ativação':'Validade: '+date(l.valid_until)}</p><div class=\"metrics\"><article><span>Contratados</span><strong>${l.max_devices}</strong></article><article><span>Em uso</span><strong>${l.active_devices||0}</strong></article><article><span>Vagas livres</span><strong>${Math.max(0,l.max_devices-(l.active_devices||0))}</strong></article></div><p>Uma licença principal para até ${l.max_devices} ${l.max_devices===1?'aparelho':'aparelhos'}.</p><details class=\"license-secret\"><summary>Exibir licença principal · uso do responsável</summary><div class=\"code\">${esc(l.code)}</div></details><p class=\"field-note\">Confirme ${esc(d.customer.email)} no app e informe esta licença para ativar seu celular.</p><p class=\"field-note\">APK para Android 7.0 ou superior. Não funciona em iPhone/iPad. O funcionamento depende das permissões e das notificações do aparelho.</p><div class=\"license-actions\">${(!l.manual_block&&!d.customer.blocked&&((['active','canceled','grace'].includes(l.status)&&(l.is_permanent||Date.parse(l.valid_until)>Date.now()))||(l.trial_days&&!l.trial_started_at)))?safeLink(d.downloadUrl,'Baixar aplicativo Android'):''}${!l.trial_days && l.max_devices>1?`<button data-action=\"team-codes\" data-id=\"${esc(l.id)}\">Gerar códigos de vínculo da equipe</button>`:''}</div></section>`).join('');\r\n const deviceCards=devices.rows.map(x=>`<article class=\"device-card\"><div class=\"device-card-top\"><span class=\"device-symbol\">${icon('phone')}</span><div><h3>${esc(x.device_name||'Celular Android')}</h3><span class=\"muted\">${x.revoked_at?'Desvinculado':'Conectado à sua licença'}</span></div>${badge(x.revoked_at?'blocked':'active')}</div><dl><div><dt>Última verificação</dt><dd>${stamp(x.last_seen_at)}</dd></div><div><dt>Vinculado em</dt><dd>${date(x.activated_at)}</dd></div></dl><div class=\"device-card-actions\">${actionButton('customer-rename',x.id,'Editar nome')}${x.revoked_at?'':actionButton('customer-revoke',x.id,'Desvincular celular',true)}</div></article>`).join('');\n const management=`<section class=\"panel customer-card devices-section\"><div class=\"devices-heading\"><div><span class=\"eyebrow\">SEU ACESSO NO ANDROID</span><h2>Seus aparelhos</h2><p>Veja onde sua licença está sendo usada e gerencie seu celular.</p></div><span class=\"device-count\">${devices.total} ${customerDevices.history?'no histórico':devices.total===1?'celular conectado':'celulares conectados'}</span></div>${deviceCards?'<div class=\"device-grid\">'+deviceCards+'</div>':customerDevices.q||customerDevices.licenseId||customerDevices.history?'<div class=\"device-empty\"><h3>Nenhum aparelho encontrado</h3><p>Ajuste os filtros ou volte à lista de aparelhos conectados.</p></div>':'<div class=\"device-empty\"><span class=\"device-symbol\">'+icon('phone')+'</span><h3>Seu celular ainda não foi vinculado</h3><p>Baixe o aplicativo Android, confirme o e-mail da sua conta e informe sua licença na tela Minha assinatura.</p><ol class=\"activation-steps\"><li><b>1</b> Baixe o aplicativo</li><li><b>2</b> Confirme seu e-mail no app</li><li><b>3</b> Ative sua licença</li></ol><p class=\"field-note\">Se você recebeu um teste, os 30 dias começam na primeira ativação.</p></div>'}<details class=\"device-search\"><summary>Pesquisar aparelhos e consultar histórico</summary><form id=\"customer-device-search\" class=\"toolbar\"><label>Nome do aparelho<input name=\"q\" placeholder=\"Ex.: meu celular\" value=\"${esc(customerDevices.q)}\"></label><label>Licença<select name=\"licenseId\"><option value=\"\">Todas as licenças</option>${d.licenses.map(l=>`<option value=\"${esc(l.id)}\" ${l.id===customerDevices.licenseId?'selected':''}>${esc(l.is_permanent?'Pessoal permanente':String(l.plan_name).replace(/autokyro/gi,'Automatize Fácil'))}</option>`).join('')}</select></label><button>Pesquisar</button></form><button class=\"secondary\" data-action=\"toggle-device-history\">${customerDevices.history?'Mostrar somente conectados':'Incluir aparelhos desvinculados'}</button></details>${devices.total>50?`<div class=\"pagination\"><button data-action=\"customer-device-prev\" ${customerDevices.page<=1?'disabled':''}>Anterior</button><span>Página ${devices.page}</span><button data-action=\"customer-device-next\" ${devices.page*50>=devices.total?'disabled':''}>Próxima</button></div>`:''}<details class=\"device-help\"><summary>Como trocar de celular?</summary><p>Desvincule o aparelho antigo e ative sua licença no substituto. O acesso anterior termina na próxima consulta ou ao fim da autorização offline. Testes são de uso único e não podem ser transferidos.</p></details><aside class=\"support-card\"><div><span class=\"eyebrow\">PRECISA DE AJUDA?</span><h3>Suporte Automatize Fácil</h3><p>Informe o modelo do seu celular e descreva sua dúvida.</p></div><div class=\"support-actions\"><a href=\"https://wa.me/5511958749421\" target=\"_blank\" rel=\"noopener noreferrer\">Conversar no WhatsApp ↗</a><a href=\"https://solomonstores.shop/suporte/\">Guia de ajuda ↗</a></div></aside></section>`;\n const requested=new URLSearchParams(location.search),requestedDevices=Number(requested.get('devices')),requestedPeriod=Number(requested.get('periodDays'));const initialDevices=Number.isInteger(requestedDevices)&&requestedDevices>=21&&requestedDevices<=1000?requestedDevices:100;const initialPeriod=[30,90,365].includes(requestedPeriod)?requestedPeriod:30;\r\n shell(`<div class=\"eyebrow\">MINHA CONTA</div><div class=\"heading\"><div><h1>Sua assinatura</h1><p>${esc(d.customer.email)} · Sua licença e seu celular, em um só lugar.</p></div><button class=\"secondary\" data-action=\"refresh\">Atualizar</button></div>${d.customer.blocked?'<div class=\"notice\">Seu acesso está suspenso. Fale com o suporte.</div>':''}${cards||`<section class=\"panel\">${empty('Você ainda não tem uma licença confirmada. Após o pagamento aprovado, atualize esta página.')}</section>`}${management}<section class=\"customer-catalog official-catalog\"><div class=\"heading\"><div><div class=\"eyebrow\">PLANOS AUTOMATIZE FÁCIL</div><h2>Compare os planos por período</h2><p>Assinaturas recorrentes para 1 celular. Totais com taxa de R$ 0,99 incluída. Uma nova compra não cancela uma assinatura existente.</p></div></div>${[30,90,365].map(days=>`<details class=\"period-catalog\" open><summary><strong>${({30:'Mensal',90:'Trimestral',365:'Anual'})[days]}</strong><span>${days} dias · cobrança pelo período completo</span></summary><div class=\"plans\">${p.plans.filter(x=>(x.period_days||30)===days).map(x=>`<article class=\"plan-card\"><span class=\"eyebrow\">${esc(String(x.name).replace(/autokyro/gi,'Automatize Fácil'))}</span><h3>${x.max_devices} ${x.max_devices===1?'celular':'celulares'}</h3><div class=\"price\">${money(x.price_cents)}<small>por ${days} dias</small></div><p class=\"muted\">1 celular Android · WhatsApp e WhatsApp Business</p>${x.checkout_url?safeLink(x.checkout_url,'Escolher este plano'):'<span class=\"badge pending\">Compras ainda indisponíveis</span>'}</article>`).join('')}</div></details>`).join('')}</section>`);\r\n}\r\nlet dialogCallback;\r\nfunction field(name,label,value='',type='text',extra=''){return `<label>${label}<input name=\"${name}\" type=\"${type}\" value=\"${esc(value)}\" ${extra}></label>`;}\r\nfunction select(name,label,items,current){return `<label>${label}<select name=\"${name}\">${items.map(([v,l])=>`<option value=\"${esc(v)}\" ${String(current)===String(v)?'selected':''}>${esc(l)}</option>`).join('')}</select></label>`;}\r\nfunction check(name,label,value){return `<label><span><input type=\"checkbox\" name=\"${name}\" ${value?'checked':''}> ${label}</span></label>`;}\r\nfunction modal(title,content,callback,label='Salvar'){document.querySelector('#dialog-content').innerHTML=`<h2>${esc(title)}</h2>${content}<div id=\"dialog-error\" class=\"error\" role=\"alert\"></div>`;document.querySelector('#dialog-submit').textContent=label;dialogCallback=callback;dialog.showModal();}\r\nasync function edit(action,id){const row=state.rows.find(x=>x.id===id)||{};\r\n if(action==='new-customer'||action==='edit-customer')return modal('Cadastro de cliente',field('email','E-mail',row.email,'email','required')+field('name','Nome',row.name)+field('company','Empresa',row.company)+check('blocked','Suspender todos os acessos deste cliente',row.blocked),async f=>api('/admin/customer/save',{email:f.email.value,name:f.name.value,company:f.company.value,blocked:f.blocked.checked}));\r\n if(action==='new-plan'||action==='edit-plan')return modal('Configurar plano',field('id','Identificador interno',row.id||'','text',row.id?'readonly':'required pattern=\"[a-z0-9_-]+\"')+field('name','Nome',row.name,'text','required')+field('priceCents','Preço em centavos',row.price_cents??3990,'number','min=\"0\" required')+field('maxDevices','Limite de celulares',row.max_devices??2,'number','min=\"1\" max=\"1000\" required')+select('periodDays','Período de cobrança',[[30,'Mensal · 30 dias'],[90,'Trimestral · 90 dias'],[365,'Anual · 365 dias']],row.period_days||30)+field('graceDays','Tolerância de pagamento (dias)',row.grace_days??0,'number','min=\"0\" max=\"7\" required')+field('providerProductId','ID do produto Cakto',row.provider_product_id)+field('providerOfferId','ID da oferta Cakto',row.provider_offer_id)+field('checkoutUrl','Link de checkout HTTPS',row.checkout_url,'url')+check('enabled','Plano disponível para novas compras',row.enabled??true)+'<p class=\"field-note\">Preços da Cakto precisam ser ajustados também na oferta. A alteração local não modifica cobranças já contratadas.</p>',async f=>api('/admin/plan/save',{id:f.id.value,name:f.name.value,priceCents:Number(f.priceCents.value),maxDevices:Number(f.maxDevices.value),periodDays:Number(f.periodDays.value),graceDays:Number(f.graceDays.value),providerProductId:f.providerProductId.value,providerOfferId:f.providerOfferId.value,checkoutUrl:f.checkoutUrl.value,enabled:f.enabled.checked}));\r\n if(action==='new-license'||action==='edit-license'){\r\n  const plans=(await api('/admin/plans')).rows.filter(p=>p.enabled||p.id===row.plan_id);\n  if(row.is_permanent)return modal('Gerenciar licença permanente','<p>Uso pessoal · 1 celular · sem vencimento e sem cobrança. O app renova a autorização técnica nas verificações online.</p>'+select('status','Situação',[['active','Ativa'],['blocked','Suspensa']],row.status)+check('blocked','Suspensão administrativa',row.manual_block)+field('reason','Motivo / observação'),async f=>api('/admin/license/update',{id,status:f.status.value,blocked:f.blocked.checked,reason:f.reason.value}));\r\n  const content=(action==='new-license'?field('email','E-mail do cliente','','email','required')+select('trialDays','Tipo de licença',[[0,'Licença com data fixa'],[15,'Teste de 15 dias · 1 aparelho'],[30,'Teste de 30 dias · 1 aparelho']],0)+'<p class=\"field-note\">Testes começam na primeira ativação, sem cobrança automática, e ficam vinculados a um único aparelho. Cada emissão gera um código novo. A data abaixo só se aplica à licença com data fixa.</p>':'<p class=\"muted\">'+esc(row.email)+'</p>')+select('planId','Plano',plans.map(p=>[p.id,p.name]),row.plan_id||'start')+field('validUntil','Validade',row.valid_until?.slice(0,10)||new Date(Date.now()+30*86400000).toISOString().slice(0,10),'date','required')+(action==='edit-license'?field('maxDevices','Máximo de celulares',row.max_devices,'number','min=\"1\" max=\"1000\" required')+select('status','Situação',Object.entries(names).filter(([v])=>['active','pending','expired','blocked','canceled','refunded','past_due','grace'].includes(v)),row.status)+check('blocked','Suspensão administrativa',row.manual_block):'')+field('reason','Motivo / observação');\r\n  return modal(action==='new-license'?'Gerar licença manual':'Gerenciar licença',content,async f=>api(action==='new-license'?'/admin/license/create':'/admin/license/update',{id,email:f.email?.value,planId:f.planId.value,validUntil:f.validUntil.value+'T23:59:59.000Z',trialDays:f.trialDays?Number(f.trialDays.value):undefined,maxDevices:f.maxDevices?Number(f.maxDevices.value):undefined,status:f.status?.value,blocked:f.blocked?.checked,reason:f.reason.value}));\r\n }\r\n if(action==='customer-rename'){const d=customerDevices.rows.find(x=>x.id===id);return modal('Nomear aparelho',field('name','Nome ou funcionário',d?.device_name,'text','required maxlength=\"80\"'),async f=>api('/device/rename',{deviceId:id,name:f.name.value}));}\r\n if(action==='team-codes'){return modal('Vincular celulares da equipe','<p>Cada código libera um aparelho, dura 24 horas e só pode ser usado uma vez. Um novo lote invalida códigos anteriores ainda não usados. O total de aparelhos ativos continua limitado ao contratado.</p>'+field('count','Quantidade de códigos',1,'number','min=\"1\" max=\"1000\" required'),async f=>{const d=await api('/team/codes',{licenseId:id,count:Number(f.count.value)});setTimeout(()=>modal('Códigos de vínculo da equipe','<p>Entregue um código para cada aparelho. Eles não permitem acesso ao painel do responsável.</p><label>Códigos gerados<textarea rows=\"12\" readonly>'+esc(d.codes.join('\\n'))+'</textarea></label><p>Vencimento: '+stamp(d.expiresAt)+'</p>',async()=>{},'Fechar'),0);});}\r\n if(action==='show-code'){const d=await api('/admin/license/code',{id});modal('Código de ativação',`<p class=\"field-note\">A consulta foi registrada no histórico administrativo.</p><div class=\"code\">${esc(d.code)}</div>`,async()=>{},'Fechar');return;}\r\n const mapping={'revoke-device':['Remover celular','/admin/device/revoke'],'retry-event':['Reprocessar evento','/admin/event/retry'],'retry-delivery':['Reenviar licença','/admin/delivery/retry'],'customer-revoke':['Remover aparelho','/device/revoke']};\r\n if(mapping[action]){const [title,path]=mapping[action];modal(title,'<p>Confirma esta operação? A remoção de aparelho será aplicada na próxima validação ou ao fim da autorização offline.</p>',async()=>api(path,action==='customer-revoke'?{deviceId:id}:{id}),'Confirmar');}\r\n}\r\ndialogForm.addEventListener('submit',async event=>{event.preventDefault();const button=document.querySelector('#dialog-submit');button.disabled=true;try{await dialogCallback(dialogForm.elements);dialog.close();toast('Operação concluída.');await render();}catch(error){document.querySelector('#dialog-error').textContent=error.message;}finally{button.disabled=false;}});\r\ndocument.querySelector('#dialog-cancel').addEventListener('click',()=>dialog.close());\r\napp.addEventListener('click',async event=>{const navButton=event.target.closest('[data-nav]');if(navButton){state.view=navButton.dataset.nav;state.page=1;state.q='';await render();return;}\r\n const b=event.target.closest('[data-action]');if(!b)return;const action=b.dataset.action,id=b.dataset.id;\r\n try{if(action==='toggle-device-history'){customerDevices.history=!customerDevices.history;customerDevices.page=1;return await render();}if(action==='toggle-archived'){state.showArchived=!state.showArchived;state.page=1;return await render();}if(action==='recover-access'){return recoveryLogin();}if(action==='back-login'){clearInterval(resendTimer);return login();}if(action==='resend-code'){b.disabled=true;try{const d=await api(pendingAdmin?'/admin/auth/request':'/auth/request',{email:pendingEmail});pendingChallenge=d.challengeId;showCodeForm(document.querySelector('#verify-form'),pendingAdmin);}catch(error){b.disabled=false;const target=document.querySelector('#login-error');if(target)target.textContent=error.message;}return;}if(action==='customer-device-prev'||action==='customer-device-next'){customerDevices.page+=action.endsWith('next')?1:-1;return await render();}if(action==='corporate-price'){const f=document.querySelector('#corporate-form');if(!f.reportValidity())return;const d=await api('/corporate/pricing?devices='+encodeURIComponent(f.elements.devices.value)+'&periodDays='+encodeURIComponent(f.elements.periodDays.value));state.corporateQuote=d;document.querySelector('#corporate-price-result').textContent=money(d.priceCents)+' pelo período completo de '+d.periodDays+' dias · '+d.devices+' aparelhos.';return;}if(action==='menu'){document.querySelector('.shell').classList.toggle('menu-open');return;}if(action==='logout'){await api(state.mode==='customer'?'/logout':'/admin/logout',{});login();return;}if(action==='refresh')return await render();if(action==='prev'||action==='next'){state.page+=action==='prev'?-1:1;return await render();}if(action==='customer-licenses'){state.view='licenses';state.q=id;state.page=1;return await render();}await edit(action,id);}catch(error){toast(error.message);}\r\n});\r\nlet pendingEmail='',pendingAdmin=false,resendTimer;\nfunction recoveryLogin(){\n login();\n const admin=state.mode==='admin',box=document.querySelector('.login-box');\n box.querySelector('h2').textContent=admin?'Entrar por e-mail':'Recuperar meu acesso';\n box.querySelector('p').textContent=admin?'Enviaremos um código ao e-mail administrativo autorizado. Clientes continuam acessando somente suas próprias contas.':'Você não precisa de senha. Use o e-mail da compra para receber um novo código de acesso.';\n box.querySelector('.access-recovery').hidden=true;\r\n const f=document.querySelector('#login-form');f.id=admin?'admin-email-form':'login-form';\r\n f.innerHTML=field('email',admin?'E-mail administrativo':'E-mail da compra','','email','required autocomplete=\"email\" maxlength=\"254\"')+'<div id=\"login-error\" class=\"error\" role=\"alert\"></div><button>Receber código de acesso</button><button type=\"button\" class=\"secondary\" data-action=\"back-login\">Voltar</button>';\n}\nfunction showCodeForm(f,isAdmin){\n pendingAdmin=isAdmin;f.id='verify-form';\n f.innerHTML=field('code','Código enviado por e-mail','','text','required inputmode=\"numeric\" pattern=\"[0-9]{6}\" maxlength=\"6\" autocomplete=\"one-time-code\"')+'<p class=\"field-note\">Se o e-mail estiver autorizado, você receberá um código válido por 10 minutos. Confira também o spam. Nunca compartilhe o código.</p><div id=\"login-error\" class=\"error\" role=\"alert\"></div><button>Confirmar e-mail</button><button type=\"button\" class=\"secondary\" data-action=\"resend-code\" disabled>Reenviar código em 60 s</button><button type=\"button\" class=\"secondary\" data-action=\"recover-access\">Corrigir e-mail ou voltar</button>';\n let remaining=60;clearInterval(resendTimer);resendTimer=setInterval(()=>{const b=document.querySelector('[data-action=\"resend-code\"]');if(!b){clearInterval(resendTimer);return;}remaining--;b.textContent=remaining>0?'Reenviar código em '+remaining+' s':'Reenviar código';b.disabled=remaining>0;if(remaining<=0)clearInterval(resendTimer);},1000);\n f.elements.code.focus();\n}\nasync function requestAccessCode(f,isAdmin){\n pendingEmail=f.elements.email.value.trim();\n const data=await api(isAdmin?'/admin/auth/request':'/auth/request',{email:pendingEmail});pendingChallenge=data.challengeId;showCodeForm(f,isAdmin);\n}\nlet pendingChallenge;\r\napp.addEventListener('submit',async event=>{event.preventDefault();const f=event.target,button=event.submitter??f.querySelector('button');if(button)button.disabled=true;\r\n try{if(f.id==='trial-invite-form'){const button=f.querySelector('button');button.disabled=true;document.querySelector('#trial-error').textContent='';try{const emails=[...new Set(f.elements.emails.value.split(/[\\n,;]+/).map(x=>x.trim().toLowerCase()).filter(Boolean))];if(!emails.length||emails.length>10||emails.some(x=>!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(x)))throw Error('Informe de 1 a 10 e-mails válidos, um por linha.');const data=await api('/admin/trials/send',{requestId:trialRequestId,emails});document.querySelector('#trial-results').innerHTML='<h3>Resultado do envio</h3>'+table(['Cliente','Situação'],data.rows.map(x=>[esc(x.email),x.status==='sent'?'Enviado ao provedor de e-mail':x.status==='failed'?'Falha no envio · consulte Entrega de licenças':'Na fila de envio']));trialRequestId=crypto.randomUUID();f.elements.emails.value='';}catch(error){document.querySelector('#trial-error').textContent=error.message;}finally{button.disabled=false;}return;}if(f.id==='customer-device-search'){customerDevices.q=f.elements.q.value;customerDevices.licenseId=f.elements.licenseId.value;customerDevices.page=1;return await render();}if(f.id==='corporate-form'){const q=state.corporateQuote;if(!q||Number(f.elements.devices.value)!==q.devices||Number(f.elements.periodDays.value)!==q.periodDays)throw Error('Calcule o preço para a quantidade e o período escolhidos.');const d=await api('/corporate/checkout',{devices:q.devices,periodDays:q.periodDays,expectedPriceCents:q.priceCents});const target=new URL(d.checkoutUrl);if(target.protocol!=='https:'||target.hostname!=='pay.cakto.com.br')throw Error('Checkout inválido. Fale com o suporte.');location.assign(target.href);return;}if(f.id==='search'){state.q=f.elements.q.value;state.page=1;return await render();}\r\n if(f.id==='settings-form'){await api('/admin/settings/save',{offlineHours:Number(f.elements.offlineHours.value)});toast('Política atualizada.');return;}\r\n if(f.id==='admin-email-form'){return await requestAccessCode(f,true);}\n if(f.id==='login-form'){\r\n  if(state.mode==='admin'){const d=await api('/admin/login',{password:f.elements.password.value});state.adminEmail=d.adminEmail;state.role=d.role;return await render();}\r\n  return await requestAccessCode(f,false);\n }\r\n if(f.id==='verify-form'){const result=await api(pendingAdmin?'/admin/auth/verify':'/auth/verify',{challengeId:pendingChallenge,code:f.elements.code.value});clearInterval(resendTimer);if(pendingAdmin){state.adminEmail=result.adminEmail;state.role=result.role;}return await render();}\r\n }catch(error){const target=document.querySelector('#login-error');if(target)target.textContent=error.message;else toast(error.message);}finally{if(button)button.disabled=false;}\r\n});\r\n(async()=>{try{state.serviceStatus=await api('/status');if(state.mode==='customer'){await customerPage();}else{const s=await api('/admin/session');state.adminEmail=s.adminEmail;state.role=s.role;await render();}}catch{login();}})();\r\n";
const AUTOKYRO_STYLE="\r\n:root{font-family:Inter,'Segoe UI',Arial,sans-serif;color:#161e2b;background:#f4f5f7;font-synthesis:none;--green:#0043b8;--ink:#12213b;--muted:#707681;--line:#e1e4e9}*{box-sizing:border-box}body{margin:0}button,input,select{font:inherit}button,a,input,select{outline-offset:4px}button{cursor:pointer;border:0;border-radius:9px;padding:11px 17px;background:var(--ink);color:white;font-weight:600;transition:background .15s}button:hover{background:#20365c}button:disabled{opacity:.45;cursor:not-allowed}button.secondary{background:#edeff3;color:var(--ink)}button.danger{background:#ffe8e7;color:#a53030}a{color:#08337c;text-underline-offset:3px}input,select{border:1px solid #cfd3db;background:white;border-radius:8px;padding:11px 12px;width:100%;color:#192437}label{display:grid;gap:7px;font-size:13px;font-weight:600}input[type=checkbox]{width:auto}h1,h2,h3,p{margin-top:0}h1{font-size:30px;letter-spacing:-1px;margin-bottom:8px}h2{font-size:18px;letter-spacing:-.3px}small,.muted{color:var(--muted)}.shell{display:grid;grid-template-columns:238px 1fr;min-height:100vh}.sidebar{background:#10203b;color:#d2dae7;padding:31px 19px;display:flex;flex-direction:column;position:sticky;top:0;height:100vh}.brand{display:flex;gap:11px;align-items:center;color:white;font-size:21px;font-weight:700;letter-spacing:-.5px;margin-bottom:39px}.brand img{width:38px}.brand small{display:block;font-size:10px;font-weight:500;letter-spacing:3px;color:#8f9db5;margin-top:3px}.nav-group{font-size:10px;letter-spacing:1.7px;color:#7a89a3;padding:8px 13px 12px}.sidebar nav{display:grid;gap:5px}.sidebar nav button{display:flex;align-items:center;gap:13px;background:transparent;color:#bfc7d5;text-align:left;font-weight:500;padding:12px 14px;font-size:13px}.sidebar nav button.active{background:#203353;color:white;box-shadow:inset 3px 0 #2264d7}.icon{width:19px;height:19px;flex-shrink:0}.sidebar footer{margin-top:auto;border-top:1px solid #313d53;padding:20px 10px 0;font-size:12px;line-height:1.8;color:#9faabc}.sidebar footer b{color:white;display:block;font-weight:500}.workspace{min-width:0}.topbar{height:78px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);background:#fff;padding:0 38px;font-size:12px;color:var(--muted);gap:12px}.topbar strong{color:#232d3e;font-weight:500}.avatar{width:32px;height:32px;display:grid;place-items:center;background:#e7ecf4;border-radius:50%;color:#1b3d79;font-size:11px;font-weight:700}.account{display:flex;gap:11px;align-items:center}.account button{background:none;color:#535c6b;font-size:12px;padding:5px}.main{padding:33px 38px 50px;max-width:1600px;margin:auto}.eyebrow{color:#6c7483;font-size:10px;font-weight:700;letter-spacing:2px;margin-bottom:13px}.heading{display:flex;justify-content:space-between;align-items:center;gap:18px;margin-bottom:28px}.heading p{font-size:13px;color:var(--muted);margin:0}.heading-actions{display:flex;gap:8px}.welcome{border-radius:16px;background:linear-gradient(110deg,#14243f,#253b61);padding:27px 29px;color:#fff;position:relative;overflow:hidden;margin-bottom:25px;display:flex;align-items:center;justify-content:space-between;gap:20px}.welcome:after{content:'';position:absolute;border:1px solid #495c7e;border-radius:50%;width:280px;height:280px;right:20px;top:-170px;}.welcome h2{font-size:23px;font-weight:600;margin-bottom:9px}.welcome p{color:#b4c0d5;font-size:13px;margin:0;max-width:570px;line-height:1.7}.welcome .signal{display:flex;align-items:center;gap:8px;background:#283854;border:1px solid #495974;border-radius:30px;white-space:nowrap;font-size:11px;padding:10px 14px;z-index:1}.signal i{height:6px;width:6px;background:#558be7;border-radius:50%}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:17px;margin-bottom:24px}.metric,.panel,.plan-card{background:#fff;border:1px solid var(--line);border-radius:13px}.metric{padding:21px}.metric-head{display:flex;justify-content:space-between;color:#666e7b;font-size:12px;align-items:center}.metric .metric-icon{background:#eaeef6;color:#214a91;width:31px;height:31px;border-radius:8px;display:grid;place-items:center}.metric strong{font-size:29px;font-weight:650;letter-spacing:-1px;display:block;margin:13px 0 7px}.metric small{font-size:11px}.dashboard-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:22px}.panel{overflow:hidden;margin-bottom:22px}.panel-head{padding:22px 22px 17px;display:flex;align-items:center;justify-content:space-between;gap:12px}.panel-head h2{margin:0}.panel-head p{font-size:11px;color:var(--muted);margin:6px 0 0}.panel-head button{font-size:11px;padding:8px 12px}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;text-align:left;font-size:12px;white-space:nowrap}thead{background:#fafbfc;color:#7b818c;font-size:10px;letter-spacing:.7px;text-transform:uppercase}th{padding:13px 20px;font-weight:600;border-top:1px solid #edeef1;border-bottom:1px solid #edeef1}td{padding:16px 20px;border-bottom:1px solid #edeef1;max-width:340px;overflow:hidden;text-overflow:ellipsis}td button{padding:6px 9px;font-size:10px;margin-right:5px}tbody tr:last-child td{border-bottom:0}tbody tr:hover{background:#fcfdfe}.badge{display:inline-flex;align-items:center;gap:5px;border-radius:20px;padding:5px 9px;font-size:10px;font-weight:600;background:#eff0f2;color:#606773}.badge.active,.badge.paid,.badge.processed,.badge.sent{background:#e7edf7;color:#163f86}.badge.blocked,.badge.refunded,.badge.failed,.badge.chargedback{background:#fff0ee;color:#ba5146}.badge.pending,.badge.grace,.badge.processing{background:#fff6df;color:#95711b}.empty{text-align:center;padding:42px 20px;color:#7b828d;font-size:13px}.empty .icon{display:block;margin:0 auto 13px;width:29px;height:29px;color:#aab2c1}.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:18px}.search{max-width:360px;position:relative}.search input{padding-left:39px;background:#fff;min-width:240px}.search .icon{position:absolute;left:12px;top:11px;color:#9299a4}.pagination{display:flex;justify-content:flex-end;align-items:center;gap:12px;font-size:12px;padding:15px}.pagination button{padding:7px 12px}.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.plan-card{padding:24px;position:relative}.plan-card.featured{border:1px solid #4b70af;box-shadow:0 4px 20px #165d3010}.plan-card h2{font-size:21px;margin:16px 0}.plan-card .price{font-size:34px;font-weight:650;letter-spacing:-1px;margin:10px 0 6px}.plan-card .price small{font-size:12px;font-weight:400;letter-spacing:0}.plan-card ul{padding-left:18px;font-size:12px;line-height:2.3;color:#616873;margin:22px 0}.plan-card button{width:100%}.plan-card .badge{margin-bottom:8px}.notice{border:1px solid #e8ddba;border-radius:10px;background:#fffaf0;color:#866f34;padding:14px 18px;font-size:12px;line-height:1.6;margin-bottom:20px}.status-list{padding:0 22px 12px}.status-list div{display:flex;justify-content:space-between;font-size:12px;padding:14px 0;border-bottom:1px solid #edeef1}.status-list div:last-child{border:0}.login-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr}.login-aside{background:radial-gradient(ellipse at bottom right,#273e67,#10203b 70%);padding:50px 12%;color:white;display:flex;flex-direction:column;justify-content:space-between}.login-aside h1{font-size:48px;font-weight:600;letter-spacing:-2px;max-width:440px;line-height:1.1}.login-aside p{color:#a6b2c8;line-height:1.9;font-size:14px;max-width:380px}.login-aside footer{color:#8896ae;font-size:11px}.login-main{display:grid;place-items:center;padding:40px 25px;background:#fafbfc}.login-box{width:100%;max-width:370px}.login-box h2{font-size:27px}.login-box p{color:#757c87;font-size:13px;line-height:1.8}.login-box form{display:grid;gap:18px;margin:30px 0 22px}.login-box form button{width:100%;padding:14px}.login-switch{border-top:1px solid var(--line);padding-top:20px;font-size:12px}.error{color:#b33535;font-size:12px;line-height:1.6;white-space:pre-wrap}.loading{padding:100px;text-align:center;color:#546074}#toast{position:fixed;bottom:25px;right:25px;background:#17253d;color:white;border-radius:10px;padding:14px 20px;font-size:13px;z-index:100;box-shadow:0 5px 30px #0002;display:none;max-width:420px}dialog{border:1px solid var(--line);border-radius:16px;padding:27px;width:min(540px,94vw);box-shadow:0 20px 100px #0003;max-height:90vh;overflow:auto}dialog::backdrop{background:#102b23a8}#dialog-content{display:grid;gap:15px}#dialog-content h2{margin-bottom:0}.dialog-actions{display:flex;justify-content:flex-end;gap:9px;border-top:1px solid var(--line);margin-top:24px;padding-top:18px}.code{font-family:Consolas,monospace;background:#edf0f6;padding:12px;border-radius:7px;overflow-wrap:anywhere;font-size:14px;white-space:normal}.customer-card{padding:22px}.customer-card h2{margin-bottom:5px}.customer-card .code{margin:17px 0}.flex-between{display:flex;justify-content:space-between;gap:12px;align-items:center}.mobile-menu{display:none}.row-actions{display:flex;gap:5px}.footer-note{font-size:11px;color:#9399a2;text-align:center;padding-top:10px}.field-note{font-size:11px;font-weight:400;color:#858c98;line-height:1.6}.legal{max-width:760px;margin:60px auto;padding:25px;line-height:1.9}.legal h1{font-size:30px}.legal .brand{color:#12213b}.legal h2{margin-top:30px}@media(max-width:1150px){.metrics{grid-template-columns:repeat(2,1fr)}.dashboard-grid{grid-template-columns:1fr}.main{padding:25px}.topbar{padding:0 25px}.plans{grid-template-columns:1fr}}@media(max-width:760px){.shell{grid-template-columns:1fr}.sidebar{display:none;height:auto;position:fixed;z-index:20;width:238px;box-shadow:10px 0 100px #0004}.shell.menu-open .sidebar{display:flex;height:100vh}.mobile-menu{display:inline-block;padding:6px 10px}.main{padding:23px 16px}.topbar{padding:0 16px;height:66px}.topbar>span{display:none}.heading{align-items:flex-start;flex-direction:column}h1{font-size:26px}.welcome{padding:22px}.welcome .signal{display:none}.welcome h2{font-size:21px}.metrics{gap:10px}.metric{padding:16px}.metric strong{font-size:25px}.metric-head{font-size:11px}.metric small{font-size:10px}.login-page{grid-template-columns:1fr}.login-aside{padding:28px;min-height:230px}.login-aside h1{font-size:30px;margin-top:15px}.login-aside .brand{margin-bottom:0}.login-aside p,.login-aside footer{display:none}.login-main{padding:35px 24px}.toolbar{align-items:stretch;flex-direction:column}.search{max-width:none}.search input{min-width:0}.account{margin-left:auto}.heading-actions button{font-size:12px}.panel-head{padding:18px}.customer-card{padding:17px}#toast{left:16px;right:16px;bottom:16px}}\r\n\r\n.login-box fieldset{border:0;padding:0;margin:0;min-width:0}.login-box fieldset:disabled{opacity:.55}\r\n\r\n.customer-catalog{margin-top:40px}.period-catalog{margin:16px 0;border:1px solid var(--line);border-radius:16px;background:#fff;overflow:hidden}.period-catalog>summary{padding:22px 24px;cursor:pointer;display:flex;justify-content:space-between;gap:15px;background:#f8f9fb}.period-catalog>summary strong{font-size:18px}.period-catalog>summary span{font-size:12px;color:#616875}.period-catalog .plans{padding:20px}.period-catalog .plan-card{display:flex;flex-direction:column;padding:26px;background:#fff}.period-catalog h3{font-size:25px;margin:12px 0}.period-catalog .price{font-size:30px;line-height:1.3}.period-catalog .price small{display:block;margin-top:8px}.period-catalog .plan-card>a{display:block;margin-top:auto;border-radius:9px;background:#12213b;color:#fff;text-align:center;padding:12px;text-decoration:none;font-size:13px}.period-catalog .muted{line-height:1.8;font-size:12px;margin:20px 0}.license-secret{margin:18px 0;border:1px solid var(--line);border-radius:10px;padding:14px}.license-secret summary{cursor:pointer;color:#313f56;font-size:13px}.customer-card>.metrics{margin-top:22px}.customer-card>.metrics>article{background:#f3f5f8;border-radius:12px;padding:18px}.customer-card>.metrics span{font-size:12px;color:#616875}.customer-card>.metrics strong{display:block;font-size:27px;margin-top:8px}#corporate-form{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:24px 0}#corporate-price-result{grid-column:1/-1;padding:20px;background:#f0f3f7;border-radius:10px;line-height:1.7}.customer-card{padding:28px}.customer-card>p{line-height:1.8;color:#616875;font-size:13px}@media(max-width:760px){.period-catalog>summary{display:grid}.period-catalog .plans{padding:12px}.period-catalog .price{font-size:28px}#corporate-form{grid-template-columns:1fr}.customer-card{padding:20px}.toolbar{flex-wrap:wrap}.toolbar label{width:100%}}\r\n\r\n.license-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:stretch;margin-top:22px}.license-actions>a,.license-actions>button{display:flex;align-items:center;justify-content:center;padding:13px 18px;border-radius:10px;text-decoration:none;font-size:13px;line-height:1.5;min-height:48px}.license-actions>a{background:#edf0f4;color:#14233e;border:1px solid #cbd1dc}.support-card{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:30px;padding:26px;background:#f0f2f6;border:1px solid #d9dee6;border-radius:16px}.support-card h3{margin:10px 0}.support-card p{max-width:480px;font-size:13px;line-height:1.7;color:#616875}.support-actions{display:grid;gap:10px}.support-actions a{padding:10px 16px;background:white;border:1px solid #ced4de;border-radius:9px;text-decoration:none;font-size:13px}.customer-card>.metrics{grid-template-columns:repeat(3,minmax(0,1fr))}@media(max-width:760px){.license-actions{flex-direction:column}.license-actions>*{width:100%}.support-card{grid-template-columns:1fr;padding:20px}}\r\n\n/* AutoKyro responsive customer refresh */\n:root{--muted:#525a68;--line:#dce0e6}body{background:#f1f2f5}.main{max-width:1400px}.customer-card{box-shadow:0 6px 24px #163c2410}.customer-card .flex-between{flex-wrap:wrap}.customer-card h2{font-size:22px;line-height:1.35}.customer-card>.metrics>article{border:1px solid #dce1e9}.customer-card>.metrics strong{color:#142e5a}.field-note{color:#525a68}.heading p{overflow-wrap:anywhere}.official-catalog{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.official-catalog>.heading{grid-column:1/-1;margin:0}.official-catalog .period-catalog{margin:0;display:flex;flex-direction:column}.official-catalog .period-catalog>summary{display:block;list-style:none;pointer-events:none}.official-catalog summary span{display:block;margin-top:8px}.official-catalog .plans{display:block;padding:0;flex:1}.official-catalog .plan-card{border:0;border-radius:0;height:100%;padding:24px}.official-catalog h3{font-size:20px}.official-catalog .price{font-size:32px}.official-catalog .period-catalog:nth-of-type(3){border-color:#426298;box-shadow:0 5px 25px #185a2812}.customer-card p{overflow-wrap:anywhere}button,a{touch-action:manipulation}.license-actions>a{background:#142e5b;color:#fff}.toolbar label{min-width:0}.support-card{background:#eaedf3}@media(max-width:1100px){.shell{grid-template-columns:200px minmax(0,1fr)}.sidebar{padding:28px 14px}.main{padding:28px 22px}.official-catalog{gap:10px}.official-catalog .plan-card{padding:18px}.official-catalog .price{font-size:27px}}@media(max-width:850px){.official-catalog{grid-template-columns:1fr}.official-catalog .period-catalog{display:block}.shell{grid-template-columns:minmax(0,1fr)}.sidebar{display:none}.mobile-menu{display:inline-block}.shell.menu-open .sidebar{display:flex;position:fixed;z-index:20;height:100vh;width:238px}.support-card{grid-template-columns:1fr}}@media(max-width:480px){.main{padding:22px 12px}.customer-card{padding:18px 14px}.customer-card>.metrics{gap:6px}.customer-card>.metrics>article{padding:12px 8px}.customer-card>.metrics span{font-size:11px}.customer-card h2{font-size:19px}.topbar{padding:0 12px}.heading h1{font-size:30px}.flex-between{align-items:flex-start}.login-aside h1{font-size:34px}.customer-card>.metrics strong{font-size:24px}}\n\n.access-recovery{margin:18px 0}.access-recovery button{width:100%;white-space:normal;text-align:center}.login-box form>button+button{margin-top:8px}.login-box input{min-height:46px}\n\n.archived-plans{margin-top:28px;padding:20px;border:1px solid var(--line);border-radius:12px}.archived-plans>summary{cursor:pointer;font-weight:600}.archived-plans>.plans{margin-top:20px}\n\n.devices-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:24px}.devices-heading h2{margin:8px 0}.devices-heading p{margin:0;color:var(--muted);font-size:14px}.device-count{background:#eaeef4;color:#1f3965;border-radius:30px;padding:8px 12px;white-space:nowrap;font-size:12px}.device-empty{text-align:center;background:#f7f8fa;border:1px dashed #cad0db;border-radius:14px;padding:32px 24px}.device-empty>p{max-width:540px;margin:10px auto;line-height:1.7;color:var(--muted)}.device-symbol{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;background:#e4e8f0;color:#243b63}.device-symbol .icon{width:24px;height:24px}.activation-steps{list-style:none;display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin:26px 0 8px;padding:0;font-size:13px}.activation-steps b{display:inline-grid;place-items:center;background:#1c3663;color:#fff;width:24px;height:24px;border-radius:50%;margin-right:6px}.device-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}.device-card{border:1px solid #dce0e6;border-radius:14px;padding:20px}.device-card-top{display:flex;gap:12px;align-items:center}.device-card h3{font-size:15px;margin:0 0 6px}.device-card .badge{margin-left:auto}.device-card .muted{font-size:12px}.device-card dl{font-size:13px;margin:22px 0}.device-card dl>div{display:flex;justify-content:space-between;gap:12px;margin:12px 0}.device-card dt{color:var(--muted)}.device-card dd{margin:0}.device-card-actions{display:flex;gap:8px;flex-wrap:wrap}.device-search,.device-help{border-top:1px solid #e2e5ea;margin-top:22px;padding-top:18px}.device-search>summary,.device-help>summary{cursor:pointer;color:#2e3e5b;font-size:14px}.device-search .toolbar{margin-top:18px}.device-help p{font-size:13px;line-height:1.7;color:var(--muted)}#trial-invite-form textarea{width:100%;min-height:140px;padding:14px;border:1px solid #ccd1da;border-radius:10px;font:inherit;resize:vertical}#trial-results{margin-top:22px}@media(max-width:600px){.devices-heading{display:block}.device-count{display:inline-block;margin-top:14px}.device-empty{padding:24px 14px}.activation-steps{flex-direction:column;align-items:flex-start;text-align:left;gap:14px}.device-grid{grid-template-columns:1fr}.device-card{padding:16px}.device-card-top{flex-wrap:wrap}}\n\n:root{color:#172c4b;background:#f4f8ff;--green:#2563eb;--ink:#123b78;--muted:#60738f;--line:#dce6f5}body{background:#f4f8ff}a{color:#175ac6}button{background:#245ee4}button:hover{background:#174ac0}button.secondary{background:#edf4ff;color:#1e4d90}.sidebar{background:linear-gradient(165deg,#102c61,#0a1d42);color:#e2ebff}.brand{font-size:18px;letter-spacing:-.5px;gap:10px}.brand img{width:42px;height:42px;border-radius:12px}.brand small{font-size:9px;letter-spacing:2px;color:#b5ceff}.sidebar nav button.active{background:#234b86;box-shadow:inset 3px 0 #75b5ff}.sidebar nav button{color:#d2e2ff}.sidebar footer{border-color:#32517e;color:#bfd3f5}.nav-group{color:#a6c6fb}.topbar{background:#fff}.welcome{background:linear-gradient(115deg,#173e8d,#2866e5);box-shadow:0 12px 32px #164c9c12}.welcome p{color:#e0eaff}.welcome:after{border-color:#82b4ff}.welcome .signal{background:#ffffff14;border-color:#8abaff66}.signal i{background:#a6d5ff}.login-aside{background:linear-gradient(150deg,#102c61,#235edc)}.login-aside h1{letter-spacing:-1.6px}.login-aside p,.login-aside footer{color:#d5e4ff}.login-aside .eyebrow{color:#bed8ff}.login-main{background:#f4f8ff}.login-box{width:min(100%,440px)}.login-box h2{font-size:28px;letter-spacing:-.8px}.login-box form{margin-top:26px}.login-box input{border-color:#cfdcf0}.metric,.panel,.plan-card{box-shadow:0 4px 18px #183c7005}.customer-card{border-radius:18px}.customer-card h2{letter-spacing:-.5px}.customer-card>.metrics>article{background:#f0f6ff}.license-actions>a{background:#245ee4;color:#fff;border-color:#245ee4}.support-card{background:#eaf3ff;border-color:#d1e2fa}.device-empty{background:#f3f8ff;border-color:#bcd2f0}.device-count,.device-symbol{background:#e4efff;color:#1d55a0}.activation-steps b{background:#2864df}.badge.active,.badge.paid,.badge.processed,.badge.sent{background:#e7f0ff;color:#225bb9}.period-catalog>summary{background:#f1f6ff}.period-catalog .plan-card>a{background:#245ee4}.footer-note{color:#647c9d}.site-return{display:inline-flex;align-items:center;margin-top:18px;font-size:13px;color:#2c5da2}.login-aside .site-return{color:#e4efff}.account strong{overflow-wrap:anywhere}textarea{color:#172c4b;background:#fff}.customer-card .metrics article{min-width:0}@media(max-width:600px){.brand{font-size:17px}.topbar>span{font-size:11px}.login-aside h1{font-size:32px}.customer-card>.metrics>article{padding:12px}.customer-card>.metrics span{font-size:10px}.customer-card>.metrics strong{font-size:24px}}\n\n.official-catalog{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.official-catalog>.heading{grid-column:1/-1;margin-bottom:0}.official-catalog .period-catalog{margin:0}.official-catalog .plans{display:block}.official-catalog .plan-card{border:0;box-shadow:none;padding:6px}.official-catalog .plan-card>a{margin-top:12px}.official-catalog .period-catalog>summary{display:grid;gap:8px}.official-catalog .price{font-size:28px}@media(max-width:1000px){.official-catalog{grid-template-columns:1fr}}\n";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/types.ts
var ApiError = class extends Error {
  constructor(code, status = 400) {
    super(code);
    this.code = code;
    this.status = status;
  }
  code;
  status;
  static {
    __name(this, "ApiError");
  }
};
var iso = /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "iso");
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
__name(json, "json");
async function body(req) {
  if (Number(req.headers.get("Content-Length") ?? 0) > 16384)
    throw new ApiError("request_too_large", 413);
  const raw = await req.text();
  if (raw.length > 16384) throw new ApiError("request_too_large", 413);
  try {
    const value = JSON.parse(raw);
    if (!value || Array.isArray(value) || typeof value !== "object") throw 0;
    return value;
  } catch {
    throw new ApiError("invalid_input");
  }
}
__name(body, "body");
function text(value, max = 200) {
  if (typeof value !== "string" || !value.trim() || value.length > max)
    throw new ApiError("invalid_input");
  return value.trim();
}
__name(text, "text");
function email(value) {
  const v = text(value, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    throw new ApiError("invalid_email");
  return v;
}
__name(email, "email");
function device(value) {
  const v = text(value, 64);
  if (!/^[a-f0-9-]{36}$/i.test(v)) throw new ApiError("invalid_device");
  return v;
}
__name(device, "device");
function https(value) {
  const v = text(value, 2048);
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" || u.username || u.password) throw 0;
    return u.href;
  } catch {
    throw new ApiError("invalid_url");
  }
}
__name(https, "https");

// src/security/crypto.ts
var enc = new TextEncoder();
async function sha(value) {
  const bytes = typeof value === "string" ? enc.encode(value) : value;
  return hex(await crypto.subtle.digest("SHA-256", bytes));
}
__name(sha, "sha");
function hex(value) {
  return [...new Uint8Array(value)].map((v) => v.toString(16).padStart(2, "0")).join("");
}
__name(hex, "hex");
async function hmac(secret, value) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return hex(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new Uint8Array(typeof value === "string" ? enc.encode(value) : value).buffer
    )
  );
}
__name(hmac, "hmac");
async function equal(a, b) {
  const aa = await sha(a), bb = await sha(b);
  let different = 0;
  for (let i = 0; i < aa.length; i++)
    different |= aa.charCodeAt(i) ^ bb.charCodeAt(i);
  return different === 0;
}
__name(equal, "equal");
function token() {
  return [...crypto.getRandomValues(new Uint8Array(32))].map((v) => v.toString(16).padStart(2, "0")).join("");
}
__name(token, "token");
async function webhookSignature(raw, timestamp, signature, secret, now = Date.now()) {
  if (!secret || !timestamp || !/^\d{10,12}$/.test(timestamp) || !signature || Math.abs(now / 1e3 - Number(timestamp)) > 300)
    return false;
  const prefix = enc.encode(timestamp + "."), bytes = new Uint8Array(prefix.length + raw.byteLength);
  bytes.set(prefix);
  bytes.set(new Uint8Array(raw), prefix.length);
  const expected = "v1=" + await hmac(secret, bytes);
  for (const part of signature.split(",")) {
    if (part.trim().startsWith("v1=") && await equal(part.trim(), expected))
      return true;
  }
  return false;
}
__name(webhookSignature, "webhookSignature");
async function admin(req, env) {
  if (!env.ADMIN_API_SECRET || !await equal(
    req.headers.get("Authorization") ?? "",
    "Bearer " + env.ADMIN_API_SECRET
  ))
    throw new ApiError("unauthorized", 401);
}
__name(admin, "admin");
async function limit(env, key, max, seconds) {
  const keyHash = await sha(await hmac(env.AUTH_PEPPER, key)), window = Math.floor(Date.now() / 1e3 / seconds);
  const row = await env.DB.prepare(
    "INSERT INTO rate_limits(key_hash,window_at,count) VALUES(?,?,1) ON CONFLICT(key_hash) DO UPDATE SET count=CASE WHEN window_at=excluded.window_at THEN count+1 ELSE 1 END,window_at=excluded.window_at RETURNING count"
  ).bind(keyHash, window).first();
  if (!row || row.count > max) throw new ApiError("too_many_attempts", 429);
}
__name(limit, "limit");

// src/repositories/licenses.ts
async function product(env, id) {
  if (typeof id !== "string" || !/^[a-z0-9_-]{1,80}$/.test(id))
    throw new ApiError("invalid_product");
  const p = await env.DB.prepare(
    "SELECT id,name,provider_product_id,checkout_url,annual_checkout_url,trial_mode,trial_days,max_devices,offline_grace_hours,offers_json,enabled FROM products WHERE id=? AND enabled=1"
  ).bind(id).first();
  if (!p) throw new ApiError("product_unavailable", 404);
  return p;
}
__name(product, "product");
var columns = "id,user_id,product_id,plan,status,trial_started_at,trial_ends_at,subscription_started_at,subscription_ends_at,provider,provider_customer_id,provider_subscription_id,provider_updated_at,current_period,blocked,complimentary_starts_at,complimentary_ends_at,complimentary_reason,created_at,updated_at";
async function ensureLicense(env, userId, productId) {
  const now = iso();
  await env.DB.prepare(
    "INSERT INTO licenses(id,user_id,product_id,created_at,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(user_id,product_id) DO NOTHING"
  ).bind(crypto.randomUUID(), userId, productId, now, now).run();
  return await env.DB.prepare(
    `SELECT ${columns} FROM licenses WHERE user_id=? AND product_id=?`
  ).bind(userId, productId).first();
}
__name(ensureLicense, "ensureLicense");
async function session(req, env, p) {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) throw new ApiError("confirm_email", 401);
  const s = await env.DB.prepare(
    "SELECT user_id,product_id,device_id_hash,expires_at FROM sessions WHERE token_hash=? AND revoked_at IS NULL AND expires_at>?"
  ).bind(await sha(auth.slice(7)), iso()).first();
  if (!s || s.product_id !== p.id) throw new ApiError("confirm_email", 401);
  return s;
}
__name(session, "session");
async function register(env, l, s, p, name) {
  const now = iso();
  await env.DB.prepare(
    "INSERT INTO devices(id,license_id,device_id_hash,device_name,first_activation_at,last_check_at) SELECT ?,?,?,?,?,? WHERE (SELECT COUNT(id) FROM devices WHERE license_id=? AND revoked_at IS NULL) < ? ON CONFLICT(license_id,device_id_hash) DO NOTHING"
  ).bind(
    crypto.randomUUID(),
    l.id,
    s.device_id_hash,
    name,
    now,
    now,
    l.id,
    p.max_devices
  ).run();
  const d = await env.DB.prepare(
    "SELECT id,revoked_at FROM devices WHERE license_id=? AND device_id_hash=?"
  ).bind(l.id, s.device_id_hash).first();
  if (d?.revoked_at) throw new ApiError("device_revoked", 403);
  if (!d) throw new ApiError("device_limit", 409);
  await env.DB.prepare("UPDATE devices SET last_check_at=? WHERE id=?").bind(now, d.id).run();
  console.log(
    JSON.stringify({
      event: "device_registered",
      deviceId: d.id,
      productId: p.id
    })
  );
  return d.id;
}
__name(register, "register");
async function authorizedDevice(env, l, s) {
  const d = await env.DB.prepare(
    "SELECT id FROM devices WHERE license_id=? AND device_id_hash=? AND revoked_at IS NULL"
  ).bind(l.id, s.device_id_hash).first();
  if (!d) throw new ApiError("device_revoked", 403);
  await env.DB.prepare(
    "UPDATE devices SET last_check_at=? WHERE id=? AND revoked_at IS NULL"
  ).bind(iso(), d.id).run();
  return d;
}
__name(authorizedDevice, "authorizedDevice");
function grant(l, p, now = /* @__PURE__ */ new Date()) {
  let state = l.status, until = l.subscription_ends_at, plan = l.plan;
  if (l.blocked) {
    state = "blocked";
    until = now.toISOString();
  } else if (l.complimentary_starts_at && l.complimentary_ends_at && new Date(l.complimentary_starts_at) <= now && new Date(l.complimentary_ends_at) > now) {
    state = "active";
    until = l.complimentary_ends_at;
    plan = "complimentary";
  } else if (l.status === "trial") {
    until = l.trial_ends_at;
  }
  if (!until || new Date(until) <= now) {
    if (!["free", "blocked", "refunded", "past_due"].includes(state))
      state = "expired";
    until = now.toISOString();
  }
  const entitled = ["active", "trial", "grace", "canceled"].includes(state) && new Date(until) > now;
  return {
    licenseId: l.id,
    productId: p.id,
    plan,
    status: state,
    validUntil: until,
    serverTime: now.toISOString(),
    offlineUntil: new Date(
      Math.min(
        now.getTime() + p.offline_grace_hours * 36e5,
        entitled ? Date.parse(until) : now.getTime()
      )
    ).toISOString(),
    trialEndsAt: l.trial_ends_at,
    maxDevices: p.max_devices,
    trialDays: p.trial_days,
    trialMode: p.trial_mode
  };
}
__name(grant, "grant");
async function ensureUser(env, email2) {
  const now = iso();
  await env.DB.prepare(
    "INSERT INTO users(id,email,created_at,updated_at) VALUES(?,?,?,?) ON CONFLICT(email) DO NOTHING"
  ).bind(crypto.randomUUID(), email2, now, now).run();
  return (await env.DB.prepare("SELECT id FROM users WHERE email=?").bind(email2).first()).id;
}
__name(ensureUser, "ensureUser");

// src/routes/auth.ts
async function requestCode(req, env) {
  const b = await body(req), p = await product(env, b.productId), address = email(b.email), install = await sha(device(b.installationId));
  await limit(
    env,
    "otp-ip:" + (req.headers.get("CF-Connecting-IP") ?? "local"),
    15,
    3600
  );
  await limit(env, "otp-mail:" + address, 5, 3600);
  const id = crypto.randomUUID(), code = String(
    crypto.getRandomValues(new Uint32Array(1))[0] % 1e6
  ).padStart(6, "0");
  const local = env.ENVIRONMENT === "development" && env.MAIL_MODE === "local";
  if (!local && (!env.RESEND_API_KEY || !env.MAIL_FROM || env.MAIL_MODE !== "resend"))
    throw new ApiError("email_unavailable", 503);
  await env.DB.prepare(
    "INSERT INTO auth_challenges(id,email,product_id,device_id_hash,code_hash,expires_at,created_at,dev_code) VALUES(?,?,?,?,?,?,?,?)"
  ).bind(
    id,
    address,
    p.id,
    install,
    await hmac(env.AUTH_PEPPER, id + ":" + code),
    new Date(Date.now() + 6e5).toISOString(),
    iso(),
    local ? code : null
  ).run();
  if (!local) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        reply_to: env.MAIL_REPLY_TO,
        to: [address],
        subject: "Seu código de acesso ao " + String(p.name).replace(/autokyro/gi,"Automatize Fácil"),
        text: "Seu c\xF3digo \xE9 " + code + ". Ele vale por 10 minutos. Se voc\xEA n\xE3o solicitou, ignore esta mensagem."
      })
    });
    if (!response.ok) {
      await env.DB.prepare("DELETE FROM auth_challenges WHERE id=?").bind(id).run();
      throw new ApiError("email_unavailable", 503);
    }
  }
  return json({
    challengeId: id,
    message: "Confira seu e-mail para continuar."
  });
}
__name(requestCode, "requestCode");
async function verifyCode(req, env) {
  const b = await body(req), p = await product(env, b.productId), id = text(b.challengeId, 80), code = text(b.code, 6), install = await sha(device(b.installationId));
  if (!/^\d{6}$/.test(code)) throw new ApiError("invalid_code");
  await limit(
    env,
    "verify-ip:" + (req.headers.get("CF-Connecting-IP") ?? "local"),
    40,
    3600
  );
  const candidate = await env.DB.prepare(
    "SELECT id FROM auth_challenges WHERE id=? AND product_id=? AND device_id_hash=? AND expires_at>? AND used_at IS NULL AND attempts<5"
  ).bind(id, p.id, install, iso()).first();
  if (!candidate) throw new ApiError("invalid_code", 401);
  const codeHash = await hmac(env.AUTH_PEPPER, id + ":" + code);
  await env.DB.prepare(
    "UPDATE auth_challenges SET attempts=attempts+1 WHERE id=?"
  ).bind(id).run();
  const used = await env.DB.prepare(
    "UPDATE auth_challenges SET used_at=?,dev_code=NULL WHERE id=? AND code_hash=? AND attempts<=5 AND used_at IS NULL AND expires_at>? RETURNING email"
  ).bind(iso(), id, codeHash, iso()).first();
  if (!used) throw new ApiError("invalid_code", 401);
  const userId = await ensureUser(env, used.email), secret = token(), days = Math.min(90, Math.max(1, Number(env.SESSION_DAYS ?? 30)));
  await env.DB.prepare(
    "INSERT INTO sessions(token_hash,user_id,product_id,device_id_hash,expires_at,created_at) VALUES(?,?,?,?,?,?)"
  ).bind(
    await sha(secret),
    userId,
    p.id,
    install,
    new Date(Date.now() + days * 864e5).toISOString(),
    iso()
  ).run();
  return json({
    token: secret,
    email: used.email,
    expiresAt: new Date(Date.now() + days * 864e5).toISOString()
  });
}
__name(verifyCode, "verifyCode");

// src/routes/license.ts
async function licensing(req, env, action) {
  const b = await body(req), p = await product(env, b.productId), s = await session(req, env, p);
  await limit(env, "license:" + s.user_id + ":" + p.id, 120, 3600);
  let l = await ensureLicense(env, s.user_id, p.id);
  if (action === "activate" || action === "register" || action === "trial")
    await register(
      env,
      l,
      s,
      p,
      typeof b.deviceName === "string" ? b.deviceName.slice(0, 80) : "Meu Android"
    );
  else await authorizedDevice(env, l, s);
  if (action === "trial" && p.trial_mode === "central" && p.trial_days > 0 && !l.trial_started_at && !l.subscription_started_at && !l.blocked && l.status !== "refunded") {
    const start = iso(), end = new Date(Date.now() + p.trial_days * 864e5).toISOString();
    await env.DB.prepare(
      "UPDATE licenses SET trial_started_at=?,trial_ends_at=?,status='trial',plan='trial',updated_at=? WHERE id=? AND trial_started_at IS NULL AND subscription_started_at IS NULL AND blocked=0 AND status!='refunded'"
    ).bind(start, end, start, l.id).run();
    l = await ensureLicense(env, s.user_id, p.id);
  }
  return json({ license: grant(l, p) });
}
__name(licensing, "licensing");
async function release(req, env) {
  const u = new URL(req.url), p = await product(env, u.searchParams.get("productId"));
  const r = await env.DB.prepare(
    "SELECT version_name AS versionName,version_code AS versionCode,download_url AS downloadUrl,mandatory,minimum_supported_version AS minimumSupportedVersion,release_notes AS releaseNotes,sha256,published_at AS publishedAt FROM app_releases WHERE product_id=? ORDER BY version_code DESC LIMIT 1"
  ).bind(p.id).first();
  return json({ productId: p.id, release: r, serverTime: iso() });
}
__name(release, "release");

// src/routes/admin.ts
async function administration(req, env, path) {
  await admin(req, env);
  if (path === "/api/v1/admin/dev/mail" && env.ENVIRONMENT === "development" && env.MAIL_MODE === "local") {
    const address2 = email(new URL(req.url).searchParams.get("email"));
    const row = await env.DB.prepare(
      "SELECT id AS challengeId,dev_code AS code FROM auth_challenges WHERE email=? AND used_at IS NULL ORDER BY created_at DESC LIMIT 1"
    ).bind(address2).first();
    return json(row ?? {});
  }
  if (req.method !== "POST") throw new ApiError("method_not_allowed", 405);
  const b = await body(req);
  if (path === "/api/v1/admin/product") {
    const id = text(b.productId, 80);
    if (!/^[a-z0-9_-]+$/.test(id)) throw new ApiError("invalid_product");
    const mode = b.trialMode ?? "central";
    if (!["central", "provider", "disabled"].includes(String(mode)))
      throw new ApiError("invalid_input");
    const days = Number(b.trialDays ?? 7), devices = Number(b.maxDevices ?? 2), hours = Number(b.offlineGraceHours ?? 72);
    if (!Number.isInteger(days) || days < 0 || days > 365 || !Number.isInteger(devices) || devices < 1 || devices > 20 || !Number.isInteger(hours) || hours < 1 || hours > 168)
      throw new ApiError("invalid_input");
    const offers = b.offers ?? {};
    if (offers === null || typeof offers !== "object" || Array.isArray(offers) || Object.values(offers).some((v) => !["monthly", "annual"].includes(v)))
      throw new ApiError("invalid_input");
    await env.DB.prepare(
      "INSERT INTO products(id,name,provider_product_id,checkout_url,annual_checkout_url,trial_mode,trial_days,max_devices,offline_grace_hours,offers_json) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,provider_product_id=excluded.provider_product_id,checkout_url=excluded.checkout_url,annual_checkout_url=excluded.annual_checkout_url,trial_mode=excluded.trial_mode,trial_days=excluded.trial_days,max_devices=excluded.max_devices,offline_grace_hours=excluded.offline_grace_hours,offers_json=excluded.offers_json"
    ).bind(
      id,
      text(b.name),
      b.providerProductId ? text(b.providerProductId) : null,
      b.checkoutUrl ? https(b.checkoutUrl) : "",
      b.annualCheckoutUrl ? https(b.annualCheckoutUrl) : "",
      String(mode),
      days,
      devices,
      hours,
      JSON.stringify(offers)
    ).run();
    return json({ ok: true });
  }
  const p = await product(env, b.productId);
  if (path === "/api/v1/admin/release") {
    const version = Number(b.versionCode), minimum = Number(b.minimumSupportedVersion ?? 1);
    if (!Number.isInteger(version) || version < 1 || !Number.isInteger(minimum) || minimum < 1 || minimum > version)
      throw new ApiError("invalid_input");
    const hash = b.sha256 ? text(b.sha256, 64) : null;
    if (hash && !/^[a-f0-9]{64}$/.test(hash))
      throw new ApiError("invalid_input");
    await env.DB.prepare(
      "INSERT INTO app_releases(id,product_id,version_name,version_code,download_url,mandatory,minimum_supported_version,release_notes,sha256,published_at) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(product_id,version_code) DO UPDATE SET download_url=excluded.download_url,mandatory=excluded.mandatory,minimum_supported_version=excluded.minimum_supported_version,release_notes=excluded.release_notes,sha256=excluded.sha256"
    ).bind(
      crypto.randomUUID(),
      p.id,
      text(b.versionName, 32),
      version,
      https(b.downloadUrl),
      b.mandatory === true ? 1 : 0,
      minimum,
      typeof b.releaseNotes === "string" ? b.releaseNotes.slice(0, 4e3) : "",
      hash,
      iso()
    ).run();
    return json({ ok: true });
  }
  if (path === "/api/v1/admin/events/retry") {
    const id = text(b.eventId), row = await env.DB.prepare(
      "SELECT normalized_json,status FROM webhook_events WHERE id=?"
    ).bind(id).first();
    if (!row || JSON.parse(row.normalized_json).productId !== p.provider_product_id)
      throw new ApiError("not_found", 404);
    if (row.status !== "failed") throw new ApiError("event_not_failed", 409);
    await env.DB.batch([
      env.DB.prepare(
        "UPDATE webhook_events SET status='pending',attempts=0,locked_until=NULL,error_code=NULL WHERE id=? AND status='failed'"
      ).bind(id),
      env.DB.prepare(
        "INSERT INTO admin_audit(id,action,entity_id,created_at) VALUES(?,?,?,?)"
      ).bind(crypto.randomUUID(), path, id, iso())
    ]);
    return json({ ok: true });
  }
  const address = email(b.email), userId = await ensureUser(env, address), l = await ensureLicense(env, userId, p.id);
  if (path === "/api/v1/admin/license/find") {
    const devices = await env.DB.prepare(
      "SELECT id,device_name,first_activation_at,last_check_at,revoked_at FROM devices WHERE license_id=?"
    ).bind(l.id).all();
    return json({ license: l, devices: devices.results });
  }
  if (path === "/api/v1/admin/device/revoke") {
    await env.DB.prepare(
      "UPDATE devices SET revoked_at=? WHERE id=? AND license_id=?"
    ).bind(iso(), text(b.deviceId), l.id).run();
  } else if (path === "/api/v1/admin/license/block") {
    await env.DB.prepare(
      "UPDATE licenses SET blocked=?,updated_at=? WHERE id=?"
    ).bind(b.blocked === false ? 0 : 1, iso(), l.id).run();
  } else if (path === "/api/v1/admin/license/complimentary") {
    const start = new Date(text(b.startsAt)), end = new Date(text(b.endsAt));
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start || end.getTime() - start.getTime() > 366 * 864e5)
      throw new ApiError("invalid_input");
    await env.DB.prepare(
      "UPDATE licenses SET complimentary_starts_at=?,complimentary_ends_at=?,complimentary_reason=?,updated_at=? WHERE id=?"
    ).bind(
      start.toISOString(),
      end.toISOString(),
      text(b.reason, 500),
      iso(),
      l.id
    ).run();
  } else throw new ApiError("not_found", 404);
  await env.DB.prepare(
    "INSERT INTO admin_audit(id,action,entity_id,created_at) VALUES(?,?,?,?)"
  ).bind(crypto.randomUUID(), path, l.id, iso()).run();
  return json({ ok: true });
}
__name(administration, "administration");

// src/cakto/events.ts
var events = /* @__PURE__ */ new Set([
  "purchase_approved",
  "purchase_refused",
  "subscription_created",
  "subscription_renewed",
  "subscription_canceled",
  "subscription_renewal_refused",
  "subscription_paused",
  "subscription_resumed",
  "subscription_late",
  "subscription_late_recovered",
  "refund",
  "chargeback"
]);
function normalize(event, row) {
  const c = row.customer, p = row.product, s = row.subscription, o = row.offer;
  if (typeof row.id !== "string" || !c || typeof p?.id !== "string" || !s || typeof s.id !== "string")
    throw new ApiError("provider_contract_changed", 422);
  const dates = [
    "chargedbackAt",
    "refundedAt",
    "canceledAt",
    "paidAt",
    "createdAt"
  ];
  const stamp = dates.map((k) => row[k]).find((v) => typeof v === "string" && Number.isFinite(Date.parse(v)));
  if (!stamp) throw new ApiError("provider_contract_changed", 422);
  return {
    event,
    orderId: row.id,
    productId: p.id,
    offerId: typeof o?.id === "string" ? o.id : null,
    email: email(c.email),
    customerId: String(c.id ?? ""),
    subscriptionId: s.id,
    period: typeof row.subscription_period === "number" ? row.subscription_period : 0,
    paidAt: typeof row.paidAt === "string" ? row.paidAt : null,
    effectiveAt: new Date(stamp).toISOString(),
    status: String(row.status ?? "")
  };
}
__name(normalize, "normalize");
function mapSubscription(e, s, p, old, now = /* @__PURE__ */ new Date()) {
  if (s.id !== e.subscriptionId || s.product !== p.provider_product_id)
    throw new ApiError("product_mismatch", 422);
  const state = String(s.status), updated = typeof s.updatedAt === "string" && Number.isFinite(Date.parse(s.updatedAt)) ? new Date(s.updatedAt).toISOString() : e.effectiveAt;
  const next = typeof s.next_payment_date === "string" && Number.isFinite(Date.parse(s.next_payment_date)) ? new Date(s.next_payment_date).toISOString() : null;
  const offers = JSON.parse(p.offers_json), plan = e.offerId && offers[e.offerId] || "monthly";
  const trial = state === "trial";
  let until = next ?? old.subscription_ends_at, status = "expired";
  if (e.event === "refund" || e.event === "chargeback")
    return {
      status: e.event === "refund" ? "refunded" : "blocked",
      until: now.toISOString(),
      updated,
      plan
    };
  if (p.trial_mode === "central" && old.status === "trial" && old.trial_ends_at && Date.parse(old.trial_ends_at) > now.getTime() && !(state === "active" && Number(s.paid_payments_quantity) > 0))
    return {
      status: "trial",
      until: old.trial_ends_at,
      updated,
      plan: "trial"
    };
  if (trial) {
    if (p.trial_mode !== "provider")
      return {
        status: old.status,
        until: old.status === "trial" ? old.trial_ends_at : old.subscription_ends_at,
        updated,
        plan: old.plan
      };
    const days = Number(s.trial_days), created = typeof s.createdAt === "string" ? Date.parse(s.createdAt) : NaN;
    if (!Number.isInteger(days) || days <= 0 || !Number.isFinite(created))
      throw new ApiError("provider_contract_changed", 422);
    until = new Date(
      created + Math.min(days, p.trial_days) * 864e5
    ).toISOString();
    if (old.trial_ends_at && old.trial_ends_at < until)
      until = old.trial_ends_at;
    status = "trial";
  } else if (state === "active") {
    if (!until && e.paidAt && Number(s.recurrence_period) > 0 && Number(s.paid_payments_quantity) > 0)
      until = new Date(
        Date.parse(e.paidAt) + Number(s.recurrence_period) * 864e5
      ).toISOString();
    if (!until || Number(s.paid_payments_quantity) < 1)
      throw new ApiError("period_not_confirmed", 422);
    status = "active";
  } else if (state === "canceled") {
    status = "canceled";
    until = old.subscription_ends_at ?? next;
  } else if (state === "late" || e.event === "subscription_renewal_refused") {
    status = old.subscription_ends_at && Date.parse(old.subscription_ends_at) > now.getTime() ? "grace" : "past_due";
    until = old.subscription_ends_at;
  } else if (state === "paused") {
    status = "blocked";
    until = now.toISOString();
  } else if (!["expired", "inactive"].includes(state))
    throw new ApiError("provider_contract_changed", 422);
  return { status, until: until ?? now.toISOString(), updated, plan };
}
__name(mapSubscription, "mapSubscription");

// src/cakto/client.ts
var cached = null;
async function subscription(env, id) {
  if (!env.CAKTO_CLIENT_ID || !env.CAKTO_CLIENT_SECRET)
    throw new ApiError("provider_not_configured", 503);
  if (!cached || cached.id !== env.CAKTO_CLIENT_ID || cached.until < Date.now()) {
    const r2 = await fetch("https://api.cakto.com.br/public_api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.CAKTO_CLIENT_ID,
        client_secret: env.CAKTO_CLIENT_SECRET
      }),
      signal: AbortSignal.timeout(1e4)
    });
    if (!r2.ok) throw new ApiError("provider_unavailable", 503);
    const t = await r2.json();
    if (!t.access_token || !Number.isFinite(t.expires_in))
      throw new ApiError("provider_contract_changed", 503);
    cached = {
      id: env.CAKTO_CLIENT_ID,
      token: t.access_token,
      until: Date.now() + Math.max(0, t.expires_in - 60) * 1e3
    };
  }
  const r = await fetch(
    "https://api.cakto.com.br/public_api/subscriptions/" + encodeURIComponent(id) + "/",
    {
      headers: { Authorization: "Bearer " + cached.token },
      signal: AbortSignal.timeout(1e4)
    }
  );
  if (r.status === 401) cached = null;
  if (!r.ok) throw new ApiError("provider_unavailable", 503);
  return await r.json();
}
__name(subscription, "subscription");

// src/cakto/webhook.ts
async function receiveWebhook(req, env, ctx) {
  if (env.ENVIRONMENT !== "production" && env.ALLOW_DEV_WEBHOOKS !== "true")
    return json({ received: true, ignored: true });
  if (!req.headers.get("Content-Type")?.includes("application/json"))
    throw new ApiError("invalid_content_type", 415);
  const reader = req.body?.getReader();
  if (!reader) throw new ApiError("invalid_payload");
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 131072) {
      await reader.cancel();
      throw new ApiError("request_too_large", 413);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let at = 0;
  for (const c of chunks) {
    bytes.set(c, at);
    at += c.length;
  }
  if (!await webhookSignature(
    bytes.buffer,
    req.headers.get("X-Cakto-Timestamp"),
    req.headers.get("X-Cakto-Signature"),
    env.CAKTO_WEBHOOK_SECRET
  )) {
    console.warn(
      JSON.stringify({ event: "webhook_rejected", code: "invalid_signature" })
    );
    throw new ApiError("invalid_signature", 401);
  }
  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new ApiError("invalid_payload");
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new ApiError("invalid_payload");
  if (typeof payload.event !== "string") throw new ApiError("invalid_payload");
  if (!events.has(payload.event))
    return json({ received: true, ignored: true });
  const rows = Array.isArray(payload.data) ? payload.data : [payload.data];
  if (rows.length > 10) throw new ApiError("too_many_events", 413);
  let accepted = 0;
  for (const row of rows) {
    if (!row || typeof row !== "object") throw new ApiError("invalid_payload");
    const providerProductId = row.product?.id;
    const p = await env.DB.prepare(
      "SELECT id FROM products WHERE provider_product_id=? AND enabled=1"
    ).bind(typeof providerProductId === "string" ? providerProductId : "").first();
    if (!p) continue;
    const event = normalize(payload.event, row), normalized = JSON.stringify(event), key = await sha(normalized), rawHash = await sha(bytes.buffer);
    await env.DB.prepare(
      "INSERT INTO webhook_events(id,provider,provider_event_id,event_type,payload_hash,received_at,status,normalized_json) VALUES(?,'cakto',?,?,?,?,'pending',?) ON CONFLICT(provider,provider_event_id) DO NOTHING"
    ).bind(crypto.randomUUID(), key, event.event, rawHash, iso(), normalized).run();
    accepted++;
  }
  console.log(
    JSON.stringify({
      event: "webhook_validated",
      type: payload.event,
      accepted
    })
  );
  ctx.waitUntil(processPending(env, 1));
  return json({ received: true, accepted }, 202);
}
__name(receiveWebhook, "receiveWebhook");
async function processPending(env, count = 4) {
  const now = iso();
  const pending = await env.DB.prepare(
    "SELECT id FROM webhook_events WHERE ((status IN ('pending','failed') AND attempts<5) OR status='processing') AND (locked_until IS NULL OR locked_until<?) ORDER BY received_at LIMIT ?"
  ).bind(now, Math.max(1, Math.min(4, count))).all();
  for (const { id } of pending.results) {
    const row = await env.DB.prepare(
      "UPDATE webhook_events SET status='processing',attempts=attempts+1,locked_until=? WHERE id=? AND status!='processed' AND status!='ignored' AND (locked_until IS NULL OR locked_until<?) RETURNING normalized_json,attempts"
    ).bind(new Date(Date.now() + 6e4).toISOString(), id, iso()).first();
    if (!row) continue;
    try {
      const e = JSON.parse(row.normalized_json);
      const p = await env.DB.prepare(
        "SELECT id,name,provider_product_id,checkout_url,annual_checkout_url,trial_mode,trial_days,max_devices,offline_grace_hours,offers_json,enabled FROM products WHERE provider_product_id=? AND enabled=1"
      ).bind(e.productId).first();
      if (!p) throw new ApiError("product_unavailable", 422);
      const userId = await ensureUser(env, e.email), l = await ensureLicense(env, userId, p.id);
      if (l.provider_subscription_id && l.provider_subscription_id !== e.subscriptionId && l.subscription_ends_at && Date.parse(l.subscription_ends_at) > Date.now())
        throw new ApiError("subscription_conflict", 422);
      if (["refund", "chargeback"].includes(e.event) && e.period > 0 && e.period < l.current_period) {
        await env.DB.prepare(
          "UPDATE webhook_events SET status='ignored',processed_at=?,locked_until=NULL WHERE id=?"
        ).bind(iso(), id).run();
        continue;
      }
      const s = await subscription(env, e.subscriptionId), mapped = mapSubscription(e, s, p, l);
      const terminal = ["refund", "chargeback"].includes(e.event), priority = terminal ? 100 : mapped.status === "canceled" ? 60 : ["past_due", "grace", "blocked"].includes(mapped.status) ? 50 : 10;
      const cursor = terminal && e.effectiveAt > mapped.updated ? e.effectiveAt : mapped.updated;
      const trialStart = mapped.status === "trial" ? l.trial_started_at ?? String(s.createdAt) : l.trial_started_at;
      const trialEnd = mapped.status === "trial" ? mapped.until : l.trial_ends_at;
      const applied = await env.DB.batch([
        env.DB.prepare(
          "UPDATE licenses SET plan=?,status=?,trial_started_at=?,trial_ends_at=?,subscription_started_at=COALESCE(subscription_started_at,?),subscription_ends_at=?,provider='cakto',provider_customer_id=?,provider_subscription_id=?,provider_updated_at=?,provider_event_priority=?,current_period=MAX(current_period,?),updated_at=? WHERE id=? AND (provider_updated_at IS NULL OR provider_updated_at<? OR (provider_updated_at=? AND provider_event_priority<=?))"
        ).bind(
          mapped.plan,
          mapped.status,
          trialStart,
          trialEnd,
          mapped.status !== "trial" && Number(s.paid_payments_quantity) > 0 ? iso() : null,
          mapped.status === "trial" ? l.subscription_ends_at : mapped.until,
          e.customerId,
          e.subscriptionId,
          cursor,
          priority,
          e.period,
          iso(),
          l.id,
          cursor,
          cursor,
          priority
        ),
        env.DB.prepare(
          "UPDATE webhook_events SET status='processed',processed_at=?,locked_until=NULL,error_code=NULL WHERE id=?"
        ).bind(iso(), id)
      ]);
      console.log(
        JSON.stringify({
          event: (applied[0]?.meta.changes ?? 0) > 0 ? "license_updated" : "license_event_ignored",
          eventId: id
        })
      );
    } catch (error) {
      const code = error instanceof ApiError ? error.code : "processing_failed";
      await env.DB.prepare(
        "UPDATE webhook_events SET status='failed',locked_until=?,error_code=? WHERE id=?"
      ).bind(
        new Date(
          Date.now() + Math.min(3600, 60 * row.attempts) * 1e3
        ).toISOString(),
        code,
        id
      ).run();
      console.warn(
        JSON.stringify({ event: "webhook_retry", eventId: id, code })
      );
    }
  }
}
__name(processPending, "processPending");

// src/cloud/security.ts
async function session2(req, env, admin2 = false) {
  const bearer = req.headers.get("Authorization")?.replace(/^Bearer /, "");
  const cookies = req.headers.get("Cookie")?.split(";").map((x) => x.trim()) ?? [];
  const name = admin2 ? "autokyro_admin_session=" : "autokyro_session=";
  const cookie2 = cookies.find(x => x.startsWith(name))?.slice(name.length) ?? (admin2 ? cookies.find(x => x.startsWith("autokyro_session="))?.slice(17) : undefined);
  const secret = bearer || cookie2;
  if (!secret || !/^[a-f0-9]{64}$/.test(secret)) throw new ApiError("unauthorized", 401);
  const s = await env.DB.prepare("SELECT token_hash,customer_id,role,scope_license_id,scope_installation_hash,admin_email FROM cloud_sessions WHERE token_hash=? AND expires_at>?").bind(await sha(secret), iso()).first();
  if (!s || admin2 && !["admin", "support"].includes(s.role)) throw new ApiError("unauthorized", 401);
  if (!admin2 && s.role !== "customer") throw new ApiError("forbidden", 403);
  if (!["GET", "HEAD"].includes(req.method) && cookie2 && !bearer) {
    const origin = req.headers.get("Origin");
    if (!origin || ![new URL(req.url).origin, env.PANEL_ORIGIN].includes(origin)) throw new ApiError("invalid_origin", 403);
  }
  return s;
}
__name(session2, "session");
function owner(s) {
  if (s.role !== "admin") throw new ApiError("forbidden", 403);
}
__name(owner, "owner");
async function issue(env, customer2, role, scope) {
  const secret = token();
  const hours = scope ? 24 * 370 : role === "customer" ? 24 * 30 : 8;
  await env.DB.prepare("INSERT INTO cloud_sessions(token_hash,customer_id,role,expires_at,created_at,scope_license_id,scope_installation_hash,admin_email) VALUES(?,?,?,?,?,?,?,?)").bind(await sha(secret), customer2, role, new Date(Date.now() + hours * 36e5).toISOString(), iso(), scope?.licenseId ?? null, scope?.installation ?? null, role === "admin" ? "rignis1212@gmail.com" : null).run();
  return secret;
}
__name(issue, "issue");
function cookie(secret, clear = false) {
  return `autokyro_session=${secret}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${clear ? 0 : 28800}`;
}
__name(cookie, "cookie");
function adminCookie(secret, clear = false) { return cookie(secret, clear).replace("autokyro_session=", "autokyro_admin_session="); }
async function passwordMatches(env, password, expected) {
  return !!expected && /^[a-f0-9]{64}$/.test(expected) && await equal(await hmac(env.AUTH_PEPPER, "admin-password:" + password), expected);
}
__name(passwordMatches, "passwordMatches");
async function seal(env, value, decrypt = false) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(env.AUTH_PEPPER + ":license-encryption:v2"));
  const key = await crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt", "decrypt"]);
  if (decrypt) {
    const bytes = Uint8Array.from(atob(value), (x) => x.charCodeAt(0));
    return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes.slice(0, 12) }, key, bytes.slice(12)));
  }
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(value)));
  return btoa(String.fromCharCode(...iv, ...data));
}
__name(seal, "seal");
async function audit(env, actor, action, entity, detail = {}) {
  await env.DB.prepare("INSERT INTO cloud_audit VALUES(?,?,?,?,?,?)").bind(crypto.randomUUID(), actor, action, entity, JSON.stringify(detail), iso()).run();
}
__name(audit, "audit");
async function customer(env, address, name = "") {
  const now = iso();
  await env.DB.prepare("INSERT INTO cloud_customers(id,email,name,created_at,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(email) DO NOTHING").bind(crypto.randomUUID(), address, name, now, now).run();
  return await env.DB.prepare("SELECT * FROM cloud_customers WHERE email=?").bind(address).first();
}
__name(customer, "customer");
async function newLicense(env, customerId, plan, subscriptionId = null) {
  const p = await env.DB.prepare("SELECT COALESCE(device_limit,max_devices) AS max_devices FROM cloud_plans WHERE id=?").bind(plan).first();
  if (!p) throw new ApiError("invalid_plan");
  const code = "AUTK-" + token().slice(0, 32).toUpperCase().match(/.{1,4}/g).join("-");
  const id = crypto.randomUUID(), now = iso();
  await env.DB.prepare("INSERT INTO cloud_licenses(id,customer_id,plan_id,code_hash,code_encrypted,max_devices,provider_subscription_id,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(provider_subscription_id) DO NOTHING").bind(id, customerId, plan, await hmac(env.AUTH_PEPPER, code), await seal(env, code), p.max_devices, subscriptionId, now, now).run();
  return subscriptionId ? (await env.DB.prepare("SELECT id FROM cloud_licenses WHERE provider_subscription_id=?").bind(subscriptionId).first()).id : id;
}
__name(newLicense, "newLicense");

// src/cloud/email.ts
var esc = /* @__PURE__ */ __name((value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]), "esc");
var frame = (title, content) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#eef4ff;color:#172c4b;font-family:Arial,sans-serif;line-height:1.65"><div style="max-width:600px;margin:24px auto;padding:28px;background:#fff;border:1px solid #dce6f5;border-radius:20px"><p><img src="https://solomonstores.shop/assets/img/automatize-facil-icon.png" width="48" height="48" alt="Automatize Fácil" style="vertical-align:middle;border:0"><strong style="margin-left:12px;color:#173e83;font-size:20px">Automatize Fácil</strong></p><h1 style="font-size:25px;line-height:1.3;color:#173e83">${esc(title)}</h1>${content}<hr style="border:0;border-top:1px solid #dce6f5;margin:28px 0"><p style="font-size:13px;line-height:1.7;color:#60738f">Solomon Stores · Automatize Fácil<br><a href="mailto:solomonstores.shop@gmail.com">solomonstores.shop@gmail.com</a><br><a href="https://wa.me/5511958749421">Suporte no WhatsApp</a> · <a href="https://solomonstores.shop/suporte/">Instalação e ajuda</a></p></div></body></html>`;
function otpHtml(code) {
 return frame("Confirme seu e-mail",`<p>Use o código abaixo no aplicativo ou na central para confirmar seu acesso ao Automatize Fácil.</p><p style="font-size:34px;font-weight:bold;letter-spacing:7px;background:#edf4ff;border-radius:12px;padding:20px;text-align:center;color:#173e83">${esc(code)}</p><p><strong>Válido por 10 minutos e para um único uso.</strong> Este código confirma seu e-mail; sua licença de ativação é enviada separadamente.</p><p>Se você não solicitou este acesso, ignore a mensagem. Nunca compartilhe o código.</p>`);
}
function licenseHtml(data) {
 const validity=data.permanent?"Permanente":data.pendingTrial?`Os ${data.trialDays} dias começam na primeira ativação.`:new Intl.DateTimeFormat("pt-BR",{dateStyle:"long",timeStyle:"short",timeZone:"America/Sao_Paulo"}).format(new Date(String(data.validUntil)))+" (horário de Brasília)";
 const period=data.permanent?"Sem renovação e sem cobrança":`${data.trialDays||data.periodDays} dias`;
 return frame(data.trialDays?"Seu teste está preparado":"Seu acesso está disponível",`<p>Seu acesso ao Automatize Fácil está preparado. Comece pela central usando o mesmo e-mail que recebeu esta mensagem.</p><div style="padding:20px;background:#edf4ff;border-radius:14px"><p style="margin:0"><strong>${esc(String(data.name).replace(/autokyro/gi,"Automatize Fácil"))}</strong></p><p style="margin:8px 0">${esc(data.devices)} ${data.devices===1?"celular Android":"celulares Android"} · ${esc(period)}</p><p style="margin:0;font-size:13px"><strong>Validade:</strong> ${esc(validity)}</p></div><h2 style="font-size:18px">Sua licença de ativação</h2><p style="font-family:monospace;font-size:16px;overflow-wrap:anywhere;background:#f3f7fd;border:1px solid #dce6f5;border-radius:10px;padding:16px">${esc(data.code)}</p><p>Guarde sua licença. Ela é diferente do código temporário de seis dígitos usado para confirmar seu e-mail.</p><h2 style="font-size:18px">Instale e ative em poucos passos</h2><ol style="padding-left:22px;line-height:1.8"><li><a href="${esc(data.portal)}/cliente">Abra a central do cliente</a> e informe o e-mail desta mensagem.</li><li>Solicite o código temporário, confira sua caixa de entrada ou spam e confirme o acesso.</li><li>Na sua assinatura, toque em <strong>Baixar aplicativo Android</strong>.</li><li>Abra o arquivo APK baixado e toque em <strong>Instalar</strong>. Se o Android pedir autorização para instalar por esse navegador, confira que o arquivo veio da central oficial.</li><li>Abra o <strong>Automatize Fácil → Minha assinatura</strong>. Confirme seu e-mail no aplicativo e informe a licença acima.</li><li>Em <strong>Tutorial e suporte</strong>, siga as orientações de notificações e bateria. Selecione WhatsApp ou Business, crie sua primeira regra e ative a automação.</li></ol><p><a style="display:inline-block;background:#2563eb;color:#fff;padding:14px 20px;border-radius:10px;text-decoration:none;font-weight:bold" href="${esc(data.portal)}/cliente">Acessar minha central →</a></p><p><a href="https://solomonstores.shop/suporte/">Ver o guia de instalação e configuração</a></p>${data.devices>1?"<p>Para a equipe, gere os códigos individuais de vínculo na central. Distribua somente um por aparelho.</p>":"<p>Sua licença permite um celular ativo. Para trocar de aparelho, desvincule o anterior na central antes de ativar o substituto.</p>"}${data.trialDays?"<p>Teste de uso único, vinculado à primeira instalação e sem cobrança automática. O prazo começa na primeira ativação.</p>":data.permanent?"":"<p>A assinatura renova pelo período contratado, até cancelamento. O cancelamento da recorrência e o pedido de reembolso são operações diferentes; procure o suporte se precisar de ajuda.</p>"}<p style="font-size:13px;color:#60738f">Somente Android 7.0 ou superior. Não funciona em iPhone/iPad. Depende das notificações com ação Responder, das permissões e das configurações de bateria. As respostas são definidas por você; o aplicativo não envia arquivos ou áudios automaticamente.</p><p style="font-size:13px;color:#60738f">Para atualizar uma instalação compatível, escolha Atualizar sobre o app instalado. Não use Limpar dados e não desinstale antes de fazer backup. Se houver conflito de assinatura, fale com o suporte.</p>`);
}

// src/cloud/corporate.ts
var corporateRates = { 30: [1199, 899], 90: [2157, 1617], 365: [6e3, 4500] };
function corporatePrice(devices, period) {
  const n = Number(devices), days = Number(period);
  if (!Number.isInteger(n) || n < 21 || n > 1e3 || ![30, 90, 365].includes(days)) throw new ApiError("invalid_corporate_selection");
  const [base, extra] = corporateRates[days];
  return { devices: n, periodDays: days, priceCents: Math.min(n, 100) * base + Math.max(0, n - 100) * extra, currency: "BRL" };
}
__name(corporatePrice, "corporatePrice");
var credentials = null;
async function corporateProvider(env, path, body2, method) {
  try {
    return await corporateProviderRequest(env, path, body2, method);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    let detail = error instanceof Error ? error.message : "unknown";
    for (const secret of [env.CAKTO_OFFERS_CLIENT_ID, env.CAKTO_OFFERS_CLIENT_SECRET, credentials?.token]) if (secret) detail = detail.split(secret).join("[redacted]");
    console.error(JSON.stringify({ event: "corporate_provider_failed", detail: detail.slice(0, 300) }));
    throw new ApiError("provider_transport_failed", 503);
  }
}
__name(corporateProvider, "corporateProvider");
async function corporateProviderRequest(env, path, body2, method) {
  if (!env.CAKTO_OFFERS_CLIENT_ID || !env.CAKTO_OFFERS_CLIENT_SECRET) throw new ApiError("corporate_configuration_pending", 503);
  if (!credentials || credentials.id !== env.CAKTO_OFFERS_CLIENT_ID || credentials.until < Date.now()) {
    const response2 = await fetch("https://api.cakto.com.br/public_api/token/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: env.CAKTO_OFFERS_CLIENT_ID, client_secret: env.CAKTO_OFFERS_CLIENT_SECRET }), signal: AbortSignal.timeout(1e4), redirect: "manual" });
    if (!response2.ok) {
      console.error(JSON.stringify({ event: "corporate_provider_http", stage: "token", status: response2.status, redirect: response2.headers.get("Location") }));
      throw new ApiError("provider_auth_unavailable", 503);
    }
    const token2 = await response2.json();
    if (!token2.access_token || !Number.isFinite(token2.expires_in)) throw new ApiError("provider_auth_contract_changed", 503);
    credentials = { id: env.CAKTO_OFFERS_CLIENT_ID, token: token2.access_token, until: Date.now() + Math.max(0, token2.expires_in - 60) * 1e3 };
  }
  const headers = { Authorization: "Bearer " + credentials.token };
  let payload;
  if (body2) {
    if (path === "offers/" && env.ASSETS) {
      const image = await env.ASSETS.fetch(new Request("https://autokyro-cloud.autokyro-license-center.workers.dev/brand/autokyro-cakto.png"));
      if (image.ok) {
        const form = new FormData();
        for (const [key, value] of Object.entries(body2)) form.append(key, String(value));
        form.append("image", new Blob([await image.arrayBuffer()], { type: "image/png" }), "autokyro.png");
        payload = form;
      }
    }
    if (!payload) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body2);
    }
  }
  const response = await fetch("https://api.cakto.com.br/public_api/" + path, { method: method ?? (body2 ? "POST" : "GET"), headers, ...payload ? { body: payload } : {}, signal: AbortSignal.timeout(15e3), redirect: "manual" });
  if (!response.ok) {
    console.error(JSON.stringify({ event: "corporate_provider_http", stage: "offer", status: response.status, redirect: response.headers.get("Location") }));
    throw new ApiError("provider_unavailable", 503);
  }
  return await response.json();
}
__name(corporateProviderRequest, "corporateProviderRequest");
async function corporateCheckout(env, input, prepare = false) {
  if (!prepare && env.SALES_ENABLED !== "true") throw new ApiError("sales_closed", 409);
  if (!env.CAKTO_OFFERS_CLIENT_ID || !env.CAKTO_OFFERS_CLIENT_SECRET) throw new ApiError("corporate_configuration_pending", 503);
  const quote = corporatePrice(input.devices, input.periodDays), id = `corporate_${quote.devices}_${quote.periodDays}_v1`, name = `Autokyro Corporativo \xB7 ${quote.devices} celulares \xB7 ${quote.periodDays} dias`;
  if (Number(input.expectedPriceCents) !== quote.priceCents) throw new ApiError("price_changed", 409);
  const product2 = env.CAKTO_PRODUCT_ID;
  if (!product2) throw new ApiError("corporate_configuration_pending", 503);
  const existing = await env.DB.prepare("SELECT * FROM cloud_corporate_offers WHERE plan_id=?").bind(id).first();
  if (existing) {
    if (existing.status !== "ready") throw new ApiError("corporate_review_required", 503);
    if (existing.price_cents !== quote.priceCents) throw new ApiError("corporate_review_required", 503);
    if (!prepare) {
      const current = await corporateProvider(env, "offers/" + encodeURIComponent(existing.provider_offer_id) + "/");
      if (Number(current.recurrence_period) !== quote.periodDays || Math.round(Number(current.price) * 100) !== quote.priceCents || current.product !== product2) throw new ApiError("corporate_review_required", 503);
      if (current.status === "disabled") {
        const activated = await corporateProvider(env, "offers/" + encodeURIComponent(existing.provider_offer_id) + "/", { name, price: quote.priceCents / 100, status: "active", type: "subscription", recurrence_period: quote.periodDays, intervalType: quote.periodDays === 365 ? "year" : "month", interval: quote.periodDays === 90 ? 3 : 1, quantity_recurrences: -1, trial_days: 0 }, "PUT");
        if (activated.status !== "active") throw new ApiError("corporate_review_required", 503);
      } else if (current.status !== "active") throw new ApiError("corporate_review_required", 503);
    }
    return json({ ...quote, checkoutUrl: "https://pay.cakto.com.br/" + encodeURIComponent(existing.provider_offer_id) });
  }
  await env.DB.prepare("INSERT INTO cloud_plans(id,name,price_cents,max_devices,device_limit,period_days,enabled,updated_at) VALUES(?,?,?,?,?,?,0,?) ON CONFLICT(id) DO NOTHING").bind(id, name, quote.priceCents, Math.min(100, quote.devices), quote.devices, quote.periodDays, iso()).run();
  const lock = await env.DB.prepare("INSERT INTO cloud_corporate_offers(plan_id,devices,period_days,price_cents,status,created_at,updated_at) VALUES(?,?,?,?,'creating',?,?) ON CONFLICT(plan_id) DO NOTHING").bind(id, quote.devices, quote.periodDays, quote.priceCents, iso(), iso()).run();
  if (!lock.meta.changes) throw new ApiError("corporate_review_required", 503);
  try {
    const offer = await corporateProvider(env, "offers/", { product: product2, name, price: quote.priceCents / 100, currency: "BRL", units: 1, status: prepare ? "disabled" : "active", type: "subscription", intervalType: quote.periodDays === 365 ? "year" : "month", interval: quote.periodDays === 90 ? 3 : 1, recurrence_period: quote.periodDays, quantity_recurrences: -1, trial_days: 0, max_retries: 3, retry_interval: 1 });
    const offerId = String(offer.id ?? "");
    if (!/^[a-zA-Z0-9_-]+$/.test(offerId) || offer.status !== (prepare ? "disabled" : "active") || Math.round(Number(offer.price) * 100) !== quote.priceCents || Number(offer.recurrence_period) !== quote.periodDays) throw new ApiError("provider_contract_changed", 503);
    await env.DB.batch([
      env.DB.prepare("UPDATE cloud_plans SET provider_product_id=?,provider_offer_id=?,checkout_url=?,updated_at=? WHERE id=?").bind(product2, offerId, "https://pay.cakto.com.br/" + offerId, iso(), id),
      env.DB.prepare("UPDATE cloud_corporate_offers SET status='ready',provider_offer_id=?,updated_at=? WHERE plan_id=?").bind(offerId, iso(), id)
    ]);
    return json({ ...quote, checkoutUrl: "https://pay.cakto.com.br/" + offerId });
  } catch (error) {
    if (error instanceof ApiError && ["provider_auth_unavailable", "provider_auth_contract_changed"].includes(error.code)) {
      await env.DB.prepare("DELETE FROM cloud_corporate_offers WHERE plan_id=? AND status='creating' AND provider_offer_id IS NULL").bind(id).run();
      throw error;
    }
    await env.DB.prepare("UPDATE cloud_corporate_offers SET status='uncertain',updated_at=? WHERE plan_id=?").bind(iso(), id).run();
    throw error;
  }
}
__name(corporateCheckout, "corporateCheckout");

// src/cloud/admin.ts
var integer = /* @__PURE__ */ __name((v, min, max) => {
  const n = Number(v);
  if (!Number.isInteger(n) || n < min || n > max) throw new ApiError("invalid_input");
  return n;
}, "integer");
var date = /* @__PURE__ */ __name((v) => {
  const n = Date.parse(text(v, 40));
  if (!Number.isFinite(n)) throw new ApiError("invalid_date");
  return new Date(n).toISOString();
}, "date");
async function adminApi(req, env, path, s) {
  const url = new URL(req.url), q = (url.searchParams.get("q") ?? "").slice(0, 100), search = "%" + q + "%", page = Math.max(1, Number(url.searchParams.get("page")) || 1), offset = (page - 1) * 50;
  if (path === "/admin/session" && req.method === "GET") return json({ role: s.role, adminEmail: s.admin_email ?? null });
  if (path === "/admin/logout" && req.method === "POST") {
    await env.DB.prepare("DELETE FROM cloud_sessions WHERE token_hash=?").bind(s.token_hash).run();
    const r = json({ ok: true });
    r.headers.set("Set-Cookie", adminCookie("", true));
    return r;
  }
  if (req.method === "GET") {
    if (path === "/admin/dashboard") {
      const counts = await env.DB.prepare(`SELECT (SELECT COUNT(*) FROM cloud_customers) customers,(SELECT COUNT(*) FROM cloud_licenses WHERE archived_at IS NULL) licenses,(SELECT COUNT(*) FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id WHERE l.status IN('active','grace','canceled') AND (l.is_permanent=1 OR l.valid_until>?) AND l.manual_block=0 AND c.blocked=0) active,(SELECT COUNT(*) FROM cloud_licenses WHERE archived_at IS NULL AND is_permanent=0 AND valid_until<=?) expired,(SELECT COUNT(*) FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id WHERE l.archived_at IS NULL AND (l.manual_block=1 OR c.blocked=1 OR l.status IN('blocked','refunded'))) suspended,(SELECT COUNT(*) FROM cloud_devices WHERE revoked_at IS NULL) devices,(SELECT COUNT(*) FROM cloud_licenses WHERE provider_subscription_id IS NOT NULL AND status IN('active','grace') AND valid_until>?) subscriptions,(SELECT COALESCE(SUM(amount_cents),0) FROM cloud_payments WHERE status='paid' AND currency='BRL' AND paid_at>=?) monthly_sales_cents,(SELECT COALESCE(SUM(p.price_cents / CASE p.period_days WHEN 90 THEN 3 WHEN 365 THEN 12 ELSE 1 END),0) FROM cloud_licenses l JOIN cloud_plans p ON p.id=l.plan_id JOIN cloud_customers c ON c.id=l.customer_id WHERE l.provider_subscription_id IS NOT NULL AND l.status IN('active','grace') AND l.valid_until>? AND l.manual_block=0 AND c.blocked=0) mrr_cents`).bind(iso(), iso(), iso(), new Date((/* @__PURE__ */ new Date()).getUTCFullYear(), (/* @__PURE__ */ new Date()).getUTCMonth(), 1).toISOString(), iso()).first();
      return json({ counts, recentPurchases: (await env.DB.prepare("SELECT p.*,c.email FROM cloud_payments p JOIN cloud_customers c ON c.id=p.customer_id ORDER BY p.updated_at DESC LIMIT 8").all()).results, recentActivations: (await env.DB.prepare("SELECT a.* FROM cloud_audit a JOIN cloud_licenses l ON l.id=a.entity_id WHERE a.action='device.activate' AND l.archived_at IS NULL ORDER BY a.created_at DESC LIMIT 8").all()).results, failedEvents: await env.DB.prepare("SELECT COUNT(*) total FROM cloud_events WHERE status='failed'").first(), pendingDeliveries: await env.DB.prepare("SELECT COUNT(*) total FROM cloud_outbox WHERE status!='sent'").first() });
    }
    const queries = {
      customers: "SELECT id,email,name,company,blocked,created_at,updated_at FROM cloud_customers WHERE email LIKE ? OR name LIKE ? OR company LIKE ? ORDER BY created_at DESC LIMIT 50 OFFSET ?",
      licenses: "SELECT l.id,l.customer_id,c.email,p.name AS plan_name,l.plan_id,l.status,l.valid_until,l.is_permanent,l.manual_block,l.max_devices,l.trial_days,l.trial_started_at,l.provider_subscription_id,(SELECT COUNT(*) FROM cloud_devices d WHERE d.license_id=l.id AND d.revoked_at IS NULL) active_devices,l.created_at FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id JOIN cloud_plans p ON p.id=l.plan_id WHERE (c.email LIKE ? OR l.id LIKE ? OR l.provider_subscription_id LIKE ?) AND (l.archived_at IS NULL OR ?=1) ORDER BY l.created_at DESC LIMIT 50 OFFSET ?",
      devices: "SELECT d.id,d.license_id,c.email,d.device_name,d.activated_at,d.last_seen_at,d.revoked_at FROM cloud_devices d JOIN cloud_licenses l ON l.id=d.license_id JOIN cloud_customers c ON c.id=l.customer_id WHERE c.email LIKE ? OR d.device_name LIKE ? OR d.license_id LIKE ? ORDER BY d.activated_at DESC LIMIT 50 OFFSET ?",
      payments: "SELECT p.*,c.email FROM cloud_payments p JOIN cloud_customers c ON c.id=p.customer_id WHERE c.email LIKE ? OR p.order_id LIKE ? OR p.subscription_id LIKE ? ORDER BY p.updated_at DESC LIMIT 50 OFFSET ?",
      events: "SELECT id,event_type,order_id,subscription_id,status,attempts,error_code,received_at,processed_at FROM cloud_events WHERE order_id LIKE ? OR event_type LIKE ? OR status LIKE ? ORDER BY received_at DESC LIMIT 50 OFFSET ?",
      audit: "SELECT * FROM cloud_audit WHERE actor LIKE ? OR action LIKE ? OR entity_id LIKE ? ORDER BY created_at DESC LIMIT 50 OFFSET ?"
    };
    const key = path.split("/").pop();
    if (queries[key]) return json({ rows: (await env.DB.prepare(queries[key]).bind(...(key === "licenses" ? [search, search, search, url.searchParams.get("archived") === "1" ? 1 : 0, offset] : [search, search, search, offset])).all()).results, page });
    if (path === "/admin/plans") return json({ rows: (await env.DB.prepare("SELECT id,name,price_cents,COALESCE(device_limit,max_devices) AS max_devices,provider_product_id,provider_offer_id,checkout_url,enabled,grace_days,updated_at,period_days FROM cloud_plans ORDER BY period_days,price_cents").all()).results });
    if (path === "/admin/settings") return json({ rows: (await env.DB.prepare("SELECT * FROM cloud_settings").all()).results });
    if (path === "/admin/deliveries") return json({ rows: (await env.DB.prepare("SELECT o.id,o.license_id,c.email,o.status,o.attempts,o.error_code,o.created_at,o.sent_at FROM cloud_outbox o JOIN cloud_licenses l ON l.id=o.license_id JOIN cloud_customers c ON c.id=l.customer_id ORDER BY o.created_at DESC LIMIT 50 OFFSET ?").bind(offset).all()).results, page });
    throw new ApiError("not_found", 404);
  }
  if (req.method !== "POST") throw new ApiError("method_not_allowed", 405);
  owner(s);
  const b = await body(req);
  let id = typeof b.id === "string" ? text(b.id, 100) : "";
  if (path === "/admin/trials/send") {
    if (s.admin_email !== "rignis1212@gmail.com") throw new ApiError("forbidden", 403);
    const requestId = text(b.requestId, 80);
    if (!/^[a-f0-9-]{36}$/i.test(requestId) || !Array.isArray(b.emails) || b.emails.length < 1 || b.emails.length > 10) throw new ApiError("invalid_input");
    const addresses = [...new Set(b.emails.map(email))];
    const plan = await env.DB.prepare("SELECT id FROM cloud_plans WHERE id='mensal' AND enabled=1 AND COALESCE(device_limit,max_devices)=1").first();
    if (!plan) throw new ApiError("invalid_plan");
    // Validate the entire recipient list before creating any license.
    for (const address of addresses) {
      const c = await env.DB.prepare("SELECT blocked FROM cloud_customers WHERE email=?").bind(address).first();
      if (c?.blocked) throw new ApiError("customer_blocked", 403);
    }
    const deliveries = [];
    for (const address of addresses) {
      const c = await customer(env, address), id = crypto.randomUUID(), deliveryId = crypto.randomUUID(), now = iso();
      const code = "AUTK-" + token().slice(0, 32).toUpperCase().match(/.{1,4}/g).join("-");
      await env.DB.batch([
        env.DB.prepare("INSERT INTO cloud_licenses(id,customer_id,plan_id,code_hash,code_encrypted,status,valid_until,max_devices,trial_days,created_at,updated_at) SELECT ?,?,'mensal',?,?,'pending',NULL,1,30,?,? WHERE NOT EXISTS(SELECT 1 FROM cloud_trial_invites WHERE request_id=? AND email=?)").bind(id, c.id, await hmac(env.AUTH_PEPPER, code), await seal(env, code), now, now, requestId, address),
        env.DB.prepare("INSERT INTO cloud_outbox(id,license_id,created_at) SELECT ?,?,? WHERE EXISTS(SELECT 1 FROM cloud_licenses WHERE id=?)").bind(deliveryId, id, now, id),
        env.DB.prepare("INSERT INTO cloud_trial_invites(request_id,email,license_id,delivery_id,created_at) SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM cloud_licenses WHERE id=?) ON CONFLICT DO NOTHING").bind(requestId, address, id, deliveryId, now, id),
        env.DB.prepare("INSERT INTO cloud_audit SELECT ?,?,'trial.invite',?,?,? WHERE EXISTS(SELECT 1 FROM cloud_licenses WHERE id=?)").bind(crypto.randomUUID(), s.role, id, JSON.stringify({ requestId, days: 30, maxDevices: 1 }), now, id)
      ]);
      const invite = await env.DB.prepare("SELECT delivery_id FROM cloud_trial_invites WHERE request_id=? AND email=?").bind(requestId, address).first();
      if (invite) deliveries.push(invite.delivery_id);
    }
    // Send only this batch; existing customers' pending deliveries are untouched.
    for (let i = 0; i < deliveries.length; i += 4) await deliverLicenses(env, deliveries.slice(i, i + 4));
    const rows = (await env.DB.prepare("SELECT i.email,o.status,o.error_code FROM cloud_trial_invites i JOIN cloud_outbox o ON o.id=i.delivery_id WHERE i.request_id=? ORDER BY i.email").bind(requestId).all()).results;
    return json({ ok: true, rows });
  }
  if (path === "/admin/license/permanent") {
    // This operation is exclusively for the owner's personal customer account.
    if (email(b.email) !== "rignis1212@gmail.com") throw new ApiError("forbidden", 403);
    const c = await env.DB.prepare("SELECT id FROM cloud_customers WHERE email=? AND blocked=0").bind("rignis1212@gmail.com").first();
    if (!c) throw new ApiError("not_found", 404);
    const code = "AUTK-" + token().slice(0, 32).toUpperCase().match(/.{1,4}/g).join("-");
    const candidate = crypto.randomUUID(), now = iso();
    const result = await env.DB.prepare("INSERT INTO cloud_licenses(id,customer_id,plan_id,code_hash,code_encrypted,status,valid_until,max_devices,is_permanent,created_at,updated_at) VALUES(?,?,'mensal',?,?,'active',NULL,1,1,?,?) ON CONFLICT DO NOTHING").bind(candidate, c.id, await hmac(env.AUTH_PEPPER, code), await seal(env, code), now, now).run();
    const l = await env.DB.prepare("SELECT id FROM cloud_licenses WHERE customer_id=? AND is_permanent=1").bind(c.id).first();
    if (!l) throw new ApiError("temporarily_unavailable", 503);
    if (result.meta.changes) await audit(env, s.role, "license.permanent.create", l.id, { maxDevices: 1, expires: false, reason: "Uso pessoal autorizado pelo proprietário" });
    return json({ ok: true, id: l.id, permanent: true, maxDevices: 1, created: !!result.meta.changes });
  }
  if (path === "/admin/corporate/check-provider") {
    const offer = await corporateProvider(env, "offers/3d7xuww/");
    return json({ id: offer.id, status: offer.status });
  }
  if (path === "/admin/corporate/prepare") {
    const response = await corporateCheckout(env, b, true);
    await audit(env, s.role, "corporate.prepare", String(b.devices) + ":" + String(b.periodDays));
    return response;
  }
  if (path === "/admin/customer/save") {
    const c = await customer(env, email(b.email));
    id = c.id;
    if (typeof b.company === "string" && b.company.trim()) await env.DB.prepare("INSERT INTO cloud_companies(id,name,created_at) VALUES(?,?,?) ON CONFLICT(name) DO NOTHING").bind(crypto.randomUUID(), b.company.trim().slice(0, 150), iso()).run();
    await env.DB.prepare("UPDATE cloud_customers SET name=?,company=?,blocked=?,updated_at=? WHERE id=?").bind(typeof b.name === "string" ? b.name.slice(0, 150) : "", typeof b.company === "string" ? b.company.slice(0, 150) : "", b.blocked === true ? 1 : 0, iso(), id).run();
  } else if (path === "/admin/plan/save") {
    const period = integer(b.periodDays ?? 30, 30, 365);
    if (![30, 90, 365].includes(period)) throw new ApiError("invalid_period");
    id = text(b.id, 40);
    if (!/^[a-z0-9_-]+$/.test(id)) throw new ApiError("invalid_plan");
    const product2 = typeof b.providerProductId === "string" ? b.providerProductId.trim() : "", offer = typeof b.providerOfferId === "string" ? b.providerOfferId.trim() : "";
    await env.DB.prepare("INSERT INTO cloud_plans(id,name,price_cents,max_devices,provider_product_id,provider_offer_id,checkout_url,enabled,grace_days,updated_at,period_days,device_limit) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,price_cents=excluded.price_cents,max_devices=excluded.max_devices,provider_product_id=excluded.provider_product_id,provider_offer_id=excluded.provider_offer_id,checkout_url=excluded.checkout_url,enabled=excluded.enabled,grace_days=excluded.grace_days,updated_at=excluded.updated_at,period_days=excluded.period_days,device_limit=excluded.device_limit").bind(id, text(b.name, 100), integer(b.priceCents, 0, 1e8), Math.min(100, integer(b.maxDevices, 1, 1e3)), product2 || null, offer || null, b.checkoutUrl ? https(b.checkoutUrl) : "", b.enabled === false ? 0 : 1, integer(b.graceDays ?? 0, 0, 7), iso(), period, integer(b.maxDevices, 1, 1e3)).run();
  } else if (path === "/admin/license/create") {
    const days = integer(b.trialDays ?? 0, 0, 30);
    if (![0, 15, 30].includes(days)) throw new ApiError("invalid_trial");
    const c = await customer(env, email(b.email)), plan = text(b.planId, 40), until = days ? null : date(b.validUntil);
    if (until && Date.parse(until) <= Date.now()) throw new ApiError("invalid_date");
    id = await newLicense(env, c.id, plan);
    await env.DB.prepare("UPDATE cloud_licenses SET status=?,valid_until=?,trial_days=?,max_devices=CASE WHEN ?>0 THEN 1 ELSE max_devices END WHERE id=?").bind(days ? "pending" : "active", until, days, days, id).run();
    await env.DB.prepare("INSERT INTO cloud_outbox(id,license_id,created_at) VALUES(?,?,?)").bind(crypto.randomUUID(), id, iso()).run();
  } else if (path === "/admin/license/update") {
    const l = await env.DB.prepare("SELECT * FROM cloud_licenses WHERE id=?").bind(id).first();
    if (!l) throw new ApiError("not_found", 404);
    if (l.is_permanent && ((b.maxDevices !== undefined && Number(b.maxDevices) !== 1) || b.validUntil || (b.planId !== undefined && b.planId !== l.plan_id))) throw new ApiError("invalid_input");
    const plan = typeof b.planId === "string" ? text(b.planId, 40) : String(l.plan_id), p = await env.DB.prepare("SELECT COALESCE(device_limit,max_devices) AS max_devices FROM cloud_plans WHERE id=?").bind(plan).first();
    if (!p) throw new ApiError("invalid_plan");
    const max = b.maxDevices === void 0 ? plan !== l.plan_id ? p.max_devices : Number(l.max_devices) : integer(b.maxDevices, 1, 1e3);
    const active = await env.DB.prepare("SELECT COUNT(*) total FROM cloud_devices WHERE license_id=? AND revoked_at IS NULL").bind(id).first();
    if ((active?.total ?? 0) > max) throw new ApiError("revoke_devices_before_downgrade", 409);
    const status = b.status === void 0 ? String(l.status) : text(b.status, 30);
    if (!["active", "pending", "expired", "blocked", "canceled", "refunded", "past_due", "grace"].includes(status)) throw new ApiError("invalid_status");
    await env.DB.prepare("UPDATE cloud_licenses SET plan_id=?,max_devices=?,status=?,manual_block=?,valid_until=?,updated_at=? WHERE id=?").bind(plan, max, status, b.blocked === void 0 ? l.manual_block : b.blocked === true ? 1 : 0, b.validUntil ? date(b.validUntil) : l.valid_until, iso(), id).run();
  } else if (path === "/admin/license/code") {
    const l = await env.DB.prepare("SELECT code_encrypted FROM cloud_licenses WHERE id=?").bind(id).first();
    if (!l) throw new ApiError("not_found", 404);
    await audit(env, s.role, "license.code.view", id);
    return json({ code: await seal(env, l.code_encrypted, true) });
  } else if (path === "/admin/device/revoke") {
    const d = await env.DB.prepare("UPDATE cloud_devices SET revoked_at=?,session_hash=NULL WHERE id=? RETURNING id").bind(iso(), id).first();
    if (!d) throw new ApiError("not_found", 404);
  } else if (path === "/admin/event/retry") {
    await env.DB.prepare("UPDATE cloud_events SET status='pending',attempts=0,locked_until=NULL,error_code=NULL WHERE id=? AND status='failed'").bind(id).run();
  } else if (path === "/admin/delivery/retry") {
    await env.DB.prepare("UPDATE cloud_outbox SET status='pending',attempts=0,locked_until=NULL,error_code=NULL WHERE id=?").bind(id).run();
  } else if (path === "/admin/settings/save") {
    await env.DB.prepare("UPDATE cloud_settings SET value=? WHERE id='offlineHours'").bind(String(integer(b.offlineHours, 1, 72))).run();
    id = "offlineHours";
  } else throw new ApiError("not_found", 404);
  await audit(env, s.role, path, id, { reason: typeof b.reason === "string" ? b.reason.slice(0, 300) : "" });
  return json({ ok: true, id });
}
__name(adminApi, "adminApi");

// src/cloud/team.ts
async function teamCodes(env, s, b) {
  const id = text(b.licenseId, 80), count = Number(b.count);
  if (!Number.isInteger(count) || count < 1 || count > 1e3) throw new ApiError("invalid_input");
  const license = await env.DB.prepare("SELECT l.*,c.blocked FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id WHERE l.id=? AND l.customer_id=?").bind(id, s.customer_id).first();
  if (!license || license.trial_days) throw new ApiError("forbidden", 403);
  if (Date.parse((await permission(env, license)).offlineUntil) <= Date.now()) throw new ApiError("license_not_active", 403);
  await limit(env, "team-codes:" + id, 6, 3600);
  const used = await env.DB.prepare("SELECT COUNT(*) total FROM cloud_devices WHERE license_id=? AND revoked_at IS NULL").bind(id).first();
  if (count > license.max_devices - (used?.total ?? 0)) throw new ApiError("device_limit", 409);
  const expires = new Date(Date.now() + 864e5).toISOString(), codes = [], statements = [];
  await env.DB.prepare("UPDATE cloud_team_enrollments SET used_at=? WHERE license_id=? AND used_at IS NULL").bind(iso(), id).run();
  for (let i = 0; i < count; i++) {
    const code = "AKT-" + token().slice(0, 32).toUpperCase();
    codes.push(code);
    statements.push(env.DB.prepare("INSERT INTO cloud_team_enrollments(code_hash,license_id,expires_at,created_at) VALUES(?,?,?,?)").bind(await sha(code), id, expires, iso()));
  }
  for (let offset = 0; offset < statements.length; offset += 50) await env.DB.batch(statements.slice(offset, offset + 50));
  await audit(env, s.customer_id, "team.codes.create", id, { count, expires });
  return json({ codes, expiresAt: expires, maxDevices: license.max_devices });
}
__name(teamCodes, "teamCodes");
async function enrollTeam(req, env, b) {
  const code = text(b.enrollmentCode, 80).toUpperCase();
  if (!/^AKT-[A-F0-9]{32}$/.test(code)) throw new ApiError("invalid_enrollment");
  await limit(env, "team-enroll-ip:" + (req.headers.get("CF-Connecting-IP") ?? "local"), 1200, 3600);
  const install = await sha(device(b.installationId));
  const enrollment = await env.DB.prepare("UPDATE cloud_team_enrollments SET used_at=? WHERE code_hash=? AND used_at IS NULL AND expires_at>? RETURNING license_id").bind(iso(), await sha(code), iso()).first();
  if (!enrollment) throw new ApiError("invalid_enrollment", 401);
  const license = await env.DB.prepare("SELECT l.*,c.blocked,c.email FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id WHERE l.id=?").bind(enrollment.license_id).first();
  if (!license || license.trial_days || Date.parse((await permission(env, license)).offlineUntil) <= Date.now()) throw new ApiError("license_not_active", 403);
  const old = await env.DB.prepare("SELECT revoked_at FROM cloud_devices WHERE license_id=? AND installation_hash=?").bind(license.id, install).first();
  if (old?.revoked_at) throw new ApiError("device_revoked", 403);
  const secret = await issue(env, license.customer_id, "customer", { licenseId: license.id, installation: install }), sessionHash = await sha(secret);
  try {
    await env.DB.prepare("INSERT INTO cloud_devices(id,license_id,installation_hash,session_hash,device_name,activated_at,last_seen_at) SELECT ?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM cloud_devices WHERE license_id=? AND revoked_at IS NULL)<? ON CONFLICT(license_id,installation_hash) DO UPDATE SET session_hash=excluded.session_hash,last_seen_at=excluded.last_seen_at").bind(crypto.randomUUID(), license.id, install, sessionHash, typeof b.deviceName === "string" ? b.deviceName.slice(0, 80) : "Equipe Android", iso(), iso(), license.id, license.max_devices).run();
    if (old && !old.revoked_at) await env.DB.prepare("UPDATE cloud_devices SET session_hash=?,last_seen_at=? WHERE license_id=? AND installation_hash=? AND revoked_at IS NULL").bind(sessionHash, iso(), license.id, install).run();
    if (!await env.DB.prepare("SELECT id FROM cloud_devices WHERE license_id=? AND installation_hash=? AND session_hash=? AND revoked_at IS NULL").bind(license.id, install, sessionHash).first()) throw new ApiError("device_limit", 409);
    await audit(env, license.customer_id, "team.device.enroll", license.id);
    return json({ token: secret, email: license.email, license: await permission(env, license), deviceOnly: true });
  } catch (error) {
    await env.DB.prepare("DELETE FROM cloud_sessions WHERE token_hash=?").bind(sessionHash).run();
    throw error;
  }
}
__name(enrollTeam, "enrollTeam");

// src/cloud/api.ts
async function permission(env, l) {
  const now = Date.now(), permanent = l.is_permanent === 1, expiry = l.valid_until ? Date.parse(l.valid_until) : 0;
  const entitled = !l.blocked && !l.manual_block && ["active", "canceled", "grace"].includes(l.status) && (permanent || expiry > now);
  const setting = await env.DB.prepare("SELECT value FROM cloud_settings WHERE id='offlineHours'").first();
  const hours = Math.min(72, Math.max(1, Number(setting?.value) || 72));
  // Permanent entitlement has no expiry in storage. Older APKs receive a short renewable lease.
  const valid = permanent ? now + hours * 36e5 : expiry;
  return { permanent, licenseId: l.id, productId: "autokyro", plan: l.plan_id, status: l.blocked || l.manual_block ? "blocked" : valid <= now && l.status !== "pending" ? "expired" : l.status, validUntil: new Date(valid || now).toISOString(), serverTime: new Date(now).toISOString(), offlineUntil: new Date(entitled ? Math.min(valid, now + hours * 36e5) : now).toISOString(), maxDevices: l.max_devices, trialDays: l.trial_days ?? 0, trialMode: l.trial_days ? "central" : "disabled" };
}
__name(permission, "permission");
async function cloudApi(req, env, path) {
  const origin = req.headers.get("Origin");
  if (req.method === "POST" && origin && ![new URL(req.url).origin, env.PANEL_ORIGIN].includes(origin)) throw new ApiError("invalid_origin", 403);
  if (path === "/status" && req.method === "GET") return json({ salesEnabled: env.SALES_ENABLED === "true", emailReady: !!env.RESEND_API_KEY && !!env.MAIL_FROM && env.MAIL_MODE === "resend" });
  if (path === "/corporate/pricing" && req.method === "GET") {
    const u = new URL(req.url);
    return json(corporatePrice(u.searchParams.get("devices"), u.searchParams.get("periodDays")));
  }
  if (path === "/team/enroll" && req.method === "POST") return enrollTeam(req, env, await body(req));
  if (path === "/plans" && req.method === "GET") {
    const plans = (await env.DB.prepare("SELECT id,name,price_cents,COALESCE(device_limit,max_devices) AS max_devices,period_days,checkout_url FROM cloud_plans WHERE enabled=1 ORDER BY period_days,price_cents").all()).results;
    return json({ corporate: { minDevices: 21, maxDevices: 1e3, rates: corporateRates, ready: !!env.CAKTO_OFFERS_CLIENT_ID && !!env.CAKTO_OFFERS_CLIENT_SECRET && !!env.CAKTO_PRODUCT_ID }, salesEnabled: env.SALES_ENABLED === "true", emailReady: !!env.RESEND_API_KEY && !!env.MAIL_FROM && env.MAIL_MODE === "resend", plans: plans.map((p) => ({ ...p, checkout_url: env.SALES_ENABLED === "true" ? p.checkout_url : "" })) });
  }
  // Administrative email login is pinned to the account owner's mailbox.
  // A customer OTP is never valid for administrative authentication.
  if (path === "/admin/auth/request" && req.method === "POST") {
    const input = await body(req), address = email(input.email);
    await limit(env, "admin-email-ip:" + (req.headers.get("CF-Connecting-IP") ?? "local"), 8, 3600);
    await limit(env, "admin-email-request:" + address, 5, 3600);
    const id = "admin:" + crypto.randomUUID();
    if (address !== "rignis1212@gmail.com") return json({ challengeId: id });
    const local = env.ENVIRONMENT === "development" && env.MAIL_MODE === "local";
    if (!local && (!env.RESEND_API_KEY || !env.MAIL_FROM)) throw new ApiError("email_unavailable", 503);
    const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1e6).padStart(6, "0");
    await env.DB.prepare("UPDATE cloud_challenges SET used_at=?,dev_code=NULL WHERE email=? AND id LIKE 'admin:%' AND used_at IS NULL").bind(iso(), address).run();
    await env.DB.prepare("INSERT INTO cloud_challenges(id,email,code_hash,expires_at,created_at,dev_code) VALUES(?,?,?,?,?,?)").bind(id, address, await hmac(env.AUTH_PEPPER, id + ":" + code), new Date(Date.now() + 6e5).toISOString(), iso(), local ? code : null).run();
    if (!local) {
      const sent = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ from: env.MAIL_FROM, reply_to: env.MAIL_REPLY_TO, to: [address], subject: "Automatize Fácil — acesso administrativo", html: frame("Confirme seu acesso administrativo", '<p>Use este código somente no painel administrativo Automatize Fácil.</p><p style="font-size:36px;font-weight:bold;letter-spacing:8px">' + esc(code) + '</p><p>Válido por 10 minutos, para um único uso. Nunca compartilhe este código. Se não solicitou o acesso, ignore esta mensagem.</p>'), text: "Código para entrar no painel administrativo Automatize Fácil: " + code + ". Válido por 10 minutos. Não compartilhe." }) });
      if (!sent.ok) {
        await env.DB.prepare("UPDATE cloud_challenges SET used_at=?,dev_code=NULL WHERE id=?").bind(iso(), id).run();
        throw new ApiError("email_unavailable", 503);
      }
    }
    return json({ challengeId: id });
  }
  if (path === "/admin/auth/verify" && req.method === "POST") {
    const input = await body(req), id = text(input.challengeId, 80), code = text(input.code, 6);
    if (!/^admin:[a-f0-9-]{36}$/.test(id) || !/^\d{6}$/.test(code)) throw new ApiError("invalid_code", 401);
    await limit(env, "admin-email-verify:" + (req.headers.get("CF-Connecting-IP") ?? "local"), 20, 3600);
    const candidate = await env.DB.prepare("UPDATE cloud_challenges SET attempts=attempts+1 WHERE id=? AND email=? AND used_at IS NULL AND expires_at>? AND attempts<5 RETURNING email").bind(id, "rignis1212@gmail.com", iso()).first();
    if (!candidate) throw new ApiError("invalid_code", 401);
    const used = await env.DB.prepare("UPDATE cloud_challenges SET used_at=?,dev_code=NULL WHERE id=? AND email=? AND code_hash=? AND used_at IS NULL AND expires_at>? AND attempts<=5 RETURNING email").bind(iso(), id, "rignis1212@gmail.com", await hmac(env.AUTH_PEPPER, id + ":" + code), iso()).first();
    if (!used) throw new ApiError("invalid_code", 401);
    const secret = await issue(env, null, "admin");
    await audit(env, "admin", "login.email", "session");
    const response = json({ role: "admin", adminEmail: "rignis1212@gmail.com" });
    response.headers.set("Set-Cookie", adminCookie(secret));
    return response;
  }
  if (path === "/admin/login" && req.method === "POST") {
    await limit(env, "admin-login:" + (req.headers.get("CF-Connecting-IP") ?? "local"), 8, 3600);
    const b2 = await body(req), password = text(b2.password, 256);
    const role = await passwordMatches(env, password, env.ADMIN_PASSWORD_HASH) ? "admin" : await passwordMatches(env, password, env.SUPPORT_PASSWORD_HASH) ? "support" : null;
    if (!role) throw new ApiError("invalid_credentials", 401);
    const secret = await issue(env, null, role);
    await audit(env, role, "login", "session");
    const response = json({ role, adminEmail: role === "admin" ? "rignis1212@gmail.com" : null });
    response.headers.set("Set-Cookie", adminCookie(secret));
    return response;
  }
  if (path === "/auth/request" && req.method === "POST") {
    const b2 = await body(req), address = email(b2.email);
    await limit(env, "cloud-otp-ip:" + (req.headers.get("CF-Connecting-IP") ?? "local"), 15, 3600);
    await limit(env, "cloud-otp:" + address, 5, 3600);
    const id = crypto.randomUUID(), code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1e6).padStart(6, "0");
    const local = env.ENVIRONMENT === "development" && env.MAIL_MODE === "local";
    if (!local && (!env.RESEND_API_KEY || !env.MAIL_FROM)) throw new ApiError("email_unavailable", 503);
    await env.DB.prepare("INSERT INTO cloud_challenges(id,email,code_hash,expires_at,created_at,dev_code) VALUES(?,?,?,?,?,?)").bind(id, address, await hmac(env.AUTH_PEPPER, id + ":" + code), new Date(Date.now() + 6e5).toISOString(), iso(), local ? code : null).run();
    if (!local) {
      const sent = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ from: env.MAIL_FROM, reply_to: env.MAIL_REPLY_TO, to: [address], subject: "Automatize Fácil \u2014 confirme seu e-mail", html: otpHtml(code), text: `Seu c\xF3digo \xE9 ${code}. Validade: 10 minutos. N\xE3o compartilhe este c\xF3digo.` }) });
      if (!sent.ok) {
        await env.DB.prepare("DELETE FROM cloud_challenges WHERE id=?").bind(id).run();
        throw new ApiError("email_unavailable", 503);
      }
    }
    return json({ challengeId: id });
  }
  if (path === "/auth/verify" && req.method === "POST") {
    const b2 = await body(req), id = text(b2.challengeId, 80), code = text(b2.code, 6);
    if (id.startsWith("admin:") || !/^\d{6}$/.test(code)) throw new ApiError("invalid_code");
    await limit(env, "cloud-verify:" + (req.headers.get("CF-Connecting-IP") ?? "local"), 40, 3600);
    const r = await env.DB.prepare("UPDATE cloud_challenges SET attempts=attempts+1 WHERE id=? AND used_at IS NULL AND expires_at>? AND attempts<5 RETURNING email").bind(id, iso()).first();
    if (!r) throw new ApiError("invalid_code", 401);
    const used = await env.DB.prepare("UPDATE cloud_challenges SET used_at=?,dev_code=NULL WHERE id=? AND code_hash=? AND used_at IS NULL AND expires_at>? AND attempts<=5 RETURNING email").bind(iso(), id, await hmac(env.AUTH_PEPPER, id + ":" + code), iso()).first();
    if (!used) throw new ApiError("invalid_code", 401);
    const c = await customer(env, used.email);
    if (c.blocked) throw new ApiError("customer_blocked", 403);
    const secret = await issue(env, c.id, "customer");
    const response = json({ token: secret, email: used.email });
    response.headers.set("Set-Cookie", cookie(secret));
    return response;
  }
  if (path.startsWith("/admin/")) return adminApi(req, env, path, await session2(req, env, true));
  const s = await session2(req, env);
  if (s.scope_license_id && !["/license/check", "/logout"].includes(path)) throw new ApiError("forbidden", 403);
  if (path === "/corporate/checkout" && req.method === "POST") {
    await limit(env, "corporate-checkout:" + s.customer_id, 10, 3600);
    return corporateCheckout(env, await body(req));
  }
  if (path === "/team/codes" && req.method === "POST") return teamCodes(env, s, await body(req));
  await limit(env, "cloud-api:" + s.token_hash, 240, 3600);
  if (path === "/logout" && req.method === "POST") {
    await env.DB.prepare("DELETE FROM cloud_sessions WHERE token_hash=?").bind(s.token_hash).run();
    const r = json({ ok: true });
    r.headers.set("Set-Cookie", cookie("", true));
    return r;
  }
  if (path === "/me" && req.method === "GET") {
    const c = await env.DB.prepare("SELECT id,email,name,company,blocked FROM cloud_customers WHERE id=?").bind(s.customer_id).first();
    const licenses = (await env.DB.prepare("SELECT l.id,l.plan_id,p.name AS plan_name,l.status,l.valid_until,l.is_permanent,l.max_devices,l.manual_block,l.trial_days,l.trial_started_at,(SELECT COUNT(*) FROM cloud_devices d WHERE d.license_id=l.id AND d.revoked_at IS NULL) AS active_devices,l.code_encrypted FROM cloud_licenses l JOIN cloud_plans p ON p.id=l.plan_id WHERE customer_id=? AND l.archived_at IS NULL ORDER BY l.is_permanent DESC,l.created_at DESC LIMIT 100").bind(s.customer_id).all()).results;
    for (const l of licenses) {
      l.code = await seal(env, String(l.code_encrypted), true);
      delete l.code_encrypted;
    }
    const devices = (await env.DB.prepare("SELECT d.id,d.license_id,d.device_name,d.activated_at,d.last_seen_at,d.revoked_at FROM cloud_devices d JOIN cloud_licenses l ON l.id=d.license_id WHERE l.customer_id=? ORDER BY d.activated_at DESC LIMIT 200").bind(s.customer_id).all()).results;
    return json({ customer: c, licenses, devices, supportUrl: env.SUPPORT_URL ?? "", downloadUrl: env.DOWNLOAD_URL ?? "" });
  }
  if (path === "/devices" && req.method === "GET") {
    const u = new URL(req.url), q = (u.searchParams.get("q") ?? "").trim().slice(0, 100), licenseId = (u.searchParams.get("licenseId") ?? "").slice(0, 80), page = Math.min(1e4, Math.max(1, Math.floor(Number(u.searchParams.get("page")) || 1))), search = "%" + q + "%";
    const where = " FROM cloud_devices d JOIN cloud_licenses l ON l.id=d.license_id WHERE l.customer_id=? AND (?='' OR l.id=?) AND (d.device_name LIKE ? OR d.id LIKE ?) AND (d.revoked_at IS NULL OR ?=1)";
    const values = [s.customer_id, licenseId, licenseId, search, search, u.searchParams.get("history") === "1" ? 1 : 0];
    const total = await env.DB.prepare("SELECT COUNT(*) total" + where).bind(...values).first();
    const rows = (await env.DB.prepare("SELECT d.id,d.license_id,d.device_name,d.activated_at,d.last_seen_at,d.revoked_at" + where + " ORDER BY d.activated_at DESC,d.id LIMIT 50 OFFSET ?").bind(...values, (page - 1) * 50).all()).results;
    return json({ rows, total: total?.total ?? 0, page, pageSize: 50 });
  }
  const b = await body(req);
  if (req.method !== "POST") throw new ApiError("method_not_allowed", 405);
  if (path === "/device/rename") {
    const id = text(b.deviceId, 80), name = text(b.name, 80);
    const changed = await env.DB.prepare("UPDATE cloud_devices SET device_name=? WHERE id=? AND license_id IN(SELECT id FROM cloud_licenses WHERE customer_id=?) RETURNING id").bind(name, id, s.customer_id).first();
    if (!changed) throw new ApiError("not_found", 404);
    await audit(env, s.customer_id, "device.rename", id);
    return json({ ok: true });
  }
  if (path === "/device/revoke") {
    const id = text(b.deviceId, 80);
    const r = await env.DB.prepare("UPDATE cloud_devices SET revoked_at=?,session_hash=NULL WHERE id=? AND license_id IN(SELECT id FROM cloud_licenses WHERE customer_id=?) RETURNING id").bind(iso(), id, s.customer_id).first();
    if (!r) throw new ApiError("not_found", 404);
    await audit(env, s.customer_id, "device.revoke", id);
    return json({ ok: true });
  }
  if (path === "/license/activate" || path === "/license/check") {
    const install = await sha(device(b.installationId));
    if (s.scope_license_id && (b.licenseId !== s.scope_license_id || install !== s.scope_installation_hash)) throw new ApiError("forbidden", 403);
    let l;
    if (path.endsWith("activate")) {
      const code = text(b.activationCode, 100).toUpperCase();
      l = await env.DB.prepare("SELECT l.*,c.blocked FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id WHERE l.code_hash=? AND l.customer_id=?").bind(await hmac(env.AUTH_PEPPER, code), s.customer_id).first();
    } else l = await env.DB.prepare("SELECT l.*,c.blocked FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id JOIN cloud_devices d ON d.license_id=l.id WHERE l.id=? AND l.customer_id=? AND d.installation_hash=? AND d.session_hash=? AND d.revoked_at IS NULL").bind(text(b.licenseId, 80), s.customer_id, install, s.token_hash).first();
    if (!l) throw new ApiError(path.endsWith("check") ? "device_revoked" : "invalid_license", 403);
    if (l.trial_days) {
      if (l.trial_installation_hash && l.trial_installation_hash !== install) throw new ApiError("trial_device_mismatch", 403);
      if (path.endsWith("activate") && !l.trial_started_at && !l.blocked && !l.manual_block && l.status === "pending") {
        const started = iso(), until = new Date(Date.now() + l.trial_days * 864e5).toISOString();
        await env.DB.prepare("UPDATE cloud_licenses SET trial_started_at=?,trial_installation_hash=?,valid_until=?,status='active',updated_at=? WHERE id=? AND trial_started_at IS NULL AND status='pending' AND manual_block=0").bind(started, install, until, started, l.id).run();
        l = await env.DB.prepare("SELECT l.*,c.blocked FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id WHERE l.id=?").bind(l.id).first();
        if (!l || l.trial_installation_hash !== install) throw new ApiError("trial_device_mismatch", 403);
        await audit(env, s.customer_id, "trial.start", l.id, { days: l.trial_days });
      }
    }
    const grant2 = await permission(env, l);
    if (path.endsWith("activate")) {
      if (Date.parse(grant2.offlineUntil) <= Date.now()) return json({ license: grant2 });
      const old = await env.DB.prepare("SELECT revoked_at FROM cloud_devices WHERE license_id=? AND installation_hash=?").bind(l.id, install).first();
      if (old?.revoked_at) throw new ApiError("device_revoked", 403);
      await env.DB.prepare("INSERT INTO cloud_devices(id,license_id,installation_hash,session_hash,device_name,activated_at,last_seen_at) SELECT ?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM cloud_devices WHERE license_id=? AND revoked_at IS NULL)<? ON CONFLICT(license_id,installation_hash) DO UPDATE SET session_hash=excluded.session_hash,last_seen_at=excluded.last_seen_at").bind(crypto.randomUUID(), l.id, install, s.token_hash, typeof b.deviceName === "string" ? b.deviceName.slice(0, 80) : "Android", iso(), iso(), l.id, l.max_devices).run();
      if (old && !old.revoked_at) await env.DB.prepare("UPDATE cloud_devices SET session_hash=?,last_seen_at=? WHERE license_id=? AND installation_hash=? AND revoked_at IS NULL").bind(s.token_hash, iso(), l.id, install).run();
      const registered = await env.DB.prepare("SELECT id FROM cloud_devices WHERE license_id=? AND installation_hash=? AND session_hash=? AND revoked_at IS NULL").bind(l.id, install, s.token_hash).first();
      if (!registered) throw new ApiError("device_limit", 409);
      await audit(env, s.customer_id, "device.activate", l.id, { deviceName: typeof b.deviceName === "string" ? b.deviceName.slice(0, 80) : "Android" });
    } else await env.DB.prepare("UPDATE cloud_devices SET last_seen_at=? WHERE license_id=? AND installation_hash=? AND revoked_at IS NULL").bind(iso(), l.id, install).run();
    return json({ license: grant2 });
  }
  throw new ApiError("not_found", 404);
}
__name(cloudApi, "cloudApi");

// src/cloud/webhook.ts
async function cloudWebhook(req, env, ctx) {
  if (env.ENVIRONMENT !== "production" && env.ALLOW_DEV_WEBHOOKS !== "true") return json({ received: true, ignored: true });
  if (!req.headers.get("Content-Type")?.includes("application/json")) throw new ApiError("invalid_content_type", 415);
  const reader = req.body?.getReader();
  if (!reader) throw new ApiError("invalid_payload");
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 131072) {
      await reader.cancel();
      throw new ApiError("request_too_large", 413);
    }
    chunks.push(value);
  }
  const raw = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    raw.set(c, offset);
    offset += c.length;
  }
  if (!await webhookSignature(raw.buffer, req.headers.get("X-Cakto-Timestamp"), req.headers.get("X-Cakto-Signature"), env.CAKTO_WEBHOOK_SECRET)) throw new ApiError("invalid_signature", 401);
  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(raw));
  } catch {
    throw new ApiError("invalid_payload");
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object" || typeof payload.event !== "string") throw new ApiError("invalid_payload");
  if (!events.has(payload.event)) return json({ received: true, ignored: true });
  const rows = Array.isArray(payload.data) ? payload.data : [payload.data];
  if (!rows.length || rows.length > 10) throw new ApiError("invalid_payload");
  let accepted = 0;
  for (const row of rows) {
    if (!row || typeof row !== "object" || typeof row.id !== "string") throw new ApiError("invalid_payload");
    const product2 = row.product?.id, offer = row.offer?.id;
    const p = await env.DB.prepare("SELECT id FROM cloud_plans WHERE provider_product_id=? AND provider_offer_id=?").bind(typeof product2 === "string" ? product2 : "", typeof offer === "string" ? offer : "").first();
    if (!p) continue;
    const clean = {};
    for (const k of ["id", "status", "product", "offer", "subscription_period", "paidAt", "createdAt", "refundedAt", "chargedbackAt", "canceledAt", "amount", "currency"]) clean[k] = row[k] ?? null;
    clean.customer = { email: email(row.customer?.email), name: typeof row.customer?.name === "string" ? row.customer.name.slice(0, 150) : "", id: String(row.customer?.id ?? "") };
    clean.product = { id: product2 };
    clean.offer = { id: offer };
    clean.subscription = row.subscription?.id ? { id: row.subscription.id } : null;
    const stored = { event: payload.event, row: clean }, value = JSON.stringify(stored), dedupe = await sha(value);
    await env.DB.prepare("INSERT INTO cloud_events(id,dedupe_key,event_type,order_id,subscription_id,payload,received_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(dedupe_key) DO NOTHING").bind(crypto.randomUUID(), dedupe, payload.event, row.id, row.subscription?.id ?? null, value, iso()).run();
    accepted++;
  }
  ctx.waitUntil(processCloudEvents(env));
  return json({ received: true, accepted }, 202);
}
__name(cloudWebhook, "cloudWebhook");
async function processCloudEvents(env) {
  const rows = (await env.DB.prepare("SELECT id FROM cloud_events WHERE status IN('pending','failed','processing') AND attempts<8 AND (locked_until IS NULL OR locked_until<?) ORDER BY received_at LIMIT 4").bind(iso()).all()).results;
  for (const { id } of rows) {
    const stored = await env.DB.prepare("UPDATE cloud_events SET status='processing',attempts=attempts+1,locked_until=? WHERE id=? AND status NOT IN('processed','ignored') AND (locked_until IS NULL OR locked_until<?) RETURNING payload,attempts").bind(new Date(Date.now() + 9e4).toISOString(), id, iso()).first();
    if (!stored) continue;
    try {
      const { event, row } = JSON.parse(stored.payload);
      const plan = await env.DB.prepare("SELECT id,name,COALESCE(device_limit,max_devices) AS max_devices,period_days,provider_product_id,provider_offer_id,grace_days FROM cloud_plans WHERE provider_product_id=? AND provider_offer_id=?").bind(row.product.id, row.offer.id).first();
      if (!plan) throw new ApiError("plan_unmapped", 422);
      const c = await customer(env, email(row.customer.email), String(row.customer.name ?? ""));
      let existing = row.subscription?.id ? await env.DB.prepare("SELECT * FROM cloud_licenses WHERE provider_subscription_id=?").bind(row.subscription.id).first() : null;
      if (existing && existing.customer_id !== c.id) throw new ApiError("customer_mismatch", 422);
      let applied = false, licenseId = existing ? String(existing.id) : null, paid = false;
      if (event !== "purchase_refused") {
        const e = normalize(event, row), remote = await subscription(env, e.subscriptionId);
        if (remote.offer !== e.offerId) throw new ApiError("offer_mismatch", 422);
        if (Number(remote.recurrence_period) !== plan.period_days) throw new ApiError("period_mismatch", 422);
        if (["refund", "chargeback"].includes(event) && existing && Number(existing.current_period) > 0 && e.period <= 0) throw new ApiError("refund_period_unconfirmed", 422);
        if (e.period > 0 && existing && e.period < Number(existing.current_period)) {
          await env.DB.prepare("UPDATE cloud_events SET status='ignored',locked_until=NULL,processed_at=? WHERE id=?").bind(iso(), id).run();
          continue;
        }
        const product2 = { provider_product_id: plan.provider_product_id, offers_json: JSON.stringify({ [plan.provider_offer_id]: plan.id }), trial_mode: "disabled", trial_days: 0 };
        const old = { status: existing?.status ?? "pending", plan: existing?.plan_id ?? plan.id, subscription_ends_at: existing?.valid_until ?? null };
        const mapped = mapSubscription(e, remote, product2, old), terminal = ["refund", "chargeback"].includes(event), priority = terminal ? 100 : mapped.status === "canceled" ? 60 : ["past_due", "grace", "blocked"].includes(mapped.status) ? 50 : 10;
        const cursor = terminal && e.effectiveAt > mapped.updated ? e.effectiveAt : mapped.updated;
        paid = Number(remote.paid_payments_quantity) > 0;
        if (!existing && paid && !terminal && ["active", "canceled", "grace"].includes(mapped.status)) {
          licenseId = await newLicense(env, c.id, plan.id, e.subscriptionId);
          existing = await env.DB.prepare("SELECT * FROM cloud_licenses WHERE id=?").bind(licenseId).first();
        }
        if (existing) {
          let until = mapped.until, status = mapped.status;
          const paidUntil = remote.status === "active" && paid ? mapped.until : existing.paid_until ?? existing.valid_until;
          if (["past_due", "grace"].includes(status) && plan.grace_days > 0 && paidUntil) {
            const tolerance = Date.parse(String(paidUntil)) + plan.grace_days * 864e5;
            if (tolerance > Date.now()) {
              until = new Date(tolerance).toISOString();
              status = "grace";
            } else {
              until = String(paidUntil);
              status = "past_due";
            }
          }
          const activeDevices = await env.DB.prepare("SELECT COUNT(*) total FROM cloud_devices WHERE license_id=? AND revoked_at IS NULL").bind(licenseId).first();
          const deviceLimit = existing.plan_id === plan.id ? Number(existing.max_devices) : plan.max_devices;
          const currentPeriod = Math.max(e.period, Number(remote.current_period) || 0);
          const result = await env.DB.prepare("UPDATE cloud_licenses SET plan_id=?,max_devices=?,status=?,valid_until=?,paid_until=?,provider_updated_at=?,provider_priority=?,current_period=MAX(current_period,?),updated_at=? WHERE id=? AND (provider_updated_at IS NULL OR provider_updated_at<? OR(provider_updated_at=? AND provider_priority<=?))").bind(plan.id, deviceLimit, status, until, paidUntil, cursor, priority, currentPeriod, iso(), licenseId, cursor, cursor, priority).run();
          applied = (result.meta.changes ?? 0) > 0;
          if (applied) await audit(env, "cakto", event, licenseId, { eventId: id, devicesAboveLimit: (activeDevices?.total ?? 0) > plan.max_devices });
          if (applied && paid && status === "active") await env.DB.prepare("INSERT INTO cloud_outbox(id,license_id,created_at) VALUES(?,?,?) ON CONFLICT(license_id,kind) DO NOTHING").bind(crypto.randomUUID(), licenseId, iso()).run();
        }
        await env.DB.prepare("INSERT INTO cloud_subscriptions(id,license_id,customer_id,plan_id,provider_status,paid_payments,paid_until,updated_at) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET license_id=COALESCE(excluded.license_id,cloud_subscriptions.license_id),plan_id=excluded.plan_id,provider_status=excluded.provider_status,paid_payments=excluded.paid_payments,paid_until=excluded.paid_until,updated_at=excluded.updated_at WHERE cloud_subscriptions.updated_at<=excluded.updated_at").bind(e.subscriptionId, licenseId, c.id, plan.id, String(remote.status), Number(remote.paid_payments_quantity) || 0, typeof remote.next_payment_date === "string" ? remote.next_payment_date : null, mapped.updated).run();
      }
      const amount = typeof row.amount === "number" && Number.isFinite(row.amount) && row.amount >= 0 ? Math.round(row.amount * 100) : 0;
      const paymentStatus = event === "refund" ? "refunded" : event === "chargeback" ? "chargedback" : event === "purchase_refused" || event === "subscription_renewal_refused" ? "refused" : paid && row.status === "paid" ? "paid" : String(row.status ?? "pending");
      await env.DB.prepare("INSERT INTO cloud_payments(order_id,license_id,customer_id,subscription_id,event_type,status,amount_cents,currency,paid_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(order_id) DO UPDATE SET license_id=COALESCE(excluded.license_id,cloud_payments.license_id),event_type=excluded.event_type,status=excluded.status,amount_cents=excluded.amount_cents,paid_at=COALESCE(excluded.paid_at,cloud_payments.paid_at),updated_at=excluded.updated_at WHERE cloud_payments.status NOT IN('refunded','chargedback') OR excluded.status IN('refunded','chargedback')").bind(String(row.id), licenseId, c.id, row.subscription?.id ?? null, event, paymentStatus, amount, typeof row.currency === "string" ? row.currency : "BRL", typeof row.paidAt === "string" ? row.paidAt : null, iso()).run();
      await env.DB.prepare("UPDATE cloud_events SET status='processed',locked_until=NULL,error_code=NULL,processed_at=? WHERE id=?").bind(iso(), id).run();
    } catch (error) {
      await env.DB.prepare("UPDATE cloud_events SET status='failed',locked_until=?,error_code=? WHERE id=?").bind(new Date(Date.now() + Math.min(36e5, stored.attempts * 6e4)).toISOString(), error instanceof ApiError ? error.code : "processing_failed", id).run();
    }
  }
  await deliverLicenses(env);
}
__name(processCloudEvents, "processCloudEvents");
async function deliverLicenses(env, onlyIds) {
  if (env.ENVIRONMENT === "development" && env.MAIL_MODE === "local") return;
  if (!env.RESEND_API_KEY || !env.MAIL_FROM || !env.PORTAL_URL || !env.DOWNLOAD_URL || !env.SUPPORT_URL) return;
  const filter = onlyIds ? " AND id IN(" + onlyIds.map(() => "?").join(",") + ")" : "";
  const rows = (await env.DB.prepare("SELECT id FROM cloud_outbox WHERE status IN('pending','failed','sending') AND attempts<8 AND (locked_until IS NULL OR locked_until<?)" + filter + " ORDER BY created_at LIMIT 4").bind(iso(), ...(onlyIds || [])).all()).results;
  for (const { id } of rows) {
    const claimed = await env.DB.prepare("UPDATE cloud_outbox SET status='sending',attempts=attempts+1,locked_until=? WHERE id=? AND status!='sent' AND (locked_until IS NULL OR locked_until<?) RETURNING license_id").bind(new Date(Date.now() + 9e4).toISOString(), id, iso()).first();
    if (!claimed) continue;
    try {
      const l = await env.DB.prepare("SELECT l.*,c.email,p.name,p.period_days FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id JOIN cloud_plans p ON p.id=l.plan_id WHERE l.id=?").bind(claimed.license_id).first();
      if (!l) throw new Error();
      const pendingTrial = Number(l.trial_days) > 0 && !l.trial_started_at && l.status === "pending";
      if (!pendingTrial && !["active", "canceled", "grace"].includes(String(l.status)) || l.manual_block || !pendingTrial && Date.parse(String(l.valid_until)) <= Date.now()) throw new ApiError("license_not_active");
      const code = await seal(env, String(l.code_encrypted), true), message = `Automatize Fácil
Plano: ${String(l.name).replace(/autokyro/gi,"Automatize Fácil")}
C\xF3digo de ativa\xE7\xE3o: ${code}
${l.max_devices} ${l.max_devices === 1 ? "celular Android" : "celulares Android"}.${Number(l.trial_days) > 0 ? "\nTeste de " + l.trial_days + " dias a partir da primeira ativa\xE7\xE3o, vinculado a um aparelho. Sem cobran\xE7a autom\xE1tica. Ao vencer, assine um plano para continuar." : ""}
Per\xEDodo: ${l.trial_days || l.period_days} dias.

COMECE PELA \xC1REA DO CLIENTE: ${env.PORTAL_URL}/cliente
1. Informe o mesmo e-mail que recebeu esta licen\xE7a.
2. Solicite o c\xF3digo tempor\xE1rio de seis d\xEDgitos e confirme o e-mail na central. Ele vale 10 minutos e n\xE3o \xE9 sua licen\xE7a AUTK.
3. Na sua licen\xE7a, toque em Baixar aplicativo Android.
4. Instale o APK, abra Minha assinatura, confirme este e-mail e informe a licen\xE7a AUTK.${l.max_devices > 1 ? "\n5. Para a equipe, gere um código individual por aparelho na central." : ""}
Download oficial (exige acesso autorizado): ${env.DOWNLOAD_URL}
Somente Android 7.0 ou superior. N\xE3o funciona em iPhone/iPad. Requer permiss\xF5es, notifica\xE7\xF5es compat\xEDveis e configura\xE7\xE3o de bateria.
Validade: ${l.is_permanent ? "Permanente" : pendingTrial ? "a contar da primeira ativa\xE7\xE3o" : l.valid_until}
WhatsApp: https://wa.me/5511958749421
E-mail: solomonstores.shop@gmail.com
Suporte: ${env.SUPPORT_URL}

Se j\xE1 usa o app, instale o APK oficial por cima e escolha Atualizar. N\xE3o desinstale nem use Limpar dados. A atualiza\xE7\xE3o deve preservar regras, configura\xE7\xF5es e hist\xF3rico existente. Fa\xE7a backup como precau\xE7\xE3o; se houver conflito de assinatura, procure o suporte.`;
      const sent = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json", "Idempotency-Key": "autokyro-license-" + id }, body: JSON.stringify({ from: env.MAIL_FROM, reply_to: env.MAIL_REPLY_TO, to: [String(l.email)], subject: (Number(l.trial_days) > 0 ? "Automatize Fácil \u2014 teste de " + l.trial_days + " dias" : "Automatize Fácil \u2014 sua licen\xE7a") + " · " + l.max_devices + (l.max_devices === 1 ? " celular" : " celulares"), html: licenseHtml({ name: l.name, code, devices: l.max_devices, validUntil: l.valid_until, trialDays: Number(l.trial_days) || 0, pendingTrial, portal: env.PORTAL_URL, download: env.DOWNLOAD_URL, periodDays: l.period_days, permanent: !!l.is_permanent }), text: message }) });
      if (!sent.ok) throw new ApiError("email_unavailable");
      await env.DB.prepare("UPDATE cloud_outbox SET status='sent',locked_until=NULL,error_code=NULL,sent_at=? WHERE id=?").bind(iso(), id).run();
    } catch (error) {
      await env.DB.prepare("UPDATE cloud_outbox SET status='failed',locked_until=?,error_code=? WHERE id=?").bind(new Date(Date.now() + 3e5).toISOString(), error instanceof ApiError ? error.code : "email_failed", id).run();
    }
  }
}
__name(deliverLicenses, "deliverLicenses");

// src/cloud/download.ts
async function mayDownload(req, env) {
  let s;
  try {
    s = await session2(req, env);
  } catch (error) {
    if (!(error instanceof ApiError) || error.code !== "forbidden") throw error;
    s = await session2(req, env, true);
  }
  if (s.role === "admin") return;
  if (s.scope_license_id || s.role !== "customer") throw new ApiError("forbidden", 403);
  const access = await env.DB.prepare("SELECT l.id FROM cloud_licenses l JOIN cloud_customers c ON c.id=l.customer_id WHERE l.customer_id=? AND c.blocked=0 AND l.manual_block=0 AND ((l.status IN('active','canceled','grace') AND (l.is_permanent=1 OR l.valid_until>?)) OR (l.status='pending' AND l.trial_days IN(15,30) AND l.trial_started_at IS NULL)) LIMIT 1").bind(s.customer_id, (/* @__PURE__ */ new Date()).toISOString()).first();
  if (!access) throw new ApiError("license_required", 403);
}
__name(mayDownload, "mayDownload");

// src/index.ts
var index_default = {
  async fetch(req, env, ctx) {
    try {
      const path = new URL(req.url).pathname;
      if (["/brand/automatize-facil-icon.png", "/brand/automatize-facil-favicon.svg"].includes(path)) {
        const name = path.split("/").pop();
        const source = await fetch("https://solomonstores.shop/assets/img/" + name);
        const headers = new Headers(source.headers);
        headers.set("Cache-Control", "public, max-age=86400");
        headers.set("X-Content-Type-Options", "nosniff");
        return new Response(source.body, { status: source.status, headers });
      }
      if (path === "/app.js" || path === "/style.css") return new Response(path === "/app.js" ? AUTOKYRO_APP : AUTOKYRO_STYLE, {headers:{"Content-Type":path.endsWith(".js")?"application/javascript; charset=utf-8":"text/css; charset=utf-8","Cache-Control":"no-cache","X-Content-Type-Options":"nosniff"}});
      if (path === "/api/v2/corporate/pricing" || path === "/api/v2/corporate/checkout") return json({error:{code:"offer_retired"}},410);
      if (path === "/downloads/Automatize-Facil-1.1.2.apk") {
        try { await mayDownload(req, env); }
        catch (error) { if (error instanceof ApiError && error.status === 401) return Response.redirect(new URL("/cliente?download=1", req.url).href, 302); throw error; }
        if (req.method !== "GET" && req.method !== "HEAD") return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
        const apk = await env.APK_RELEASES?.get("apk/1.1.2/8f8826511e0b60f0e7d417a6da1791a88fe47ea1f0b497afa5c78b5ce33fefc5.apk", { type: "arrayBuffer", cacheTtl: 3600 });
        if (!apk) throw new ApiError("download_unavailable", 503);
        return new Response(req.method === "HEAD" ? null : apk, { headers: {
          "Content-Type": "application/vnd.android.package-archive", "Content-Disposition": 'attachment; filename="Automatize-Facil-1.1.2.apk"',
          "Content-Length": String(apk.byteLength), "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
          "X-APK-SHA256": "8f8826511e0b60f0e7d417a6da1791a88fe47ea1f0b497afa5c78b5ce33fefc5"
        } });
      }
      if (path === "/downloads/Autokyro-1.1.0.apk") return Response.redirect(new URL("/downloads/Autokyro-1.1.1.apk", req.url).href, 302);
      if (env.ASSETS && !path.startsWith("/api/") && path !== "/health" && path !== "/webhooks/cakto") {
        if (path.startsWith("/downloads/")) {
          try {
            await mayDownload(req, env);
          } catch (error) {
            if (error instanceof ApiError && error.status === 401) return Response.redirect(new URL("/cliente?download=1", req.url).href, 302);
            throw error;
          }
        }
        const target = new URL(req.url);
        if (["/", "/cliente", "/admin"].includes(path)) target.pathname = "/index.html";
        const asset = await env.ASSETS.fetch(new Request(target, req));
        const headers = new Headers(asset.headers);
        headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
        headers.set("X-Content-Type-Options", "nosniff");
        if (path.startsWith("/downloads/")) {
          headers.set("Cache-Control", "private, no-store");
          headers.set("Content-Disposition", 'attachment; filename="Autokyro-1.1.1.apk"');
        }
        if (["/", "/cliente", "/admin", "/index.html"].includes(path) && (headers.get("Content-Type") || "").includes("text/html")) {
          let html = await asset.text();
          html = html.replace(/Autokyro Cloud/g, "Automatize Fácil").replace(/#103b2c/g, "#245ee4")
            .replace(/\/mark\.svg/g, "/brand/automatize-facil-favicon.svg?v=20261113")
            .replace('href="/style.css"', 'href="/style.css?v=20261113-blue3"')
            .replace('src="/app.js"', 'src="/app.js?v=20261113-blue3"');
          headers.set("Cache-Control", "no-cache");
          headers.delete("Content-Length");
          headers.delete("ETag");
          return new Response(html, { status: asset.status, headers });
        }
        return new Response(asset.body, { status: asset.status, headers });
      }
      if (path === "/health")
        return json({
          ok: true,
          service: "license-center",
          environment: env.ENVIRONMENT
        });
      if (!env.AUTH_PEPPER || env.AUTH_PEPPER.length < 32)
        throw new ApiError("configuration_pending", 503);
      if (env.ENVIRONMENT === "production" && env.MAIL_MODE === "local")
        throw new ApiError("configuration_pending", 503);
      if (req.method === "POST" && path === "/webhooks/cakto") return await cloudWebhook(req, env, ctx);
      if (path.startsWith("/api/v2/")) return await cloudApi(req, env, path.slice(7));
      if (env.ENVIRONMENT === "production" && path.startsWith("/api/v1/")) throw new ApiError("not_found", 404);
      if (path.startsWith("/api/v1/admin/") || path === "/api/v1/device/revoke")
        return await administration(
          req,
          env,
          path === "/api/v1/device/revoke" ? "/api/v1/admin/device/revoke" : path
        );
      if (req.method === "POST" && path === "/api/v1/auth/request")
        return await requestCode(req, env);
      if (req.method === "POST" && path === "/api/v1/auth/verify")
        return await verifyCode(req, env);
      if (req.method === "POST" && path === "/api/v1/trial/start")
        return await licensing(req, env, "trial");
      if (req.method === "POST" && path === "/api/v1/license/activate")
        return await licensing(req, env, "activate");
      if (req.method === "POST" && path === "/api/v1/license/check")
        return await licensing(req, env, "check");
      if (req.method === "POST" && path === "/api/v1/device/register")
        return await licensing(req, env, "register");
      if (req.method === "GET" && path === "/api/v1/app/version")
        return await release(req, env);
      if (req.method === "POST" && path === "/api/v1/webhooks/cakto")
        return await receiveWebhook(req, env, ctx);
      throw new ApiError("not_found", 404);
    } catch (error) {
      if (error instanceof ApiError)
        return json({ error: { code: error.code } }, error.status);
      console.error(
        JSON.stringify({
          event: "request_failed",
          kind: error instanceof Error ? error.name : "unknown"
        })
      );
      return json({ error: { code: "temporarily_unavailable" } }, 503);
    }
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(
      (async () => {
        await processPending(env);
        await processCloudEvents(env);
        const old = new Date(Date.now() - 7 * 864e5).toISOString();
        await env.DB.batch([
          env.DB.prepare("DELETE FROM auth_challenges WHERE expires_at<?").bind(
            old
          ),
          env.DB.prepare("DELETE FROM sessions WHERE expires_at<?").bind(old),
          env.DB.prepare("DELETE FROM rate_limits WHERE window_at<?").bind(
            Math.floor(Date.now() / 1e3 / 3600) - 48
          ),
          env.DB.prepare("DELETE FROM cloud_sessions WHERE expires_at<?").bind(isoForCleanup()),
          env.DB.prepare("DELETE FROM cloud_challenges WHERE expires_at<?").bind(old),
          env.DB.prepare("UPDATE cloud_events SET payload='{}' WHERE status IN('processed','ignored') AND received_at<? AND payload!='{}'").bind(new Date(Date.now() - 90 * 864e5).toISOString())
        ]);
      })()
    );
  }
};
function isoForCleanup() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(isoForCleanup, "isoForCleanup");
export {
  index_default as default,
  mayDownload
};
//# sourceMappingURL=index.js.map
