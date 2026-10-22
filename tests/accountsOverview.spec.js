import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
const {POManager} = require('../POM/POManager');
import { saveJson, getAccountDetails, getAccountNumber, selectTransactionFilters } from '../utils/fileUtils';


test('Accounts Overview Page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    const poManager= new POManager(page);
    const accountsOverview = poManager.getAccountsOverview();
    await accountsOverview.getpage();
    await accountsOverview.verifyAccountsOverview();
    const firstAccount =(await accountsOverview.getAccountsDetails())[0];
    await accountsOverview.openFirstAccount();
    await accountsOverview.verifyAccountDetails(firstAccount.account);
    await accountsOverview.verifyAccountNumber(firstAccount.account);
    await accountsOverview.selectAccountActivityFilters('All', 'All');
   
})