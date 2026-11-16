"""Responsive regression contract for the canonical Giovanni portfolio.

Requires: pip install playwright && python -m playwright install chromium
Run: python scripts/verify-responsive-layout.py --url http://127.0.0.1:4312/ --channel msedge
"""
import argparse
import json
import sys
from playwright.sync_api import sync_playwright

PORTRAIT_AND_DESKTOP = [
    (320, 640), (360, 740), (375, 667), (375, 812), (390, 844),
    (430, 932), (496, 883), (600, 850), (620, 860), (621, 860),
    (680, 900), (681, 900), (700, 900), (720, 900), (721, 900),
    (768, 1024), (820, 1180), (920, 1024), (921, 1024),
    (980, 760), (981, 760), (1023, 768), (1024, 768),
    (1100, 800), (1101, 800), (1200, 800), (1280, 720),
    (1366, 768), (1440, 900), (1920, 1080),
]
HEIGHT_AND_ORIENTATION = [
    (320, 568), (360, 640), (390, 667), (430, 740),
    (667, 375), (720, 400), (812, 375), (844, 390),
    (1024, 600), (1100, 600), (1280, 600), (1366, 768),
    (1920, 1080),
]
VIEWPORTS = list(dict.fromkeys(PORTRAIT_AND_DESKTOP + HEIGHT_AND_ORIENTATION))
LOCALES = ("pt", "en", "es")

CHECK = r"""() => {
  const el = selector => document.querySelector(selector);
  const box = selector => el(selector)?.getBoundingClientRect();
  const hero = box('#top');
  const copy = box('#top .hero-copy');
  const ticker = box('#top .ticker');
  const remote = box('#remote-work');
  const remoteCopy = el('#remote-work .remote-v4-copy');
  const media = el('#remote-work .remote-v4-media');
  const expected = (innerWidth <= 720 && innerWidth / innerHeight < 1.25)
    ? 'mobile' : innerWidth <= 1100 ? 'tablet' : 'desktop';
  const images = {
    mobile: '.hero-static-scene-mobile',
    tablet: '.hero-static-scene-tablet',
    desktop: '.hero-static-scene'
  };
  const active = el(images[expected]);
  const activeShown = getComputedStyle(active).display !== 'none' &&
    (expected !== 'mobile' || getComputedStyle(el('.hero-static-mobile-canvas')).display !== 'none');
  const overflowY = getComputedStyle(remoteCopy).overflowY;
  const clip = ['hidden', 'clip'].includes(overflowY)
    ? remoteCopy.scrollHeight - remoteCopy.clientHeight : 0;
  const overlap = copy.bottom - ticker.top;
  const full = (parent, child) => {
    if (!parent || !child) return false;
    return Math.abs(parent.x - child.x) <= 1 && Math.abs(parent.y - child.y) <= 1 &&
      Math.abs(parent.width-child.width) <= 1 && Math.abs(parent.height-child.height) <= 1;
  };
  let panelsOK = true;
  if (expected === 'mobile') {
    panelsOK = full(box('.hero-static-panel-progress'), box('.hero-panel-flow')) &&
      full(box('.hero-static-panel-systems'), box('.hero-panel-modules'));
  }
  return {
    width: innerWidth, height: innerHeight, expected, lang: document.documentElement.lang,
    horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
    tickerOffset: Math.round(ticker.bottom-hero.bottom),
    heroCopyOverlapsTicker: Math.max(0,Math.round(overlap)),
    remoteContentClip: clip,
    remoteCopyBottomOverflow: Math.max(0,Math.round(remoteCopy.getBoundingClientRect().bottom-remote.bottom)),
    remoteSectionHeight: Math.round(remote.height),
    remoteMediaHeight: Math.round(media.getBoundingClientRect().height),
    activeShown, activeLoaded: active.complete && active.naturalWidth > 0,
    panelsOK,
    version: [...document.styleSheets].some(s=>s.href?.includes('portfolio-responsive.css'))
  };
}"""

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:4312/")
    parser.add_argument("--channel", choices=["msedge", "chrome"], default=None)
    parser.add_argument("--smoke", action="store_true")
    parser.add_argument("--json", default=None, help="optional output report path")
    args = parser.parse_args()
    viewports = VIEWPORTS if not args.smoke else [
        (320, 640), (390, 844), (667, 375), (720, 900), (721, 900),
        (768, 1024), (1024, 768), (1100, 800), (1101, 800), (1440, 900)
    ]
    issues = []
    records = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel=args.channel, headless=True)
        page = browser.new_page(viewport={"width":390,"height":844}, device_scale_factor=1)
        errors = []
        page.on("pageerror", lambda err: errors.append(str(err)))
        for lang in LOCALES:
            for w,h in viewports:
                errors.clear()
                page.set_viewport_size({"width": w, "height": h})
                page.goto(args.url + ("&" if "?" in args.url else "?") +
                          f"lang={lang}&responsive_qa=r12-{w}-{h}",
                          wait_until="domcontentloaded", timeout=25000)
                try:
                    page.wait_for_function("""() => {
                      let w=innerWidth,h=innerHeight;
                      let mobile=w<=720 && w/h<1.25;
                      let selector=mobile?'.hero-static-scene-mobile':w<=1100?'.hero-static-scene-tablet':'.hero-static-scene';
                      let image=document.querySelector(selector);
                      return image && image.complete && image.naturalWidth>0;
                    }""", timeout=6500)
                except Exception:
                    pass
                result = page.evaluate(CHECK)
                result["requested_lang"] = lang
                faults = []
                for key in ("horizontalOverflow","heroCopyOverlapsTicker",
                            "remoteContentClip","remoteCopyBottomOverflow"):
                    limit = 2 if key == "heroCopyOverlapsTicker" else 6 if key == "remoteContentClip" else 2 if key=="remoteCopyBottomOverflow" else 1
                    if result[key] > limit:
                        faults.append(f"{key}={result[key]}")
                if abs(result["tickerOffset"]) > 3: faults.append("ticker_not_at_hero_end")
                if not result["activeShown"] or not result["activeLoaded"]: faults.append("active_image_missing")
                if not result["panelsOK"]: faults.append("panel_not_full_bleed")
                if not result["version"]: faults.append("responsive_contract_not_loaded")
                if errors: faults.append("page_js_error")
                result["failures"] = faults
                records.append(result)
                if faults: issues.append(result)
                if faults:
                    print("FAIL", lang, f"{w}x{h}", ",".join(faults), flush=True)
        reduced = browser.new_page(viewport={"width":390,"height":844}, reduced_motion="reduce")
        reduced.goto(args.url + ("&" if "?" in args.url else "?") +
                     "lang=pt&responsive_qa=reduced_motion", wait_until="domcontentloaded")
        if reduced.evaluate("getComputedStyle(document.querySelector('.hero-mobile-flare-core')).animationName") != "none":
            issues.append({"failures": ["reduced_motion_ignored"]})
        reduced.close()
        page.close()
        browser.close()
    if args.json:
        with open(args.json, "w", encoding="utf8") as f:
            json.dump(records, f, ensure_ascii=False, indent=2)
    print("RESPONSIVE_TESTS", len(records), "FAILED", len(issues),
          "MOBILE_TABLET_DESKTOP", "PT_EN_ES", flush=True)
    if issues:
        sys.exit(1)

if __name__ == "__main__":
    main()
