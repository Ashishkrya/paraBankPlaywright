
const { expect } = require('@playwright/test');
const { getAccountDetails, getAccountNumber,selectTransactionFilters} = require('../utils/fileUtils');

class AccountsOverview {
    constructor(page) {
        this.page = page;
        this.link= page.getByRole('link' ,{name:'Accounts Overview'});
        this.accountsOverviewTitle = page.locator('#showOverview h1.title');
        this.accountRows = page.locator('#accountTable tbody tr:has(a)');
        this.accountDetailsTitle = page.locator('#accountDetails h1.title');
        this.accountId = page.locator('#accountId');
    }
    async getpage(){
        await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm');
        await expect(this.link).toBeVisible();
        await this.link.click();
    }

    async verifyAccountsOverview(title) {
        await expect(this.accountsOverviewTitle).toHaveText(title);
    }

    async getAccountsDetails() {
        return await getAccountDetails(this.page);
    }

    async openFirstAccount() {
        await this.accountRows.first().locator('a').click();
    }

    async verifyAccountDetails(heading) {
        await expect(this.accountDetailsTitle).toHaveText(heading);
    }

    async verifyAccountNumber(expectedAccount) {
        const accountNumber = await getAccountNumber(this.page);
        expect(accountNumber).toBe(expectedAccount);
    }

    async selectAccountActivityFilters(type, period) {
        await selectTransactionFilters(this.page, type, period);
    }
}

module.exports = AccountsOverview;
