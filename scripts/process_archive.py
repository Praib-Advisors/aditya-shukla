"""Builds the photographs shown in the home page's "Photographic archive" carousel.

The client supplied these photographs numbered in the order they are to appear: 1, 2 ... 16 and "16 (2)", kept in
scripts/archive-source. Each is re-encoded exactly as scripts/process_photos.py does (no EXIF/GPS metadata, rotated
upright, 2000px at most on the long edge) and written to public/photos/archive-NN.jpg, NN being the position in the
carousel. Their pixel sizes are added to src/content/photos.generated.json; the entries in src/content/media.ts
(archivePhotos) say which caption each one gets.

Run from the project root:  python -I scripts/process_archive.py
"""
import json, os
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "archive-source")
OUT = os.path.join(HERE, "..", "public", "photos")
META = os.path.join(HERE, "..", "src", "content", "photos.generated.json")

# In carousel order. The file names are the client's numbering.
ORDER = [
    "1.png", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpg", "8.jpeg", "9.jpeg", "10.jpeg",
    "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg", "16 (2).jpeg",
]

meta = json.load(open(META))
for n, name in enumerate(ORDER, 1):
    slug = f"archive-{n:02d}"
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, name))).convert("RGB")
    im.thumbnail((2000, 2000), Image.LANCZOS)
    im.save(os.path.join(OUT, slug + ".jpg"), "JPEG", quality=86, optimize=True, progressive=True)
    meta[slug] = {"w": im.width, "h": im.height, "src": "archive-source/" + name}
    print(slug, name, im.size)
json.dump(meta, open(META, "w"), indent=1)
print(len(ORDER), "archive photographs written")
