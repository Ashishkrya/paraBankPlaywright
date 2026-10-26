const { expect, test, request } = require('@playwright/test');
const login = require('../test-data/loginUserID.json');
import { saveJson } from '../utils/fileUtils';
const customersPayload = require('../test-data/apiAccount.json');
const LoanrequestBody = {
    customerId: String(customersPayload["0"].customerId),
    amount: '10',
    downPayment: '5',
    fromAccountId: String(customersPayload["0"].id)
};
const LoanrequestBodyy = {
    customerId: String(customersPayload["0"].customerId),
    amount: '10000',
    downPayment: '1',
    fromAccountId: String(customersPayload["0"].id)
};
//test.describe.configure({mode:'parallel});
test.describe.configure({mode:'serial'})
test('@Pre Login API', async () => {
    const apiContext = await request.newContext();
    const loginRespose = await apiContext.post('https://parabank.parasoft.com/parabank/login.htm',
        {
            form: {
                username: login.username,
                password: login.password
            }
        }
    );
    expect(loginRespose.ok()).toBeTruthy();
    const state = await apiContext.storageState();
    const sessionCookie = state.cookies.find(cookie => cookie.name === 'JSESSIONID');
    expect(sessionCookie).toBeDefined();
    saveJson('apiAuth', state);
    console.log('Session saved successfully');

    const html = await loginRespose.text();
    const match = html.match(/services_proxy\/bank\/customers\/" \+ (\d+) \+ "\/accounts/);
    expect(match).not.toBeNull();
    const customerId = match[1];
    console.log('Customer ID:', customerId);
    const accountsResponse = await apiContext.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/customers/${customerId}/accounts`,
        {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    );

    expect(accountsResponse.ok()).toBeTruthy();
    const accounts = await accountsResponse.json();
    saveJson('apiAccount', accounts)
    console.log('Accounts:', accounts);

})

test('@Api Loans',async({page})=>{
    // Create a new context using the saved login session
    const apiContext = await request.newContext({
        storageState: 'test-data/apiAuth.json'
    });
     const loanRespose= await apiContext.post('https://parabank.parasoft.com/parabank/services_proxy/bank/requestLoan',
        {
            params:LoanrequestBody,
            headers:{
               Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
        })
        const loanResposeJson= await loanRespose.json();
        console.log(loanResposeJson);

})

test('@Api Loans error',async({page})=>{
    // Create a new context using the saved login session
    const apiContext = await request.newContext({
        storageState: 'test-data/apiAuth.json'
    });
     const loanRespose= await apiContext.post('https://parabank.parasoft.com/parabank/services_proxy/bank/requestLoan',
        {
            params:LoanrequestBodyy,
            headers:{
               Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
        })
        const loanResposeJson= await loanRespose.json();
        console.log(loanRespose.status())
        console.log(loanResposeJson);

})
