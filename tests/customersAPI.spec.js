const { expect, test, request } = require('@playwright/test');
const login = require('../test-data/loginUserID.json');
import { saveJson } from '../utils/fileUtils';
const customersPayload = require('../test-data/apiAccount.json');
const customerId = customersPayload[0].customerId;
const accountId= customersPayload["0"].id

test('@Api Retrieve all accounts',async({page})=>{
    const apiContext = await request.newContext({
        storageState: 'test-data/apiAuth.json'
    });
    const allAccounts= await apiContext.get(
        `https://parabank.parasoft.com/parabank/services_proxy/bank/customers/${customerId}`,
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
