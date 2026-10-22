import { test, expect } from '@playwright/test';
const login = require('../test-data/loginUserID.json');
import { userData } from '../test-data/userData';
const { POManager } = require('../POM/POManager');

test('Customer Login', async ({ page }) => {
    const poManager = new POManager(page);
    const getlogInPage = poManager.getlogInPage();
    await getlogInPage.loginMainLink();
    await getlogInPage.loginDetails(login.username, login.password);
    await getlogInPage.clickLoginButton();
    await getlogInPage.welocmeMessage(userData);
    page.context().storageState({path:'test-data/Auth.json'});
})

test('Unverified Customer Login', async ({ page }) => {
    const poManager = new POManager(page);
    const getlogInPage = poManager.getlogInPage();
    await getlogInPage.loginMainLink();
    await getlogInPage.loginDetails(userData.invaildUsername, userData.password);
    await getlogInPage.clickLoginButton();
    await getlogInPage.loginError();
});
