const { expect, request } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is logged in to ParaBank and user navigates to the Bill Pay page', async function () {
    this.getbillPayPage = this.poManager.getbillPayPage();
    await this.getbillPayPage.navigateToBillPay();
})
Then('the heading {string} is visible on the Bill Pay page', async function (title) {
    await this.getbillPayPage.billPagetitle(title);

})
Then('the payee name input is visible', async function () {
    await this.getbillPayPage.payeeNameinput()

})

When('the user fills in the payee name {string}', async function (payeename) {
    await this.getbillPayPage.fillPayeeName(payeename);
})
Then('the user fills in the payee address {string}, city {string}, state {string}, zip {string}',
    async function (address, city, state, zip) {
        await this.getbillPayPage.fillPayeeAddress(address, city, state, zip);
    })
Then('the user fills in the payee phone {string}', async function (phone) {
    await this.getbillPayPage.fillPayeePhone(phone);
})
Then('the user fills in the payee account number {string}', async function (accountNumber) {
    await this.getbillPayPage.fillPayeeAccount(accountNumber)

})
Then('the user confirms the account number {string}', async function (accountNumber) {
    await this.getbillPayPage.confirmPayeeAccount(accountNumber)
})
Then('the user enters payment amount {string}', async function (amount) {
    await this.getbillPayPage.enterPaymentAmount(amount)

})
When(/^the user clicks the "([^"]*)" button(?: without filling any fields)?$/, async function (buttonName) {
    this.getbillPayPage.clickButton(buttonName)
})
Then('the confirmation message {string} is displayed', async function (msg) {
    await this.getbillPayPage.verifyPaymentComplete(msg)

})
Then('at least one validation error is displayed', async function () {
    await this.getbillPayPage.validateerror()

})