---
name: debug-e2e-test
description: Debug and fix failing Playwright E2E tests. Use when tests fail, when asked to fix failing tests, or when investigating test failures. Analyzes test output, screenshots, error context, and uses Playwright MCP to identify root causes.
---

# Skill: Debug E2E Test

This skill provides a systematic workflow for debugging and fixing failing Playwright E2E tests in the mock-app.

## When to Use This Skill

Use this skill when:
- A Playwright E2E test is failing
- Asked to fix a failing test
- Investigating why tests are broken
- Tests pass locally but fail in CI
- Need to understand what a test failure means

## Prerequisites

- Dev server must be running (`npm run dev`)
- Playwright MCP tools available
- Failed test has generated artifacts in `test-results/`

## Debugging Workflow

### Step 1: Run the Specific Failed Test

Run ONLY the specific failing test using the `-g` flag to get focused output:

```bash
npm run test:e2e -- <test-file>.spec.ts -g "test name"
```

**Why:** Running a single test is faster and produces cleaner output than running the entire suite.

### Step 2: Analyze the Test Output

Read the terminal output carefully and extract:

1. **Test location**: File path and line number
2. **Failure type**: What assertion failed
3. **Expected vs Actual**: What the test expected vs what it got
4. **Error message**: The specific error
5. **Artifact paths**: Screenshot and error-context.md locations

**Example output:**
```
Error: expect(received).toBe(expected)
Expected: 0
Received: 13

  177 |       const inactiveBadges = page.locator('text=Inactive');
  178 |       const count = await inactiveBadges.count();
> 179 |       expect(count).toBe(0);
```

### Step 3: Load the Screenshot

Use the `read_media_file` tool to load the screenshot from the test results:

```
test-results/<test-name>/test-failed-1.png
```

This shows the **visual state** when the test failed.

### Step 4: Read the Error Context

Read the `error-context.md` file from the test results directory:

```
test-results/<test-name>/error-context.md
```

This file contains:
- **DOM snapshot**: Complete page structure at failure time
- **Console logs**: Browser warnings/errors
- **Network errors**: Failed requests (if any)

**Key things to look for:**
- Are the elements the test is looking for present?
- Are there unexpected elements?
- Are there console errors indicating broken functionality?
- Is the page structure what the test expects?

### Step 5: Read the Test Code

Read the failing test code to understand:
- What is it trying to test?
- What user actions does it simulate?
- What assertions does it make?
- Are the selectors specific enough?

### Step 6: Compare Test Expectations with Implementation

Use `grep` or `semantic_search` to find the actual component/page being tested:

```bash
# Find where specific text/elements are defined
grep -r "text the test looks for" mock-app/src/
```

Check:
- Does the route match? (`/users` vs `/organization/users`)
- Does the text match exactly? (case, spacing, punctuation)
- Are the element types correct? (`<button>` vs `<a>`)

### Step 7: Use Playwright MCP (If Needed)

If the issue isn't clear from the screenshot and error context, use Playwright MCP to interact with the live app:

**⚠️ Only use MCP if necessary - it's slower than analyzing artifacts**

1. Navigate to the page: `playwright_navigate`
2. Take a screenshot: `playwright_screenshot`
3. Get HTML: `playwright_get_visible_html`
4. Click elements: `playwright_click`
5. Inspect what happens: `playwright_get_visible_text`

**Use MCP to:**
- Verify filters/buttons actually work
- See what elements exist vs what test expects
- Understand the actual vs expected behavior
- Test different selectors

### Step 8: Fix the Issue

Based on your findings, fix either the test, the code, or both.

### Step 9: Verify the Fix

Run the specific test again to verify it passes:

```bash
npm run test:e2e -- <test-file>.spec.ts -g "test name"
```

If it passes, commit your changes with a clear message explaining what was fixed.

## Tips for Effective Debugging

1. **Always run the single test first** - Don't debug from full suite output
2. **Start with artifacts** - Screenshot + error-context tell you 90% of issues
3. **Use MCP sparingly** - Only when artifacts don't show the problem
4. **Check obvious things first** - Routes, text, element types
5. **One test at a time** - Fix and verify before moving to next failure
6. **Read the DOM snapshot** - Often more useful than screenshot for structural issues

## 🔄 Intermittent Failures - Check for Non-Deterministic Data

If tests **pass sometimes and fail other times**, the issue is likely **non-deterministic mock data**.

### Common Causes

1. **Sample generators using `Date.now()` or `new Date()`**
   - Check `/model/*.sample.ts` files
   - Look for timestamps, dates, or "recent" calculations
   - These create different data on each test run!

2. **Missing seeds in mock handlers**
   - Check `mock-app/src/mocks/handlers.ts`
   - Ensure all `createXxxSample()` calls pass a `seed` parameter
   - Example: `createJobSample({ seed: i })` not `createJobSample()`

3. **Storybook stories without seeds**
   - Check `*.stories.tsx` files
   - Use seeds for consistent component props
   - Example: `createJobSample({ seed: 1 })` not `createJobSample()`

### How to Diagnose

```bash
# Run the same test multiple times
npx playwright test <file>.spec.ts -g "test name"
npx playwright test <file>.spec.ts -g "test name"
npx playwright test <file>.spec.ts -g "test name"

# If results differ, you have non-deterministic data
```

### How to Fix

1. **Update sample generators** - See [generate-sample-data skill](../generate-sample-data/SKILL.md#-critical-deterministic-dates-with-seeds)
2. **Add seeds everywhere** - Never call sample functions without seeds
3. **Verify fix:**
   ```typescript
   // Should produce identical output
   const data1 = createJobSample({ seed: 42 });
   const data2 = createJobSample({ seed: 42 });
   expect(data1).toEqual(data2); // Should pass
   ```

## Example: Full Debugging Session

**Scenario:** Test "displays user list with all users" fails

**1. Run the test:**
```bash
npm run test:e2e -- multi-user-account-management.spec.ts -g "displays user list"
```

**2. Output shows:**
```
Error: expect(locator).toBeVisible() failed
Locator: locator('th:has-text("Name")')
```

**3. Read error-context.md** - See table headers are: User, Role, Status, Last Login, Actions

**4. Read test code** - Test looks for separate "Name" and "Email" headers

**5. Compare** - UI has combined "User" header, test expects separate headers

**6. Diagnosis:** Test is outdated, UI correctly shows combined User column

**7. Fix:** Update test selectors to match actual UI:
```typescript
await expect(page.locator('th:has-text("User")')).toBeVisible();
// Remove old Name/Email checks
```

**8. Verify:**
```bash
npm run test:e2e -- multi-user-account-management.spec.ts -g "displays user list"
```

**9. Result:** ✅ Test passes!

## Related Skills

- **write-e2e-test**: Create new E2E tests
- **responsive-design**: Verify responsive behavior in tests
- **implement-feature**: Ensure tests are created alongside features
