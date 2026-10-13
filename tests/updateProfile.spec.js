import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
import { saveJson } from '../utils/fileUtils';
import accounts from '../test-data/accountDetails.json';

test('Update Profile Page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);

    const updateProfile = page.getByRole('link', {name:'Update Contact Info'});
    await updateProfile.click();
    await expect (page.locator('#updateProfileForm h1.title')).toHaveText('Update Profile');
    await expect (page.locator('[name="customer.phoneNumber"]')).not.toHaveValue('');
    const updatedaddress = userData.firstName + 'y';
    const updatedCity = userData.updatedCity;
    await page.locator('[name="customer.address.street"]').fill(updatedaddress);
    await page.locator('[name="customer.address.city"]').clear();
    await page.locator('[name="customer.address.city"]').pressSequentially(updatedCity);
    saveJson('loginUserID', {
          updatedaddress,
          updatedCity
  });
    await page.getByRole('Button',{name:'Update Profile'}).click();
});