import { Page } from '@playwright/test';
import { SubmissionPage } from './SubmissionPage';

export class App {
    readonly page: Page;
    readonly submissionPage: SubmissionPage;

    constructor(page: Page) {
        this.page = page;
        this.submissionPage = new SubmissionPage(page);
    }
}
