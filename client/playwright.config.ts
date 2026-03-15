import { defineConfig, devices, expect, test as setup } from "@playwright/test";

export default defineConfig({
    timeout: 30 * 1000, // 30 seconds per test
    retries: 0,
    testMatch: "**/*.e2e.ts",

    use: {
        headless: true,
        baseURL: "http://localhost:5173",
    },

    webServer: [
        {
            command: "npm run dev",
            url: "http://localhost:5173",
            name: "Frontend",
            timeout: 120 * 1000,
            reuseExistingServer: !process.env.CI,
        },
        {
            command: "node server.js",
            cwd: "../server",
            url: "http://localhost:5000",
            name: "Backend",
            timeout: 120 * 1000,
            reuseExistingServer: !process.env.CI,
            env: {
                PORT: "5000",
                CLIENT_HOST: "http://localhost:5173",
                DB_HOST: "localhost",
                DB_USER: "root",
                MYSQL_ROOT_PASSWORD: "root",
                DB_NAME: "bounce",
                REDIS_HOST: "localhost",
                REDIS_PORT: "6379",
            },
        },
    ],

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
