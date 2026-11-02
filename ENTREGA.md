# Nova Solomon Stores — entrega

Preparado em 02/11/2026 a partir do commit `c3afd47` do repositório `modlabapps-wq/solomonstores.shop`, na branch local `codex/solomon-own-products`.

## Implementado

Nova marca visual em tons claros, carvão e verde, com layouts responsivos. Página principal de catálogo, página Autokyro com recursos/planos/FAQ, suporte, entrada do cliente, sobre, informações de privacidade/uso e página 404. Menu mobile com estado acessível, fechamento por Escape e respeito a movimento reduzido. Exemplos de conversa explicitamente ilustrativos.

O domínio em CNAME foi preservado. Sitemap, canonical, descrição, Open Graph e dados estruturados foram preparados. Endereços antigos apontam para o novo catálogo. Os scripts e dados de demonstração de afiliados foram removidos da nova versão; continuam recuperáveis no histórico Git.

## Verificado

`python validate_site.py`: 13 páginas HTML e 181 referências locais verificadas; links e âncoras sem destinos ausentes; sitemap e JSON-LD válidos; domínio preservado e compra desabilitada. `node --check assets/js/store.js` e `git diff --check` passaram.

Revisão visual em navegador ainda pendente. A sessão teve uma negativa de acesso do navegador a localhost; essa negativa não foi contornada. As verificações acima são de arquivos, estrutura e sintaxe, não um teste visual ou de interação no navegador.

## Publicação pendente

GitHub não estava conectado para escrita. A tentativa `git push --dry-run` não alterou o repositório remoto e confirmou ausência de autenticação disponível sem interação. Não houve publicação nem alteração de DNS ou GitHub Pages.

Conectar o GitHub ao Codex permite continuar o envio das alterações ao repositório informado. Também é possível aplicar o patch Git entregue sobre a base correspondente e publicar pelo fluxo habitual do proprietário. O ZIP contém a árvore nova de arquivos; se enviar manualmente, remover também os arquivos legados indicados no patch, pois upload de ZIP por si só não exclui arquivos antigos do GitHub.

## Vendas e área do cliente

Os três planos continuam com compra desabilitada. Não existe login simulado nesta página pública. O botão de acesso ao portal autenticado será habilitado quando a central Cloudflare tiver URL real, junto com remetente, APK assinado, suporte e informações comerciais completas. O site institucional pode ser publicado antes, mantendo esse estado de preparação.
