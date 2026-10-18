from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
asset_dir = ROOT / "assets" / "remote"
source = Image.open(asset_dir / "REMOTE_PANEL_REFERENCE_COMPOSITE_EN_20260930.png").convert("RGBA")
font_path = r"C:\Windows\Fonts\consolab.ttf"
font_title = ImageFont.truetype(font_path, 96)
font_region = ImageFont.truetype(font_path, 36)
font_item = ImageFont.truetype(font_path, 25)

def fit_title_font(draw, text, max_width=1050):
    size = 96
    while size > 64:
        font = ImageFont.truetype(font_path, size)
        if tracked_width(draw, text, font, 6) <= max_width:
            return font
        size -= 1
    return ImageFont.truetype(font_path, 64)

def tracked_width(draw, text, font, tracking):
    return sum(draw.textlength(char, font=font) for char in text) + max(0, len(text) - 1) * tracking

def draw_tracked(draw, xy, text, font, fill, tracking):
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += draw.textlength(char, font=font) + tracking

def centered(draw, box, text, font, fill, tracking=0):
    x0, y0, x1, y1 = box
    bbox = draw.textbbox((0, 0), text, font=font, stroke_width=0)
    width = tracked_width(draw, text, font, tracking)
    x = x0 + ((x1 - x0) - width) / 2
    y = y0 + ((y1 - y0) - (bbox[3] - bbox[1])) / 2 - bbox[1]
    draw_tracked(draw, (x, y), text, font, fill, tracking)

def apply_feathered_patch(image, rect, patch, feather=24):
    x0, y0, x1, y1 = rect
    width, height = patch.size
    mask = Image.new("L", (width, height), 0)
    mp = mask.load()
    for y in range(height):
        for x in range(width):
            edge = min(x, y, width - 1 - x, height - 1 - y)
            mp[x, y] = min(255, round(edge * 255 / feather))
    image.paste(patch, (x0, y0), mask)

def replace_with_soft_glass(image, rect, radius):
    """Erase baked glyphs while retaining a feathered version of the glass."""
    x0, y0, x1, y1 = rect
    patch = source.crop((x0, y0, x1 + 1, y1 + 1)).filter(ImageFilter.GaussianBlur(radius))
    apply_feathered_patch(image, rect, patch, feather=28)

def replace_list_glass(image, rect):
    """Use the clean left edge of the list glass as its local background."""
    x0, y0, x1, y1 = rect
    patch = Image.new("RGBA", (x1 - x0 + 1, y1 - y0 + 1))
    source_px = source.load()
    patch_px = patch.load()
    for y in range(y0, y1 + 1):
        color = source_px[1155, y]
        for x in range(x0, x1 + 1):
            patch_px[x - x0, y - y0] = color
    apply_feathered_patch(image, rect, patch, feather=22)

def build(code, title, region, items):
    image = source.copy()
    # The source is the frozen EN composite. Only the title/list text zones
    # are rebuilt from untouched glass samples; map, glows and borders survive.
    replace_with_soft_glass(image, (185, 92, 1375, 355), 32)
    replace_list_glass(image, (1155, 346, 1470, 888))

    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    gold = (255, 230, 166, 255)
    white = (247, 249, 250, 255)
    localized_title_font = fit_title_font(draw, title)

    # Match the EN tracking and luminous hierarchy.
    centered(draw, (230, 120, 1345, 235), title, localized_title_font, gold, tracking=6)
    centered(draw, (360, 246, 1210, 316), region, font_region, white, tracking=7)
    draw.line((135, 330, 380, 318), fill=(255, 205, 85, 255), width=3)
    draw.line((1170, 263, 1420, 247), fill=(255, 205, 85, 255), width=3)

    # Replace list text only; icons, glows and panel lines remain from EN.
    y_positions = [385, 475, 565, 655, 745, 835]
    for y, item in zip(y_positions, items):
        draw_tracked(draw, (1180, y), item, font_item, white, tracking=2)
        draw.line((1180, y + 43, 1460, y + 43), fill=(190, 214, 226, 210), width=1)

    image = Image.alpha_composite(image, overlay)
    image.save(asset_dir / f"REMOTE_PANEL_REFERENCE_COMPOSITE_{code}_20261018.png", optimize=True)

build("PT", "OPERAÇÕES NOS EUA", "CAROLINA DO NORTE + SUL", [
    "MERCADO IMOBILIÁRIO", "OPERAÇÕES", "CRM", "SUPORTE A CLIENTES", "MARKETING", "COORDENAÇÃO"
])
build("ES", "OPERACIONES EN EE. UU.", "CAROLINA DEL NORTE + SUR", [
    "SECTOR INMOBILIARIO", "OPERACIONES", "CRM", "ATENCIÓN AL CLIENTE", "MARKETING", "COORDINACIÓN"
])
