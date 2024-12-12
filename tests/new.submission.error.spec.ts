import { faker } from '@faker-js/faker';
import { expect, newSubmissionTest, test } from '../fixture/app.fixture';
import { locations, ordinaryTypes } from '../utils/constants';

const location = faker.helpers.arrayElement(locations);
const type = faker.helpers.arrayElement(ordinaryTypes);

test.describe('Create new submission error', () => {
    newSubmissionTest('should not be able to create a new submission with missed required fields', async ({ app }) => {
        const locationDropdown = app.submissionPage.dropDownByTitle('Location');
        const typeDropdown = app.submissionPage.dropDownByTitle('Type');
        const descriptionInput = app.submissionPage.descriptionInput;

        await expect(app.submissionPage.submitButton).toBeDisabled();

        await app.submissionPage.chooseDateTime();
        await app.submissionPage.submit();
        await expect(app.submissionPage.requiredFieldsErrorMessage).toBeVisible();
        expect(app.submissionPage.isElementHighlighted(locationDropdown), 'Location is highlighted').toBeTruthy();
        expect(app.submissionPage.isElementHighlighted(typeDropdown), 'Type is highlighted').toBeTruthy();
        expect(app.submissionPage.isElementHighlighted(descriptionInput), 'Description is highlighted').toBeTruthy();

        await app.submissionPage.chooseLocation(location);
        await expect(app.submissionPage.submitButton).toBeDisabled();

        await app.submissionPage.chooseType(type);
        await expect(app.submissionPage.submitButton).toBeDisabled();

        await app.submissionPage.fillDescription(faker.string.alpha({ length: 10 }));
        await expect(app.submissionPage.submitButton).toBeEnabled();
    });
});
