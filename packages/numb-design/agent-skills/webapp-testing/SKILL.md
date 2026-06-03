# Webapp Testing — Anthropic Skills

A comprehensive Playwright-based web application testing toolkit. Designed for automated end-to-end testing with production-grade reliability patterns.

## Testing Philosophy

1. **Test user behavior, not implementation** — Focus on what the user sees and does
2. **Isolate test concerns** — Each test should verify one thing independently
3. **Use resilient selectors** — Prefer roles, labels, and test IDs over CSS/XPath
4. **Real conditions, real data** — Test against realistic scenarios and data

## Core Patterns

### Test Structure
```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature: Login", () => {
  test("should show error with invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('[data-testid="email"]', "wrong@example.com");
    await page.fill('[data-testid="password"]', "wrongpass");
    await page.click('[data-testid="submit"]');
    await expect(page.locator('[data-testid="error"]')).toBeVisible();
  });
});
```

### Selector Strategy (Priority Order)
1. `getByRole()` — Best, matches accessibility tree
2. `getByLabel()` — For form inputs
3. `getByTestId()` — For complex components
4. `getByText()` — When text is unique and user-facing
5. `getByPlaceholder()` — For placeholder-based identification
6. CSS selectors — Last resort, fragile

### Fixtures
```typescript
import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

type MyFixtures = {
  loginPage: LoginPage;
};

const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
```

### Authentication Setup
```typescript
// auth.setup.ts
import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await page.waitForURL("/dashboard");
  await page.context().storageState({ path: authFile });
});
```

## Page Object Model Pattern
```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  async getErrorMessage() {
    return this.page.getByTestId("error");
  }
}
```

## Best Practices

1. **Use `page.goto()` with `waitUntil: "networkidle"`** for SPA navigation
2. **Set `baseURL`** in config, use relative URLs in tests
3. **Mock API responses** with `page.route()` for deterministic tests
4. **Use `test.beforeEach()`** for common setup (navigation, auth state)
5. **Take screenshots on failure** (`--trace on` or `screenshot: "only-on-failure"`)
6. **Test across viewports** — mobile, tablet, desktop
7. **Avoid `page.waitFor(timeout)`** — use explicit waits on elements
8. **Group related tests** with `test.describe()`
9. **Tag tests** with `@smoke`, `@regression`, `@slow` for targeted runs
10. **Run in CI** with `npx playwright test --ci`

## Accessibility Testing
```typescript
await page.getByRole("button", { name: "Submit" }).click();
const violations = await new AxeBuilder({ page }).analyze();
expect(violations.violations).toHaveLength(0);
```

## Visual Regression Testing
```typescript
await expect(page).toHaveScreenshot("homepage.png", {
  maxDiffPixels: 100,
  threshold: 0.1,
});
```
