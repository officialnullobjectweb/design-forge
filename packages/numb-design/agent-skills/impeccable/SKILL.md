# Impeccable Design Skill

A comprehensive design skill for creating production-grade user interfaces with a focus on visual polish, interaction quality, and design system thinking.

## Core Principles

1. **Impeccable Execution** — Every pixel, interaction, and transition must be intentional and polished.
2. **Design System Thinking** — Build from tokens, not ad-hoc values. Define spacing, color, typography, and elevation scales.
3. **Interaction Design** — Animations and transitions must serve a purpose: communicate state, guide attention, or provide feedback.
4. **Accessibility First** — Every design decision must consider contrast, keyboard navigation, screen readers, and reduced motion.
5. **Performance as Feature** — Design for 60fps. Use CSS transforms and opacity for animations. Lazy load below-fold content.
6. **Responsive Intent** — Design for every breakpoint, not as an afterthought. Content should reflow, not just shrink.
7. **Consistency Over Creativity** — Establish patterns and follow them. Creativity lives in the problem space, not the visual vocabulary.

## Commands

- `impeccable:audit` — Run a comprehensive design audit against the principles above
- `impeccable:fix` — Apply fixes for common design issues (spacing, color, typography, contrast)
- `impeccable:review` — Review a specific component or page for design quality
- `impeccable:theme` — Generate or update design tokens for a given theme
- `impeccable:responsive` — Audit and fix responsive behavior across breakpoints
- `impeccable:interactions` — Review and improve interaction patterns and micro-interactions
- `impeccable:accessibility` — Audit and fix accessibility issues
- `impeccable:performance` — Audit animation and rendering performance
- `impeccable:tokens` — Extract and standardize design tokens from existing code
- `impeccable:refactor` — Refactor a component to be more maintainable and consistent

## Design Principles

### Visual Hierarchy
- Establish clear visual weight through size, color, and spacing
- Use type scale (1.25 or 1.333 ratio) for consistent text hierarchy
- Limit to 2-3 font sizes per component
- Use color strategically: primary actions get primary color, secondary actions get neutral

### Spacing Systems
- Use a consistent spacing scale (4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px)
- Establish consistent padding patterns (e.g., container: 24px, card: 16px, compact: 8px)
- Use negative space deliberately to create breathing room

### Color
- Define a semantic color palette: primary, secondary, success, warning, error, info
- Each color should have a scale with 50-950 variants
- Ensure WCAG AA contrast (4.5:1) for body text, AAA (7:1) for large text where possible
- Use color for meaning, not decoration

### Typography
- Define type scale: 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72
- Set consistent line heights: tight (1.15), body (1.5), relaxed (1.75)
- Use font-weight for hierarchy: 400 body, 500 strong, 600 subheadings, 700 headings

## Anti-Patterns to Avoid

1. **Inconsistent spacing** — Different padding values on similar components
2. **Too many colors** — More than 3 accent colors on a single page
3. **Over-animating** — Animations that take longer than 300ms or serve no purpose
4. **Ignoring empty states** — Components that break when data is empty
5. **Wrong interaction states** — Hover, focus, active, disabled states missing or inconsistent
6. **Hardcoded values** — Using px values instead of design tokens for spacing/color/typography
7. **Layout shift** — Content that jumps when images/fonts load
8. **Focus ring removal** — Removing `:focus` outlines without providing an alternative

## References
- Ref 01: Design tokens and system architecture
- Ref 02: Component anatomy and composition
- Ref 03: Responsive patterns
- Ref 04: Interaction patterns
- Ref 05: Accessibility standards
- Ref 06: Performance guidelines
- Ref 07: Testing and quality assurance
