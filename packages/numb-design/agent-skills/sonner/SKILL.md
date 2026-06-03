# Sonner — Toast Component

An opinionated, elegant toast notification component for React built by Emil Kowalski. Lightweight (~2.5KB gzipped), accessible, and fully customizable.

## Installation

```bash
npm install sonner
```

## Quick Start

```tsx
import { Toaster, toast } from "sonner";

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast("This is a notification")}>
        Show Toast
      </button>
    </div>
  );
}
```

## API

### Toaster Component
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `richColors` | boolean | false | Use semantic colors for built-in types |
| `expand` | boolean | false | Show toast descriptions expanded |
| `visibleToasts` | number | 3 | Max visible toasts at once |
| `position` | string | "bottom-right" | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` |
| `closeButton` | boolean | false | Show close button on toasts |
| `duration` | number | 4000 | Default toast duration in ms |
| `theme` | string | "system" | `light`, `dark`, `system` |
| `offset` | number/string | "0px" | Global offset from edge |
| `gap` | number | 14 | Gap between toasts |
| `style` | React.CSSProperties | - | Inline styles for container |
| `className` | string | - | CSS class for container |
| `toastOptions` | object | - | Default options for all toasts |

### toast() Function
```tsx
// Basic
toast("message");
toast("message", { description: "description" });

// With icon
toast("message", { icon: <Icon /> });

// Types
toast.success("Saved!");
toast.error("Failed!");
toast.info("New update");
toast.warning("Low battery");

// Custom JSX
toast(<CustomComponent />);

// Promise (async feedback)
toast.promise(savePromise, {
  loading: "Saving...",
  success: "Saved!",
  error: "Error saving"
});

// Dismiss programmatically
toast.dismiss();
toast.dismiss("toast-id");

// Custom JSX component
toast.custom((t) => (
  <div>
    Custom toast
    <button onClick={() => toast.dismiss(t)}>Dismiss</button>
  </div>
));
```

### Options
| Option | Type | Description |
|--------|------|-------------|
| `description` | string | Secondary text |
| `duration` | number | Duration in ms (5000 default, Infinity = persistent) |
| `important` | boolean | User must dismiss manually |
| `action` | { label, onClick } | Action button |
| `cancel` | { label, onClick } | Cancel/secondary button |
| `onDismiss` | function | Callback on dismiss |
| `onAutoClose` | function | Callback on auto-close |
| `position` | string | Override position |
| `icon` | ReactNode | Leading icon |
| `id` | string | Custom ID |
| `invert` | boolean | Invert colors for dark backgrounds |
| `style` | CSSProperties | Toast-level style override |
| `className` | string | Toast-level class |

## Best Practices

1. **Use `toast.promise()`** for async operations to show loading/success/error states
2. **Keep messages short** — 1 line for title, optional 1 line for description
3. **Use action buttons** instead of closing for actionable feedback
4. **Position consistently** — pick `bottom-right` or `top-right` and stick with it
5. **Set `richColors`** for error/success/warning to leverage semantic colors
6. **Use `important: true`** sparingly — only for critical user actions
7. **Provide `duration: Infinity`** with a close button for persistent errors
8. **Style consistently** — match your app's font, color, and border-radius tokens
9. **Place `<Toaster />`** at root layout level, not inside route components
10. **Dismiss on route change** — call `toast.dismiss()` in route change handlers
