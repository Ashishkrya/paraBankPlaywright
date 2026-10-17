
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['list'], ['html']],

  use: {
    baseURL: 'https://parabank.parasoft.com/parabank',
    browserName: 'chromium',
    channel: 'chrome',
  },

  projects: [
    {
      name: 'register',
      testMatch: '**/register.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },

    {
      name: 'open-account',
      testMatch: '**/openNewAccount.spec.js',
      dependencies: ['register'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },

    {
      name: 'regression',
      testIgnore: [
        '**/register.spec.js',
        '**/openNewAccount.spec.js',
      ],
      dependencies: ['open-account'],
      fullyParallel: true,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
