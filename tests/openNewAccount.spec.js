import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
import { saveJson, getAccountNumber, isAccountPresent, getTransactionDetails } from '../utils/fileUtils';
import accounts from '../test-data/accountDetails.json';


test('Open New Account', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const openNewAccountLink = page.getByRole('link', { name: 'Open New Account' })
    await expect(openNewAccountLink).toBeVisible();
    await openNewAccountLink.click();
    const openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    await expect(openNewAccountButton).toBeVisible();
    const accountType = 'SAVINGS';
    await page.locator('#type').selectOption({ label: accountType });
    const accountNum = String(accounts[0].account);
    console.log(accountNum);
    const accountSelect = page.locator('#fromAccountId');
    await expect(accountSelect).toBeVisible();
    await accountSelect.selectOption({ label: accountNum });
    await openNewAccountButton.click();
    await expect(page.locator('#openAccountResult h1.title')).toHaveText('Account Opened!');
    const newAccountNumber = page.locator('#newAccountId')
    await expect(newAccountNumber).toBeVisible();
    const newOpenAccountNumber = (await newAccountNumber.textContent()).trim();
    saveJson('loginUserID', {
        newOpenAccountNumber
    });
    await newAccountNumber.click();
    const accountNumber = await getAccountNumber(page);
    console.log(accountNumber);
    expect(accountNumber).toBe(newOpenAccountNumber);

    // Transition info
    const transactionInfo = page.locator('#transactionTable tbody tr:has(a)').first();
    const transactionLink = transactionInfo.getByRole('link', { name: 'Funds Transfer Received',exact: true});
    await expect(transactionLink).toBeVisible();
    await transactionLink.click();
    const transactionDetails = await getTransactionDetails(page);
    console.log(transactionDetails);
    saveJson('transactionDetails', transactionDetails);



    const accountOverviewPage = page.getByRole('link', { name: 'Accounts Overview' })
    await expect(accountOverviewPage).toBeVisible();
    await accountOverviewPage.click();
    await expect(page.locator('#showOverview h1.title')).toHaveText('Accounts Overview');
    const accountExists = await isAccountPresent(page, userDta.newOpenAccountNumber);
    expect(accountExists).toBeTruthy();

    //click on the new account 

    const newAccountLink = page.getByRole('link', {
        name: userDta.newOpenAccountNumber,
        exact: true
    });

    await expect(newAccountLink).toBeVisible();
    await newAccountLink.click();



});