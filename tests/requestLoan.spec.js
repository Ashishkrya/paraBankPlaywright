import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
const RequestLoan = require('../POM/RequestLoan');
import { userData } from '../test-data/userData';
import { saveJson, getAccountNumber, isAccountPresent } from '../utils/fileUtils';


test('Request Loan', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);
    
    const requestLoanPage = new RequestLoan(page);
    await requestLoanPage.requestLoanpage();
    await requestLoanPage.loanDetails();
    await requestLoanPage.applyLoan();
    await requestLoanPage.loanApprovedMsg();
    await requestLoanPage.loanAccountNumber();

})