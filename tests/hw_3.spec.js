// // @ts-check
import { test } from '@playwright/test';
import { MainPage } from '../poms/pages/MainPage';
import { RegisterModal } from '../poms/modals/RegisterModal';
import { GaragePage } from '../poms/pages/GaragePage';
test.describe('Main check', () => {

    let mainPage;
    let registerModal;
    let garagePage;

    test.beforeEach(async({page}) => {
        mainPage = new MainPage(page);
        garagePage = new GaragePage(page);
        await mainPage.open();
        await mainPage.clickSignUp();
        registerModal = new RegisterModal(page);
    })

    test('Check first name input', async () => {
        await registerModal.isRegisterDisabled();
        await registerModal.typeName('A');
        await registerModal.getLastNameInput().click();
        await registerModal.checkValidationMessage('Name has to be from 2 to 20 characters long');
        await registerModal.getNameInput().clear()
        await registerModal.checkValidationMessage('Name required');
        await registerModal.typeName('Привіт');
        await registerModal.checkFieldBorderCollor('nameInput')
        await registerModal.checkValidationMessage('Name is invalid');
    });

    test('Check lastname input', async () => {
        await registerModal.typeLastName('A');
        await registerModal.getNameInput().click();
        await registerModal.checkValidationMessage('Last name has to be from 2 to 20 characters long');
        await registerModal.getLastNameInput().clear()
        await registerModal.checkValidationMessage('Last name required');
        await registerModal.typeLastName('Привіт');
        await registerModal.checkFieldBorderCollor('lastNameInput');
        await registerModal.checkValidationMessage('Last name is invalid');
    });

    test('Check email field', async () => {
        await registerModal.typeEmail('qwrqw');
        await registerModal.getNameInput().click();
        await registerModal.checkValidationMessage('Email is incorrect');
        await registerModal.getEmailInput().clear()
        await registerModal.checkValidationMessage('Email required');
        await registerModal.typeEmail('dgds');
        await registerModal.checkFieldBorderCollor('emailInput');
        await registerModal.checkValidationMessage('Email is incorrect');
    });

    test('Check password field', async () => {
        await registerModal.typePassword('1ab2cdA');
        await registerModal.getNameInput().click();
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registerModal.typePassword('1ab2cdsdewdrv4');
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registerModal.typePassword('1123455643235241');
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registerModal.typePassword('qwerty123');
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registerModal.typePassword('qwertyuiopasfghj');
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registerModal.typePassword('QWERTYUIOPLKJHG');
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registerModal.typePassword('!@$Y@&%*@T%%');
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registerModal.checkFieldBorderCollor('passwordInput');
        await registerModal.checkValidationMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Check re-enter password field', async () => {
        await registerModal.typePassword('123A4567c1451');
        await registerModal.typeRePassword('123A4567c1452');
        await registerModal.getNameInput().click();
        await registerModal.checkValidationMessage('Passwords do not match');
        await registerModal.getRePasswordInput().clear()
        await registerModal.checkFieldBorderCollor('reEnterPasswordInput');
        await registerModal.checkValidationMessage('Re-enter password required');
    });

    test('Create account', async () => {
        await registerModal.register(
            'Kirill',
            'Plotnikov',
            getRandomEmail(),
            '123A4567c1452',
            '123A4567c1452',
        );
       await garagePage.emptyMessageHasText('You don’t have any cars in your garage');
    });
});

function getRandomEmail(min = 99, max = 9999) {
    return 'aqa-kirill-' + (Math.floor(Math.random() * (max - min + 1)) + min) + '@gmail.com';
}