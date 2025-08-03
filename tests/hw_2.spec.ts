import { test, expect } from '@playwright/test';
const url = 'https://qauto.forstudy.space/';

test('Check first name input', async ({ page }) => {
    await page.goto(url);
    const doMore = await page.innerText('.hero-descriptor_title');
    expect(doMore).toBe('Do more!');

    await page.getByText('Sign up').click();

    const btnRegister = await page.getByRole('button', { name: 'Register' });
    await expect(btnRegister).toBeDisabled();

    const name = await page.locator('#signupName');
    name.fill('A');
    const modalBody = await page.locator('.modal-body');
    const lastName = await page.locator('#signupLastName');
    lastName.click();
    await expect(modalBody).toContainText('Name has to be from 2 to 20 characters long');
    name.clear();
    await expect(modalBody).toContainText('Name required');
    name.fill('Привіт');
    await expect(modalBody).toContainText('Name is invalid');
    await expect(name).toHaveCSS('border-color', 'rgb(220, 53, 69)');

});

test('Check lastname input', async ({ page }) => {
    await page.goto(url);

    await page.getByText('Sign up').click();

    const btnRegister = await page.getByRole('button', { name: 'Register' });
    await expect(btnRegister).toBeDisabled();

    const lastName = await page.locator('#signupLastName');
    const modalBody = await page.locator('.modal-body');
    const name = await page.locator('#signupName');
    lastName.fill('A');
    name.click();
    await expect(modalBody).toContainText('Last name has to be from 2 to 20 characters long');
    lastName.clear();
    await expect(modalBody).toContainText('Last name required');
    lastName.fill('Привіт!');
    await expect(modalBody).toContainText('Last name is invalid');
    await expect(lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');

});

test('Check email field', async ({ page }) => {
    await page.goto(url);

    await page.getByText('Sign up').click();
    const modalBody = await page.locator('.modal-body');
    const email = page.locator('#signupEmail');
    email.fill('qwrqw');
    const name = await page.locator('#signupName');
    name.click();
    await expect(modalBody).toContainText('Email is incorrect');
    await expect(email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    email.clear();
    await expect(modalBody).toContainText('Email required');

});

test('Check password field', async ({ page }) => {
    await page.goto(url);

    await page.getByText('Sign up').click();
    const password = page.locator('#signupPassword')
    const modalBody = page.locator('.modal-body');
    const email = page.locator('#signupEmail');
    await password.fill('1ab2cdA');
    await email.click();
    await expect(modalBody).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await password.fill('1ab2cdsdewdrv4');
    await email.click();
    await expect(modalBody).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await password.fill('1123455643235241');
    await email.click();
    await expect(modalBody).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await password.fill('qwerty123');
    await email.click();
    await expect(modalBody).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await password.fill('qwertyuiopasfghj');
    await email.click();
    await expect(modalBody).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await password.fill('QWERTYUIOPLKJHG');
    await email.click();
    await expect(modalBody).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await password.fill('!@$Y@&%*@T%%');
    await email.click();
    await expect(modalBody).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test('Check re-enter password field', async ({ page }) => {
    await page.goto(url);

    await page.getByText('Sign up').click();
    const modalBody = page.locator('.modal-body');
    const password = page.locator('#signupPassword');
    const rePassword = page.locator('#signupRepeatPassword');
    const email = page.locator('#signupEmail');
    await password.fill('123A4567c1451');
    await rePassword.fill('123A4567c1452');
    await email.click();
    await expect(modalBody).toContainText('Passwords do not match');
    await rePassword.clear();
    await expect(modalBody).toContainText('Re-enter password required');
    await expect(rePassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test('Create account', async ({ page }) => {
    await page.goto(url);

    await page.getByText('Sign up').click();
    const password = page.locator('#signupPassword');
    const rePassword = page.locator('#signupRepeatPassword');
    const email = page.locator('#signupEmail');
    const name = page.locator('#signupName');
    const lastName = page.locator('#signupLastName');

    await name.fill('Kirill');
    await lastName.fill('Plotnikov');
    await email.fill(getRandomEmail());
    await password.fill('123A4567c1452');
    await rePassword.fill('123A4567c1452');
    const btnRegister = page.getByRole('button', { name: 'Register' });
    await expect(btnRegister).toBeEnabled();
    await btnRegister.click();
    await expect(page.locator('.panel-empty_message')).toHaveText('You don’t have any cars in your garage');

});

function getRandomEmail(min = 99, max = 9999) {
    return 'aqa-kirill-' + (Math.floor(Math.random() * (max - min + 1)) + min) + '@gmail.com';
}






