const { expect, test, request } = require('@playwright/test');
const login = require('../test-data/loginUserID.json');
import { saveJson } from '../utils/fileUtils';
const customersPayload = require('../test-data/apiAccount.json');
const customerId = customersPayload[0].customerId;
const accountId= customersPayload["0"].id
const savingsAccountPayload={
    customerId: String(customersPayload["0"].customerId),
    newAccountType:1,
    fromAccountId: String(customersPayload["0"].id)
};
const checkingAccountPayload={
    customerId: String(customersPayload["0"].customerId),
    newAccountType:0,
    fromAccountId: String(customersPayload["0"].id)
};

test('@Api Retrieve all accounts',async({page})=>{
    const apiContext = await request.newContext({
        storageState: 'test-data/apiAuth.json'
    });
    const allAccounts= await apiContext.get(
        `https://parabank.parasoft.com/parabank/services_proxy/bank/customers/${customerId}/accounts`,
        {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    );

    expect(allAccounts.status()).toBe(200);
    const responseBody = await allAccounts.json();
    console.log('Customer Accounts:', responseBody);
    await apiContext.dispose();
})

test ('@Api Retrieve accounts by ID',async({page})=>{
    const apiContext = await request.newContext({
        storageState: 'test-data/apiAuth.json'
    });
    const byAccountsID= await apiContext.get(
        `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountId}`,
        {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    );

    expect(byAccountsID.status()).toBe(200);
    const responseBody = await byAccountsID.json();
    console.log('Customer Accounts:', responseBody);
    await apiContext.dispose();

})

test ('@Api Create a new Savings account',async({page})=>{
    const apiContext = await request.newContext({
        storageState: 'test-data/apiAuth.json'
    });
    const newCheckingAccounts= await apiContext.post(
        `https://parabank.parasoft.com/parabank/services_proxy/bank/createAccount`,
        {
            params:savingsAccountPayload,
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    );

    //expect(newCheckingAccounts.status()).toBe(200);
    const responseBody = await newCheckingAccounts.json();
    console.log('Customer Accounts:', responseBody);
    await apiContext.dispose();

})

test ('@Api Create a new Checking account',async({page})=>{
    const apiContext = await request.newContext({
        storageState: 'test-data/apiAuth.json'
    });
    const newCheckingAccounts= await apiContext.post(
        `https://parabank.parasoft.com/parabank/services_proxy/bank/createAccount`,
        {
            params:checkingAccountPayload,
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    );

    //expect(newCheckingAccounts.status()).toBe(200);
    const responseBody = await newCheckingAccounts.json();
    console.log('Customer Accounts:', responseBody);
    await apiContext.dispose();

})

