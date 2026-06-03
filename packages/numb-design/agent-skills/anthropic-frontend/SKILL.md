# Frontend Design — Anthropic Skills

Production-grade frontend UI design skill created by Anthropic. Build beautiful, responsive, accessible user interfaces with a bold aesthetic.

## Core Principles

1. **Bold, Intentional Design** — Avoid generic layouts. Use asymmetric grids, overlapping elements, and clear visual hierarchy.
2. **Accessibility is Not Optional** — Every component must meet WCAG 2.2 AA minimum. Forms need labels, buttons need aria attributes, colors need contrast verification.
3. **Performance is Design** — Every component must be performant. Use CSS transforms and opacity for animations. Lazy load images. Avoid layout shifts.
4. **Responsive by Default** — Mobile-first approach. Think in terms of breakpoints: single column on mobile, multi-column on desktop.
5. **Dark Mode is Standard** — Every component needs a dark mode variant. Use CSS variables for theme switching.

## Design Approach

### Visual Hierarchy
- Use size, weight, and color to create clear hierarchy
- Stack headings, not inline them
- White space is a design tool

### Color System
- Start with neutral palette: gray-50 through gray-950
- Add one primary accent color
- Add one secondary accent for variety
- Keep semantic meaning: success (green), warning (amber), error (red)

### Typography
- Sans-serif for UI (Inter, SF Pro, or system-ui)
- Limit to 2 families max: one for headings, one for body
- Use integer font sizes: 14, 16, 18, 20, 24, 30, 36, 48
- Line height: 1.5 body, 1.25 headings

### Spacing
- Use consistent 4px or 8px base unit
- Common values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Motion Design
- Keep animations under 300ms for functional UI
- Use CSS transitions: `transition-all duration-200 ease-out`
- Add micro-interactions: hover scale, focus ring entrance, button press

## Page Sections and Implementation Strategies

### Hero Sections
- Full-width, bold headline, clear CTA
- Background options: gradient mesh, abstract shapes, product screenshots
- Keep headline focused on value proposition
- Use large (60-80px) bold headings with tight line height

### Feature Grids
- 3-column grid on desktop, 1 column on mobile
- Each feature: icon + short headline + 1-2 sentence description
- Consistent card design: rounded corners, subtle shadow, hover elevation
- Use 3D tilt or hover lift for interactivity

### Pricing Tables
- 3 tiers: Basic, Pro, Enterprise
- Highlight recommended tier with accent border/shadow
- Feature checklist for each tier
- Annual vs monthly toggle

### Testimonials
- Social proof with real names, titles, avatars
- Quote + attribution pattern
- Grid layout or carousel for many testimonials

### Footer
- Multi-column link layout
- Copyright, social links, legal links
- Newsletter signup in footer

## Component States Checklist
- **Rest** → Default appearance
- **Hover** → Subtle visual change (bg shift, shadow lift, underline)
- **Active/Pressed** → Inset shadow or scale down
- **Focus** → Visible focus ring (2px offset, matching accent)
- **Disabled** → Reduced opacity (50%), no pointer events
- **Loading** → Skeleton or spinner
- **Error** → Red border on inputs, error messages below
- **Empty** → Illustration + message + CTA

## Accessibility Requirements
- All images need descriptive alt text
- Forms: labels on every input, error messages with aria-describedby
- Links: distinguishable from surrounding text (underline or sufficient contrast)
- Color contrast: 4.5:1 body, 3:1 large text
- Focus indicators: never remove outline without replacement
- Reduced motion: respect prefers-reduced-motion
- Semantic HTML: use nav, main, section, article, aside correctly

## Performance Guidelines
- Images: lazy loading, WebP format, responsive srcset
- Fonts: font-display: swap, subset if possible, preload key fonts
- CSS: purge unused styles, use CSS variables for theming
- JavaScript: code-split by route, lazy load non-critical components
- Animations: use GPU-accelerated properties (transform, opacity)
