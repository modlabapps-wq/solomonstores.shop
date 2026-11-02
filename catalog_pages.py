"""Editorial pages for the additional Solomon products; no checkout links."""
from html import escape

PRODUCTS = [
    dict(id='nexoficio', name='NexOfício', symbol='N', category='GESTÃO PARA PROFISSIONAIS',
         headline='Seu trabalho organizado.<br><em>Do orçamento ao recibo.</em>',
         lead='Clientes, serviços, agenda e finanças no mesmo aplicativo Android. Mais organização para quem trabalha por conta própria.',
         short='Organize clientes, serviços e orçamentos em PDF em um só lugar.',
         features=[('Clientes e serviços', 'Registre seus clientes e organize serviços com mão de obra e peças.'),
                   ('Orçamentos em PDF', 'Prepare orçamentos e converta o que foi aprovado em serviço.'),
                   ('Agenda e lembretes', 'Acompanhe os compromissos e ajuste os lembretes à sua rotina.'),
                   ('Recibos e finanças', 'Recursos Pro para pagamentos parciais, gastos e filtros de período.'),
                   ('Fotos e identidade', 'Recursos Pro para fotos dos serviços e logo nos documentos.'),
                   ('Backup local', 'Guarde uma cópia dos seus dados e faça backup antes de atualizar.')],
         monthly='19,90', annual='149,90',
         note='O modelo previsto inclui uma modalidade gratuita com até 15 clientes e 5 novos orçamentos por mês. O Pro amplia os recursos. O teste de 7 dias depende da liberação da central e da confirmação de e-mail; ainda não pode ser iniciado neste site.',
         steps=[('Cadastre', 'Organize os clientes e os serviços que fazem parte da sua rotina.'), ('Prepare', 'Monte o orçamento com mão de obra e peças e gere seu PDF.'), ('Acompanhe', 'Converta o orçamento aprovado em serviço e acompanhe agenda e recebimentos.')]),
    dict(id='pdf-scanner', name='PDF Scanner · SMT Scan', symbol='PDF', category='DOCUMENTOS NO ANDROID',
         headline='Do papel ao PDF.<br><em>Mais praticidade no seu dia.</em>',
         lead='Digitalize documentos, reconheça textos e organize seus PDFs no Android com o SMT Scan.',
         short='Digitalize, reconheça textos e organize documentos em PDF no Android.',
         features=[('Digitalização em PDF', 'Use o scanner para transformar documentos em arquivos PDF.'),
                   ('OCR local', 'Reconheça textos com processamento local no aparelho.'),
                   ('Assinatura desenhada', 'Adicione sua assinatura desenhada aos documentos. Não equivale a certificado digital.'),
                   ('Organização', 'Mantenha seus documentos reunidos na biblioteca do aplicativo.'),
                   ('Compressão e proteção', 'Ferramentas para reduzir o tamanho e proteger seus PDFs.'),
                   ('Compartilhamento', 'Compartilhe os documentos a partir do aplicativo.')],
         monthly='12,90', annual='79,90',
         note='O modelo previsto é gratuito com anúncios e Pro por assinatura. A distribuição dos recursos será apresentada na versão comercial. O teste de 7 dias depende da central e da confirmação de e-mail; ainda não está disponível por aqui. Compatível com Android 7.0 ou superior.',
         steps=[('Digitalize', 'Capture o documento com o scanner no seu Android.'), ('Prepare', 'Organize o arquivo e use as ferramentas de texto e PDF conforme sua necessidade.'), ('Compartilhe', 'Mantenha seu documento na biblioteca e compartilhe quando precisar.')]),
]

def cards():
    return '<div class="catalog-grid">' + ''.join(f'''<article class="catalog-card"><div class="catalog-symbol {p['id']}" aria-hidden="true">{p['symbol']}</div><p class="eyebrow">{p['category']}</p><h3>{p['name']}</h3><p>{p['short']}</p><div class="feature-pills"><span>Android</span><span>Lançamento em preparação</span></div><a class="button" href="/{p['id']}/">Conhecer aplicativo ↗</a><p class="availability">Vendas e downloads ainda não disponíveis.</p></article>''' for p in PRODUCTS) + '</div>'

def render(page):
    for p in PRODUCTS:
        features=''.join(f'<article><span>✳</span><h3>{escape(title)}</h3><p>{escape(text)}</p></article>' for title,text in p['features'])
        steps=''.join(f'<article><span>0{i} / {title.upper()}</span><h3>{title}</h3><p>{text}</p></article>' for i,(title,text) in enumerate(p['steps'],1))
        plans=''.join(f'''<article class="plan"><span class="plan-name">PRO / {label}</span><h3>{period}</h3><div class="plan-price">R$ {price}<small>/ {unit}</small></div><p>Preço previsto para o lançamento. Contratação ainda indisponível.</p><button class="button outline" disabled>Em breve</button><small class="plan-footnote">Vendas ainda não abertas</small></article>''' for label,period,price,unit in [('MENSAL','A cada 30 dias',p['monthly'],'30 dias'),('ANUAL','A cada 365 dias',p['annual'],'365 dias')])
        body=f'''<section class="section page-hero"><a class="breadcrumb" href="/#produtos">← Todos os aplicativos</a><p class="eyebrow">{p['category']}</p><div class="catalog-symbol {p['id']}" aria-hidden="true">{p['symbol']}</div><h1>{p['headline']}</h1><p class="intro">{p['lead']}</p><div class="buttons"><a class="button" href="#recursos">Explore os recursos ↓</a><a class="text-link" href="#planos">Conheça os planos ↗</a></div><p class="availability">{p['name']} · Lançamento em preparação. Compras e downloads indisponíveis.</p></section><section class="section" id="recursos"><div class="section-heading"><div><p class="eyebrow">FEITO PARA A SUA ROTINA</p><h2>Ferramentas que acompanham<br>seu trabalho.</h2></div></div><div class="audience-grid">{features}</div></section><section class="section"><p class="eyebrow">COMO FUNCIONA</p><h2>Um passo de cada vez.</h2><div class="workflow">{steps}</div></section><section class="section pricing" id="planos"><div class="pricing-heading"><p class="eyebrow">PLANOS EM PREPARAÇÃO</p><h2>Conheça as opções do Pro.</h2><p>Assinaturas previstas para o lançamento. Nenhum pagamento disponível neste site.</p></div><div class="plans two-plans">{plans}</div><div class="notice">{p['note']}</div></section><section class="section faq"><div><p class="eyebrow">ANTES DE COMEÇAR</p><h2>Informação clara.<br>Escolha com confiança.</h2></div><div><details><summary>Já posso comprar ou baixar?<span>+</span></summary><p>Ainda não. A versão comercial, a central e a entrega estão em preparação. Os botões continuam desabilitados.</p></details><details><summary>Em qual plataforma funciona?<span>+</span></summary><p>Este produto é um aplicativo para Android. A versão comercial e suas instruções de instalação serão divulgadas quando estiverem disponíveis.</p></details><details><summary>Onde encontro suporte?<span>+</span></summary><p>Consulte a <a href="/suporte/">central de ajuda</a>. As orientações específicas e o canal oficial de atendimento serão publicados antes da abertura das vendas.</p></details></div></section>'''
        page(p['id']+'/index.html',p['name']+' | Solomon Stores',p['short'],body,schema={'@context':'https://schema.org','@type':'SoftwareApplication','name':p['name'],'operatingSystem':'Android','applicationCategory':'ProductivityApplication','description':p['short']+' Lançamento em preparação.'})
