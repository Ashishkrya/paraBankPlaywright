import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
const {POManager} = require('../POM/POManager');
import { saveJson, getAccountDetails, getAccountNumber, selectTransactionFilters } from '../utils/fileUtils';


test('Accounts Overview Page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    const poManager= new POManager(page);
    const accountsOverview = poManager.getAccountsOverview();

    // Accounts Overview
    await accountsOverview.getpage();
    await accountsOverview.verifyAccountsOverview();

    // Get the first account directly without saving to JSON
    const firstAccount =
        (await accountsOverview.getAccountsDetails())[0];

    // Open the first account
    await accountsOverview.openFirstAccount();

    // Verify Account Details
    await accountsOverview.verifyAccountDetails(firstAccount.account);
    await accountsOverview.verifyAccountNumber(firstAccount.account);

    // Account Activity
    await accountsOverview.selectAccountActivityFilters('All', 'All');
    // await expect(page.locator('#showOverview h1.title')).toHaveText('Accounts Overview');
    // const accountDetails = await getAccountDetails(page);
    // saveJson('accountDetails', accountDetails);
    // console.log(accountDetails);

    // const firstAccount = accountDetails[0];
    // console.log(firstAccount);

    // const rows = page.locator('#accountTable tbody tr:has(a)');
    // await rows.first().locator('a').click();

    // await expect(page.locator('#accountDetails h1.title')).toHaveText('Account Details');
    // await expect(page.locator('#accountId')).toHaveText(firstAccount.account);
    // // Get Account Details values
    // const accountNumber = await getAccountNumber(page);
    // console.log(accountNumber);
    // expect(accountNumber).toBe(firstAccount.account);
    // // Account Activity
    // await selectTransactionFilters(page, 'All', 'All');

})