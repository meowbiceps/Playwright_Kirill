import { BaseModal } from "./BaseModal";

export class RegisterModal extends BaseModal {
    constructor(page) {
        super(page);
        this.selectors = {
            ...this.selectors,
            nameInput: this._page.locator('#signupName'),
            lastNameInput: this._page.locator('#signupLastName'),
            emailInput: this._page.locator('#signupEmail'),
            passwordInput: this._page.locator('#signupPassword'),
            reEnterPasswordInput: this._page.locator('#signupRepeatPassword'),
        }
    }

    async typeName(name) {
        if (!name) throw new Error('The name field must be filled in');
        await this.selectors.nameInput.fill(name);
    }

    async typeLastName(lastName) {
        if (!lastName) throw new Error('The lastname field must be filled in');
        await this.selectors.lastNameInput.fill(lastName);
    }

    getNameInput() {
        return this.selectors.nameInput;
    }

    getLastNameInput() {
        return this.selectors.lastNameInput;
    }

    getEmailInput() {
        return this.selectors.emailInput;
    }

    getPasswordInput() {
        return this.selectors.passwordInput;
    }

    getRePasswordInput() {
        return this.selectors.reEnterPasswordInput;
    }
    
    async typeEmail(email) {
        if (!email) throw new Error('Email not macthes');
        await this.selectors.emailInput.fill(email);
    }

    async typePassword(password) {
        if (!password) throw new Error('Password not macthes');
        await this.selectors.passwordInput.fill(password);
    }

    async typeRePassword(rePassword) {
        if (!rePassword) throw new Error('Re-password not macthes');
        await this.selectors.reEnterPasswordInput.fill(rePassword);
    }

    async register(name, lastName, email, password, rePassword) {
       await this.typeName(name);
       await this.typeLastName(lastName);
       await this.typeEmail(email);
       await this.typePassword(password);
       await this.typeRePassword(rePassword);
       await this.clickRegistrationButton();
    }
}