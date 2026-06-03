# Build Dashboard — Anthropic Knowledge Work Plugins

Interactive HTML dashboard builder for creating live, data-driven dashboards with charts, filters, and real-time updates. Generates standalone HTML files with embedded JavaScript.

## Overview

Build beautiful, interactive dashboards as single HTML files. Each dashboard includes:
- Data grid/table views with sorting and filtering
- Interactive charts (bar, line, pie, area, scatter)
- Filter controls that update charts in real-time
- Clean, modern design system
- Export to standalone HTML file

## Quick Start

```typescript
import { DashboardBuilder } from "./dashboard-builder";

const dashboard = new DashboardBuilder({
  title: "Sales Dashboard",
  theme: "light", // 'light' | 'dark'
});

// Add data
dashboard.addTable("Sales Data", [
  { month: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
  { month: "Feb", revenue: 15000, expenses: 9000, profit: 6000 },
  // ...
]);

// Add chart
dashboard.addChart("Monthly Revenue", {
  type: "bar",
  xKey: "month",
  yKeys: ["revenue", "expenses", "profit"],
});

// Add filter
dashboard.addFilter("dateRange", "date", {
  label: "Date Range",
});

// Generate HTML
const html = dashboard.build();
```

## Chart Types

| Type | Description | Best For |
|------|-------------|----------|
| `bar` | Vertical or horizontal bars | Comparing categories |
| `line` | Connected data points | Trends over time |
| `pie` | Circular segments | Part-to-whole relationships |
| `area` | Filled line chart | Magnitude over time |
| `scatter` | X/Y data points | Correlation analysis |
| `stacked-bar` | Stacked bars | Part-to-whole over categories |

## Filter Types

| Type | Description |
|------|-------------|
| `date` | Date range picker |
| `select` | Dropdown with options |
| `multi-select` | Multi-selection dropdown |
| `slider` | Numeric range slider |
| `search` | Text search input |

## Layout Options

- **Grid layout**: 1, 2, 3, or 4 columns
- **Full width**: Single chart/table spanning entire width
- **Sidebar**: Filters panel on left or right
- **Tabs**: Multiple dashboard views
- **Header**: Title, description, and action buttons

## Design Guidelines

1. **Keep it focused** — Each dashboard should answer a specific question
2. **Guide the eye** — Place the most important chart top-left or most prominent
3. **Consistent colors** — Use a single color palette across all charts
4. **Interactive by default** — Let users filter, sort, and explore
5. **Mobile responsive** — Charts should reflow for smaller screens
6. **Loading states** — Show skeleton/spinner while data loads
7. **Empty states** — Show helpful message when filters return no data
8. **Limit visual noise** — Remove gridlines, borders, legends where possible

## Best Practices

1. **Pre-aggregate data client-side** — Dashboards should be fast to render
2. **Use semantic colors** — Green for positive, red for negative, blue for neutral
3. **Sort data** — Sort chart data before rendering (chronological, descending value, etc.)
4. **Label clearly** — Every chart needs a title, every axis needs a label
5. **Export functionality** — Let users download charts as PNG or data as CSV
6. **Auto-refresh** — Poll data source every N seconds for live dashboards
7. **URL state** — Persist filters in URL query params for shareability
8. **Performance** — Lazy-load chart libraries, virtualize large tables
