# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: findTransactions.spec.js >> Find Transation by using TransactionID
- Location: tests/findTransactions.spec.js:20:5

# Error details

```
ReferenceError: saveJson is not defined
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - generic [ref=f1e2]:
    - generic [ref=f1e3]:
      - link:
        - /url: admin.htm
        - img [ref=f1e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=f1e5] [cursor=pointer]
      - paragraph [ref=f1e6]: Experience the difference
    - generic [ref=f1e7]:
      - list [ref=f1e8]:
        - listitem [ref=f1e9]: Solutions
        - listitem [ref=f1e10]:
          - link "About Us" [ref=f1e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=f1e12]:
          - link "Services" [ref=f1e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=f1e14]:
          - link "Products" [ref=f1e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=f1e16]:
          - link "Locations" [ref=f1e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=f1e18]:
          - link "Admin Page" [ref=f1e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=f1e20]:
        - listitem [ref=f1e21]:
          - link "home" [ref=f1e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=f1e23]:
          - link "about" [ref=f1e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=f1e25]:
          - link "contact" [ref=f1e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=f1e27]:
      - generic [ref=f1e28]:
        - paragraph [ref=f1e29]: Welcome John Doe
        - heading "Account Services" [level=2] [ref=f1e30]
        - list [ref=f1e31]:
          - listitem [ref=f1e32]:
            - link "Open New Account" [ref=f1e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=f1e34]:
            - link "Accounts Overview" [ref=f1e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=f1e36]:
            - link "Transfer Funds" [ref=f1e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=f1e38]:
            - link "Bill Pay" [ref=f1e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=f1e40]:
            - link "Find Transactions" [ref=f1e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=f1e42]:
            - link "Update Contact Info" [ref=f1e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=f1e44]:
            - link "Request Loan" [ref=f1e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=f1e46]:
            - link "Log Out" [ref=f1e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=f1e50]:
        - heading "Account Opened!" [level=1] [ref=f1e51]
        - paragraph [ref=f1e52]: Congratulations, your account is now open.
        - paragraph [ref=f1e53]:
          - text: "Your new account number:"
          - link "17673" [ref=f1e54] [cursor=pointer]:
            - /url: activity.htm?id=17673
  - generic [ref=f1e56]:
    - list [ref=f1e57]:
      - listitem [ref=f1e58]:
        - link "Home" [ref=f1e59] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=f1e60]:
        - link "About Us" [ref=f1e61] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=f1e62]:
        - link "Services" [ref=f1e63] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=f1e64]:
        - link "Products" [ref=f1e65] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=f1e66]:
        - link "Locations" [ref=f1e67] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=f1e68]:
        - link "Site Map" [ref=f1e69] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=f1e70]:
        - link "Contact Us" [ref=f1e71] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=f1e72]: © Parasoft. All rights reserved.
    - list [ref=f1e73]:
      - listitem [ref=f1e74]: "Visit us at:"
      - listitem [ref=f1e75]:
        - link "www.parasoft.com" [ref=f1e76] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect, beforeAll } from '@playwright/test';
  2  | const userDta = require('../test-data/loginUserID.json');
  3  | const { POManager } = require('../POM/POManager');
  4  | import transactionDetail from '../test-data/transactionDetails.json';
  5  | 
  6  | let setupPage;
  7  | 
  8  | test.beforeAll(async ({ browser }) => {
  9  |     const context = await browser.newContext();
  10 |     setupPage = await context.newPage();
  11 |     const poManager = new POManager(setupPage);
  12 |     const openAccount = poManager.getopenAccount();
  13 | 
  14 |     const newOpenAccountNumber = await openAccount.openNewAccount('SAVINGS');
> 15 |     saveJson('loginUserID', { newOpenAccountNumber });
     |     ^ ReferenceError: saveJson is not defined
  16 | 
  17 |     await context.close();
  18 | });
  19 | 
  20 | test('Find Transation by using TransactionID', async ({ page }) => {
  21 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  22 |     const poManager = new POManager(page);
  23 |     const findTransaction = poManager.getfindTransaction();
  24 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  25 |     await findTransaction.findByTransactionId(transactionDetail);
  26 |     await findTransaction.verrifyTransactions(transactionDetail.Amount);
  27 | })
  28 | 
  29 | test('Find Transation by using Date', async ({ page }) => {
  30 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  31 |     const poManager = new POManager(page);
  32 |     const findTransaction = poManager.getfindTransaction();
  33 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  34 |     await findTransaction.findByTransactionDate({ date: transactionDetail.Date });
  35 |     await findTransaction.verrifyTransactions(transactionDetail.Date);
  36 | 
  37 | })
  38 | test('Find Transation by using DateRange', async ({ page }) => {
  39 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  40 |     const poManager = new POManager(page);
  41 |     const findTransaction = poManager.getfindTransaction();
  42 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  43 |     await findTransaction.findByTransactionDateRange(transactionDetail);
  44 |     await findTransaction.verrifyTransactions(transactionDetail.Date);
  45 | })
  46 | test('Find Transation by Amount', async ({ page }) => {
  47 |     await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  48 |     const poManager = new POManager(page);
  49 |     const findTransaction = poManager.getfindTransaction();
  50 | 
  51 |     await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
  52 |     await findTransaction.findByAmount(transactionDetail);
  53 |     await findTransaction.verrifyTransactions(transactionDetail.Amount);
  54 | })
```