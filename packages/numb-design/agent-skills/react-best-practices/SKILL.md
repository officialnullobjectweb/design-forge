# React Best Practices — Vercel Agent Skills

70 production-grade rules across 8 categories for building high-performance React and Next.js applications.

## 1. Component Architecture (10 rules)

1. **Single Responsibility** — Each component does one thing. Extract sub-components when a component handles multiple concerns.
2. **Props Interface** — Define explicit prop types with TypeScript. Use `interface` over `type` for exported props.
3. **Composition Over Configuration** — Use `children` and slots instead of complex config objects.
4. **Small Components** — If a file exceeds 150 lines, extract pieces. If a render has 10+ JSX lines, extract sub-components.
5. **No Side Effects in Render** — No API calls, subscriptions, or browser API access during render phase.
6. **Colocation** — Keep component files with their styles, tests, and stories co-located in the same directory.
7. **Default Props Pattern** — Use default parameter values in destructuring: `const Button = ({ variant = "primary" }: Props) =>`.
8. **Conditional Rendering** — Use ternary for binary states, early returns for guard clauses, and helper functions for complex conditions.
9. **List Keys** — Use stable, unique IDs for list keys. Never use index unless items are static.
10. **Render Optimization** — Wrap expensive computations in `useMemo`. Memoize callbacks passed to child components with `useCallback`.

## 2. State Management (10 rules)

11. **Lift State Up** — Share state via lifting, not prop drilling. Use context for truly global state.
12. **Local State First** — Start with `useState`. Only introduce external state management when lifting proves unwieldy.
13. **Reducer for Complex State** — Use `useReducer` when state updates depend on previous state or have multiple sub-values.
14. **State Co-location** — Keep state as close as possible to where it's used.
15. **Avoid State Duplication** — Derive values from existing state instead of storing duplicates.
16. **Context for DI** — Use React Context for dependency injection (theming, localization), not for state management.
17. **URL as State** — Store filter, sort, pagination, and search state in URL params for shareability and back-button support.
18. **Server State** — Use React Query / SWR / TanStack Query for server data. Avoid storing fetched data in component state.
19. **Form State** — Use React Hook Form or Formik. Avoid per-field `useState`.
20. **State Serialization** — Keep state serializable. Avoid storing functions, promises, or DOM references in state.

## 3. Performance (10 rules)

21. **Bundle Analysis** — Run `next/bundle-analyzer` or `source-map-explorer` regularly.
22. **Code Splitting** — Lazy load routes and heavy components with `next/dynamic` or `React.lazy()`.
23. **Image Optimization** — Use `next/image` with proper `sizes` and `priority` for above-fold images.
24. **Font Loading** — Use `next/font` with `display: "swap"` and preload key fonts.
25. **Avoid Layout Shift** — Set explicit dimensions on images, embeds, and async content containers.
26. **Memoization** — Profile before memoizing. Default React is fast for most cases.
27. **Virtual Lists** — Use `react-window` or `@tanstack/virtual` for long lists (500+ items).
28. **Debounce Inputs** — Debounce search inputs, resize handlers, and API calls with 300-500ms delay.
29. **Web Workers** — Offload heavy computations (parsing, formatting) to Web Workers.
30. **CSS Animation** — Prefer CSS transitions over JS animations for UI state changes.

## 4. Data Fetching (10 rules)

31. **Server Components** — Fetch data in Server Components when possible (Next.js App Router).
32. **Streaming** — Use `loading.js` and `Suspense` boundaries for streaming SSR.
33. **Parallel Fetching** — Fetch independent data in parallel with `Promise.all()`.
34. **Request Deduplication** — Let the data fetching library handle deduplication automatically.
35. **Error Boundaries** — Wrap data-dependent components in error boundaries with fallback UI.
36. **Loading States** — Show skeleton UI immediately. Avoid waiting for all data to load.
37. **Stale-While-Revalidate** — Show cached data while re-fetching in background.
38. **Paginate Everything** — Never load all records at once. Use cursor or offset pagination.
39. **Optimistic Updates** — For mutations, update UI immediately and revert on error.
40. **Cache Headers** — Set appropriate `stale-while-revalidate` and `stale-if-error` headers on API responses.

## 5. Styling (8 rules)

41. **Utility-First** — Use Tailwind CSS classes for >95% of styling. Extract components for patterns used 3+ times.
42. **CSS Variables** — Use CSS custom properties for dynamic styling (themes, responsive values).
43. **Tailwind Prefix** — Use `tw-` prefix or configure prefix to avoid conflicts.
44. **Responsive Classes** — Use Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`), not custom media queries.
45. **Vendor Prefixes** — Tailwind handles vendor prefixes. Avoid writing custom prefixed CSS.
46. **Component Classes** — Extract `@apply` only for component base styles, not utility patterns.
47. **PurgeCSS** — Keep `content` paths accurate to prevent accidental style removal.
48. **Design Tokens** — Define colors, spacing, font sizes in `tailwind.config.js` — avoid arbitrary values.

## 6. Accessibility (8 rules)

49. **Semantic HTML** — Use `button`, `nav`, `main`, `article`, `aside`, `header`, `footer` correctly.
50. **Heading Hierarchy** — Single `h1` per page. Don't skip heading levels.
51. **Form Labels** — Every input has a visible label. Use `aria-label` only when visual label is impossible.
52. **Focus Management** — Manage focus in modals, drawers, and navigation. Return focus on close.
53. **Keyboard Navigation** — All interactive elements reachable and operable by keyboard.
54. **Screen Reader Text** — Provide visually hidden text for screen readers when visual context is insufficient.
55. **Color Contrast** — 4.5:1 for body text, 3:1 for large text. Test with tools.
56. **Reduced Motion** — Respect `prefers-reduced-motion`. Disable or simplify animations.

## 7. TypeScript (7 rules)

57. **Strict Mode** — Enable `strict: true` in `tsconfig.json`.
58. **No `any`** — Prefer `unknown` over `any`. Use `zod` for runtime validation of unknown data.
59. **Explicit Returns** — Define return types for public functions and exported components.
60. **Generic Components** — Use generics for reusable, type-safe components (selects, tables, lists).
61. **Branded Types** — Use branded/opaque types for IDs and values that should not be mixed.
62. **Utility Types** — Use `Pick`, `Omit`, `Partial`, `Required` for type transformations instead of declaring new interfaces.
63. **Const Assertions** — Use `as const` for constant objects and tuples to preserve literal types.

## 8. Next.js App Router (7 rules)

64. **Server Components Default** — Make components Server Components by default. Add `"use client"` only when needed.
65. **Client Boundaries** — Push `"use client"` as deep as possible. Wrap interactive leaves, not entire pages.
66. **Route Groups** — Use route groups `(marketing)`, `(dashboard)` for layout organization without URL impact.
67. **Loading UI** — Export `loading.tsx` for every route segment that fetches data.
68. **Error Handling** — Export `error.tsx` (with `"use client"`) for route-level error boundaries.
69. **Parallel Routes** — Use parallel routes `@slot` for complex layouts with independent sub-sections.
70. **Interception** — Use intercepting routes `(..)` for modal/photos patterns without losing the underlying route.
