const { expect } = require('@playwright/test');
class TransferFundsPage {
    constructor(page) {
        this.page = page;
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.pageTitle = page.locator('#showForm h1.title');
        this.amount = page.locator('#amount');
        this.fromAccount = page.locator('#fromAccountId');
        this.toAccountId = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.resultTitle = page.locator('#showResult h1.title');

    }
    async openTransferFunds() {
        await expect(this.transferFundsLink).toBeVisible();
        await this.transferFundsLink.click();
        await expect(this.pageTitle).toHaveText('Transfer Funds');
    }
    async enterAmount(amount) {
        await this.amount.fill(amount);
    }
    async selectFromAccount() {
        await expect(this.fromAccount).toBeVisible();
        await expect(this.fromAccount.locator('option').first()).toBeAttached();
        await this.fromAccount.selectOption({ index: 0 });
        await expect(this.fromAccount).toHaveValue(await this.fromAccount.locator('option').first().getAttribute('value'));

    }
    async selectToAccount() {
        await expect(this.toAccountId).toBeVisible();
        await expect(this.toAccountId.locator('option').nth(1)).toBeAttached();
        await this.toAccountId.selectOption({ index: 1 });
        await expect(this.toAccountId).toHaveValue(await this.toAccountId.locator('option').nth(1).getAttribute('value'));

    }
    async transferFunds() {
        await this.transferButton.click();
    }
    async verifyTransferComplete() {
        await expect(this.resultTitle).toHaveText('Transfer Complete!');
    }

}
module.exports = TransferFundsPage;