import { test, expect, beforeAll } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
const { POManager } = require('../POM/POManager');
import transactionDetail from '../test-data/transactionDetails.json';
import { saveJson}from '../utils/fileUtils';

let setupPage;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    setupPage = await context.newPage();
    const poManager = new POManager(setupPage);
    const openAccount = poManager.getopenAccount();

    const newOpenAccountNumber = await openAccount.openNewAccount('SAVINGS');
    saveJson('loginUserID', { newOpenAccountNumber });

    await context.close();
});

test('@Web Find Transation by using TransactionID', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager = new POManager(page);
    const findTransaction = poManager.getfindTransaction();
    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    await findTransaction.findByTransactionId(transactionDetail);
    await findTransaction.verrifyTransactions(transactionDetail.Amount);
})

test('@Web Find Transation by using Date', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager = new POManager(page);
    const findTransaction = poManager.getfindTransaction();
    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    await findTransaction.findByTransactionDate({ date: transactionDetail.Date });
    await findTransaction.verrifyTransactions(transactionDetail.Date);

})
test('@Web Find Transation by using DateRange', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager = new POManager(page);
    const findTransaction = poManager.getfindTransaction();
    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    await findTransaction.findByTransactionDateRange(transactionDetail);
    await findTransaction.verrifyTransactions(transactionDetail.Date);
})
test('@Web Find Transation by Amount', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager = new POManager(page);
    const findTransaction = poManager.getfindTransaction();

    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    await findTransaction.findByAmount(transactionDetail);
    await findTransaction.verrifyTransactions(transactionDetail.Amount);
})