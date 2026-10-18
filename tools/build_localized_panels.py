from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
asset_dir = ROOT / "assets" / "remote"
source = Image.open(asset_dir / "REMOTE_PANEL_REFERENCE_COMPOSITE_EN_20260930.png").convert("RGBA")
font_path = r"C:\Windows\Fonts\consolab.ttf"
font_title = ImageFont.truetype(font_path, 68)
font_region = ImageFont.truetype(font_path, 28)
font_item = ImageFont.truetype(font_path, 25)

def centered(draw, box, text, font, fill, spacing=0):
    x0, y0, x1, y1 = box
    bbox = draw.textbbox((0, 0), text, font=font, stroke_width=0)
    x = x0 + ((x1 - x0) - (bbox[2] - bbox[0])) / 2
    y = y0 + ((y1 - y0) - (bbox[3] - bbox[1])) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=fill, spacing=spacing)

def build(code, title, region, items):
    image = source.copy()
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    panel = (8, 31, 48, 255)
    gold = (255, 230, 166, 255)
    white = (247, 249, 250, 255)

    # Replace only the baked English title while retaining the original panel, map and light.
    draw.rounded_rectangle((180, 95, 1390, 345), radius=18, fill=panel)
    centered(draw, (230, 125, 1345, 230), title, font_title, gold)
    centered(draw, (360, 242, 1210, 315), region, font_region, white)
    draw.line((135, 286, 380, 286), fill=(255, 205, 85, 255), width=3)
    draw.line((1170, 286, 1420, 286), fill=(255, 205, 85, 255), width=3)

    # Replace list text only; icons remain from the frozen EN composition.
    draw.rounded_rectangle((1145, 350, 1490, 940), radius=12, fill=panel)
    y_positions = [385, 475, 565, 655, 745, 835]
    for y, item in zip(y_positions, items):
        draw.text((1180, y), item, font=font_item, fill=white)
        draw.line((1180, y + 43, 1460, y + 43), fill=(190, 214, 226, 210), width=1)

    image = Image.alpha_composite(image, overlay)
    image.save(asset_dir / f"REMOTE_PANEL_REFERENCE_COMPOSITE_{code}_20261018.png", optimize=True)

build("PT", "OPERAÇÕES NOS EUA", "CAROLINA DO NORTE + SUL", [
    "MERCADO IMOBILIÁRIO", "OPERAÇÕES", "CRM", "SUPORTE A CLIENTES", "MARKETING", "COORDENAÇÃO"
])
build("ES", "OPERACIONES EN EE. UU.", "CAROLINA DEL NORTE + SUR", [
    "SECTOR INMOBILIARIO", "OPERACIONES", "CRM", "ATENCIÓN AL CLIENTE", "MARKETING", "COORDINACIÓN"
])
