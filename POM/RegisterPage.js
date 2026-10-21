const { expect } = require('@playwright/test');
const { saveJson } = require('../utils/fileUtils');

class RegisterPage {
    constructor(page) {
        this.page = page;
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.pageHeading = page.locator('#rightPanel h1.title');
        this.firstName = page.locator('[name="customer.firstName"]');
        this.lastName = page.locator('[name="customer.lastName"]');
        this.address = page.locator('[name="customer.address.street"]');
        this.city = page.locator('[name="customer.address.city"]');
        this.state = page.locator('[name="customer.address.state"]');
        this.zipCode = page.locator('[name="customer.address.zipCode"]');
        this.phone = page.locator('[name="customer.phoneNumber"]');
        this.ssn = page.locator('[name="customer.ssn"]');
        this.username = page.locator('[name="customer.username"]');
        this.password = page.locator('[name="customer.password"]');
        this.confirmPassword = page.locator('[name="repeatedPassword"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.errorMessages = page.locator('span.error');

    }
    async registrationlink() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
        await expect(this.registerLink).toBeVisible();
    }
    async registerUser(userData) {
        await this.registerLink.click();
        await expect(this.pageHeading).toHaveText('Signing up is easy!');
        await this.firstName.fill(userData.firstName);
        await this.lastName.fill(userData.lastName);
        await this.address.fill(userData.address);
        await this.city.fill(userData.city);
        await this.state.fill(userData.state);
        await this.zipCode.fill(userData.zipCode);
        await this.phone.fill(userData.phone);
        await this.ssn.fill(userData.ssn);
        await this.username.fill(userData.username);
        await this.password.fill(userData.password);
        await this.confirmPassword.fill(userData.password);
        await expect(this.confirmPassword).toHaveValue(userData.password);
        await expect(this.password).toHaveValue(userData.password);

    }
    async clickRegisterButton() {
        await this.registerButton.click();
    }
    async verifyRegistrationSuccess(username) {
        await expect(this.pageHeading).toHaveText(`Welcome ${username}`);
    }
    async saveLoginCredentials(userData) {
        saveJson('loginUserID', {
            username: userData.username,
            password: userData.password
        });
    }
    async verifyRequiredFieldErrors() {
    const count = await this.errorMessages.count();
    console.log('Total error messages:', count);
    expect(count).toBe(10);
}
}
module.exports = RegisterPage;