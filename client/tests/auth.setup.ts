import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-email-input').fill('test@gmail.com');
    await page.getByTestId('login-password-input').fill('test');
    await page.getByTestId('auth-submit-button').click();
    await page.waitForURL('/chat');

    await page.context().storageState({ path: 'playwright/auth.json' });
});
