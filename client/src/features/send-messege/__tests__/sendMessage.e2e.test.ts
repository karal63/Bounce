import { test, expect } from "@playwright/test";

test("user can send a message", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Bounce/);

    // await page.getByTestId("login-button").click();
    // await expect(page).toHaveURL("http://localhost:5173/login");
});
