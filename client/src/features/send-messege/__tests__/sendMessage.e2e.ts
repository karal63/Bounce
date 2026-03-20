import { test, expect } from '@playwright/test';

test('user can send a message', async ({ page }) => {
    await page.goto('/chat');
    await page.getByTestId('group-link').nth(0).click();
    await page.getByTestId('message-input').fill('mocked message');
    await page.getByTestId('send-message-button').click();

    const messages = page.getByTestId('single-message');
    await expect(messages.nth((await messages.count()) - 1)).toHaveText('mocked message');
});
