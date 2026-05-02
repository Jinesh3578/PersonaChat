import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const testEmail = `testuser_${Date.now()}@example.com`;
  
  test('should allow a user to sign up, log in, and see personas', async ({ page }) => {
    // 1. Sign Up
    await page.goto('/signup');
    await page.fill('input[name="name"]', 'Playwright User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for the success toast and redirection
    await expect(page.locator('text=Signed Up Successfully')).toBeVisible();
    await expect(page).toHaveURL(/\/persona/);

    // 2. Select Persona
    await expect(page.locator('text=Choose Your Persona')).toBeVisible(); // Or some text on the page
    
    // Log out (assuming there is a logout button in header)
    const logoutBtn = page.getByText('Logout');
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
    }
    
    // 3. Log In
    await page.goto('/login');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Signed In Successfully')).toBeVisible();
    await expect(page).toHaveURL(/\/persona/);
  });
});
