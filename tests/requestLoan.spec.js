import { test, expect } from '@playwright/test';
const {POManager} = require('../POM/POManager');



test('Request Loan', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    const poManager= new POManager(page);
    const requestLoanPage = poManager.getRequestLoanPage();
    await requestLoanPage.requestLoanpage();
    await requestLoanPage.loanDetails();
    await requestLoanPage.applyLoan();
    await requestLoanPage.loanApprovedMsg();
    await requestLoanPage.loanAccountNumber();

})