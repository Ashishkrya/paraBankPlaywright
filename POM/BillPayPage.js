const { expect } = require('@playwright/test');
class BillPayPage {
    constructor(page) {
        this.page = page;
        this.billPaymentLink = page.getByRole('link', { name: 'Bill Pay' });
        this.billTitle = page.locator('#billpayForm h1.title');
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


    }
    async billPayPage() {
        await expect(this.billPaymentLink).toBeVisible();
        await this.billPaymentLink.click();
        await expect(this.billTitle).toHaveText('Bill Payment Service')

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
    async verifyPaymentComplete() {
        await expect(this.verifyPayment).toContainText('Bill Payment Complete')

    }

}
module.exports = BillPayPage;