# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accountAPI.spec.js >> Create a new Checking account
- Location: tests/accountAPI.spec.js:81:1

# Error details

```
SyntaxError: Unexpected token '<', "



<!-- <!DOC"... is not valid JSON
```

# Test source

```ts
  1   | const { expect, test, request } = require('@playwright/test');
  2   | const login = require('../test-data/loginUserID.json');
  3   | import { saveJson } from '../utils/fileUtils';
  4   | const customersPayload = require('../test-data/apiAccount.json');
  5   | const customerId = customersPayload[0].customerId;
  6   | const accountId= customersPayload["0"].id
  7   | const savingsAccountPayload={
  8   |     customerId: String(customersPayload["0"].customerId),
  9   |     newAccountType:1,
  10  |     fromAccountId: String(customersPayload["0"].id)
  11  | };
  12  | const checkingAccountPayload={
  13  |     customerId: String(customersPayload["0"].customerId),
  14  |     newAccountType:0,
  15  |     fromAccountId: String(customersPayload["0"].id)
  16  | };
  17  | 
  18  | test('Retrieve all accounts',async({page})=>{
  19  |     const apiContext = await request.newContext({
  20  |         storageState: 'test-data/apiAuth.json'
  21  |     });
  22  |     const allAccounts= await apiContext.get(
  23  |         `https://parabank.parasoft.com/parabank/services_proxy/bank/customers/${customerId}/accounts`,
  24  |         {
  25  |             headers: {
  26  |                 Accept: 'application/json',
  27  |                 'X-Requested-With': 'XMLHttpRequest'
  28  |             }
  29  |         }
  30  |     );
  31  | 
  32  |     expect(allAccounts.status()).toBe(200);
  33  |     const responseBody = await allAccounts.json();
  34  |     console.log('Customer Accounts:', responseBody);
  35  |     await apiContext.dispose();
  36  | })
  37  | 
  38  | test ('Retrieve accounts by ID',async({page})=>{
  39  |     const apiContext = await request.newContext({
  40  |         storageState: 'test-data/apiAuth.json'
  41  |     });
  42  |     const byAccountsID= await apiContext.get(
  43  |         `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountId}`,
  44  |         {
  45  |             headers: {
  46  |                 Accept: 'application/json',
  47  |                 'X-Requested-With': 'XMLHttpRequest'
  48  |             }
  49  |         }
  50  |     );
  51  | 
  52  |     expect(byAccountsID.status()).toBe(200);
  53  |     const responseBody = await byAccountsID.json();
  54  |     console.log('Customer Accounts:', responseBody);
  55  |     await apiContext.dispose();
  56  | 
  57  | })
  58  | 
  59  | test ('Create a new Savings account',async({page})=>{
  60  |     const apiContext = await request.newContext({
  61  |         storageState: 'test-data/apiAuth.json'
  62  |     });
  63  |     const newCheckingAccounts= await apiContext.post(
  64  |         `https://parabank.parasoft.com/parabank/services_proxy/bank/createAccount`,
  65  |         {
  66  |             params:savingsAccountPayload,
  67  |             headers: {
  68  |                 Accept: 'application/json',
  69  |                 'X-Requested-With': 'XMLHttpRequest'
  70  |             }
  71  |         }
  72  |     );
  73  | 
  74  |     //expect(newCheckingAccounts.status()).toBe(200);
  75  |     const responseBody = await newCheckingAccounts.json();
  76  |     console.log('Customer Accounts:', responseBody);
  77  |     await apiContext.dispose();
  78  | 
  79  | })
  80  | 
  81  | test ('Create a new Checking account',async({page})=>{
  82  |     const apiContext = await request.newContext({
  83  |         storageState: 'test-data/apiAuth.json'
  84  |     });
  85  |     const newCheckingAccounts= await apiContext.post(
  86  |         `https://parabank.parasoft.com/parabank/services_proxy/bank/createAccount`,
  87  |         {
  88  |             params:checkingAccountPayload,
  89  |             headers: {
  90  |                 Accept: 'application/json',
  91  |                 'X-Requested-With': 'XMLHttpRequest'
  92  |             }
  93  |         }
  94  |     );
  95  | 
  96  |     //expect(newCheckingAccounts.status()).toBe(200);
> 97  |     const responseBody = await newCheckingAccounts.json();
      |                          ^ SyntaxError: Unexpected token '<', "
  98  |     console.log('Customer Accounts:', responseBody);
  99  |     await apiContext.dispose();
  100 | 
  101 | })
  102 | 
  103 | 
```