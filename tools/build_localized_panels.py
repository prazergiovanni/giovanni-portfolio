from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "remote"
SOURCE = Image.open(ASSET_DIR / "REMOTE_PANEL_REFERENCE_COMPOSITE_EN_20260930.png").convert("RGBA")
WIDTH, HEIGHT = SOURCE.size
FONT_PATH = r"C:\Windows\Fonts\consolab.ttf"
ANGLE = 3.7


def add_component_text_mask(mask, rect, predicate, component_filter, dilation=7):
    x0, y0, x1, y1 = rect
    rgba = np.asarray(SOURCE)
    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3]
    crop = rgb[y0:y1, x0:x1]
    local = (np.fromiter(
        (255 if predicate(tuple(int(v) for v in pixel)) else 0 for pixel in crop.reshape(-1, 3)),
        dtype=np.uint8,
        count=crop.shape[0] * crop.shape[1],
    ).reshape(crop.shape[:2]))
    local[alpha[y0:y1, x0:x1] < 40] = 0
    components, labels, stats, _ = cv2.connectedComponentsWithStats(local, 8)
    selected = np.zeros_like(local)
    for component in range(1, components):
        x, y, width, height, area = stats[component]
        if component_filter(int(x), int(y), int(width), int(height), int(area)):
            selected[labels == component] = 255
    if dilation:
        size = dilation * 2 + 1
        selected = cv2.dilate(selected, np.ones((size, size), np.uint8), iterations=1)
    mask[y0:y1, x0:x1] = np.maximum(mask[y0:y1, x0:x1], selected)


def restore_glass_without_glyphs():
    rgba = np.asarray(SOURCE).copy()
    rgb = rgba[:, :, :3]
    mask = np.zeros((HEIGHT, WIDTH), dtype=np.uint8)

    # Remove only connected glyph components. This avoids repainting the
    # transparent outside of the tilted panel or erasing its decorative lines.
    add_component_text_mask(
        mask,
        (190, 100, 1370, 300),
        lambda p: p[0] > 175 and p[1] > 140 and p[2] > 75 and p[0] - p[2] > 25,
        lambda x, y, w, h, area: (
            area > 300 and 8 <= w <= 95 and 35 <= h <= 105
        ),
        dilation=18,
    )
    add_component_text_mask(
        mask,
        (190, 100, 1370, 300),
        lambda p: p[0] > 150 and p[1] > 125 and p[2] > 70 and p[0] - p[2] > 18,
        lambda x, y, w, h, area: (
            area > 25 and 2 <= w <= 34 and 8 <= h <= 34
            and abs((y + 100 + h / 2) - (275 - 0.13 * ((x + 190 + w / 2) - 70))) < 58
        ),
        dilation=10,
    )
    add_component_text_mask(
        mask,
        (350, 220, 1160, 345),
        lambda p: min(p) > 120 and max(p) - min(p) < 95,
        lambda x, y, w, h, area: (
            area > 18 and 3 <= w <= 35 and 7 <= h <= 38
        ),
        dilation=12,
    )
    for y0, y1 in ((355, 420), (445, 510), (535, 600), (625, 690), (715, 780), (805, 870)):
        add_component_text_mask(
            mask,
            (1165, y0, 1455, y1),
            lambda p: min(p) > 100 and max(p) - min(p) < 100,
            lambda x, y, w, h, area: area > 12 and 2 <= w <= 36 and 7 <= h <= 32,
            dilation=4,
        )

    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    repaired = cv2.inpaint(bgr, mask, 7, cv2.INPAINT_TELEA)
    rgba[:, :, :3] = cv2.cvtColor(repaired, cv2.COLOR_BGR2RGB)
    return Image.fromarray(rgba, "RGBA")


def tracked_width(draw, text, font, tracking):
    return sum(draw.textlength(char, font=font) for char in text) + max(0, len(text) - 1) * tracking


def draw_tracked(draw, xy, text, font, fill, tracking, stroke_width=0, stroke_fill=None):
    x, y = xy
    for char in text:
        draw.text(
            (x, y),
            char,
            font=font,
            fill=fill,
            stroke_width=stroke_width,
            stroke_fill=stroke_fill,
        )
        x += draw.textlength(char, font=font) + tracking


def render_text(text, font, fill, tracking, glow, glow_radius, stroke_width=0, stroke_fill=None):
    probe = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    width = int(tracked_width(probe, text, font, tracking)) + 80
    bbox = probe.textbbox((0, 0), text, font=font)
    height = max(80, bbox[3] - bbox[1] + 80)
    layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    x = 40
    y = 40 - bbox[1]
    glow_layer = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    draw_tracked(ImageDraw.Draw(glow_layer), (x, y), text, font, glow, tracking)
    layer = Image.alpha_composite(layer, glow_layer.filter(ImageFilter.GaussianBlur(glow_radius)))
    draw_tracked(
        ImageDraw.Draw(layer),
        (x, y),
        text,
        font,
        fill,
        tracking,
        stroke_width,
        stroke_fill,
    )
    bbox = layer.getbbox()
    return layer.crop(bbox) if bbox else layer


def fit_width(layer, max_width):
    if layer.width <= max_width:
        return layer
    return layer.resize((max_width, round(layer.height * max_width / layer.width)), Image.Resampling.LANCZOS)


def composite_center(base, layer, center):
    base.alpha_composite(layer, (round(center[0] - layer.width / 2), round(center[1] - layer.height / 2)))


def add_rotated(
    base,
    text,
    font,
    fill,
    tracking,
    glow,
    glow_radius,
    center,
    max_width=None,
    stroke_width=0,
    stroke_fill=None,
):
    layer = render_text(text, font, fill, tracking, glow, glow_radius, stroke_width, stroke_fill)
    if max_width:
        layer = fit_width(layer, max_width)
    composite_center(base, layer.rotate(ANGLE, resample=Image.Resampling.BICUBIC, expand=True), center)


def add_rotated_left(base, text, font, fill, tracking, glow, glow_radius, left, center_y, max_width=None):
    layer = render_text(text, font, fill, tracking, glow, glow_radius)
    if max_width:
        layer = fit_width(layer, max_width)
    rotated = layer.rotate(ANGLE, resample=Image.Resampling.BICUBIC, expand=True)
    composite_center(base, rotated, (left + rotated.width / 2, center_y))


def build(code, title, region, items):
    image = restore_glass_without_glyphs()
    title_font = ImageFont.truetype(FONT_PATH, 96)
    region_font = ImageFont.truetype(FONT_PATH, 36)
    item_font = ImageFont.truetype(FONT_PATH, 25)
    gold = (255, 230, 166, 255)
    white = (247, 249, 250, 255)

    # Same angle, centers, hierarchy and panel bounds as the frozen EN frame.
    title_probe = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    title_base_width = sum(title_probe.textlength(char, font=title_font) for char in title)
    title_tracking = (1050 - title_base_width) / max(1, len(title) - 1)
    add_rotated(
        image,
        title,
        title_font,
        gold,
        title_tracking,
        (255, 190, 64, 220),
        12,
        (780, 207),
    )
    add_rotated(image, region, region_font, white, 7, (160, 218, 255, 100), 5, (780, 293), 760)
    for y, item in zip((397, 487, 577, 667, 757, 847), items):
        add_rotated_left(image, item, item_font, white, 2, (155, 211, 245, 75), 3, 1180, y, 250)

    image.save(ASSET_DIR / f"REMOTE_PANEL_REFERENCE_COMPOSITE_{code}_20261018.png", optimize=True)


build("PT", "OPERAÇÕES NOS EUA", "CAROLINA DO NORTE + SUL", [
    "MERCADO IMOBILIÁRIO", "OPERAÇÕES", "CRM", "SUPORTE A CLIENTES", "MARKETING", "COORDENAÇÃO"
])
build("ES", "OPERACIONES EN EE. UU.", "CAROLINA DEL NORTE + SUR", [
    "SECTOR INMOBILIARIO", "OPERACIONES", "CRM", "ATENCIÓN AL CLIENTE", "MARKETING", "COORDINACIÓN"
])
