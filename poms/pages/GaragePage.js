import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    constructor(page, context) {
        super(page, '/panel/garage', context);
        this._page = page;
    }

    selectors = {
        emptyMessage: this._page.locator('.panel-empty_message'),
        profile: this._page.locator('[routerlink="profile"]'),
        profileContext: this._page.locator('.panel-page_content'),
        carItem: this._page.locator('.car-item')
    };

    async emptyMessageHasText(text) {
        await expect(this.selectors.emptyMessage).toHaveText(text);
    };

    async clickUserProfile() {
        await this.selectors.profile.click();
    };

    async profileContextHasText(text) {
        await expect(this.selectors.profileContext).toHaveText(text);
    }

    async ckeckCarsCountOnPage(number) {
        await expect(this.selectors.carItem).toHaveCount(number);
    }
    // async addCar(brand, model, mileage) {
    //     await this._page.locator('button.btn-primary').click(); 
    //     await this._page.locator('#addCarBrand').selectOption({ label: brand });
    //     await this._page.locator('#addCarModel').selectOption({ label: model });
    //     await this._page.locator('#addCarMileage').fill(mileage.toString());
    //     await this._page.locator('btn btn-secondary').click(); 
    //   }
      
}
