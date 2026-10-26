import { test, expect } from '@playwright/test';
import { userData } from '../test-data/userData';
const {POManager} = require('../POM/POManager');

test('@Web Update Profile Page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const poManager= new POManager(page);
    const updateProfile = poManager.getUpdateProfile();
    await updateProfile.getUpdateProfilePage();
    await updateProfile.updateContactInfo(userData);
    await updateProfile.updateProfile();
   
});