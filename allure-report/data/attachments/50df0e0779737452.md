# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.js >> Fill registration form
- Location: tests/register.spec.js:6:5

# Error details

```
Error: browserContext.storageState: Protocol error (Target.createTarget): Failed to find browser context with id A766405F91530F546BD7ABE3F2449748
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | const login = require('../test-data/loginUserID.json');
  3  | import { userData } from '../test-data/userData';
  4  | const { POManager } = require('../POM/POManager');
  5  | 
  6  | test('Customer Login', async ({ page }) => {
  7  |     const poManager = new POManager(page);
  8  |     const getlogInPage = poManager.getlogInPage();
  9  |     await getlogInPage.loginMainLink();
  10 |     await getlogInPage.loginDetails(login.username, login.password);
  11 |     await getlogInPage.clickLoginButton();
  12 |     await getlogInPage.welocmeMessage(userData);
> 13 |     page.context().storageState({path:'test-data/Auth.json'});
     |                    ^ Error: browserContext.storageState: Protocol error (Target.createTarget): Failed to find browser context with id A766405F91530F546BD7ABE3F2449748
  14 | })
  15 | 
  16 | test('Unverified Customer Login', async ({ page }) => {
  17 |     const poManager = new POManager(page);
  18 |     const getlogInPage = poManager.getlogInPage();
  19 |     await getlogInPage.loginMainLink();
  20 |     await getlogInPage.loginDetails(userData.invaildUsername, userData.password);
  21 |     await getlogInPage.clickLoginButton();
  22 |     await getlogInPage.loginError();
  23 | });
  24 | 
```