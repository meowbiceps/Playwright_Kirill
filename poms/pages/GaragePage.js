import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GaragePage extends BasePage {
    constructor(page, context) {
        super(page, '/garage', context);
        this._page = page;
    }

    selectors = {
        emptyMessage: this._page.locator('.panel-empty_message'),
    };


    async emptyMessageHasText(text) {
        await expect(this.selectors.emptyMessage).toHaveText(text)
    }
    
}