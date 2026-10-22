import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
const { POManager } = require('../POM/POManager');


test('Bill Payment', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    const poManager = new POManager(page);
    const billPayPage = poManager.getbillPayPage();
    await billPayPage.billPayPage();
    await billPayPage.fillPayeeDetails(userData);
    await billPayPage.selectFromAccount();
    await billPayPage.sendPayment();
    await billPayPage.verifyPaymentComplete();
})