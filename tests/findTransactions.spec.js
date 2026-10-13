import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
import { saveJson, getAccountNumber, isAccountPresent, getTransactionDetails } from '../utils/fileUtils';
import accounts from '../test-data/accountDetails.json';
import transactionDetail from '../test-data/transactionDetails.json';

test('Find Transation by using TransactionID', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const openNewAccountLink = page.getByRole('link', { name: 'Find Transactions' })
    await expect(openNewAccountLink).toBeVisible();
    await openNewAccountLink.click();
    await expect(page.locator('#accountId')).toBeVisible();
    await page.locator('#accountId').selectOption(userDta.newOpenAccountNumber);
    await expect(page.locator('#accountId')).toBeVisible();

    await page.locator('#transactionId').fill(transactionDetail.TransactionID)
    await expect(page.locator('#transactionId')).not.toHaveValue('');
    await page.locator('#findById').click();
    const transactionRow = page.locator('#transactionBody tr');
    await expect(transactionRow).toBeVisible();
    await expect(transactionRow).toContainText(transactionDetail.Amount);
    //await page.goBack(); can't use coz of application behaviour 
})

test('Find Transation by using Date', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const openNewAccountLink = page.getByRole('link', { name: 'Find Transactions' })
    await expect(openNewAccountLink).toBeVisible();
    await openNewAccountLink.click();
    await expect(page.locator('#accountId')).toBeVisible();
    await page.locator('#accountId').selectOption(userDta.newOpenAccountNumber);
    await expect(page.locator('#accountId')).toBeVisible();

    await page.locator('#transactionDate').fill(transactionDetail.Date)
    await expect(page.locator('#transactionDate')).not.toHaveValue('');
    await page.locator('#findByDate').click();
    const transactionRow = page.locator('#transactionBody tr');
    await expect(transactionRow).toBeVisible();
    await expect(transactionRow).toContainText(transactionDetail.Date);
    
})
test('Find Transation by using DateRange', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const openNewAccountLink = page.getByRole('link', { name: 'Find Transactions' })
    await expect(openNewAccountLink).toBeVisible();
    await openNewAccountLink.click();
    await expect(page.locator('#accountId')).toBeVisible();
    await page.locator('#accountId').selectOption(userDta.newOpenAccountNumber);
    await expect(page.locator('#accountId')).toBeVisible();

    await page.locator('#fromDate').fill(transactionDetail.Date)
    await expect(page.locator('#fromDate')).not.toHaveValue('');
    await page.locator('#toDate').fill(transactionDetail.Date)
    await expect(page.locator('#toDate')).not.toHaveValue('');
    await page.locator('#findByDateRange').click();
    const transactionRow = page.locator('#transactionBody tr');
    await expect(transactionRow).toBeVisible();
    await expect(transactionRow).toContainText(transactionDetail.Date);
    
})
test('Find Transation by Amount', async ({ page }) => {
     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const openNewAccountLink = page.getByRole('link', { name: 'Find Transactions' })
    await expect(openNewAccountLink).toBeVisible();
    await openNewAccountLink.click();
    await expect(page.locator('#accountId')).toBeVisible();
    await page.locator('#accountId').selectOption(userDta.newOpenAccountNumber);
    await expect(page.locator('#accountId')).toBeVisible();

    await page.locator('#amount').fill(transactionDetail.Amount)
    await expect(page.locator('#amount')).not.toHaveValue('');
    await page.locator('#findByAmount').click();
    const transactionRow = page.locator('#transactionBody tr');
    await expect(transactionRow).toBeVisible();
    await expect(transactionRow).toContainText(transactionDetail.Amount);
    
})