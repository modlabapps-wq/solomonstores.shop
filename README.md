# SOLOMON STORES

Site estático em HTML5, CSS3, JavaScript puro e JSON, preparado para GitHub Pages e automação via n8n.

## Como testar localmente

Não abra apenas o `index.html` com duplo clique, pois `fetch()` pode ser bloqueado pelo navegador em `file://`.

No terminal, dentro da pasta do projeto, rode:

```bash
python -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. Ative o GitHub Pages para a branch principal.
4. Configure o domínio `solomonstores.shop`.
5. Ajuste os registros DNS conforme o GitHub indicar.

## Como adicionar um produto

1. Crie um arquivo:
   `data/produtos/ASIN.json`
2. Adicione uma referência em:
   `data/index.json`

Não é necessário editar o HTML.

## Automação futura com n8n

O n8n poderá:
- criar JSON individual de produto;
- atualizar preço;
- alterar disponibilidade;
- atualizar histórico;
- alterar score;
- atualizar status;
- adicionar item ao index.json.

## Campos preparados

`status`:
- NOVO
- SITE_PUBLICADO
- VIDEO_PENDENTE
- VIDEO_PRONTO
- PUBLICADO
- EXPIRADO

`score`: nota futura calculada pelo n8n.

## Importante

Os 8 produtos incluídos são apenas dados demonstrativos. Substitua URLs, imagens, preços e links por dados reais obtidos de fontes permitidas.

O link de afiliado de demonstração aponta apenas para a página inicial da Amazon.
