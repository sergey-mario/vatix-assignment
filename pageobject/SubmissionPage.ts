import { Locator, Page } from '@playwright/test';
import { urls } from '../utils/constants';

export class SubmissionPage {
    readonly page: Page;
    readonly newSubmissionHeader: Locator;
    readonly descriptionInput: Locator;
    readonly submitButton: Locator;
    readonly successfullySubmittedPopup: Locator;
    readonly reportedSuccessfullyBanner: Locator;
    readonly requiredFieldsErrorMessage: Locator;
    readonly otherInjureInput: Locator;
    readonly otherInjuryType: Locator;
    readonly injuryTypeTitle: Locator;

    readonly dateTimePicker: {
        readonly input: Locator;
        readonly todayDate: Locator;
        readonly hours: Locator;
        readonly minutes: Locator;
    };

    readonly dropDownByTitle: (title: string) => Locator;
    readonly optionByText: (text: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.newSubmissionHeader = page.getByRole('heading', { name: 'New Submission' });
        this.descriptionInput = page.getByPlaceholder('Description');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successfullySubmittedPopup =
            page.getByRole('heading', { name: 'Incident has been successfully submitted!' });
        this.reportedSuccessfullyBanner = page.getByRole('heading', { name: 'Incident reported successfully!' });
        this.requiredFieldsErrorMessage = page.getByText('You have to fill in all required fields.', { exact:true });
        this.otherInjuryType = page.getByPlaceholder('If other, please specify the type');
        this.otherInjureInput = page.getByPlaceholder('If other, please specify the injury');
        this.injuryTypeTitle = page.getByText('Injury type');

        this.dateTimePicker = {
            input: page.locator('input[id=":r2:"]'),
            todayDate: page.locator('button.MuiPickersDay-today'),
            hours: page.locator('[aria-label="Select hours"] li.MuiMultiSectionDigitalClockSection-item'),
            minutes: page.locator('[aria-label="Select minutes"] li.MuiMultiSectionDigitalClockSection-item')
        };

        this.dropDownByTitle = (title: string) =>
            page.locator('div[style^="padding-bottom"]').filter({ hasText: title }).locator('input');
        this.optionByText = (text: string) =>
            page.getByRole('option', { name: text });
    }

    async goto() {
        const { baseUrl } = urls;
        await this.page.goto(baseUrl);
        await this.newSubmissionHeader.waitFor();
    }

    async chooseDateTime() {
        await this.dateTimePicker.input.click();
        await this.dateTimePicker.todayDate.click();
        await this.dateTimePicker.hours.first().click();
        await this.dateTimePicker.minutes.first().click();
    }

    async chooseLocation(location: string) {
        await this.dropDownByTitle('Location').click();
        await this.optionByText(location).click();
    }

    async chooseType(type: string) {
        await this.dropDownByTitle('Type').click();
        await this.optionByText(type).click();
    }

    async fillDescription(description: string) {
        await this.descriptionInput.fill(description);
    }

    async submit() {
        await this.submitButton.click();
    }

    async isElementHighlighted(input: Locator) {
        return await input.getAttribute('aria-invalid');
    }

    async chooseCause(cause: string) {
        await this.dropDownByTitle('Cause of Injury or Near Miss').click();
        await this.optionByText(cause).click();
    }

    async chooseInjuryType(type: string) {
        await this.dropDownByTitle('Injury type').click();
        await this.optionByText(type).click();
        await this.injuryTypeTitle.click();
    }

    async fillOtherInjuryType(type: string) {
        await this.otherInjuryType.fill(type);
    }

    async chooseSeverity(severity: string) {
        await this.dropDownByTitle('Severity').click();
        await this.optionByText(severity).click();
    }

    async chooseInjuryDetails(detail: string) {
        await this.dropDownByTitle('Injury details').click();
        await this.optionByText(detail).click();
        await this.injuryTypeTitle.click();
    }

    async fillOtherInjuryDetails(detail: string) {
        await this.otherInjureInput.fill(detail);
    }

    async chooseBodyPartWasInjured(bodyPart: string) {
        await this.dropDownByTitle('Which part of the body was injured?').click();
        await this.optionByText(bodyPart).click();
        await this.injuryTypeTitle.click();
    }
}
