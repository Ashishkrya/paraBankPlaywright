const { Before, After } = require('@cucumber/cucumber');
const { POManager } = require('../../POM/POManager');
const { chromium } = require('@playwright/test');

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext({
    baseURL: 'https://parabank.parasoft.com/parabank/',
    storageState: 'test-data/auth.json'
  });
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
