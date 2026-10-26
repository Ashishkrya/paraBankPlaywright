# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: openNewAccount.spec.js >> Open New Account
- Location: tests/openNewAccount.spec.js:7:5

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByRole('link', { name: 'Open New Account' })

```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | 
  3  | class OpenAccount {
  4  |     constructor(page) {
  5  |         this.page = page;
  6  |         // Open account locators
  7  |         this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
  8  |         this.accountType = page.locator('#type');
  9  |         this.fromAccount = page.locator('#fromAccountId');
  10 |         this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
  11 |         this.accountOpenedMessage = page.locator('#openAccountResult h1.title');
  12 |         this.newAccountNumber = page.locator('#newAccountId');
  13 |         // Account overview locators
  14 |         this.accountOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
  15 |         this.accountOverviewTitle = page.locator('#showOverview h1.title');
  16 |         // Transaction locators
  17 |         this.transactionRow = page.locator('#transactionTable tbody tr:has(a)').first();
  18 |         this.transactionLink = this.transactionRow.getByRole('link', {
  19 |             name: 'Funds Transfer Received',
  20 |             exact: true
  21 |         });
  22 |     }
  23 |     async openNewAccount(type = 'SAVINGS') {
> 24 |         await this.openNewAccountLink.click();
     |                                       ^ Error: locator.click: Test ended.
  25 |         await expect(this.openNewAccountButton).toBeVisible();
  26 |         await this.accountType.selectOption({ label: type });
  27 |         await expect(this.fromAccount).toBeVisible();
  28 |         await expect(this.fromAccount.locator('option').first()).toBeAttached();
  29 |         const firstAccountValue = await this.fromAccount.locator('option').first().getAttribute('value');
  30 |         await this.fromAccount.selectOption(firstAccountValue);
  31 |         await this.openNewAccountButton.click();
  32 |         await expect(this.accountOpenedMessage).toHaveText('Account Opened!');
  33 |         await expect(this.newAccountNumber).toBeVisible();
  34 |         return (await this.newAccountNumber.textContent()).trim();
  35 |         
  36 |     }
  37 | 
  38 |     async verifyOpenedAccount(accountNumber) {
  39 |         await this.newAccountNumber.click();
  40 |         //await expect(this.page.locator('#accountId')).toHaveValue(accountNumber);
  41 |     }
  42 | 
  43 |     async captureTransactionDetails(getTransactionDetails) {
  44 |         await expect(this.transactionLink).toBeVisible();
  45 |         await this.transactionLink.click();
  46 |         return await getTransactionDetails(this.page);
  47 |     }
  48 | 
  49 |     async goToAccountsOverview() {
  50 |         await this.accountOverviewLink.click();
  51 |         await expect(this.accountOverviewTitle).toHaveText('Accounts Overview');
  52 |     }
  53 | 
  54 |     async clickAccount(accountNumber) {
  55 |         const accountLink = this.page.getByRole('link', {
  56 |             name: String(accountNumber),
  57 |             exact: true
  58 |         });
  59 |         await expect(accountLink).toBeVisible();
  60 |         await accountLink.click();
  61 |     }
  62 | }
  63 | 
  64 | module.exports = OpenAccount;
```