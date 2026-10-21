const { expect } = require('@playwright/test');
//import { getAccountNumber } from '../utils/fileUtils';
const { getAccountNumber } = require('../utils/fileUtils');
class RequestLoan {
    constructor(page) {
        this.page = page;
        this.requestLoan = page.getByRole('link', { name: 'Request Loan' });
        this.pageTitle = page.locator('#requestLoanForm h1.title');
        this.amount = page.locator('#amount');
        this.downPayment = page.locator('#downPayment')
        this.fromAccount = page.locator('#fromAccountId');
        this.applyNow = page.getByRole('button', { name: 'Apply Now' });
        this.loanApproved = page.locator('#loanRequestApproved p').first();
        this.newAccountNumber = page.locator('#newAccountId');

    }
    async requestLoanpage() {
        await expect(this.requestLoan).toBeVisible();
        await this.requestLoan.click();
        await expect(this.pageTitle).toHaveText('Apply for a Loan');
    }
    async loanDetails() {
        await this.amount.fill('100');
        await this.downPayment.fill("10");
        await expect(this.downPayment).not.toHaveValue('');
        await expect(this.fromAccount).toBeVisible();
        await expect(this.fromAccount.locator('option').first()).toBeAttached();
        await expect(this.fromAccount).toHaveValue(await this.fromAccount.locator('option').first().getAttribute('value'));
    }
    async applyLoan(){
         await this.applyNow.click();
        
    }
    async loanApprovedMsg(){
        await expect(this.loanApproved).toHaveText('Congratulations, your loan has been approved.')

    }
    async loanAccountNumber(){
            await expect(this.newAccountNumber).toBeVisible();
            const newOpenAccountNumber = (await this.newAccountNumber.textContent()).trim();
            await this.newAccountNumber.click();
            const accountNumber = await getAccountNumber(this.page);
            console.log(accountNumber);
            expect(accountNumber).toBe(newOpenAccountNumber);
    }

}
module.exports = RequestLoan;