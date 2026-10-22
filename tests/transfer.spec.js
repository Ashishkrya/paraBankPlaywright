import { test, expect } from '@playwright/test';
const {POManager} = require('../POM/POManager');
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';


test('Transfer Funds', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    // await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    // await page.locator('input[name="username"]').fill(userDta.username);
    // await page.locator('input[name="password"]').fill(userDta.password);
    // await page.locator('input[value="Log In"]').click();
    // await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const poManager= new POManager(page);
    const transferFundsPage = poManager.getTransferFundsPage();
    await transferFundsPage.openTransferFunds();
    await transferFundsPage.enterAmount('100');
    await transferFundsPage.selectFromAccount();
    await transferFundsPage.selectToAccount();
    await transferFundsPage.transferFunds();
    await transferFundsPage.verifyTransferComplete();


});