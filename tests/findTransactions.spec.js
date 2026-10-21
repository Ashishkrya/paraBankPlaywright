import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
const {POManager} = require('../POM/POManager');
import transactionDetail from '../test-data/transactionDetails.json';

test('Find Transation by using TransactionID', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);
     
    const findTransaction= new FindTransaction(page);
    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    // await findTransaction.findByTransactionId(transactionDetail.TransactionID);
    await findTransaction.findByTransactionId(transactionDetail);
    await findTransaction.verrifyTransactions(transactionDetail.Amount);
})

test('Find Transation by using Date', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const poManager = new POManager(page);
    const findTransaction = poManager.getfindTransaction();
    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    await findTransaction.findByTransactionDate({ date: transactionDetail.Date });
    await findTransaction.verrifyTransactions(transactionDetail.Date);
   
})
test('Find Transation by using DateRange', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);
    
    const findTransaction= new FindTransaction(page);
    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    await findTransaction.findByTransactionDateRange(transactionDetail);
    await findTransaction.verrifyTransactions(transactionDetail.Date);
})
test('Find Transation by Amount', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);
    

    const findTransaction= new FindTransaction(page);
    await findTransaction.openFindTransactions(userDta.newOpenAccountNumber);
    await findTransaction.findByAmount(transactionDetail);
    await findTransaction.verrifyTransactions(transactionDetail.Amount);
})