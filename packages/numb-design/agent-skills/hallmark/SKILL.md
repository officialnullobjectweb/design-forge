# Hallmark Design Skill

Anti-AI-slop design skill for creating production-grade user interfaces. Designed to combat generic, pattern-matched design outputs with intentional, high-quality design execution.

## Core Verbs

### `hallmark:default`
Use for general design work. Applies all themes and rating gates.

### `hallmark:audit` 
Audit existing designs for slop patterns (generic, inconsistent, poorly executed design). Runs all 65 slop-test gates.

### `hallmark:redesign`
Redesign a specific component or page with hallmark quality. Always prefer targeted redesign over full rewrites.

### `hallmark:study`
Study a reference or inspiration and extract design principles.

## Design Themes

1. **Clean** — Minimal, intentional whitespace, clear hierarchy
2. **Modern** — Contemporary patterns, current best practices
3. **Professional** — Polished, business-appropriate, trustworthy
4. **Playful** — Delightful, whimsical, approachable
5. **Luxury** — Premium feel, refined details, sophisticated
6. **Bold** — Strong typography, confident color, impactful
7. **Minimal** — Essential only, extreme reduction, purposeful
8. **Warm** — Approachable, human, inviting
9. **Technical** — Complex data, code-friendly, developer-oriented
10. **Editorial** — Content-first, narrative-driven, magazine-like
11. **Friendly** — Approachable, conversational, accessible
12. **Corporate** — Brand-consistent, scalable, enterprise-ready
13. **Creative** — Expressive, artistic, boundary-pushing
14. **Elegant** — Refined, tasteful, sophisticated simplicity
15. **Playful Colors** — Vibrant, energetic palette, expressive
16. **Dark** — Dark mode optimized, dramatic, immersive
17. **Light** — Airy, spacious, high-key
18. **Gradient** — Dimensional color, depth through gradients
19. **Glassmorphism** — Frosted glass effect, modern translucency
20. **Neubrutalism** — Raw, unpolished, intentionally rough
21. **Retro** — Nostalgic, period-inspired, vintage
22. **Organic** — Natural forms, irregular shapes, flowing

## Slop-Test Gates (65 checks)

### Color & Typography
1. No color palette defined? → SLOP
2. Uses only grays + one accent? → SLOP
3. Text contrast below WCAG AA? → SLOP
4. More than 3 font families? → SLOP
5. Font sizes not on a scale? → SLOP
6. Line height < 1.4 for body text? → SLOP
7. No typography scale in tokens? → SLOP
8. Color contrast < 3:1 for UI elements? → SLOP
9. No dark mode colors defined? → SLOP

### Spacing & Layout
10. Uses inconsistent spacing values? → SLOP
11. No spacing scale defined? → SLOP
12. Hardcoded margins/paddings? → SLOP
13. No responsive breakpoints? → SLOP
14. Content overflows container? → SLOP
15. Element spacing < 8px? → SLOP
16. Mobile not considered? → SLOP
17. No grid system used? → SLOP

### Components
18. Button has no hover state? → SLOP
19. Button has no focus state? → SLOP
20. Input has no focus state? → SLOP
21. Input has no error state? → SLOP
22. Component has no loading state? → SLOP
23. Component has no empty state? → SLOP
24. Component has no error state? → SLOP
25. No disabled state styling? → SLOP
26. Link has no hover style? → SLOP
27. No active state for interactable? → SLOP

### Interactions
28. No micro-interactions? → SLOP
29. Transitions not defined? → SLOP
30. Animation duration > 500ms for UI? → SLOP
31. No hover animation on cards? → SLOP
32. No focus visible indicator? → SLOP
33. Click target < 44px? → SLOP
34. No reduced-motion support? → SLOP
35. Animations janky/low FPS risk? → SLOP

### Accessibility
36. Images missing alt text? → SLOP
37. Form inputs missing labels? → SLOP
38. No semantic HTML structure? → SLOP
39. Keyboard navigation broken? → SLOP
40. Focus ring removed without alternative? → SLOP
41. Color-only information conveyance? → SLOP
42. No ARIA landmarks? → SLOP
43. Tab order incorrect? → SLOP

### Content & UX
44. Placeholder text still present? → SLOP
45. Lorem ipsum in production? → SLOP
46. No meaningful error messages? → SLOP
47. Empty states not handled? → SLOP
48. No loading skeleton/spinner? → SLOP
49. Confusing navigation labels? → SLOP
50. No confirmation for destructive actions? → SLOP
51. Generic error pages? → SLOP

### Polish & Craft
52. Pixel alignment off? → SLOP
53. Inconsistent border-radius? → SLOP
54. Shadows not on a scale? → SLOP
55. Z-index chaos (no stacking context)? → SLOP
56. Missing transitions on interactive? → SLOP
57. Icon styles inconsistent? → SLOP
58. Rounded vs sharp corners inconsistent? → SLOP
59. Text truncation not handled? → SLOP

### Performance & Code
60. Layout shift on load? → SLOP
61. Unoptimized images? → SLOP
62. CSS not minified? → SLOP
63. Render-blocking resources? → SLOP
64. No font-display swap? → SLOP
65. Bundle size excessive for page? → SLOP

## Rating Scale
- **0 slop failures**: Hallmark quality ✓
- **1-5**: Good, minor polish needed
- **6-15**: Needs significant improvement
- **16+**: Complete redesign recommended

## References
- Ref 01: Theme-specific color palettes
- Ref 02: Component anatomy templates
- Ref 03: Responsive breakpoint patterns
- Ref 04: Interaction state matrices
- Ref 05: Accessibility compliance checklist
- Ref 06: Performance budget templates
- Ref 07: Design token extraction guide
