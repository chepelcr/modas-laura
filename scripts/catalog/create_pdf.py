"""Rebuild the supplied corporate catalog using the approved site identity.
Run with reportlab, Pillow and pypdf available. Originals remain in diseños/.
"""
import json
import subprocess
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / 'public/assets'
OUTPUT = ASSETS / 'catalogo-corporativo-modas-laura.pdf'
data = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {corporateCatalog, customDesigns} from './src/content/site.js'; console.log(JSON.stringify({corporateCatalog, customDesigns}));"
], cwd=ROOT, text=True))
catalog = data['corporateCatalog']
FONT = Path('/System/Library/Fonts/Supplemental')
for name, file in [('Body','Arial.ttf'),('BodyBold','Arial Bold.ttf'),('Editorial','Georgia.ttf'),('EditorialItalic','Georgia Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT/file)))
W,H = 595.276,841.89
FOREST,IVORY,INK,MUTED = map(HexColor,['#23564f','#f7f2e8','#28332f','#56645c'])
c = canvas.Canvas(str(OUTPUT), pagesize=(W,H), pageCompression=1)
c.setTitle('Catálogo corporativo | Modas Laura')
c.setAuthor('Modas Laura · Vilma Corella Artavia')
def text(x,y,value,size=11,font='Body',color=INK):
    c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,value)
def para(value,x,y,width,size=11,color=INK):
    p=Paragraph(value,ParagraphStyle('copy',fontName='Body',fontSize=size,leading=size*1.5,textColor=color))
    _,height=p.wrap(width,200);p.drawOn(c,x,y-height)
def image(file,x,y,w,h):
    im=Image.open(ASSETS/file);iw,ih=im.size;scale=min(w/iw,h/ih)
    c.drawImage(ImageReader(im),x+(w-iw*scale)/2,y+(h-ih*scale)/2,iw*scale,ih*scale,mask='auto')
def page(num):
    c.setFillColor(IVORY);c.rect(0,0,W,H,fill=1,stroke=0)
    image('logo.webp',42,H-110,205,68)
    text(42,46,'HECHO EN COSTA RICA · DESDE 1974',8,'BodyBold',FOREST)
    text(W-65,46,f'{num:02d}',10,'Body',FOREST)
    c.setStrokeColor(HexColor('#d5dace'));c.line(42,66,W-42,66)
def contact(y=137):
    text(42,y,'Conversemos sobre tu diseño',17,'Editorial',FOREST)
    text(42,y-25,'+506 8989-0512',12,'BodyBold',FOREST)
    c.linkURL('https://wa.me/50689890512', (42,y-29,175,y-12),relative=0)
    text(42,y-45,'vilmacorella@yahoo.com',11)
    c.linkURL('mailto:vilmacorella@yahoo.com',(42,y-49,240,y-34),relative=0)
page(1)
text(42,682,'CATÁLOGO CORPORATIVO',10,'BodyBold',FOREST)
text(42,631,'Un detalle con',36,'Editorial',FOREST)
text(42,585,'tu identidad.',36,'EditorialItalic',FOREST)
para('Almohaditas personalizadas para regalos corporativos. Cinco estilos para empezar a crear tu propuesta.',42,550,465,13)
image(catalog['coverImage'],60,295,475,205)
text(42,275,'Propuesta ilustrativa con nuestro logo.',8,'Body',MUTED)
text(42,252,'18 × 14 cm  /  22 × 20 cm  /  28 × 28 cm',14,'BodyBold',FOREST)
text(42,224,'Sublimado completo A4 · Almohada y funda con encaje',11)
text(42,202,'Por Vilma Corella Artavia',11)
contact(155)
c.showPage()
for num,style in enumerate(catalog['styles'],2):
    page(num)
    text(42,684,style['title'].upper(),10,'BodyBold',FOREST)
    text(42,635,style['size'],30 if len(style['size']) > 14 else 40,'Editorial',FOREST)
    text(42,605,style['measurementLabel'],10,'Body',MUTED)
    image(style['image'],65,292,465,285)
    text(42,262,'Almohada y funda con encaje' if style['id']=='estilo-5' else 'Diseño personalizado',22,'Editorial',FOREST)
    para(style['description'] + '<br/>Contanos el diseño, la cantidad y la fecha para consultar las opciones.',42,239,490,11)
    note = 'Propuesta ilustrativa con el logo de Modas Laura.' if style.get('illustrative') else 'Fotografía de un trabajo realizado. La marca mostrada pertenece a su titular.'
    para(note + ' Consultá precios y disponibilidad.',42,179,480,9,MUTED)
    contact(127)
    c.showPage()
records = [record for record in data['customDesigns'] if record.get('catalog', True)][1:]
for num,group in enumerate([records[:1], records[1:]],7):
    page(num)
    text(42,689,'TRABAJOS REALIZADOS',10,'BodyBold',FOREST)
    text(42,654,'Diseños con nombres',27,'Editorial',FOREST)
    if len(group) == 1:
        image(group[0]['image'],42,100,511,510)
    else:
        for index,record in enumerate(group):
            image(record['image'],42,355-index*260,511,250)
    c.showPage()
c.save()
print(OUTPUT)
