import { expect } from '@playwright/test';

export class BaseModal {
  /**
    * @param {import('@playwright/test').Page} page
    * @param {import('@playwright/test').BrowserContext} context
    */
  constructor(page, context) {
    this._page = page;
    this._context = context;
    this.selectors = {
      modalContent: this._page.locator('[class="modal-content"]'),
      modalHeader: this._page.locator('[class="modal-header"]'),
      closeButton: this._page.locator('[class="modal-content"] [aria-label="Close"]'),
      submitButton: this._page.locator('[class="modal-content"] [class$="primary"]'),
      registrationBtn: this._page.locator('button', { hasText: 'Register' }),

    };
  }

  async isModalVisible(){
    await expect(this.selectors.modalContent).toBeVisible();
  }

  async clickCloseButton(){
    await this.selectors.closeButton.click();
  }

  async clickSubmitButton(){
    await this.selectors.submitButton.click();
  }

  async clickRegistrationButton(){
    await this.selectors.registrationBtn.click();
  }

  async isRegisterDisabled() {
    await expect(this.selectors.registrationBtn).toBeDisabled();
  }

  async isRegisterEnabled() {
    await expect(this.selectors.registrationBtn).toBeEnabled();
  }

  async checkValidationMessage(message){
    if(!message) throw new Error ('Message is missed');
    await expect(this.selectors.modalContent).toContainText(message);
  }

  async checkFieldBorderCollor(fieldName){
    if(!fieldName) throw new Error ('Field should not be empty');
   await expect(this.selectors[fieldName]).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }
}