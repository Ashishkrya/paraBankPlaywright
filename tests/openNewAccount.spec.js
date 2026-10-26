import { test, expect } from '@playwright/test';
import { saveJson, getAccountNumber, isAccountPresent, getTransactionDetails } from '../utils/fileUtils';
const { POManager } = require('../POM/POManager');



test('@Web Open New Account', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager = new POManager(page);
    const openAccount = poManager.getopenAccount();
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