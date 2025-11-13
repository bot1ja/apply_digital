import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    reporter: [
        ['list'],                 // muestra resultados en consola
        ['html', { open: 'never' }] // genera reporte HTML (no lo abre automáticamente)
    ],
    testDir: './tests',
    use: {
         baseURL: 'https://automationexercise.com/',
        headless: false,   // 👈 esto lo hace visual siempre
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
