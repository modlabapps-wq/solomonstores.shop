-- Release metadata only. No license, customer or device changes.
INSERT INTO app_releases(id,product_id,version_name,version_code,download_url,mandatory,minimum_supported_version,release_notes,sha256,published_at)
SELECT 'automatize-facil-1.1.2-10','autokyro','1.1.2',10,'https://autokyro-cloud.autokyro-license-center.workers.dev/downloads/Automatize-Facil-1.1.2.apk',0,1,'Nova identidade Automatize Fácil, interface azul, navegação reorganizada, planos para 1 celular e melhorias na ativação. Faça backup antes de atualizar.','8f8826511e0b60f0e7d417a6da1791a88fe47ea1f0b497afa5c78b5ce33fefc5',strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE NOT EXISTS(SELECT 1 FROM app_releases WHERE product_id='autokyro' AND version_code=10);
