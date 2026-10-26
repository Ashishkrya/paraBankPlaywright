// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 3, 
    workers:4,
    //timeout:30*1000,
    expect:{
        timeout:5000
    },
    reporter: 'html',
    projects: [
        {
            name: 'safari execution',
            use: {
                baseURL: 'https://parabank.parasoft.com/parabank',
                trace: 'on-first-retry',
                browserName: 'webkit',
                headless: false,
                storageState: 'test-data/auth.json',
                //screenshot: 'on',
                ...devices['iphone 17'],
            }
        },
        {
            name: 'chrome',
            use: {
                baseURL: 'https://parabank.parasoft.com/parabank',
                trace: 'on-first-retry', //retain-on-failure
                browserName: 'chromium',
                headless: false, 
                storageState: 'test-data/auth.json',
                screenshot: 'only-on-failure',//on and off
               // video:'on-first-retry', //retain-on-failure
                //viewport:{width:720,height:720},
                //igonreHttpsError:true, //ssl error
                //permission:['geolocation'],//to allow the location
                
            },
        }

    ],
});

//to run npx playwright test test/filename.spec.js --config playwright.config1.js --project=safari