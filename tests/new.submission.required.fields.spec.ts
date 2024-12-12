import { faker } from '@faker-js/faker';
import { expect, newSubmissionTest, test } from '../fixture/app.fixture';
import { locations, ordinaryTypes } from '../utils/constants';

const location = faker.helpers.arrayElement(locations);
const type = faker.helpers.arrayElement(ordinaryTypes);

test.describe('Create new submission', () => {
    newSubmissionTest('should be able to create a new submission with required fields', async ({ app }) => {
        await app.submissionPage.chooseDateTime();
        await app.submissionPage.chooseLocation(location);
        await app.submissionPage.chooseType(type);
        await app.submissionPage.fillDescription(faker.string.alpha({ length: 10 }));
        await app.submissionPage.submit();
        await expect.soft(app.submissionPage.successfullySubmittedPopup,
            '"Successfully submitted" popup is visible')
            .toBeVisible({ timeout: 5_000 });
        await expect.soft(app.submissionPage.reportedSuccessfullyBanner,
            '"Reported successfully" banner is visible')
            .toBeVisible({ timeout: 5_000 });
    });
});
