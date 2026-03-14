import { test, expect } from "@playwright/test";
import axios from "axios";

test.beforeEach(async ({ page }) => {
    const res = await axios.post("http://localhost:5000/api/signup", {
        email: "test@gmail.com",
        password: "test",
        name: "test",
    });

    await axios.post(`http://localhost:5000/api/create-group`, {
        name: "Test",
        ownerId: res.data.id,
        description: "Test",
    });

    await page.goto("/login");
    await page.getByTestId("login-email-input").fill("test@gmail.com");
    await page.getByTestId("login-password-input").fill("test");
    await page.getByTestId("auth-submit-button").click();
    await expect(page).toHaveURL("http://localhost:5173/chat");
});
test("user can send a message", async ({ page }) => {
    await page.getByTestId("group-link").nth(0).click();
    await page.getByTestId("message-input").fill("mocked message");
    await page.getByTestId("send-message-button").click();

    const messages = page.getByTestId("single-message");
    await expect(messages.nth((await messages.count()) - 1)).toHaveText(
        "mocked message",
    );
});
