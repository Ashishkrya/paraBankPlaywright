const { expect } = require('@playwright/test');
class Login {
    constructor(page) {
        this.page = page;
        this.loginPageVisiable = page.locator('#leftPanel h2')
        this.username = page.locator('input[name="username"]')
        this.password = page.locator('input[name="password"]')
        this.loginButton = page.locator('input[value="Log In"]')
        this.loginDone = page.locator('p.smallText')
        this.error = page.locator('p.error')

    }
    async loginMainLink() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(this.loginPageVisiable).toHaveText('Customer Login');
    }
    async loginDetails(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);

    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async welocmeMessage(userData) {
        await expect(this.loginDone).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`,{timeout:5000});

    }
    async loginError() {
        await expect(this.error).toContainText('The username and password could not be verified');

    }
}
module.exports = Login;