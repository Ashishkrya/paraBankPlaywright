const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const userData = require('../../test-data/loginUserID.json');

Given('the user is on the login page', async function () {
    this.login = this.poManager.getlogInPage();
    this.register = this.poManager.getregisterPage();
    await this.register.registrationlink()
    await this.login.loginMainLink();
});

When('the user enters username {string} and password {string}', async function (username, password) {
    if (username === 'json' && password === 'json') {
        username = userData.username;
        password = userData.password;
    }
    await this.login.loginDetails(username, password);
}
);

When('the user clicks the login button', async function () {
    await this.login.clickLoginButton();
});

Then('the login result should be {string}', async function (result) {
      const abc= result.toLowerCase();
    if (abc === 'success') {
        this.accountsOverview = this.poManager.getAccountsOverview();
        await this.accountsOverview.verifyAccountsOverview("Accounts Overview");
    } else if (abc === 'failure') {
        await this.login.loginError();
    }
});
 When('the user enters below credentials and validate error message', async function (dataTable) {
    for (const { username, password } of dataTable.hashes()) {
        await this.login.loginDetails(username, password);
        await this.login.clickLoginButton();
        await this.login.loginError();
    }
});

 Then('the user validates the following error details', async function (dataTable) {
    const errors = dataTable.raw().flat();
    await expect(this.page.locator('#rightPanel h1')).toHaveText(errors[0]);
    await expect(this.page.locator('#rightPanel p.error')).toHaveText(errors[1]);
});