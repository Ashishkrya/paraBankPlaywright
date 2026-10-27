const { expect, request } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');

Given ('the user navigates to the Accounts Overview page',async function(){
     this.accountsOverview = this.poManager.getAccountsOverview();
    await this.accountsOverview.getpage();
})
Then ('the heading {string} is visible',async function (title){
    await this.accountsOverview.verifyAccountsOverview(title);
})
Then ('at least one account link is visible in the accounts table',async function(){
    const accountTable= await this.accountsOverview.getAccountsDetails();
    expect(accountTable.length).toBeGreaterThan(0);
    this.firstAccount = accountTable[0].account;
    console.log('fi',this.firstAccount)
})
 When ('the user clicks on the first account link',async function(){
    await this.accountsOverview.openFirstAccount();

 })
 Then ('the {string} heading is visible on the destination page',async function(heading){
    await this.accountsOverview.verifyAccountDetails(heading);
 })
 Then ('the Account Details page shows the matching account ID',async function(){
    await this.accountsOverview.verifyAccountNumber(this.firstAccount);
 })