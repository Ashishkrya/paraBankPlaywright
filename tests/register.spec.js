// @ts-check
import { test, expect } from '@playwright/test';
import { userData } from '../test-data/userData';
import { saveJson } from '../utils/fileUtils';


test('Fill registration form', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  const registerLink= page.getByRole('link', { name: 'Register' })
  await expect(registerLink).toBeVisible();
  await registerLink.click();
  await expect(page.locator('#rightPanel h1.title')).toHaveText('Signing up is easy!');
  await page.locator('[name="customer.firstName"]').fill(userData.firstName);
  await page.locator('[name="customer.lastName"]').fill(userData.lastName);
  await page.locator('[name="customer.address.street"]').fill(userData.address);
  await expect(page.locator('[name="customer.address.street"]')).not.toHaveValue('');
  await page.locator('[name="customer.address.city"]').fill(userData.city);
  await page.locator('[name="customer.address.state"]').fill(userData.state);
  await page.locator('[name="customer.address.zipCode"]').fill(userData.zipCode);
  await expect(page.locator('[name="customer.address.zipCode"]')).not.toHaveValue('');
  await page.locator('[name="customer.phoneNumber"]').fill(userData.phone);
  await page.locator('[name="customer.ssn"]').fill(userData.ssn);
  await page.locator('[name="customer.username"]').fill(userData.username);
  await page.locator('[name="customer.password"]').fill(userData.password);
  await page.locator('[name="repeatedPassword"]').fill(userData.password);
  // Verify both passwords are the same
  const enteredPassword = await page.locator('[name="customer.password"]').inputValue();
  const confirmPassword = await page.locator('[name="repeatedPassword"]').inputValue();
  expect(enteredPassword).toBe(confirmPassword);
  await page.getByRole('button', { name: 'Register' }).click();

  // Assert welcome message
  await expect(page.locator('#rightPanel h1.title')).toHaveText(`Welcome ${userData.username}`);

  // Save credentials
  saveJson('loginUserID', {
          username: userData.username,
          password: userData.password
  });



});
