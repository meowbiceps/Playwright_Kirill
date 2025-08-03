import { RegisterModal } from "../modals/RegisterModal";
import { LoginModal } from "../modals/LoginModal";
import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
    constructor(page, context) {
        super(page, '/', context);
        this._page = page;
    }

    selectors = {
        signInBtn: this._page.locator('button' , {hasText: 'Sign in'}),
        signUpBtn: this._page.getByText('Sign up'),
    };


    async clickSignIn() {
        await this.selectors.signInBtn.click();
        return new LoginModal(this._page, this._context)
    }
    
    async clickSignUp() {
        await this.selectors.signUpBtn.click();
        return new RegisterModal(this._page, this._context);
    }
}