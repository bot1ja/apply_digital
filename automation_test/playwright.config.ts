import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],
    testDir: './tests',
    use: {
        baseURL: 'https://automationexercise.com/',
        headless: false, 
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 13'] },
        },

    ],
});
