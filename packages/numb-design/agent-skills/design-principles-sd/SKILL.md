# Design Principles — Nokonoko1203

A minimal design system skill inspired by Linear, Notion, and Stripe. Focuses on clean, functional, and user-centric interface design.

## Core Design Principles

### 1. Content First
- Design around content, not containers
- Let whitespace create hierarchy naturally
- Text is the primary UI element

### 2. Function Over Form
- Every element must serve a purpose
- Remove anything decorative that doesn't add clarity
- Beautiful emerges from functional, not applied

### 3. Minimal Interaction Design
- Use micro-interactions sparingly but precisely
- Animations should feel natural (ease-out, 200-300ms)
- Feedback should be immediate and subtle

### 4. Systematized Consistency
- Use a single spacing scale everywhere
- Limit colors to 2-3 neutrals + 1-2 accents
- Typography: one typeface, one scale, one rhythm

### 5. Accessible by Default
- High contrast text on all backgrounds
- Touch targets minimum 44x44px
- Semantic HTML structure
- Focus states visible and tasteful

## Specific Guidance

### Layout
- Max-width containers: 640px (narrow), 768px (medium), 1024px (wide), 1280px (extra wide)
- Grid: 12-column with 24px gap
- Side padding: 24px mobile, 32px desktop

### Typography
- Font family: Inter or system-ui
- Scale: 12, 14, 16, 20, 24, 30, 38, 48
- Line height: 1.4 body, 1.2 headings
- Font weight: 400 body, 500 medium, 600 semibold, 700 bold

### Spacing
- Base unit: 8px
- Common values: 8, 16, 24, 32, 48, 64, 96

### Color
- Neutral: slate or gray scale (50-900)
- Accent: single brand color with 50-700 range
- Semantic: green success, amber warning, red error
- Text: neutral-900 on light, neutral-100 on dark

### Components
- Cards: rounded-lg (8px), no border or subtle border, subtle shadow on hover
- Buttons: filled (primary), ghost (secondary), outline (tertiary)
- Inputs: border only, focus ring on focus, inline error messages
- Modals: centered, overlay backdrop, 480px max-width

## Anti-Patterns
1. **Over-styling** — Too many shadows, gradients, borders on one page
2. **Inconsistent radius** — Mixing 4px, 8px, 12px, full rounding
3. **Decoration without purpose** — Adding elements just because they look "designed"
4. **Animation for animation's sake** — Movement that doesn't communicate meaning
5. **Breaking the spacing scale** — Using 7px or 13px when the scale is 8-based
