# Frontend Design — LukeRenton (via skillsdirectory.com)

A comprehensive frontend design skill focused on building production-grade user interfaces. Rated 229 stars on the skillsdirectory.com community catalog.

## Core Philosophy

Design and build interfaces that are visually polished, functionally complete, and technically excellent. Every component should handle all states, respond to all interactions, and perform smoothly on all devices.

## Design Approach

### Visual Principles
- **Clarity** — Each screen communicates one primary thing. Secondary content is visually subordinate.
- **Consistency** — Establish patterns and don't break them. Every button, card, and form behaves predictably.
- **Hierarchy** — Use size, color, spacing, and weight to guide attention. The most important element stands out.
- **Efficiency** — Remove unnecessary elements. Every pixel should earn its place.

### Component Development
- Build components in isolation before composing pages
- Define clear prop interfaces with TypeScript
- Handle all component states: loading, empty, error, success, hover, focus, active, disabled
- Test components in multiple viewport sizes

### Interaction Design
- Micro-interactions for feedback: hover lift, button press, focus ring entrance
- Transitions between states should be smooth (200-300ms, ease-in-out)
- Loading states with skeleton screens (preferred) or spinners
- Swipe, drag, and gesture support for mobile interfaces

## State Management for UI

### Visual States
Each interactive component needs defined styles for:
- **Rest** — Default appearance
- **Hover** — Mouse over (desktop only)
- **Focus** — Keyboard focus indicator (never remove outline)
- **Active/Pressed** — Mouse down / touch
- **Disabled** — 50% opacity, no pointer events
- **Loading** — Skeleton or spinner replacing content area
- **Error** — Red border + error message for inputs
- **Empty** — Illustration + helpful message for data displays

### Data States
- **Loading** — Skeleton, shimmer, or progressive loading
- **Empty** — Illustration + message + suggested action
- **Error** — Error message + retry button
- **Success** — Confirmation toast or inline message

## Responsive Design
- Mobile-first CSS with `min-width` breakpoints
- Content reflow, not just scaling
- Touch targets minimum 44x44px
- Bottom navigation on mobile, sidebar on desktop
- Consider foldable/tablet intermediate states

## Performance
- CSS animations (transform, opacity) over JS animation
- Image optimization: WebP, lazy loading, responsive sizes
- Code splitting by route
- Bundle size monitoring

## Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Reduced motion support

## Developer Experience
- Document component props and usage
- Provide Storybook stories or similar component documentation
- Write unit tests for component logic
- Include integration tests for critical user flows
