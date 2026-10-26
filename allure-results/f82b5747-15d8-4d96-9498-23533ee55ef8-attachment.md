# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accountsOverview.spec.js >> Accounts Overview Page
- Location: tests/accountsOverview.spec.js:8:5

# Error details

```
TypeError: this.mainlink is not a function
```

```
Error: page.goto: Test ended.
Call log:
  - navigating to "https://parabank.parasoft.com/parabank/overview.htm", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome John Doe
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Accounts Overview" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - row [ref=e54]:
              - columnheader "Account" [ref=e55]
              - columnheader "Balance*" [ref=e56]
              - columnheader "Available Amount" [ref=e57]
          - rowgroup
          - rowgroup [ref=e58]:
            - row [ref=e59]:
              - cell "*Balance includes deposits that may be subject to holds" [ref=e60]
  - generic [ref=e62]:
    - list [ref=e63]:
      - listitem [ref=e64]:
        - link "Home" [ref=e65] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e66]:
        - link "About Us" [ref=e67] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e68]:
        - link "Services" [ref=e69] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e70]:
        - link "Products" [ref=e71] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e72]:
        - link "Locations" [ref=e73] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e74]:
        - link "Site Map" [ref=e75] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e76]:
        - link "Contact Us" [ref=e77] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e78]: © Parasoft. All rights reserved.
    - list [ref=e79]:
      - listitem [ref=e80]: "Visit us at:"
      - listitem [ref=e81]:
        - link "www.parasoft.com" [ref=e82] [cursor=pointer]:
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
> 8  |         this.mainlink= page.goto('https://parabank.parasoft.com/parabank/overview.htm');
     |                             ^ Error: page.goto: Test ended.
  9  |         this.link= page.getByRole('link' ,{name:'Accounts Overview'});
  10 |         this.accountsOverviewTitle = page.locator('#showOverview h1.title');
  11 |         this.accountRows = page.locator('#accountTable tbody tr:has(a)');
  12 |         this.accountDetailsTitle = page.locator('#accountDetails h1.title');
  13 |         this.accountId = page.locator('#accountId');
  14 |     }
  15 |     async getpage(){
  16 |         await this.mainlink()
  17 |         await expect(this.link).toBeVisible();
  18 |         await this.link.click();
  19 |     }
  20 | 
  21 |     async verifyAccountsOverview() {
  22 |         await expect(this.accountsOverviewTitle).toHaveText('Accounts Overview');
  23 |     }
  24 | 
  25 |     async getAccountsDetails() {
  26 |         return await getAccountDetails(this.page);
  27 |     }
  28 | 
  29 |     async openFirstAccount() {
  30 |         await this.accountRows.first().locator('a').click();
  31 |     }
  32 | 
  33 |     async verifyAccountDetails(expectedAccount) {
  34 |         await expect(this.accountDetailsTitle).toHaveText('Account Details');
  35 | 
  36 |         await expect(this.accountId).toHaveText(expectedAccount);
  37 |     }
  38 | 
  39 |     async verifyAccountNumber(expectedAccount) {
  40 |         const accountNumber = await getAccountNumber(this.page);
  41 |         expect(accountNumber).toBe(expectedAccount);
  42 |     }
  43 | 
  44 |     async selectAccountActivityFilters(type, period) {
  45 |         await selectTransactionFilters(this.page, type, period);
  46 |     }
  47 | }
  48 | 
  49 | module.exports = AccountsOverview;
  50 | 
```