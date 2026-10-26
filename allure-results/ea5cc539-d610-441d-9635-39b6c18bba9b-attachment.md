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
  8  |         this.link= page.getByRole('link' ,{name:'Accounts Overview'})
  9  |         this.accountsOverviewTitle = page.locator('#showOverview h1.title');
  10 |         this.accountRows = page.locator('#accountTable tbody tr:has(a)');
  11 |         this.accountDetailsTitle = page.locator('#accountDetails h1.title');
  12 |         this.accountId = page.locator('#accountId');
  13 |     }
  14 |     async getpage(){
> 15 |         await expect(this.link).toBeVisible();
     |                                 ^ Error: expect(locator).toBeVisible() failed
  16 |         await this.link.click();
  17 |     }
  18 | 
  19 |     async verifyAccountsOverview() {
  20 |         await expect(this.accountsOverviewTitle).toHaveText('Accounts Overview');
  21 |     }
  22 | 
  23 |     async getAccountsDetails() {
  24 |         return await getAccountDetails(this.page);
  25 |     }
  26 | 
  27 |     async openFirstAccount() {
  28 |         await this.accountRows.first().locator('a').click();
  29 |     }
  30 | 
  31 |     async verifyAccountDetails(expectedAccount) {
  32 |         await expect(this.accountDetailsTitle).toHaveText('Account Details');
  33 | 
  34 |         await expect(this.accountId).toHaveText(expectedAccount);
  35 |     }
  36 | 
  37 |     async verifyAccountNumber(expectedAccount) {
  38 |         const accountNumber = await getAccountNumber(this.page);
  39 |         expect(accountNumber).toBe(expectedAccount);
  40 |     }
  41 | 
  42 |     async selectAccountActivityFilters(type, period) {
  43 |         await selectTransactionFilters(this.page, type, period);
  44 |     }
  45 | }
  46 | 
  47 | module.exports = AccountsOverview;
  48 | 
```