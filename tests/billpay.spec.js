import { test, expect } from '@playwright/test';
import { userData } from '../test-data/userData';
const { POManager } = require('../POM/POManager');


test('@Web Bill Payment', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager = new POManager(page);
    const billPayPage = poManager.getbillPayPage();
    await billPayPage.billPayPage();
    await billPayPage.billPagetitle('Bill Payment Service');
    await billPayPage.fillPayeeDetails(userData);
    await billPayPage.selectFromAccount();
    await billPayPage.sendPayment();
    await billPayPage.verifyPaymentComplete('Bill Payment Complete');
})