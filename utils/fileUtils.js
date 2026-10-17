import fs from 'fs';
import { test, expect } from '@playwright/test';
const userDta = require('../test-data/loginUserID.json');

export function saveJson(fileName, newData) {
    const filePath = `test-data/${fileName}.json`;
    let existingData = {};
    if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    const updatedData = {
        ...existingData,
        ...newData
    };
    fs.writeFileSync(
        filePath,
        JSON.stringify(updatedData, null, 2)
    );
}

export async function getAccountDetails(page) {
    const rows = page.locator('#accountTable tbody tr:has(a)');
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    const accountDetails = [];
    for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const account = await row.locator('td').nth(0).innerText();
        const balance = await row.locator('td').nth(1).innerText();
        const available = await row.locator('td').nth(2).innerText();
        accountDetails.push({
            account,
            balance,
            available
        });
    }
    return accountDetails;
}
//Account Details
export async function getAccountNumber(page) {
    const accountNumber = page.locator('#accountId');
    await expect(accountNumber).toBeVisible();
    await expect(accountNumber).not.toHaveText('');
    return (await accountNumber.innerText()).trim();
}
//Account Activity
export async function selectTransactionFilters(page, month, transactionType, transactionId) {
    await page.locator('#month').selectOption({ label: month });
    await page.locator('#transactionType').selectOption({ label: transactionType });
    await expect(page.locator('#transactionType')).toHaveValue(transactionType);
    await page.locator('input[type="submit"][value="Go"]').click();
    const noTransactions = page.locator('#noTransactions');
    const rows = page.locator('#transactionTable tbody tr');
    await expect(noTransactions).toBeVisible({ timeout: 10000 })
        .catch(async () => {
            await expect(rows.first()).toBeVisible({ timeout: 10000 });
        });
    if (await noTransactions.isVisible()) {
        await expect(noTransactions).toHaveText('No transactions found.');
        return;
    }
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const date = await row.locator('td').nth(0).innerText();
        const transaction = await row.locator('td').nth(1).innerText();
        const debit = await row.locator('td').nth(2).innerText();
        const credit = await row.locator('td').nth(3).innerText();

        console.log({
            date,
            transaction,
            debit,
            credit
        });
    }
}

// is account presnet: 
export async function isAccountPresent(page, accountNumber) {
    const accountDetails = await getAccountDetails(page);
    return accountDetails.some(
        account => account.account === accountNumber
    );
}

//
export async function getTransactionDetails(page) {
    const panel = page.locator('#rightPanel');
    await expect(panel.getByRole('heading', { name: 'Transaction Details' })).toBeVisible();
    const rows = panel.locator('table tbody tr');
    const count = await rows.count();
    const transactionDetails = {};
    for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const key = (await row.locator('td').nth(0).innerText())
            .replace(':', '')
            .trim()
            .replace(/\s+/g, '');
        let value = (await row.locator('td').nth(1).innerText()).trim();
        if (key === 'Amount') {
            value = value.replace('$', '');
        }
        transactionDetails[key] = value;
    }
    return transactionDetails;
}
