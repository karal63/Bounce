import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    timeout: 30 * 1000, // 30 seconds per test
    retries: 0,
    testMatch: "**/*.e2e.ts",

    use: {
        headless: true,
        baseURL: "http://localhost:5173",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        // {
        //     name: "webkit",
        //     use: { ...devices["Desktop Safari"] },
        // },
    ],
});
