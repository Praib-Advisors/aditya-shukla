"""Copies the curated source photographs into public/photos.

Originals are never modified. Output is re-encoded without EXIF/GPS metadata, rotated upright and capped at
2000px on the long edge. Writes src/content/photos.generated.json with each photo's pixel size.
Photos left out on purpose: the photograph showing a residential nameplate (772232410), duplicates and 206px
thumbnails, two selfies (650766601, 702571004) and the temple visits (489..., 789..., 790...).
"""
import json, os, sys
from PIL import Image, ImageOps

SRC = r"C:/Users/syada/Desktop/pr data/adityashukla"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "photos")
META = os.path.join(os.path.dirname(__file__), "..", "src", "content", "photos.generated.json")

# slug -> prefix of the source filename (the numeric id Facebook gave it)
PICK = {
    "portrait-flags": "497441373", "portrait-conference": "539505125", "portrait-summit": "791110594",
    "supreme-court-steps": "513908589", "supreme-court-lawn": "514039464", "supreme-court-robes": "513247226",
    "summit-banner-wide": "794096223", "summit-with-delegate": "792207386",
    "summit-lobby": "791907477", "expo-inauguration": "768284845",
    "convocation": "489791378",
    "memento-minister-1": "535106609", "memento-minister-2": "597847460", "memento-minister-3": "835061000",
    "memento-minister-4": "838790760",
    "meeting-office-flag": "622076712", "meeting-up-secretariat": "514357892", "meeting-bouquet-1": "600334301",
    "meeting-bouquet-2": "622295120", "meeting-bouquet-3": "615442172", "meeting-seated-1": "734153257",
    "meeting-seated-2": "741727205", "meeting-seated-3": "679227644", "meeting-group-flag": "742462396",
    "meeting-formal-1": "737325517", "meeting-formal-2": "738653811", "meeting-office-1": "813832331",
    "meeting-office-2": "821597876", "meeting-office-3": "823234760", "meeting-hall-1": "764110937",
    "meeting-couch": "777716643", "meeting-stage": "736413327",
    "org-desk": "611250099",
    "org-memento-desk": "734128974",
    # Added later, from the photographs that were not yet on the site.
    "news-railway-committee": "104969516", "meeting-bouquet-4": "148681277", "org-backdrop-1": "151459730",
    "convocation-group": "489790907", "convocation-ceremony": "489822983", "supreme-court-front": "513714701",
    "meeting-formal-3": "612501216", "meeting-seer": "622700455", "meeting-formal-4": "624849479",
    "org-session-3": "625255254", "meeting-memento-1": "648801686", "meeting-bouquet-5": "700998024",
    "meeting-office-4": "707235736", "meeting-collage": "707902450", "org-session-4": "736683201",
    "meeting-memento-2": "740249482", "meeting-formal-5": "76710764", "conference-delegates": "792159139",
}
# Replaced by hand with enhanced versions (higher resolution, corrected colour). The script leaves these files alone.
ENHANCED = {"portrait-conference", "supreme-court-robes"}
# Images downloaded from naredcouttarpradesh.in (the chapter's own site), kept in scripts/naredco-source.
EXTRA = {
    "naredco-official-portrait": "president.png",
    "up-real-estate-summit-2026": "upsummit.jpeg",
    "mahi-convention": "mahi.jpeg",
    "governing-council-meeting": "meeting.jpeg",
}
os.makedirs(OUT, exist_ok=True)
files = [f for f in os.listdir(SRC) if not f.lower().endswith(".pdf")]
meta = json.load(open(META)) if os.path.exists(META) else {}
for slug, pre in PICK.items():
    if slug in ENHANCED and slug in meta:
        continue
    m = [f for f in files if f.startswith(pre)]
    if not m:
        print("SKIP", slug, pre); continue
    # Facebook downloads sometimes come with a 206px thumbnail beside the real file: take the biggest.
    m = [max(m, key=lambda f: os.path.getsize(os.path.join(SRC, f)))]
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, m[0]))).convert("RGB")
    im.thumbnail((2000, 2000), Image.LANCZOS)
    im.save(os.path.join(OUT, slug + ".jpg"), "JPEG", quality=86, optimize=True, progressive=True)
    meta[slug] = {"w": im.width, "h": im.height, "src": m[0]}
for slug, fn in EXTRA.items():
    im = ImageOps.exif_transpose(Image.open(os.path.join(os.path.dirname(__file__), "naredco-source", fn))).convert("RGB")
    im.thumbnail((2000, 2000), Image.LANCZOS)
    im.save(os.path.join(OUT, slug + ".jpg"), "JPEG", quality=88, optimize=True, progressive=True)
    meta[slug] = {"w": im.width, "h": im.height, "src": "naredcouttarpradesh.in/" + fn}
json.dump(meta, open(META, "w"), indent=1)
print(len(meta), "photos written")
