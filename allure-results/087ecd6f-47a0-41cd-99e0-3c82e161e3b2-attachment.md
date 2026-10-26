# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: billpay.spec.js >> Bill Payment
- Location: tests/billpay.spec.js:6:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#leftPanel').getByRole('link', { name: 'Bill Pay' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#leftPanel').getByRole('link', { name: 'Bill Pay' }) with timeout 5000ms
  - waiting for locator('#leftPanel').getByRole('link', { name: 'Bill Pay' })

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
  2  | class BillPayPage {
  3  |     constructor(page) {
  4  |         this.page = page;
  5  |         this.billPaymentLink = page.locator('#leftPanel').getByRole('link', { name: 'Bill Pay' });
  6  |         this.billTitle = page.locator('#billpayForm h1.title');
  7  |         this.payeeName = page.locator('[name="payee.name"]');
  8  |         this.payeeAdd = page.locator('[name="payee.address.street"]');
  9  |         this.payeeCity = page.locator('[name="payee.address.city"]');
  10 |         this.payeeState = page.locator('[name="payee.address.state"]');
  11 |         this.payeeZip = page.locator('[name="payee.address.zipCode"]');
  12 |         this.payeePhone = page.locator('[name="payee.phoneNumber"]');
  13 |         this.payeeAcc = page.locator('[name="payee.accountNumber"]');
  14 |         this.payeeVerifyAcc = page.locator('[name="verifyAccount"]');
  15 |         this.amount = page.locator('[name="amount"]');
  16 |         this.fromAccount = page.locator('#billpayForm select[name="fromAccountId"]');
  17 |         this.sendPaymenbtnt = page.locator('#billpayForm input[value="Send Payment"]');
  18 |         this.verifyPayment = page.locator('#billpayResult h1.title');
  19 | 
  20 | 
  21 |     }
  22 |     async billPayPage() {
> 23 |         await expect(this.billPaymentLink).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
  24 |         await this.billPaymentLink.click();
  25 |         await expect(this.billTitle).toHaveText('Bill Payment Service')
  26 | 
  27 |     }
  28 |     async fillPayeeDetails(userData) {
  29 |         await this.payeeName.fill(userData.payeeName);
  30 |         await this.payeeAdd.fill(userData.address);
  31 |         await this.payeeCity.fill(userData.city);
  32 |         await this.payeeState.fill(userData.state);
  33 |         await this.payeeZip.fill(userData.zipCode);
  34 |         await this.payeePhone.fill(userData.phoneNumber);
  35 |         await this.payeeAcc.fill(userData.accountNumber);
  36 |         await this.payeeVerifyAcc.fill(userData.accountNumber);
  37 |         await this.amount.fill(userData.amount);
  38 |     }
  39 |     async selectFromAccount() {
  40 |         await expect(this.fromAccount).toBeVisible();
  41 |         await expect(this.fromAccount.locator('option').first()).toBeAttached();
  42 |         await this.fromAccount.selectOption({ index: 0 });
  43 |         await expect(this.fromAccount).toHaveValue(await this.fromAccount.locator('option').first().getAttribute('value'));
  44 | 
  45 |     }
  46 |     async sendPayment() {
  47 |         await this.sendPaymenbtnt.click();
  48 | 
  49 |     }
  50 |     async verifyPaymentComplete() {
  51 |         await expect(this.verifyPayment).toContainText('Bill Payment Complete');
  52 |         await expect(this.verifyPayment).toBeVisible();
  53 | 
  54 |     }
  55 | 
  56 | }
  57 | module.exports = BillPayPage;
```