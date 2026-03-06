import { test, expect } from '@playwright/test';

test.describe('Smoke Test', () => {
  test('homepage loads with hello world', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /hello world/i })).toBeVisible();
  });
});
