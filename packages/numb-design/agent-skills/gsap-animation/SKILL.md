# GSAP Animation Skills

GSAP (GreenSock Animation Platform) is a high-performance JavaScript animation library for creating smooth, browser-friendly animations across HTML, SVG, canvas, and WebGL.

## Core Skills

### gsap-core
- **`gsap.to()`** — Animate from current state to target values
- **`gsap.from()`** — Animate from target values to current state  
- **`gsap.fromTo()`** — Define both start and end values explicitly
- **`gsap.set()`** — Set properties immediately (zero-duration to)
- **`gsap.timeline()`** — Create sequenced animations
- **`gsap.context()`** — Scoped selector/cleanup for reactive frameworks (React, Vue, Svelte)
- **`gsap.matchMedia()`** — Responsive animation logic tied to media queries
- **`gsap.effects()`** — Register reusable named effects
- **`gsap.registerPlugin()`** — Register plugins like ScrollTrigger

### gsap-timeline
- Sequencing with `.to()`, `.from()`, `.fromTo()`, `.add()`
- Position parameter: `"+=1"`, `"-=0.5"`, `"<"`, `">"`, `"label"`
- Timeline methods: `.seek()`, `.reverse()`, `.play()`, `.pause()`, `.progress()`, `.timeScale()`
- Label management: `.addLabel()`, `.tweenTo()`

### gsap-scrolltrigger
- Trigger animations on scroll with `ScrollTrigger.create()`
- `trigger`, `start`, `end`, `scrub` for scroll-driven progress
- `pin` / `pinSpacing` for pinning elements
- `toggleActions`: `"play pause resume reset"` etc.
- `markers: true` for debugging

### gsap-plugins
- `MotionPathPlugin` — Animate along SVG path
- `DrawSVGPlugin` — Animate SVG stroke drawing
- `MorphSVGPlugin` — Morph between SVG shapes
- `FlipPlugin` — FLIP animation for layout changes
- `TextPlugin` — Typewriter text animation
- `ScrollToPlugin` — Smooth scroll navigation
- `Observer` — Unified scroll/wheel/touch/pointer observer for custom scroll interactions
- `InertiaPlugin` — Kinetic/dragging motion with easing
- `EaselPlugin` — CreateJS canvas integration

### gsap-utils
- `gsap.utils.clamp()`, `gsap.utils.snap()`, `gsap.utils.mapRange()`, `gsap.utils.interpolate()`, `gsap.utils.random()`, `gsap.utils.pipe()`, `gsap.utils.unitize()`
- `gsap.getProperty()`, `gsap.quickSetter()`, `gsap.quickTo()`
- `gsap.globalTimeline` for global control

## Usage Guidelines

1. **Always prefer `gsap.context()`** in React/Vue/Svelte for automatic cleanup on unmount.
2. **Use `will-change`** via `gsap.set(el, { willChange: "transform, opacity" })` on animated elements for performance.
3. **Avoid `left`/`top` animation** — use `x`/`y` for GPU-accelerated transforms.
4. **Use `ScrollTrigger.config({ ignoreMobileResize: true })`** on mobile for stable scroll behavior.
5. **Track timeline references** in refs/state for cleanup: `let ctx = gsap.context(() => {...}); return () => ctx.revert();`
6. **Use `matchMedia`** for responsive animation control across breakpoints.
7. **Prefer `keyframes`** array in `gsap.to()` for complex multi-step animations.
