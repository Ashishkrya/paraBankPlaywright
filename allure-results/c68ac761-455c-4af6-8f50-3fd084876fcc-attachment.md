# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accountsOverview.spec.js >> Accounts Overview Page
- Location: tests/accountsOverview.spec.js:8:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Accounts Overview' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('link', { name: 'Accounts Overview' }) with timeout 5000ms
  - waiting for getByRole('link', { name: 'Accounts Overview' })

```

```yaml
- heading "404 Not Found" [level=1]
- separator
- text: nginx
```

# Test source

```ts
  1  | 
  2  | const { expect } = require('@playwright/test');
  3  | const { getAccountDetails, getAccountNumber,selectTransactionFilters} = require('../utils/fileUtils');
  4  | 
  5  | class AccountsOverview {
  6  |     constructor(page) {
  7  |         this.page = page;
  8  |         this.link= page.getByRole('link' ,{name:'Accounts Overview'});
  9  |         this.accountsOverviewTitle = page.locator('#showOverview h1.title');
  10 |         this.accountRows = page.locator('#accountTable tbody tr:has(a)');
  11 |         this.accountDetailsTitle = page.locator('#accountDetails h1.title');
  12 |         this.accountId = page.locator('#accountId');
  13 |     }
  14 |     async getpage(){
  15 |         await this.page.goto('/overview.htm');
> 16 |         await expect(this.link).toBeVisible();
     |                                 ^ Error: expect(locator).toBeVisible() failed
  17 |         await this.link.click();
  18 |     }
  19 | 
  20 |     async verifyAccountsOverview() {
  21 |         await expect(this.accountsOverviewTitle).toHaveText('Accounts Overview');
  22 |     }
  23 | 
  24 |     async getAccountsDetails() {
  25 |         return await getAccountDetails(this.page);
  26 |     }
  27 | 
  28 |     async openFirstAccount() {
  29 |         await this.accountRows.first().locator('a').click();
  30 |     }
  31 | 
  32 |     async verifyAccountDetails(expectedAccount) {
  33 |         await expect(this.accountDetailsTitle).toHaveText('Account Details');
  34 | 
  35 |         await expect(this.accountId).toHaveText(expectedAccount);
  36 |     }
  37 | 
  38 |     async verifyAccountNumber(expectedAccount) {
  39 |         const accountNumber = await getAccountNumber(this.page);
  40 |         expect(accountNumber).toBe(expectedAccount);
  41 |     }
  42 | 
  43 |     async selectAccountActivityFilters(type, period) {
  44 |         await selectTransactionFilters(this.page, type, period);
  45 |     }
  46 | }
  47 | 
  48 | module.exports = AccountsOverview;
  49 | 
```