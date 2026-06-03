# Anthropic Brand Guidelines

Official brand guidelines for Anthropic-fronted interfaces. Establishes the visual identity system including color, typography, and usage rules.

## Brand Colors

### Primary Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-primary` | `#D4A574` | Primary accent, highlights, key CTAs |
| `brand-primary-dark` | `#B8894F` | Primary on dark backgrounds |
| `brand-bg` | `#FFFFFF` | Light background |
| `brand-bg-dark` | `#1A1A1A` | Dark background |
| `brand-text` | `#1A1A1A` | Light mode text |
| `brand-text-dark` | `#F5F5F5` | Dark mode text |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `accent-green` | `#4ADE80` | Success states |
| `accent-amber` | `#FBBF24` | Warning states |
| `accent-red` | `#F87171` | Error states |
| `accent-blue` | `#60A5FA` | Info states |

### Neutral Scale
| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#F9FAFB` | Backgrounds (lightest) |
| `neutral-100` | `#F3F4F6` | Card backgrounds |
| `neutral-200` | `#E5E7EB` | Borders |
| `neutral-300` | `#D1D5DB` | Disabled text |
| `neutral-400` | `#9CA3AF` | Placeholder text |
| `neutral-500` | `#6B7280` | Secondary text |
| `neutral-600` | `#4B5563` | Body text |
| `neutral-700` | `#374151` | Strong text |
| `neutral-800` | `#1F2937` | Headings |
| `neutral-900` | `#111827` | Darkest text |

## Typography

### Primary Font: Poppins
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **Usage**: Headlines, titles, navigation, buttons
- **Fallback**: sans-serif

### Secondary Font: Lora
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **Usage**: Body text, descriptions, long-form content
- **Fallback**: serif

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-xs` | 12px | 400 | 1.5 | Captions, footnotes |
| `text-sm` | 14px | 400 | 1.5 | Body, descriptions |
| `text-base` | 16px | 400 | 1.5 | Default body |
| `text-lg` | 18px | 500 | 1.4 | Lead text |
| `text-xl` | 20px | 500 | 1.4 | Subheadings |
| `text-2xl` | 24px | 600 | 1.3 | Section headings |
| `text-3xl` | 30px | 600 | 1.25 | Page headings |
| `text-4xl` | 36px | 700 | 1.2 | Hero headings |
| `text-5xl` | 48px | 700 | 1.15 | Large hero |
| `text-6xl` | 60px | 700 | 1.1 | Display |

## Usage Rules

1. **Always** use Poppins for headings and buttons. Never use Lora for UI elements.
2. **Always** use Lora for body text in marketing/content pages. System UI can use Poppins at text-sm.
3. **Primary accent** (#D4A574) is for key interactive elements only — not for decorative use.
4. **Neutral scale** handles 95% of UI surface area. Accent colors are highlights.
5. **Dark mode** is required for any production interface. Use `-dark` variants.
6. **Do not** add additional colors to the brand palette without design review.
7. **Do not** use brand colors at low opacity for text — use the neutral scale instead.
8. **Do not** stretch or distort Poppins or Lora typefaces.

## Accessibility
- All text on brand backgrounds must meet WCAG AA (4.5:1 for body, 3:1 for large text)
- Brand accent #D4A574 passes AA on #1A1A1A but not on #FFFFFF — use darker variant (#B8894F) on light backgrounds
- Focus indicators must use 2px offset ring with brand or accent color
