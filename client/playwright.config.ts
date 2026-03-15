import { defineConfig, devices, expect, test as setup } from "@playwright/test";

export default defineConfig({
    testMatch: "**/*.e2e.ts",

    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

    use: {
        trace: "on-first-retry",
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

    webServer: [
        {
            command: "npm run dev",
            url: "http://localhost:5173",
            reuseExistingServer: !process.env.CI,
        },
        {
            command: "cd ../server && npm run start",
            url: "http://localhost:5000",
            reuseExistingServer: !process.env.CI,
        },
    ],
});

// try creating new dir server2, express, completely empty and try connect to it in playwright
