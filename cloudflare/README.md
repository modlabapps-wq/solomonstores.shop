# Automatize Fácil Cloud

Código do Worker e da central publicados em produção em 7 de novembro de 2026. O site público continua na raiz deste repositório. O APK e a chave de assinatura são mantidos fora do Git público.

## Comportamento

- Central responsiva e três assinaturas oficiais para um celular.
- Entrada administrativa por e-mail permitida apenas ao proprietário configurado no servidor; senha preservada.
- Sessões administrativas e de cliente usam cookies distintos.
- Convites de teste de 30 dias, para um celular, com prazo contado da primeira ativação. Até dez destinatários por envio; envio idempotente por solicitação e e-mail. Exclusivo da identidade administrativa do proprietário.
- Licença pessoal permanente explícita, com validade nula no banco. O APK recebe uma autorização técnica curta renovável, conservando a política offline e a suspensão.
- Arquivamento recuperável e consulta opcional ao histórico.

## Validação

Node.js 24 ou posterior (SQLite integrado):

```sh
node cloudflare/tests/check-worker.mjs
node cloudflare/tests/check-email-login.mjs
node cloudflare/tests/check-trials.mjs
```

Os testes usam banco em memória e provedor simulado; não enviam mensagens reais nem acessam produção.

## Publicação

`src/worker.js` é o módulo `index.js`. Os assets em `public/` estão incorporados nas duas constantes iniciais do módulo; mantenha ambos sincronizados. Preserve todos os bindings existentes, secrets, compatibilidade e assets no upload, usando `keep_assets` e `keep_bindings` da API Cloudflare.

As migrações em `migrations/` já foram aplicadas em produção. Não execute novamente os comandos `ALTER TABLE`. A quarta migração identifica as sessões da única conta administrativa existente, autenticada pela senha do proprietário ou pelo e-mail permitido no servidor. Não atribua essa identidade a outras contas administrativas.

Antes de qualquer nova publicação, recupere o módulo ativo e compare com a versão esperada. Incorpore alterações concorrentes antes do upload. Não inclua credenciais, códigos de ativação, bancos ou backups de clientes no repositório.

## Versão Android 1.1.2

A central distribui o APK assinado de versão interna 10 pela rota protegida `/downloads/Automatize-Facil-1.1.2.apk`. O binding `APK_RELEASES` aponta para o KV privado `automatize-facil-downloads` (namespace `5ec2d8f16c334474aa731d38d2f0dd4c`). A chave imutável e o SHA-256 constam no Worker. Preserve também o binding ASSETS para os arquivos anteriores. DOWNLOAD_URL usa a nova rota. Nunca publique a chave de assinatura ou as credenciais.

A migração 006 apenas registra a versão e já foi aplicada em produção. O APK foi instalado em um Android 14 real, com 25 verificações instrumentadas e revisão de navegação de 11 telas. Isso não substitui o teste real de resposta do WhatsApp e de pagamento.

Os e-mails transacionais são gerados diretamente pelo Worker, não pelo template do painel Resend. Remetente, assuntos e conteúdo usam Automatize Fácil.
