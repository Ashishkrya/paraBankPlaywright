# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customersAPI.spec.js >> @Web Retrieve all accounts
- Location: tests/customersAPI.spec.js:8:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | const { expect, test, request } = require('@playwright/test');
  2  | const login = require('../test-data/loginUserID.json');
  3  | import { saveJson } from '../utils/fileUtils';
  4  | const customersPayload = require('../test-data/apiAccount.json');
  5  | const customerId = customersPayload[0].customerId;
  6  | const accountId= customersPayload["0"].id
  7  | 
  8  | test('@Web Retrieve all accounts',async({page})=>{
  9  |     const apiContext = await request.newContext({
  10 |         storageState: 'test-data/apiAuth.json'
  11 |     });
  12 |     const allAccounts= await apiContext.get(
  13 |         `https://parabank.parasoft.com/parabank/services_proxy/bank/customers/${customerId}`,
  14 |         {
  15 |             headers: {
  16 |                 Accept: 'application/json',
  17 |                 'X-Requested-With': 'XMLHttpRequest'
  18 |             }
  19 |         }
  20 |     );
  21 | 
> 22 |     expect(allAccounts.status()).toBe(200);
     |                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  23 |     const responseBody = await allAccounts.json();
  24 |     console.log('Customer Accounts:', responseBody);
  25 |     await apiContext.dispose();
  26 | })
  27 | 
```