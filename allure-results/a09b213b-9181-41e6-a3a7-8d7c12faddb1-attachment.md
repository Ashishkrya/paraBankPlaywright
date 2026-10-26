# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: logInAPI.spec.js >> Login API
- Location: tests/logInAPI.spec.js:19:1

# Error details

```
Error: expect(received).not.toBeNull()

Received: null
```

# Test source

```ts
  1  | const { expect, test, request } = require('@playwright/test');
  2  | const login = require('../test-data/loginUserID.json');
  3  | import { saveJson } from '../utils/fileUtils';
  4  | const customersPayload = require('../test-data/apiAccount.json');
  5  | const LoanrequestBody = {
  6  |     customerId: String(customersPayload["0"].customerId),
  7  |     amount: '10',
  8  |     downPayment: '5',
  9  |     fromAccountId: String(customersPayload["0"].id)
  10 | };
  11 | const LoanrequestBodyy = {
  12 |     customerId: String(customersPayload["0"].customerId),
  13 |     amount: '10000',
  14 |     downPayment: '1',
  15 |     fromAccountId: String(customersPayload["0"].id)
  16 | };
  17 | //test.describe.configure({mode:'parallel});
  18 | test.describe.configure({mode:'serial'})
  19 | test('Login API', async () => {
  20 |     const apiContext = await request.newContext();
  21 |     const loginRespose = await apiContext.post('https://parabank.parasoft.com/parabank/login.htm',
  22 |         {
  23 |             form: {
  24 |                 username: login.username,
  25 |                 password: login.password
  26 |             }
  27 |         }
  28 |     );
  29 |     expect(loginRespose.ok()).toBeTruthy();
  30 |     const state = await apiContext.storageState();
  31 |     const sessionCookie = state.cookies.find(cookie => cookie.name === 'JSESSIONID');
  32 |     expect(sessionCookie).toBeDefined();
  33 |     saveJson('apiAuth', state);
  34 |     console.log('Session saved successfully');
  35 | 
  36 |     const html = await loginRespose.text();
  37 |     const match = html.match(/services_proxy\/bank\/customers\/" \+ (\d+) \+ "\/accounts/);
> 38 |     expect(match).not.toBeNull();
     |                       ^ Error: expect(received).not.toBeNull()
  39 |     const customerId = match[1];
  40 |     console.log('Customer ID:', customerId);
  41 |     const accountsResponse = await apiContext.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/customers/${customerId}/accounts`,
  42 |         {
  43 |             headers: {
  44 |                 Accept: 'application/json',
  45 |                 'X-Requested-With': 'XMLHttpRequest'
  46 |             }
  47 |         }
  48 |     );
  49 | 
  50 |     expect(accountsResponse.ok()).toBeTruthy();
  51 |     const accounts = await accountsResponse.json();
  52 |     saveJson('apiAccount', accounts)
  53 |     console.log('Accounts:', accounts);
  54 | 
  55 | })
  56 | 
  57 | test('Loans',async({page})=>{
  58 |     // Create a new context using the saved login session
  59 |     const apiContext = await request.newContext({
  60 |         storageState: 'test-data/apiAuth.json'
  61 |     });
  62 |      const loanRespose= await apiContext.post('https://parabank.parasoft.com/parabank/services_proxy/bank/requestLoan',
  63 |         {
  64 |             params:LoanrequestBody,
  65 |             headers:{
  66 |                Accept: 'application/json',
  67 |                 'X-Requested-With': 'XMLHttpRequest'
  68 |             },
  69 |         })
  70 |         const loanResposeJson= await loanRespose.json();
  71 |         console.log(loanResposeJson);
  72 | 
  73 | })
  74 | 
  75 | test('Loans error',async({page})=>{
  76 |     // Create a new context using the saved login session
  77 |     const apiContext = await request.newContext({
  78 |         storageState: 'test-data/apiAuth.json'
  79 |     });
  80 |      const loanRespose= await apiContext.post('https://parabank.parasoft.com/parabank/services_proxy/bank/requestLoan',
  81 |         {
  82 |             params:LoanrequestBodyy,
  83 |             headers:{
  84 |                Accept: 'application/json',
  85 |                 'X-Requested-With': 'XMLHttpRequest'
  86 |             },
  87 |         })
  88 |         const loanResposeJson= await loanRespose.json();
  89 |         console.log(loanRespose.status())
  90 |         console.log(loanResposeJson);
  91 | 
  92 | })
  93 | 
```