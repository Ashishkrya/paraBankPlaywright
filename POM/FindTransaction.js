const { expect } = require('@playwright/test');
class FindTransaction {
    constructor(page) {
        this.page = page;
        this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
        this.accountId = page.locator('#accountId');
        this.transactionId = page.locator('#transactionId');
        this.transactionDate = page.locator('#transactionDate');
        this.fromDate = page.locator('#fromDate');
        this.toDate = page.locator('#toDate');
        this.amount = page.locator('#amount');
        this.findByIdButton = page.locator('#findById');
        this.findByDateButton = page.locator('#findByDate');
        this.findByDateRangeButton = page.locator('#findByDateRange');
        this.findByAmountButton = page.locator('#findByAmount');
        this.transactionRows = page.locator('#transactionBody tr');
    }
    async openFindTransactions(newOpenAccountNumber) {
        await expect(this.findTransactionsLink).toBeVisible();
        await this.findTransactionsLink.click();
        await expect(this.accountId).toBeVisible();
        await this.accountId.selectOption(newOpenAccountNumber);
        await expect(this.accountId).toBeVisible();
    }
    async verrifyTransactions(transactionDetail) {
        const count = await this.transactionRows.count();
       // expect(count).toBeGreaterThan(0);
        await expect(this.transactionRows).toContainText([transactionDetail]);
    }
    async findByTransactionId(transactionDetail) {
        await this.transactionId.fill(transactionDetail.TransactionID)
        await expect(this.transactionId).not.toHaveValue('');
        await this.findByIdButton.click();
    }
    async findByTransactionDate(transactionDetail) {
        await this.transactionDate.fill(transactionDetail.date)
        await expect(this.transactionDate).not.toHaveValue('');
        await this.findByDateButton.click();

    }
    async findByTransactionDateRange(transactionDetail) {
        await this.fromDate.fill(transactionDetail.Date)
        await expect(this.fromDate).not.toHaveValue('');
        await this.toDate.fill(transactionDetail.Date)
        await expect(this.toDate).not.toHaveValue('');
        await this.findByDateRangeButton.click();

    }
    async findByAmount(transactionDetail) {
        await this.amount.fill(transactionDetail.Amount)
        await expect(this.amount).not.toHaveValue('');
        await this.findByAmountButton.click();
    }
}
module.exports = FindTransaction;