# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: requestLoan.spec.js >> Request Loan
- Location: tests/requestLoan.spec.js:6:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Request Loan' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('link', { name: 'Request Loan' }) with timeout 5000ms
  - waiting for getByRole('link', { name: 'Request Loan' })

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
  1  | const { expect } = require('@playwright/test');
  2  | const { getAccountNumber } = require('../utils/fileUtils');
  3  | class RequestLoan {
  4  |     constructor(page) {
  5  |         this.page = page;
  6  |         this.requestLoan = page.getByRole('link', { name: 'Request Loan' });
  7  |         this.pageTitle = page.locator('#requestLoanForm h1.title');
  8  |         this.amount = page.locator('#amount');
  9  |         this.downPayment = page.locator('#downPayment')
  10 |         this.fromAccount = page.locator('#fromAccountId');
  11 |         this.applyNow = page.getByRole('button', { name: 'Apply Now' });
  12 |         this.loanApproved = page.locator('#loanRequestApproved p').first();
  13 |         this.newAccountNumber = page.locator('#newAccountId');
  14 | 
  15 |     }
  16 |     async requestLoanpage() {
> 17 |         await expect(this.requestLoan).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  18 |         await this.requestLoan.click();
  19 |         await expect(this.pageTitle).toHaveText('Apply for a Loan');
  20 |     }
  21 |     async loanDetails() {
  22 |         await this.amount.fill('100');
  23 |         await this.downPayment.fill("10");
  24 |         await expect(this.downPayment).not.toHaveValue('');
  25 |         await expect(this.fromAccount).toBeVisible();
  26 |         await expect(this.fromAccount.locator('option').first()).toBeAttached();
  27 |         await expect(this.fromAccount).toHaveValue(await this.fromAccount.locator('option').first().getAttribute('value'));
  28 |     }
  29 |     async applyLoan(){
  30 |          await this.applyNow.click();
  31 |         
  32 |     }
  33 |     async loanApprovedMsg(){
  34 |         await expect(this.loanApproved).toHaveText('Congratulations, your loan has been approved.')
  35 | 
  36 |     }
  37 |     async loanAccountNumber(){
  38 |             await expect(this.newAccountNumber).toBeVisible();
  39 |             const newOpenAccountNumber = (await this.newAccountNumber.textContent()).trim();
  40 |             await this.newAccountNumber.click();
  41 |             const accountNumber = await getAccountNumber(this.page);
  42 |             console.log(accountNumber);
  43 |             expect(accountNumber).toBe(newOpenAccountNumber);
  44 |     }
  45 | 
  46 | }
  47 | module.exports = RequestLoan;
  48 | 
```