# Vaul — Drawer Component

An unstyled, accessible drawer component for React built by Emil Kowalski. Designed as a mobile-first bottom sheet with smooth drag-to-dismiss interaction, with full desktop support.

**Note:** The original library is now unmaintained. For active development, consider alternatives or fork the source.

## Installation

```bash
npm install vaul
```

## Quick Start

```tsx
import { Drawer } from "vaul";

function MyDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button>Open Drawer</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white p-6">
          <Drawer.Handle />
          <h2>Drawer Title</h2>
          <p>Drawer content goes here.</p>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

## API

### Drawer.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | boolean | - | Controlled open state |
| `onOpenChange` | function | - | Open state change handler |
| `shouldScaleBackground` | boolean | false | Scale the background when drawer opens |
| `direction` | string | "bottom" | `bottom`, `top`, `left`, `right` |
| `fadeFromIndex` | number | 0 | Index from which overlay starts fading |
| `snapPoints` | number[] | - | Snap points in percentages (e.g., [0.25, 0.5, 0.95]) |
| `activeSnapPoint` | number | - | Controlled active snap point |
| `setActiveSnapPoint` | function | - | Snap point change handler |
| `closeThreshold` | number | 0.25 | Drag threshold to close (fraction of height) |
| `scrollLockTimeout` | number | 200 | Timeout for scroll lock |
| `noBodyStyles` | boolean | false | Disable body style modifications |
| `nested` | boolean | false | Allow nested drawers |
| `preventScrollRestoration` | boolean | false | Disable scroll restoration |
| `handleOnly` | boolean | false | Only drag via the handle element |
| `modal` | boolean | true | Show overlay and prevent outside clicks |
| `dismissible` | boolean | true | Allow dismiss by backdrop click/drag |
| `onDrag` | function | (event, percentage) => void | Drag callback |
| `onRelease` | function | (event, open) => void | Release callback |

### Drawer.Content
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | string | - | Accessibility description |
| `onAnimationEnd` | function | - | Callback when open/close animation completes |
| `onClose` | function | - | Callback when drawer finishes closing |

### Sub-components
- `Drawer.Trigger` — Button that opens the drawer
- `Drawer.Portal` — Portals content to body (optional)
- `Drawer.Overlay` — Backdrop overlay
- `Drawer.Content` — Main drawer panel
- `Drawer.Handle` — Drag handle indicator
- `Drawer.Title` — Accessible title (uses Radix Dialog under the hood)
- `Drawer.Description` — Accessible description
- `Drawer.Close` — Close button
- `Drawer.NestedRoot` — For nested/stacked drawers

## Best Practices

1. **Always include `Drawer.Handle`** for visual drag affordance
2. **Use `snapPoints`** for multi-state drawers (partial → full screen)
3. **Enable `shouldScaleBackground`** for visual depth on mobile
4. **Set `aria-describedby`** on content for screen reader support
5. **Match overlay color** to your app's design tokens (semi-transparent black/gray)
6. **Use `direction: "bottom"`** for mobile-first design, `"right"` for desktop side panels
7. **Use `Drawer.NestedRoot`** for drill-down navigation patterns
8. **Style `Drawer.Content`** with `border-radius: 16px 16px 0 0` for bottom sheets (mobile convention)
9. **Add `overflow-y: auto`** on content for long scrollable drawers
10. **Use `handleOnly`** when you have interactive content that shouldn't trigger drag

## Common Patterns

### Form in Drawer
```tsx
<Drawer.Root>
  <Drawer.Content className="max-h-[90vh]">
    <Drawer.Handle />
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  </Drawer.Content>
</Drawer.Root>
```

### Confirmation Dialog
```tsx
<Drawer.Root dismissible={false}>
  <Drawer.Content>
    <Drawer.Handle />
    <p>Are you sure?</p>
    <button onClick={confirm}>Confirm</button>
  </Drawer.Content>
</Drawer.Root>
```
