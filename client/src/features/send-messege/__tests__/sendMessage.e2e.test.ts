import { test, expect } from "@playwright/test";

test("user can send a message", async ({ page }) => {
    await page.goto("https://example.com");
});
