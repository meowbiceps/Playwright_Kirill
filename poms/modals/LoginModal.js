import { BaseModal } from "./BaseModal";

export class LoginModal extends BaseModal {
    constructor(page) {
        super(page);
        this.selectors = {
        ...this.selectors,
        emailInput: this._page.locator('#signinEmail'),
        passwordInput: this._page.locator('#signinPassword'),
        rememberCheckBox: this._page.locator('#remember'),
        forgotBtn: this._page.locator('button', { hasText: 'Forgot password' }),
        }
    };

    async typeEmail(email) {
        if (!email) throw new Error('Email not macthes');
        await this.selectors.emailInput.fill(email);
    }

    async typePassword(password) {
        if (!password) throw new Error('Password not macthes');
        await this.selectors.passwordInput.fill(password);
    }

    async login(email, password) {
        this.typeEmail(email);
        this.typePassword(password);
        this.clickSubmitButton();
    }

}