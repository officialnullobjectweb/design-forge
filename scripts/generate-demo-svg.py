#!/usr/bin/env python3
"""Generate a terminal demo SVG for the README with high contrast."""

import os

WIDTH = 810
HEIGHT = 890
PAD_OUTER = 10
TERM_X = PAD_OUTER
TERM_Y = PAD_OUTER
TERM_W = WIDTH - 2 * PAD_OUTER
TERM_H = HEIGHT - 2 * PAD_OUTER
FONT_SIZE = 14
LINE_H = 22
PAD_X = 25
PAD_Y = 65

lines = [
    ("", ""),
    ("", " \x1b[38;5;47m~\x1b[0m \x1b[1mNumb.Design\x1b[0m \x1b[38;5;240mv1.0.1\x1b[0m"),
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

COLOR_MAP = {
    47: '#4ade80',
    33: '#4ade80',
    245: '#86efac',
    240: '#ffffff',
}

def ansi_to_html(s):
    import re
    parts = re.split(r'(\x1b\[[0-9;]*m)', s)
    fg = None
    bold = False
    result = []
    for part in parts:
        if part.startswith('\x1b['):
            codes = part[2:-1].split(';')
            i = 0
            while i < len(codes):
                c = codes[i]
                if c == '0':
                    fg = None; bold = False
                elif c == '1':
                    bold = True
                elif c == '38' and i + 2 < len(codes) and codes[i+1] == '5':
                    color_num = int(codes[i+2])
                    fg = COLOR_MAP.get(color_num)
                    i += 2
                i += 1
        else:
            style = []
            if fg: style.append(f'fill:{fg}')
            if bold: style.append('font-weight:bold')
            if style:
                result.append(f'<tspan style="{";".join(style)}">{part}</tspan>')
            else:
                result.append(f'<tspan style="fill:#ffffff">{part}</tspan>')
    return ''.join(result)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" width="100%">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1e1e2e"/>
    <stop offset="100%" stop-color="#181825"/>
  </linearGradient>
  <style>
    text {{ font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; font-size: {FONT_SIZE}px; }}
  </style>
</defs>
<rect width="{WIDTH}" height="{HEIGHT}" fill="#fafafa"/>
<rect x="{TERM_X}" y="{TERM_Y}" width="{TERM_W}" height="{TERM_H}" fill="url(#bg)" rx="12" stroke="#86efac" stroke-width="1.5"/>
<rect x="{TERM_X}" y="{TERM_Y}" width="{TERM_W}" height="32" fill="#313244" rx="12"/>
<rect x="{TERM_X}" y="{TERM_Y + 16}" width="{TERM_W}" height="16" fill="#313244"/>
<circle cx="{TERM_X + 16}" cy="{TERM_Y + 16}" r="6" fill="#86efac"/>
<circle cx="{TERM_X + 34}" cy="{TERM_Y + 16}" r="6" fill="#86efac"/>
<circle cx="{TERM_X + 52}" cy="{TERM_Y + 16}" r="6" fill="#86efac"/>
<text x="{TERM_X + TERM_W // 2}" y="{TERM_Y + 21}" text-anchor="middle" fill="#86efac" font-size="12">numb-design — npx numb-design init</text>
'''

for i, (_, content) in enumerate(lines):
    y = PAD_Y + i * LINE_H
    if not content:
        svg += f'<text x="{PAD_X}" y="{y}" fill="#86efac"></text>\n'
    else:
        html = ansi_to_html(content)
        svg += f'<text x="{PAD_X}" y="{y}" xml:space="preserve">{html}</text>\n'

svg += '</svg>\n'

os.makedirs('public', exist_ok=True)
with open('public/demo-terminal.svg', 'w') as f:
    f.write(svg)
print("Created public/demo-terminal.svg")
