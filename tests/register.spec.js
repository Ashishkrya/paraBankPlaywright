// @ts-check
import { test } from '@playwright/test';
import { userData } from '../test-data/userData';
const { POManager } = require('../POM/POManager');


test('Fill registration form', async ({ page }) => {
  const poManager = new POManager(page);
  const registerPage = poManager.getregisterPage();
  await registerPage.registrationlink();
  await registerPage.registerUser(userData);
  await registerPage.clickRegisterButton()
  await registerPage.verifyRegistrationSuccess(userData.username);
  await registerPage.saveLoginCredentials(userData);

});
