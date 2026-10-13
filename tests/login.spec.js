import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';

test('Customer Login', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);
})

test('Unverified Customer Login', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userData.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.error')).toContainText('The username and password could not be verified');
});
