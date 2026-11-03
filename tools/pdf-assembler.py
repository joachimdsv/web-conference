#!/usr/bin/env python3
"""Assemble presentation/pages-finales/*.jpg en presentation/presentation-finale.pdf (16:9)."""
import glob, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pages = sorted(glob.glob(os.path.join(ROOT, 'presentation', 'pages-finales', '*.jpg')))
imgs = [Image.open(p).convert('RGB') for p in pages]
out = os.path.join(ROOT, 'presentation', 'presentation-finale.pdf')
imgs[0].save(out, save_all=True, append_images=imgs[1:], resolution=144)
print(len(imgs), 'pages ->', out, round(os.path.getsize(out) / 1e6, 1), 'Mo')
