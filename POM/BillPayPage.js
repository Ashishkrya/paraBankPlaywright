const { expect } = require('@playwright/test');
class BillPayPage {
    constructor(page) {
        this.page = page;
        this.billPaymentLink = page.locator('#leftPanel').getByRole('link', { name: 'Bill Pay' });
        this.billTitle = page.locator('#billpayForm h1.title');
        this.payeeNameInput = page.locator('td').filter({ hasText: 'Payee Name:' })
        this.payeeName = page.locator('[name="payee.name"]');
        this.payeeAdd = page.locator('[name="payee.address.street"]');
        this.payeeCity = page.locator('[name="payee.address.city"]');
        this.payeeState = page.locator('[name="payee.address.state"]');
        this.payeeZip = page.locator('[name="payee.address.zipCode"]');
        this.payeePhone = page.locator('[name="payee.phoneNumber"]');
        this.payeeAcc = page.locator('[name="payee.accountNumber"]');
        this.payeeVerifyAcc = page.locator('[name="verifyAccount"]');
        this.amount = page.locator('[name="amount"]');
        this.fromAccount = page.locator('#billpayForm select[name="fromAccountId"]');
        this.sendPaymenbtnt = page.locator('#billpayForm input[value="Send Payment"]');
        this.verifyPayment = page.locator('#billpayResult h1.title');
        this.error = page.locator("#validationModel-name");

    }
    async navigateToBillPay() {
        await this.page.goto('billpay.htm');
    }
    async billPayPage() {
        await expect(this.billPaymentLink).toBeVisible();
        await this.billPaymentLink.click();

    }
    async billPagetitle(title) {
        await expect(this.billTitle).toHaveText(title);

    }
    async payeeNameinput() {
        await expect(this.payeeNameInput).toBeVisible();

    }

    async fillPayeeDetails(userData) {
        await this.payeeName.fill(userData.payeeName);
        await this.payeeAdd.fill(userData.address);
        await this.payeeCity.fill(userData.city);
        await this.payeeState.fill(userData.state);
        await this.payeeZip.fill(userData.zipCode);
        await this.payeePhone.fill(userData.phoneNumber);
        await this.payeeAcc.fill(userData.accountNumber);
        await this.payeeVerifyAcc.fill(userData.accountNumber);
        await this.amount.fill(userData.amount);
    }
    async selectFromAccount() {
        await expect(this.fromAccount).toBeVisible();
        await expect(this.fromAccount.locator('option').first()).toBeAttached();
        await this.fromAccount.selectOption({ index: 0 });
        await expect(this.fromAccount).toHaveValue(await this.fromAccount.locator('option').first().getAttribute('value'));

    }
    async sendPayment() {
        await this.sendPaymenbtnt.click();

    }
    async verifyPaymentComplete(msg) {
        await expect(this.verifyPayment).toContainText(msg);
        await expect(this.verifyPayment).toBeVisible();

    }
    //BDD
    async fillPayeeName(name) {
        await this.payeeName.fill(name);
    }

    async fillPayeeAddress(address, city, state, zip) {
        await this.payeeAdd.fill(address);
        await this.payeeCity.fill(city);
        await this.payeeState.fill(state);
        await this.payeeZip.fill(zip);
    }

    async fillPayeePhone(phone) {
        await this.payeePhone.fill(phone);
    }

    async fillPayeeAccount(accountNumber) {
        await this.payeeAcc.fill(accountNumber);
    }

    async confirmPayeeAccount(accountNumber) {
        await this.payeeVerifyAcc.fill(accountNumber);
    }

    async enterPaymentAmount(amount) {
        await this.amount.fill(amount);
    }
    async validateerror() {
        await expect(this.error).toBeVisible();
        await expect(this.error).toHaveText('Payee name is required.')
    }
    async clickButton(buttonName) {
    await this.page.getByRole('button', {
        name: buttonName
    }).click();
}

}
module.exports = BillPayPage;