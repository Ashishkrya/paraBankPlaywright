import { test, expect } from '@playwright/test';
const {POManager} = require('../POM/POManager');


test('@Web Transfer Funds', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager= new POManager(page);
    const transferFundsPage = poManager.getTransferFundsPage();
    await transferFundsPage.openTransferFunds();
    await transferFundsPage.enterAmount('100');
    await transferFundsPage.selectFromAccount();
    await transferFundsPage.selectToAccount();
    await transferFundsPage.transferFunds();
    await transferFundsPage.verifyTransferComplete();


});