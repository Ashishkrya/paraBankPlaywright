// @ts-check
import { test} from '@playwright/test';
import { userData } from '../test-data/userData';
const RegisterPage= require('../POM/RegisterPage');


test('Fill registration form', async ({ page }) => {

  const registerPage = new RegisterPage(page);
  await registerPage.registerUser(userData);
  await registerPage.verifyRegistrationSuccess(userData.username);
  await registerPage.saveLoginCredentials(userData);

});
