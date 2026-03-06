import { test, expect } from '@playwright/test';

test.describe('Accordion Page', () => {
  test('loads with correct structure', async ({ page }) => {
    await page.goto('/accordion');
    
    // Check BitoviHeader is visible in first panel
    await expect(page.locator('.bitovi-header')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Services' })).toBeVisible();
    
    // Check other accordion headers are visible
    await expect(page.getByRole('button', { name: 'Expand Two' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Expand Three' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Expand Four' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Expand Five' })).toBeVisible();
    
    // First item (BitoviHeader) should be expanded by default - verify it takes most space
    const firstPanel = page.locator('.accordion-item.expanded');
    await expect(firstPanel).toBeVisible();
  });

  test('expands and collapses items on click', async ({ page }) => {
    await page.goto('/accordion');
    
    // Initially, BitoviHeader panel is expanded
    await expect(page.locator('.accordion-item').first()).toHaveClass(/expanded/);
    
    // Click Expand Three
    await page.getByRole('button', { name: 'Expand Three' }).click();
    
    // Wait for animation to complete (500ms flex + 400ms opacity transitions)
    await page.waitForTimeout(600);
    
    // Now Content Three should be visible, BitoviHeader panel should be collapsed
    await expect(page.getByText('Content Three')).toBeVisible();
    await expect(page.locator('.accordion-item').first()).toHaveClass(/collapsed/);
    
    // Click Expand Five
    await page.getByRole('button', { name: 'Expand Five' }).click();
    
    // Wait for animation
    await page.waitForTimeout(600);
    
    // Now Content Five should be visible, Content Three should not
    await expect(page.getByText('Content Five')).toBeVisible();
    await expect(page.getByText('Content Three')).not.toBeVisible();
  });

  test('fills viewport height', async ({ page }) => {
    await page.goto('/accordion');
    
    // Get viewport and accordion dimensions
    const viewportHeight = page.viewportSize()?.height || 0;
    const accordionContainer = page.locator('.accordion-container');
    const box = await accordionContainer.boundingBox();
    
    // Accordion should fill the full viewport height
    expect(box?.height).toBeCloseTo(viewportHeight, 5);
  });

  test('headers shrink at small viewport heights', async ({ page }) => {
    // Test at 700px height (normal size - default styling)
    await page.setViewportSize({ width: 1280, height: 700 });
    await page.goto('/accordion');
    
    const headerNormal = page.getByRole('button', { name: 'Expand Two' });
    const normalFontSize = await headerNormal.evaluate((el) => 
      window.getComputedStyle(el).fontSize
    );
    const normalPadding = await headerNormal.evaluate((el) => 
      window.getComputedStyle(el).paddingTop
    );
    
    // Normal size should use 1.5rem font (24px) and 1rem padding (16px)
    expect(normalFontSize).toBe('24px');
    expect(normalPadding).toBe('16px');
    
    // Test at 550px height (should trigger first breakpoint)
    await page.setViewportSize({ width: 1280, height: 550 });
    await page.waitForTimeout(100); // Let styles recalculate
    
    const smallFontSize = await headerNormal.evaluate((el) => 
      window.getComputedStyle(el).fontSize
    );
    const smallPadding = await headerNormal.evaluate((el) => 
      window.getComputedStyle(el).paddingTop
    );
    
    // Should use 1.25rem font (20px) and 0.75rem padding (12px)
    expect(smallFontSize).toBe('20px');
    expect(smallPadding).toBe('12px');
    
    // Test at 350px height (should trigger smallest breakpoint)
    await page.setViewportSize({ width: 1280, height: 350 });
    await page.waitForTimeout(100); // Let styles recalculate
    
    const tinyFontSize = await headerNormal.evaluate((el) => 
      window.getComputedStyle(el).fontSize
    );
    const tinyPadding = await headerNormal.evaluate((el) => 
      window.getComputedStyle(el).paddingTop
    );
    
    // Should use 0.875rem font (14px) and 0.375rem padding (6px)
    expect(tinyFontSize).toBe('14px');
    expect(tinyPadding).toBe('6px');
  });

  test('expanded content remains visible at small viewport heights', async ({ page }) => {
    // Test at very small viewport height
    await page.setViewportSize({ width: 1280, height: 350 });
    await page.goto('/accordion');
    
    // Wait for initial render and animation
    await page.waitForTimeout(600);
    
    // First item (BitoviHeader) should be expanded by default
    const bitoviHeader = page.locator('.bitovi-header');
    await expect(bitoviHeader).toBeVisible();
    
    // Get the bounding box of the header
    const headerBox = await bitoviHeader.boundingBox();
    expect(headerBox).not.toBeNull();
    
    // Header should be within viewport bounds (allow small overflow for padding)
    const viewportHeight = page.viewportSize()?.height || 0;
    expect(headerBox!.y).toBeGreaterThanOrEqual(0);
    expect(headerBox!.y + headerBox!.height).toBeLessThanOrEqual(viewportHeight + 50); // Allow 50px tolerance for padding
    
    // Try expanding a different item at small height
    await page.getByRole('button', { name: 'Expand Four' }).click();
    
    // Wait for animation
    await page.waitForTimeout(600);
    
    const contentFour = page.getByText('Content Four');
    await expect(contentFour).toBeVisible();
    
    // Content Four should also be within viewport (with tolerance)
    const content4Box = await contentFour.boundingBox();
    expect(content4Box).not.toBeNull();
    expect(content4Box!.y).toBeGreaterThanOrEqual(0);
    expect(content4Box!.y + content4Box!.height).toBeLessThanOrEqual(viewportHeight + 50);
  });
});
