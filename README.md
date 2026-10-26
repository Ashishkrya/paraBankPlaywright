# paraBankPlaywright
UI test automation framework for ParaBank using Playwright and JavaScript, covering login, account management, and transaction workflows.
git status
git add .
git commit -m "Add Cypress automation scripts"
git push
npx playwright test --config playwright.config1.js --project=chrome
////
allure report
npm install -D @playwright/test allure-playwright
npm install -D allure-commandline
px playwright test --grep @Web --reporter=line,allure-playwright
npx allure generate allure-results --clean
npx allure open allure-report
///


