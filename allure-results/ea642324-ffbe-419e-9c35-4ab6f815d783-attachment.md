# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: findTransactions.spec.js >> Find Transation by Amount
- Location: tests/findTransactions.spec.js:32:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Find Transactions' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('link', { name: 'Find Transactions' }) with timeout 5000ms
  - waiting for getByRole('link', { name: 'Find Transactions' })

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
- heading "Customer Login" [level=2]
- paragraph: Username
- textbox
- paragraph: Password
- textbox
- button "Log In"
- paragraph:
  - link "Forgot login info?":
    - /url: lookup.htm
- paragraph:
  - link "Register":
    - /url: register.htm
- heading "Error!" [level=1]
- paragraph: An internal error has occurred and has been logged.
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
  2  | class FindTransaction {
  3  |     constructor(page) {
  4  |         this.page = page;
  5  |         this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
  6  |         this.accountId = page.locator('#accountId');
  7  |         this.transactionId = page.locator('#transactionId');
  8  |         this.transactionDate = page.locator('#transactionDate');
  9  |         this.fromDate = page.locator('#fromDate');
  10 |         this.toDate = page.locator('#toDate');
  11 |         this.amount = page.locator('#amount');
  12 |         this.findByIdButton = page.locator('#findById');
  13 |         this.findByDateButton = page.locator('#findByDate');
  14 |         this.findByDateRangeButton = page.locator('#findByDateRange');
  15 |         this.findByAmountButton = page.locator('#findByAmount');
  16 |         this.transactionRows = page.locator('#transactionBody tr');
  17 |     }
  18 |     async openFindTransactions(newOpenAccountNumber) {
> 19 |         await expect(this.findTransactionsLink).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  20 |         await this.findTransactionsLink.click();
  21 |         await expect(this.accountId).toBeVisible();
  22 |         await this.accountId.selectOption(newOpenAccountNumber);
  23 |         await expect(this.accountId).toBeVisible();
  24 |     }
  25 |     async verrifyTransactions(transactionDetail) {
  26 |         const count = await this.transactionRows.count();
  27 |        // expect(count).toBeGreaterThan(0);
  28 |         await expect(this.transactionRows).toContainText([transactionDetail]);
  29 |     }
  30 |     async findByTransactionId(transactionDetail) {
  31 |         await this.transactionId.fill(transactionDetail.TransactionID)
  32 |         await expect(this.transactionId).not.toHaveValue('');
  33 |         await this.findByIdButton.click();
  34 |     }
  35 |     async findByTransactionDate(transactionDetail) {
  36 |         await this.transactionDate.fill(transactionDetail.date)
  37 |         await expect(this.transactionDate).not.toHaveValue('');
  38 |         await this.findByDateButton.click();
  39 | 
  40 |     }
  41 |     async findByTransactionDateRange(transactionDetail) {
  42 |         await this.fromDate.fill(transactionDetail.Date)
  43 |         await expect(this.fromDate).not.toHaveValue('');
  44 |         await this.toDate.fill(transactionDetail.Date)
  45 |         await expect(this.toDate).not.toHaveValue('');
  46 |         await this.findByDateRangeButton.click();
  47 | 
  48 |     }
  49 |     async findByAmount(transactionDetail) {
  50 |         await this.amount.fill(transactionDetail.Amount)
  51 |         await expect(this.amount).not.toHaveValue('');
  52 |         await this.findByAmountButton.click();
  53 |     }
  54 | }
  55 | module.exports = FindTransaction;
```