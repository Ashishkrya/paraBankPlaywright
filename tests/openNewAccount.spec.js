import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
import { saveJson, getAccountNumber, isAccountPresent, getTransactionDetails } from '../utils/fileUtils';
const OpenAccount= require('../POM/OpenAccount')



test('Open New Account', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);
     
    const openAccount = new OpenAccount(page);
    const newOpenAccountNumber = await openAccount.openNewAccount('SAVINGS');
    saveJson('loginUserID', { newOpenAccountNumber });
    await openAccount.verifyOpenedAccount(newOpenAccountNumber);
    const accountNumber = await getAccountNumber(page);
    expect(accountNumber).toBe(newOpenAccountNumber);
    const transactionDetails = await openAccount.captureTransactionDetails(getTransactionDetails);
    saveJson('transactionDetails', transactionDetails);
    await openAccount.goToAccountsOverview();
    const accountExists = await isAccountPresent(page, newOpenAccountNumber);
    expect(accountExists).toBeTruthy();


});