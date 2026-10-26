const { expect, request } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');
const login = require('../../test-data/loginUserID.json');
const { saveJson } = require('../../utils/fileUtils');
let apiContext;
let loginResponse;
let customerId;
let customerResponse;
let customerData;
const baseURL = 'https://parabank.parasoft.com/parabank/';
// login API
Given('the API base URL is configured', async () => {
    apiContext = await request.newContext({
        baseURL,
        extraHTTPHeaders: {
            Accept: 'application/json'
        }
    });
});

When( 'a POST request is sent to {string} with valid credentials', async (endpoint) => {
        loginResponse = await apiContext.post(endpoint, {
            form: {
                username: login.username,
                password: login.password
            }
        });
        expect(loginResponse.ok(), `Login request failed with status ${loginResponse.status()}`).toBeTruthy();
        const state = await apiContext.storageState();
        const sessionCookie = state.cookies.find(
            cookie => cookie.name === 'JSESSIONID'
        );
        expect(sessionCookie).toBeDefined();
        saveJson('apiAuth', state);
        const html = await loginResponse.text();
        const match = html.match(/services_proxy\/bank\/customers\/" \+ (\d+) \+ "\/accounts/);
        expect(match).not.toBeNull();
        customerId = match[1];
        customerResponse = await apiContext.get(
            `services_proxy/bank/customers/${customerId}`,
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        );

        expect(customerResponse.ok()).toBeTruthy();
        customerData = await customerResponse.json();
        saveJson('apiCustomer', customerData);
    }
);
Then('the response status is {int}', async (status) => {
    expect(loginResponse.status()).toBe(status);
});
Then('the response body contains a customer {string}', async (field) => {
    expect(customerData[field]).toBeDefined();
    expect(customerData[field]).not.toBeNull();
});
Then('the response body contains{string}',async(type)=>{

})

// API-accounts
