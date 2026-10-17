
const { expect } = require('@playwright/test');
const { getAccountDetails, getAccountNumber,selectTransactionFilters} = require('../utils/fileUtils');

class AccountsOverview {
    constructor(page) {
        this.page = page;
        this.accountsOverviewTitle = page.locator('#showOverview h1.title');
        this.accountRows = page.locator('#accountTable tbody tr:has(a)');
        this.accountDetailsTitle = page.locator('#accountDetails h1.title');
        this.accountId = page.locator('#accountId');
    }

    async verifyAccountsOverview() {
        await expect(this.accountsOverviewTitle).toHaveText('Accounts Overview');
    }

    async getAccountsDetails() {
        return await getAccountDetails(this.page);
    }

    async openFirstAccount() {
        await this.accountRows.first().locator('a').click();
    }

    async verifyAccountDetails(expectedAccount) {
        await expect(this.accountDetailsTitle).toHaveText('Account Details');

        await expect(this.accountId).toHaveText(expectedAccount);
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
