# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: openNewAccount.spec.js >> Open New Account
- Location: tests/openNewAccount.spec.js:7:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Open New Account' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
        - heading "Customer Login" [level=2] [ref=e29]
        - generic [ref=e30]:
          - generic [ref=e31]:
            - paragraph [ref=e32]: Username
            - textbox [active] [ref=e34]
            - paragraph [ref=e35]: Password
            - textbox [ref=e37]
            - button "Log In" [ref=e39] [cursor=pointer]
          - paragraph [ref=e40]:
            - link "Forgot login info?" [ref=e41] [cursor=pointer]:
              - /url: lookup.htm
          - paragraph [ref=e42]:
            - link "Register" [ref=e43] [cursor=pointer]:
              - /url: register.htm
      - generic [ref=e44]:
        - heading "Error!" [level=1] [ref=e45]
        - paragraph [ref=e46]: An internal error has occurred and has been logged.
  - generic [ref=e48]:
    - list [ref=e49]:
      - listitem [ref=e50]:
        - link "Home" [ref=e51] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e52]:
        - link "About Us" [ref=e53] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e54]:
        - link "Services" [ref=e55] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e56]:
        - link "Products" [ref=e57] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e58]:
        - link "Locations" [ref=e59] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e60]:
        - link "Site Map" [ref=e61] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e62]:
        - link "Contact Us" [ref=e63] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e64]: © Parasoft. All rights reserved.
    - list [ref=e65]:
      - listitem [ref=e66]: "Visit us at:"
      - listitem [ref=e67]:
        - link "www.parasoft.com" [ref=e68] [cursor=pointer]:
          - /url: http://www.parasoft.com/
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
     |                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
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