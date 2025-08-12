export class BasePage {
    /**
    * @param {import('@playwright/test').Page} page
    * @param {import('@playwright/test').BrowserContext} context
    */
    constructor(page, path, context) {
        this._page = page;
        this._path = path;
        this._context = context;
    }
    async open() {
        await this._page.goto('https://qauto.forstudy.space' + (this._path));
    }

}

