import { test as base, mergeTests } from '@playwright/test';
import { SettingsPage, Header, NavBar } from '../poms';
import { loginTest } from './login.fixture';

const cleanupSettings = async (page) => {
  await page.request.put('/api/users/settings', {
    data: {
      currency: 'usd'
    }
  });

  await page.request.put('/api/users/settings', {
    data: {
      distanceUnits: 'km'
    }
  });
};

export const settingsTestWithouLogin = base.extend({
  settingsPage: async ({ page, context }, use) => {
    await cleanupSettings(page);
    const settingsPage = new SettingsPage(page, context);
    await settingsPage.open();
    await use(settingsPage);
    await cleanupSettings(page);
  },
  header: async ({ page, context }, use) => {
    await use(new Header(page, context));
  },
  navBar: async ({ page, context }, use) => {
    await use(new NavBar(page, context));
  }
});

export const settingsTest = mergeTests(loginTest, settingsTestWithouLogin); 