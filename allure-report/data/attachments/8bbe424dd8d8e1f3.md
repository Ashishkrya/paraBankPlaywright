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
- list:
  - listitem: ATM Services
  - listitem:
    - link "Withdraw Funds":
      - /url: services/ParaBank?wsdl
  - listitem:
    - link "Transfer Funds":
      - /url: services/ParaBank?wsdl
  - listitem:
    - link "Check Balances":
      - /url: services/ParaBank?wsdl
  - listitem:
    - link "Make Deposits":
      - /url: services/ParaBank?wsdl
- list:
  - listitem: Online Services
  - listitem:
    - link "Bill Pay":
      - /url: services/bank?_wadl&_type=xml
  - listitem:
    - link "Account History":
      - /url: services/bank?_wadl&_type=xml
  - listitem:
    - link "Transfer Funds":
      - /url: services/bank?_wadl&_type=xml
- paragraph:
  - link "Read More":
    - /url: services.htm
- heading "Latest News" [level=4]
- list:
  - listitem: 10/26/2026
  - listitem:
    - link "ParaBank Is Now Re-Opened":
      - /url: news.htm#6
  - listitem:
    - link "New! Online Bill Pay":
      - /url: news.htm#5
  - listitem:
    - link "New! Online Account Transfers":
      - /url: news.htm#4
- paragraph:
  - link "Read More":
    - /url: news.htm
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