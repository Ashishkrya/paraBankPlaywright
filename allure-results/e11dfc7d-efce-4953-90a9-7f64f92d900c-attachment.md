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

Locator: locator('#accountTable tbody tr:has(a)').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#accountTable tbody tr:has(a)').first() with timeout 5000ms
  - waiting for locator('#accountTable tbody tr:has(a)').first()

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
  1   | // import fs from 'fs';
  2   | // import { test, expect } from '@playwright/test';
  3   | // const userDta = require('../test-data/loginUserID.json');
  4   | const fs = require('fs');
  5   | const path = require('path');
  6   | const { expect } = require('@playwright/test');
  7   | 
  8   | function saveJson(fileName, newData) {
  9   |     const filePath = `test-data/${fileName}.json`;
  10  |     let existingData = {};
  11  |     if (fs.existsSync(filePath)) {
  12  |         existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  13  |     }
  14  |     const updatedData = {
  15  |         ...existingData,
  16  |         ...newData
  17  |     };
  18  |     fs.writeFileSync(
  19  |         filePath,
  20  |         JSON.stringify(updatedData, null, 2)
  21  |     );
  22  | }
  23  | 
  24  | async function getAccountDetails(page) {
  25  |     const rows = page.locator('#accountTable tbody tr:has(a)');
> 26  |     await expect(rows.first()).toBeVisible();
      |                                ^ Error: expect(locator).toBeVisible() failed
  27  |     const count = await rows.count();
  28  |     const accountDetails = [];
  29  |     for (let i = 0; i < count; i++) {
  30  |         const row = rows.nth(i);
  31  |         const account = await row.locator('td').nth(0).innerText();
  32  |         const balance = await row.locator('td').nth(1).innerText();
  33  |         const available = await row.locator('td').nth(2).innerText();
  34  |         accountDetails.push({
  35  |             account,
  36  |             balance,
  37  |             available
  38  |         });
  39  |     }
  40  |     return accountDetails;
  41  | }
  42  | //Account Details
  43  |  async function getAccountNumber(page) {
  44  |     const accountNumber = page.locator('#accountId');
  45  |     await expect(accountNumber).toBeVisible();
  46  |     await expect(accountNumber).not.toHaveText('');
  47  |     return (await accountNumber.innerText()).trim();
  48  | }
  49  | //Account Activity
  50  |  async function selectTransactionFilters(page, month, transactionType, transactionId) {
  51  |     await page.locator('#month').selectOption({ label: month });
  52  |     await page.locator('#transactionType').selectOption({ label: transactionType });
  53  |     await expect(page.locator('#transactionType')).toHaveValue(transactionType);
  54  |     await page.locator('input[type="submit"][value="Go"]').click();
  55  |     const noTransactions = page.locator('#noTransactions');
  56  |     const rows = page.locator('#transactionTable tbody tr');
  57  |     await expect(noTransactions).toBeVisible({ timeout: 10000 })
  58  |         .catch(async () => {
  59  |             await expect(rows.first()).toBeVisible({ timeout: 10000 });
  60  |         });
  61  |     if (await noTransactions.isVisible()) {
  62  |         await expect(noTransactions).toHaveText('No transactions found.');
  63  |         return;
  64  |     }
  65  |     const count = await rows.count();
  66  |     for (let i = 0; i < count; i++) {
  67  |         const row = rows.nth(i);
  68  |         const date = await row.locator('td').nth(0).innerText();
  69  |         const transaction = await row.locator('td').nth(1).innerText();
  70  |         const debit = await row.locator('td').nth(2).innerText();
  71  |         const credit = await row.locator('td').nth(3).innerText();
  72  | 
  73  |         console.log({
  74  |             date,
  75  |             transaction,
  76  |             debit,
  77  |             credit
  78  |         });
  79  |     }
  80  | }
  81  | 
  82  | // is account presnet: 
  83  | async function isAccountPresent(page, accountNumber) {
  84  |     const accountDetails = await getAccountDetails(page);
  85  |     return accountDetails.some(
  86  |         account => account.account === accountNumber
  87  |     );
  88  | }
  89  | 
  90  | //
  91  | async function getTransactionDetails(page) {
  92  |     const panel = page.locator('#rightPanel');
  93  |     await expect(panel.getByRole('heading', { name: 'Transaction Details' })).toBeVisible();
  94  |     const rows = panel.locator('table tbody tr');
  95  |     const count = await rows.count();
  96  |     const transactionDetails = {};
  97  |     for (let i = 0; i < count; i++) {
  98  |         const row = rows.nth(i);
  99  |         const key = (await row.locator('td').nth(0).innerText())
  100 |             .replace(':', '')
  101 |             .trim()
  102 |             .replace(/\s+/g, '');
  103 |         let value = (await row.locator('td').nth(1).innerText()).trim();
  104 |         if (key === 'Amount') {
  105 |             value = value.replace('$', '');
  106 |         }
  107 |         transactionDetails[key] = value;
  108 |     }
  109 |     return transactionDetails;
  110 | }
  111 | module.exports = {
  112 |     saveJson,
  113 |     getAccountDetails,
  114 |     getAccountNumber,
  115 |     selectTransactionFilters,
  116 |     isAccountPresent,
  117 |     getTransactionDetails
  118 | };
  119 | 
```