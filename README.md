# Solomon Stores — Aplicativos próprios

Nova apresentação da Solomon Stores, começando pelo Autokyro. HTML estático, CSS e JavaScript sem dependências externas, preparado para o GitHub Pages existente. O `CNAME` continua `solomonstores.shop`; não é necessário trocar domínio nem migrar hospedagem.

## Páginas

- `/`: marca e catálogo de aplicativos.
- `/autokyro/`: apresentação, conversa ilustrativa, recursos, funcionamento, planos e FAQ.
- `/nexoficio/`: gestão de clientes, serviços, orçamentos e agenda.
- `/pdf-scanner/`: apresentação do PDF Scanner · SMT Scan.
- `/suporte/`: instalação, ativação e orientações de uso.
- `/cliente/`: entrada editorial para a futura central autenticada.
- `/sobre/`: marca e nova fase.
- `/politica-privacidade.html` e `/termos.html`: informações desta versão institucional.

As antigas páginas de busca, categoria, favoritos e produto apontam para o catálogo/Autokyro. `sobre.html` aponta para `/sobre/`. O catálogo de afiliados, scripts e estilos antigos foram removidos; o histórico Git preserva a versão anterior.

## Estado comercial

As vendas **não estão abertas**. Os planos Start R$ 39,90/2 celulares, Pro R$ 69,90/5 e Business R$ 119,90/10 são apresentados com botões desabilitados. A Cakto tem as três ofertas desabilitadas. Não há links de cobrança, download comercial, formulário de coleta ou login fictício neste site.

O portal autenticado de Autokyro Cloud é um projeto separado, no diretório irmão `portal` da entrega do Autokyro. O GitHub Pages não executa seu backend. Quando Cloudflare/Resend e o APK comercial estiverem configurados, substituir o botão de acesso do cliente pelo endereço HTTPS real da central. Nunca copiar senhas ou secrets para este repositório público.

As conversas e regras são identificadas como exemplos ilustrativos. Não são screenshots do aplicativo, depoimentos ou resultados reais de clientes. Não foram inventados usuários, avaliações, estatísticas ou produtos disponíveis.

## Editar e verificar

Os textos e a estrutura das páginas são gerados por `build_site.py`; os estilos estão em `assets/css/store.css`, as interações em `assets/js/store.js`.

```powershell
python build_site.py
python validate_site.py
node --check assets/js/store.js
python -m http.server 8080
```

Abrir `http://localhost:8080`. Não usar duplo clique em HTML: as rotas são absolutas para o domínio raiz. A validação verifica páginas, links e âncoras internos, sitemap, dados estruturados, domínio e bloqueio de vendas.

`data/products.json` registra o catálogo editorial e os IDs públicos das ofertas. Alterar esse JSON não habilita cobrança automaticamente: revisar a central e os requisitos comerciais antes de modificar os botões.

## Antes de abrir vendas

1. Publicar e homologar a central Cloudflare e a entrega por e-mail.
2. Configurar suporte e identificação real do responsável pelas vendas.
3. Publicar condições completas de contratação, privacidade, cancelamento e reembolso do aplicativo.
4. Gerar e hospedar o APK assinado com a chave original, configurado com a API real.
5. Conectar a área do cliente e verificar a entrega sem efetuar cobranças não autorizadas.
6. Só então habilitar os planos na Cakto e trocar os botões por seus checkouts oficiais.

Não usar os APKs de conferência ou a página editorial `/cliente/` como se a entrega comercial já estivesse pronta.

## Publicação

Enviar os arquivos deste repositório ao mesmo GitHub Pages. Preservar `CNAME` e `.nojekyll`. Se o Pages já está configurado para a branch principal, o envio das alterações a ela atualiza o site. Revisar o menu no celular, as páginas e a acessibilidade visual antes de publicar: a navegação automatizada local não foi autorizada pelo navegador nesta sessão.


## Catálogo ampliado

NexOfício e PDF Scanner · SMT Scan têm páginas geradas por `catalog_pages.py`, com recursos e preços baseados nos projetos locais. Ambos permanecem em preparação, sem checkout, download ou teste disponível neste site.
