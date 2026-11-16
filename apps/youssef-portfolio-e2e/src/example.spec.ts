import { test, expect } from '@playwright/test';

test('renders the portfolio', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Youssef Khamis');
  await expect(page.locator('#work .proj')).toHaveCount(8);
});
