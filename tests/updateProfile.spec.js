import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
const UpdateProfile= require('../POM/UpdateProfile');

test('Update Profile Page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page.locator('#leftPanel h2')).toHaveText('Customer Login');
    await page.locator('input[name="username"]').fill(userDta.username);
    await page.locator('input[name="password"]').fill(userDta.password);
    await page.locator('input[value="Log In"]').click();
    await expect(page.locator('p.smallText')).toContainText(`Welcome ${userData.firstName} ${userData.lastName}`);
    
    const updateProfile =new UpdateProfile(page);
    await updateProfile.getUpdateProfilePage();
    await updateProfile.updateContactInfo(userData);
    await updateProfile.updateProfile();
   
});