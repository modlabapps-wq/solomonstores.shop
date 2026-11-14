from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parent
class Document(HTMLParser):
    def __init__(self,path):
        super().__init__(convert_charrefs=True);self.path=path;self.refs=[];self.ids=set();self.title=False;self.viewport=False;self.canonical=False;self.main=False;self.lang=False;self.errors=[];self.in_ld=False;self.ld=''
    def handle_starttag(self,tag,attributes):
        a=dict(attributes)
        if 'id' in a:
            if a['id'] in self.ids:self.errors.append('duplicate id '+a['id'])
            self.ids.add(a['id'])
        if tag=='html':self.lang=a.get('lang')=='pt-BR'
        if tag=='title':self.title=True
        if tag=='main':self.main=True
        if tag=='meta' and a.get('name')=='viewport':self.viewport=True
        if tag=='link' and a.get('rel')=='canonical':self.canonical=True
        if tag=='script' and a.get('type')=='application/ld+json':self.in_ld=True;self.ld=''
        for key in ['href','src']:
            if key in a:self.refs.append((tag,a[key]))
    def handle_data(self,data):
        if self.in_ld:self.ld+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.in_ld:
            json.loads(self.ld);self.in_ld=False

docs={}
for path in ROOT.rglob('*.html'):
    if '.git' in path.parts:continue
    doc=Document(path);doc.feed(path.read_text(encoding='utf-8'));docs[path.resolve()]=doc
errors=[];refs=0
for path,doc in docs.items():
    errors.extend(f'{path.name}: {e}' for e in doc.errors)
    if not doc.lang or not doc.title:errors.append(f'{path.name}: missing language/title')
    for tag,ref in doc.refs:
        if ref.startswith(('mailto:','tel:','data:')):continue
        u=urlsplit(ref)
        if u.scheme or u.netloc:continue
        refs+=1
        target=(ROOT/u.path.lstrip('/') if u.path.startswith('/') else path.parent/u.path).resolve() if u.path else path
        if target.is_dir():target=target/'index.html'
        if not target.is_file():errors.append(f'{path.relative_to(ROOT)}: missing {ref}');continue
        if u.fragment and target in docs and unquote(u.fragment) not in docs[target].ids:errors.append(f'{path.relative_to(ROOT)}: missing anchor {ref}')
    if path.parent!=ROOT or path.name in ['index.html','politica-privacidade.html','termos.html']:
        if not doc.viewport or not doc.main or not doc.canonical:errors.append(f'{path.name}: missing viewport/main/canonical')
assert (ROOT/'CNAME').read_text().strip()=='solomonstores.shop','Domain changed'
ET.parse(ROOT/'sitemap.xml')
assert len(list((ROOT/'autokyro').glob('index.html')))==1
launch=json.loads((ROOT/'data/autokyro-launch.json').read_text(encoding='utf8'))
html=(ROOT/'automatize-facil/index.html').read_text(encoding='utf8')
assert len(launch['plans'])==3
assert [(p['priceCents'],p['maxDevices'],p['periodDays']) for p in launch['plans']]==[(2990,1,30),(7990,1,90),(23990,1,365)]
if launch['salesEnabled']:
    for plan in launch['plans']:assert ('https://pay.cakto.com.br/'+plan['offerId']) in html
else:assert 'disabled>Compras em preparação' in html,'Sales must remain unavailable before launch'
assert not any('/node_modules/' in str(p) for p in docs)
if errors:raise SystemExit('\n'.join(errors))
print(f'Validated {len(docs)} HTML pages and {refs} local references. CNAME preserved; launch state checked; sitemap and structured data valid.')
