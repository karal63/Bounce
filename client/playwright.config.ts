import { defineConfig, devices, expect, test as setup } from "@playwright/test";

export default defineConfig({
    timeout: 30 * 1000, // 30 seconds per test
    retries: 0,
    testMatch: "**/*.e2e.ts",

    use: {
        headless: true,
        baseURL: "http://localhost:5173",
    },

    webServer: {
        command: "npm run dev",
        port: 5173,
        timeout: 160000,
        reuseExistingServer: !process.env.CI,
    },

    projects: [
        {
            name: "setup",
            testMatch: /auth\.setup\.ts/,
        },
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                storageState: "auth.json",
            },
            dependencies: ["setup"],
        },
        // {
        //     name: "firefox",
        //     use: { ...devices["Desktop Firefox"] },
        // },
        // {
        //     name: "webkit",
        //     use: { ...devices["Desktop Safari"] },
        // },
    ],
});
