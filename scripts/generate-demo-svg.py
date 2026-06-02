#!/usr/bin/env python3
"""Generate a terminal demo SVG for the README."""

import os
import textwrap

WIDTH = 800
HEIGHT = 880
COLS = 62
FONT_SIZE = 14
LINE_H = 22
PAD_X = 25
PAD_Y = 45

lines = [
    ("", ""),
    ("", " \x1b[38;5;47m~\x1b[0m \x1b[1mNumb.Design\x1b[0m \x1b[38;5;240mv1.0.0\x1b[0m"),
    ("", ""),
    ("", " \x1b[38;5;33m?\x1b[0m \x1b[1mWhat are you building?\x1b[0m"),
    ("", "   \x1b[38;5;245mLanding Page\x1b[0m"),
    ("", "   \x1b[38;5;47m\u25c9 Dashboard\x1b[0m"),
    ("", "   \x1b[38;5;245mE-Commerce\x1b[0m"),
    ("", "   \x1b[38;5;245mPortfolio\x1b[0m"),
    ("", "   \x1b[38;5;245mBlog\x1b[0m"),
    ("", "   \x1b[38;5;245mSaaS App\x1b[0m"),
    ("", "   \x1b[38;5;245mWeb App\x1b[0m"),
    ("", ""),
    ("", " \x1b[38;5;33m?\x1b[0m \x1b[1mPick your style:\x1b[0m"),
    ("", "   \x1b[38;5;245mModern\x1b[0m"),
    ("", "   \x1b[38;5;245mMinimal\x1b[0m"),
    ("", "   \x1b[38;5;47m\u25c9 Dark\x1b[0m"),
    ("", "   \x1b[38;5;245mGlassmorphic\x1b[0m"),
    ("", "   \x1b[38;5;245mPlayful\x1b[0m"),
    ("", "   \x1b[38;5;245mBrutalist\x1b[0m"),
    ("", ""),
    ("", " \x1b[38;5;33m?\x1b[0m \x1b[1mSelect features:\x1b[0m"),
    ("", "   \x1b[38;5;47m\u2611 Animations\x1b[0m"),
    ("", "   \x1b[38;5;245m\u2610 3D Graphics\x1b[0m"),
    ("", "   \x1b[38;5;47m\u2611 Charts\x1b[0m"),
    ("", "   \x1b[38;5;245m\u2610 Forms\x1b[0m"),
    ("", "   \x1b[38;5;245m\u2610 Auth\x1b[0m"),
    ("", "   \x1b[38;5;47m\u2611 Icons\x1b[0m"),
    ("", ""),
    ("", " \x1b[38;5;47m\u2714\x1b[0m \x1b[1mInstall plan generated!\x1b[0m"),
    ("", ""),
    ("", "   \x1b[38;5;33m$\x1b[0m npm install next react react-dom tailwindcss"),
    ("", "   \x1b[38;5;33m$\x1b[0m npm install framer-motion lucide-react recharts"),
    ("", "   \x1b[38;5;33m$\x1b[0m npx shadcn@latest init"),
    ("", ""),
    ("", "   \x1b[38;5;240m8 packages \u00b7 zero bloat \u00b7 ready in 30s\x1b[0m"),
    ("", ""),
    ("", " \x1b[38;5;33m?\x1b[0m \x1b[1mRun this install plan now?\x1b[0m  \x1b[38;5;47m(Y/n)\x1b[0m"),
]

def strip_ansi(s):
    import re
    return re.sub(r'\x1b\[[0-9;]*[mK]', '', s)

def ansi_to_html(s):
    """Convert ANSI codes to inline styles."""
    import re
    parts = re.split(r'(\x1b\[[0-9;]*m)', s)
    styles = []
    result = []
    for part in parts:
        if part.startswith('\x1b['):
            codes = part[2:-1].split(';')
            for c in codes:
                if c == '0':
                    styles = []
                elif c == '1':
                    styles.append('font-weight:bold')
                elif c == '38;5;47':
                    styles = [s for s in styles if 'color' not in s]
                    styles.append('color:#50fa7b')
                elif c == '38;5;33':
                    styles = [s for s in styles if 'color' not in s]
                    styles.append('color:#61afef')
                elif c == '38;5;245':
                    styles = [s for s in styles if 'color' not in s]
                    styles.append('color:#888888')
                elif c == '38;5;240':
                    styles = [s for s in styles if 'color' not in s]
                    styles.append('color:#585858')
        else:
            if styles:
                result.append(f'<tspan style="{";".join(styles)}">{part}</tspan>')
            else:
                result.append(f'<tspan>{part}</tspan>')
    return ''.join(result)

svg_parts = []
svg_parts.append(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" width="100%" style="max-width:800px;border-radius:12px">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1a1b26"/>
    <stop offset="100%" stop-color="#0f0f15"/>
  </linearGradient>
  <style>
    text {{ font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; font-size: {FONT_SIZE}px; }}
  </style>
</defs>
<rect width="{WIDTH}" height="{HEIGHT}" fill="url(#bg)" rx="12"/>

<!-- Title bar -->
<rect x="0" y="0" width="{WIDTH}" height="32" fill="#2a2b3d" rx="12"/>
<rect x="0" y="16" width="{WIDTH}" height="16" fill="#2a2b3d"/>
<circle cx="16" cy="16" r="6" fill="#ff5555"/>
<circle cx="34" cy="16" r="6" fill="#f1fa8c"/>
<circle cx="52" cy="16" r="6" fill="#50fa7b"/>
<text x="{WIDTH//2}" y="21" text-anchor="middle" fill="#888888" font-size="12">numb-design — npx numb-design init</text>
''')

for i, (_, content) in enumerate(lines):
    y = PAD_Y + i * LINE_H
    if not content:
        svg_parts.append(f'<text x="{PAD_X}" y="{y}"> </text>')
    else:
        html = ansi_to_html(content)
        svg_parts.append(f'<text x="{PAD_X}" y="{y}" xml:space="preserve">{html}</text>')

svg_parts.append('</svg>')

os.makedirs('public', exist_ok=True)
with open('public/demo-terminal.svg', 'w') as f:
    f.write('\n'.join(svg_parts))

print("Created public/demo-terminal.svg")
