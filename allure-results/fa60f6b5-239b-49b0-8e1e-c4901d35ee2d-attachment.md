# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.js >> @Webb Customer Login
- Location: tests/register.spec.js:25:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#leftPanel h2')
Expected: "Customer Login"
Received: "Account Services"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('#leftPanel h2') with timeout 5000ms
  - waiting for locator('#leftPanel h2')
    14 × locator resolved to <h2>Account Services</h2>
       - unexpected value "Account Services"

```

```yaml
- heading "Account Services" [level=2]
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | class Login {
  3  |     constructor(page) {
  4  |         this.page = page;
  5  |         this.loginPageVisiable = page.locator('#leftPanel h2')
  6  |         this.username = page.locator('input[name="username"]')
  7  |         this.password = page.locator('input[name="password"]')
  8  |         this.loginButton = page.locator('input[value="Log In"]')
  9  |         this.loginDone = page.locator('p.smallText')
  10 |         this.error = page.locator('p.error')
  11 | 
  12 |     }
  13 |     async loginMainLink() {
  14 |         await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
> 15 |         await expect(this.loginPageVisiable).toHaveText('Customer Login');
     |                                              ^ Error: expect(locator).toHaveText(expected) failed
  16 |     }
  17 |     async loginDetails(username, password) {
  18 |         await this.username.fill(username);
  19 |         await this.password.fill(password);
  20 | 
  21 |     }
  22 |     async clickLoginButton() {
  23 |         await this.loginButton.click();
  24 |     }
  25 |     async welocmeMessage(userData) {
  26 |         await expect(this.loginDone).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`,{timeout:5000});
  27 | 
  28 |     }
  29 |     async loginError() {
  30 |         await expect(this.error).toContainText('The username and password could not be verified');
  31 | 
  32 |     }
  33 | }
  34 | module.exports = Login;
```