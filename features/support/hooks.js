/*
const playwright = require('@playwright/test');
const { Before} = require('@cucumber/cucumber');

Before (async function(){
    const browser= await playwright.chromium.launch({
        headless: false
    });
    const context= await browser.newContext();
    const page= await context.newPage();
})
*/

// const { After, Before } = require('@cucumber/cucumber');
// const { chromium } = require('@playwright/test');

// Before(async function () {
//   this.browser = await chromium.launch({ headless: true });
//   this.context = await this.browser.newContext();
//   this.page = await this.context.newPage();
// });

// After(async function () {
//   if (this.browser) {
//     await this.browser.close();
//   }
// });