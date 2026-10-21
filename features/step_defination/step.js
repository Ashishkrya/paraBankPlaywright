const { After, Before, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const RegisterPage = require('../../POM/RegisterPage');
const { userData } = require('../../test-data/userData');


setDefaultTimeout(30000);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.page = await this.browser.newPage();
  this.registerPage = new RegisterPage(this.page);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('the user is on the ParaBank registration page', async function () {
  await this.registerPage.registrationlink();
});

When('the user fills in all required registration fields with valid data', async function () {
  await this.registerPage.registerUser(userData);
});

When(/^the user clicks the "([^"]*)" button(?: without filling any fields)?$/, async function (buttonName) {
  if (buttonName !== 'Register') {
    throw new Error(`Unsupported registration button: ${buttonName}`);
  }
  if (!(await this.registerPage.pageHeading.isVisible())) {
    await this.registerPage.registerLink.click();
  }
  await this.registerPage.clickRegisterButton();
});

Then('a welcome or success message is displayed', async function () {
  await this.registerPage.verifyRegistrationSuccess(userData.username);
});
Then('UserName and Passowrd shuld be saved',async function(){
    await this.registerPage.saveLoginCredentials(userData);
});
Then ('validation error messages count shuold be 10', async function (){
    await this.registerPage.verifyRequiredFieldErrors();
})

