import { test as setup, expect } from '@playwright/test';
import { MainPage } from '../poms/pages/MainPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
   const mainPage = new MainPage(page);
         await mainPage.open();
         const loginModal = await mainPage.clickSignIn();
         await loginModal.login('testEmailE@gmail.com', '123456Qq!');
         await expect(page).toHaveURL('/panel/garage');
         await page.context().storageState({ path: 'playwright/.auth/user.json' });
});