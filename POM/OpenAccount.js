const { expect } = require('@playwright/test');

class OpenAccount {
    constructor(page) {
        this.page = page;
        this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.accountType = page.locator('#type');
        this.fromAccount = page.locator('#fromAccountId');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.accountOpenedMessage = page.locator('#openAccountResult h1.title');
        this.newAccountNumber = page.locator('#newAccountId');
        // Account overview locators
        this.accountOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
        this.accountOverviewTitle = page.locator('#showOverview h1.title');
        // Transaction locators
        this.transactionRow = page.locator('#transactionTable tbody tr:has(a)').first();
        this.transactionLink = this.transactionRow.getByRole('link', {
            name: 'Funds Transfer Received',
            exact: true
        });
    }
    async openNewAccount(type = 'SAVINGS') {
        await this.page.goto('overview.htm');
        await expect(this.openNewAccountLink).toBeVisible();
        await this.openNewAccountLink.click();
        await expect(this.openNewAccountButton).toBeVisible();
        await this.accountType.selectOption({ label: type });
        await expect(this.fromAccount).toBeVisible();
        await expect(this.fromAccount.locator('option').first()).toBeAttached();
        const firstAccountValue = await this.fromAccount.locator('option').first().getAttribute('value');
        await this.fromAccount.selectOption(firstAccountValue);
        await this.openNewAccountButton.click();
        await expect(this.accountOpenedMessage).toHaveText('Account Opened!');
        await expect(this.newAccountNumber).toBeVisible();
        return (await this.newAccountNumber.textContent()).trim();
        
    }

    async verifyOpenedAccount(accountNumber) {
        await this.newAccountNumber.click();
        //await expect(this.page.locator('#accountId')).toHaveValue(accountNumber);
    }

    async captureTransactionDetails(getTransactionDetails) {
        await expect(this.transactionLink).toBeVisible();
        await this.transactionLink.click();
        return await getTransactionDetails(this.page);
    }

    async goToAccountsOverview() {
        await this.accountOverviewLink.click();
        await expect(this.accountOverviewTitle).toHaveText('Accounts Overview');
    }

    async clickAccount(accountNumber) {
        const accountLink = this.page.getByRole('link', {
            name: String(accountNumber),
            exact: true
        });
        await expect(accountLink).toBeVisible();
        await accountLink.click();
    }
}

module.exports = OpenAccount;