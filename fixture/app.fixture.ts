import { test as base } from '@playwright/test';
import { App } from '../pageobject/App';

type Pages = {
    app: App;
};

export const test = base.extend<Pages>({
    app: async ({ page }, use) => {
        await use(new App(page));
    }
});

export const newSubmissionTest = test.extend<Pages>({
    app: async ({ app }, use) => {
        await app.submissionPage.goto();
        await use(app);
    }
});

export { expect } from '@playwright/test';
