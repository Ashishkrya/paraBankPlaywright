import { test, expect } from '@playwright/test';
const {POManager} = require('../POM/POManager');


test('Transfer Funds', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    const poManager= new POManager(page);
    const transferFundsPage = poManager.getTransferFundsPage();
    await transferFundsPage.openTransferFunds();
    await transferFundsPage.enterAmount('100');
    await transferFundsPage.selectFromAccount();
    await transferFundsPage.selectToAccount();
    await transferFundsPage.transferFunds();
    await transferFundsPage.verifyTransferComplete();


});