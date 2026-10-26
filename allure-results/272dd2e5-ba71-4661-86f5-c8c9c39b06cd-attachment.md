# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: findTransactions.spec.js >> Find Transation by using TransactionID
- Location: tests/findTransactions.spec.js:13:5

# Error details

```
ReferenceError: page is not defined
```

# Test source

```ts
  1  | import { test, expect, beforeAll } from '@playwright/test';
  2  | const userDta = require('../test-data/loginUserID.json');
  3  | const { POManager } = require('../POM/POManager');
  4  | import transactionDetail from '../test-data/transactionDetails.json';
  5  | 
  6  | test.beforeAll(async function(){
> 7  |     const poManager = new POManager(page);
     |                                     ^ ReferenceError: page is not defined
  8  |     const openAccount = poManager.getopenAccount();
  9  |     await openAccount.openNewAccount('SAVINGS');
  10 | 
  11 | })
  12 | 
  13 | test('Find Transation by using TransactionID', async ({ page }) => {
  14 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  15 |     const poManager = new POManager(page);
  16 |     const findTransaction = poManager.getfindTransaction();
  17 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  18 |     await findTransaction.findByTransactionId(transactionDetail);
  19 |     await findTransaction.verrifyTransactions(transactionDetail.Amount);
  20 | })
  21 | 
  22 | test('Find Transation by using Date', async ({ page }) => {
  23 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  24 |     const poManager = new POManager(page);
  25 |     const findTransaction = poManager.getfindTransaction();
  26 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  27 |     await findTransaction.findByTransactionDate({ date: transactionDetail.Date });
  28 |     await findTransaction.verrifyTransactions(transactionDetail.Date);
  29 | 
  30 | })
  31 | test('Find Transation by using DateRange', async ({ page }) => {
  32 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  33 |     const poManager = new POManager(page);
  34 |     const findTransaction = poManager.getfindTransaction();
  35 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  36 |     await findTransaction.findByTransactionDateRange(transactionDetail);
  37 |     await findTransaction.verrifyTransactions(transactionDetail.Date);
  38 | })
  39 | test('Find Transation by Amount', async ({ page }) => {
  40 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  41 |     const poManager = new POManager(page);
  42 |     const findTransaction = poManager.getfindTransaction();
  43 | 
  44 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  45 |     await findTransaction.findByAmount(transactionDetail);
  46 |     await findTransaction.verrifyTransactions(transactionDetail.Amount);
  47 | })
```