// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  //fullyParallel: false,
  workers:4,
  forbidOnly: !!process.env.CI,
  retries:  1 ,
  //workers: process.env.CI ? 1 : undefined,
  //reporter: 'html',
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright']
],
  use: {
    baseURL: 'https://parabank.parasoft.com/parabank/',
    
    trace: 'on-first-retry',
    browserName: 'chromium',//'webkit'
    headless: false, //true
    channel: 'chrome',
    storageState: 'test-data/auth.json',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      
      }
       
    },
  ],
});