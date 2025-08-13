// fixtures/userGaragePage.js
import { GaragePage } from '../poms/pages/GaragePage';
import { test as base } from '@playwright/test';

export const userGaragePage = base.extend({
    garagePage: async({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'playwright/.auth/user.json'
        });
        const page = await context.newPage();
        await page.goto('/panel/garage');
        const garagePage = new GaragePage(page, context);
        await use(garagePage);

        await context.close();
    }
});