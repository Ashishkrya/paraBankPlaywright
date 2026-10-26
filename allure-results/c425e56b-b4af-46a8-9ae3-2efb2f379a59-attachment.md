# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: transfer.spec.js >> Transfer Funds
- Location: tests/transfer.spec.js:5:5

# Error details

```
Error: expect(locator).toBeAttached() failed

Locator: locator('#toAccountId').locator('option').nth(1)
Expected: attached
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeAttached" locator('#toAccountId').locator('option').nth(1) with timeout 5000ms
  - waiting for locator('#toAccountId').locator('option').nth(1)

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- paragraph: Welcome John Doe
- heading "Account Services" [level=2]
- list:
  - listitem:
    - link "Open New Account":
      - /url: openaccount.htm
  - listitem:
    - link "Accounts Overview":
      - /url: overview.htm
  - listitem:
    - link "Transfer Funds":
      - /url: transfer.htm
  - listitem:
    - link "Bill Pay":
      - /url: billpay.htm
  - listitem:
    - link "Find Transactions":
      - /url: findtrans.htm
  - listitem:
    - link "Update Contact Info":
      - /url: updateprofile.htm
  - listitem:
    - link "Request Loan":
      - /url: requestloan.htm
  - listitem:
    - link "Log Out":
      - /url: logout.htm
- heading "Transfer Funds" [level=1]
- paragraph:
  - text: "Amount: $"
  - textbox: "100"
- text: "From account #"
- combobox:
  - option "14121" [selected]
- text: "to account #"
- combobox:
  - option "14121" [selected]
- button "Transfer"
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | class TransferFundsPage {
  3  |     constructor(page) {
  4  |         this.page = page;
  5  |         this.transferFundsLink = page.locator('#leftPanel').getByRole('link', { name: 'Transfer Funds' });
  6  |         this.pageTitle = page.locator('#showForm h1.title');
  7  |         this.amount = page.locator('#amount');
  8  |         this.fromAccount = page.locator('#fromAccountId');
  9  |         this.toAccountId = page.locator('#toAccountId');
  10 |         this.transferButton = page.getByRole('button', { name: 'Transfer' });
  11 |         this.resultTitle = page.locator('#showResult h1.title');
  12 | 
  13 |     }
  14 |     async openTransferFunds() {
  15 |         await expect(this.transferFundsLink).toBeVisible();
  16 |         await this.transferFundsLink.click();
  17 |         await expect(this.pageTitle).toHaveText('Transfer Funds');
  18 |     }
  19 |     async enterAmount(amount) {
  20 |         await this.amount.fill(amount);
  21 |     }
  22 |     async selectFromAccount() {
  23 |         await expect(this.fromAccount).toBeVisible();
  24 |         await expect(this.fromAccount.locator('option').first()).toBeAttached();
  25 |         await this.fromAccount.selectOption({ index: 0 });
  26 |         await expect(this.fromAccount).toHaveValue(await this.fromAccount.locator('option').first().getAttribute('value'));
  27 | 
  28 |     }
  29 |     async selectToAccount() {
  30 |         await expect(this.toAccountId).toBeVisible();
> 31 |         await expect(this.toAccountId.locator('option').nth(1)).toBeAttached();
     |                                                                 ^ Error: expect(locator).toBeAttached() failed
  32 |         await this.toAccountId.selectOption({ index: 1 });
  33 |         await expect(this.toAccountId).toHaveValue(await this.toAccountId.locator('option').nth(1).getAttribute('value'));
  34 | 
  35 |     }
  36 |     async transferFunds() {
  37 |         await this.transferButton.click();
  38 |     }
  39 |     async verifyTransferComplete() {
  40 |         await expect(this.resultTitle).toBeVisible();
  41 |         await expect(this.resultTitle).toHaveText('Transfer Complete!');
  42 |     }
  43 | 
  44 | }
  45 | module.exports = TransferFundsPage;
```