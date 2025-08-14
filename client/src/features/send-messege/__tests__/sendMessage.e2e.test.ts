import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("login-email-input").fill("kuzmichleva1@gmail.com");
    await page.getByTestId("login-password-input").fill("1111");
    await page.getByTestId("auth-submit-button").click();
    await expect(page).toHaveURL("http://localhost:5173/chat");
});
test("user can send a message", async ({ page }) => {
    await page.getByTestId("group-link").nth(0).click();
    await page.getByTestId("message-input").fill("mocked message");
    await page.getByTestId("send-message-button").click();

    const messages = page.getByTestId("single-message");
    await expect(messages.nth((await messages.count()) - 1)).toHaveText(
        "mocked message"
    );
});
