const { Before,After} = require('@cucumber/cucumber');
// const {POManager} = require('../POM/POManager');
const { POManager } = require('../../POM/POManager');
const { chromium } = require('@playwright/test');

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.page = await this.browser.newPage();
  this.poManager = new POManager(this.page);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
