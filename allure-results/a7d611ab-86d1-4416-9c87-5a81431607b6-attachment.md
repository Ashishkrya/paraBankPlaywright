# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.js >> @Webb Fill registration form
- Location: tests/register.spec.js:7:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Register' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('link', { name: 'Register' }) with timeout 5000ms
  - waiting for getByRole('link', { name: 'Register' })

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
  2  | const { saveJson } = require('../utils/fileUtils');
  3  | 
  4  | class RegisterPage {
  5  |     constructor(page) {
  6  |         this.page = page;
  7  |         this.registerLink = page.getByRole('link', { name: 'Register' });
  8  |         this.pageHeading = page.locator('#rightPanel h1.title');
  9  |         this.firstName = page.locator('[name="customer.firstName"]');
  10 |         this.lastName = page.locator('[name="customer.lastName"]');
  11 |         this.address = page.locator('[name="customer.address.street"]');
  12 |         this.city = page.locator('[name="customer.address.city"]');
  13 |         this.state = page.locator('[name="customer.address.state"]');
  14 |         this.zipCode = page.locator('[name="customer.address.zipCode"]');
  15 |         this.phone = page.locator('[name="customer.phoneNumber"]');
  16 |         this.ssn = page.locator('[name="customer.ssn"]');
  17 |         this.username = page.locator('[name="customer.username"]');
  18 |         this.password = page.locator('[name="customer.password"]');
  19 |         this.confirmPassword = page.locator('[name="repeatedPassword"]');
  20 |         this.registerButton = page.getByRole('button', { name: 'Register' });
  21 |         this.errorMessages = page.locator('span.error');
  22 | 
  23 |     }
  24 |     async registrationlink() {
  25 |         await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
> 26 |         await expect(this.registerLink).toBeVisible();
     |                                         ^ Error: expect(locator).toBeVisible() failed
  27 |     }
  28 |     async registerUser(userData) {
  29 |         await this.registerLink.click();
  30 |         await expect(this.pageHeading).toHaveText('Signing up is easy!');
  31 |         await this.firstName.fill(userData.firstName);
  32 |         await this.lastName.fill(userData.lastName);
  33 |         await this.address.fill(userData.address);
  34 |         await this.city.fill(userData.city);
  35 |         await this.state.fill(userData.state);
  36 |         await this.zipCode.fill(userData.zipCode);
  37 |         await this.phone.fill(userData.phone);
  38 |         await this.ssn.fill(userData.ssn);
  39 |         await this.username.fill(userData.username);
  40 |         await this.password.fill(userData.password);
  41 |         await this.confirmPassword.fill(userData.password);
  42 |         await expect(this.confirmPassword).toHaveValue(userData.password);
  43 |         await expect(this.password).toHaveValue(userData.password);
  44 | 
  45 |     }
  46 |     async clickRegisterButton() {
  47 |         await this.registerButton.click();
  48 |     }
  49 |     async verifyRegistrationSuccess(username) {
  50 |         await expect(this.pageHeading).toHaveText(`Welcome ${username}`);
  51 |     }
  52 |     async saveLoginCredentials(userData) {
  53 |         saveJson('loginUserID', {
  54 |             username: userData.username,
  55 |             password: userData.password
  56 |         });
  57 |     }
  58 |     async verifyRequiredFieldErrors() {
  59 |     const count = await this.errorMessages.count();
  60 |     console.log('Total error messages:', count);
  61 |     expect(count).toBe(10);
  62 | }
  63 | }
  64 | module.exports = RegisterPage;
```