import { faker } from '@faker-js/faker';
import { expect, newSubmissionTest, test } from '../fixture/app.fixture';
import {
    bodyParts, causes,
    ConditionalTypes,
    injuryDetails,
    injuryTypes,
    locations,
    severities
} from '../utils/constants';

const location = faker.helpers.arrayElement(locations);
const cause = faker.helpers.arrayElement(causes);
const injuryType = faker.helpers.arrayElement(injuryTypes);
const severity = faker.helpers.arrayElement(severities);
const injuryDetail = faker.helpers.arrayElement(injuryDetails);
const bodyPart = faker.helpers.arrayElement(bodyParts);

// Bug: user sees the error message even if the required fields are filled in
test.describe('Create new submission with [First Aid Injury] type', () => {
    newSubmissionTest('should be able to create a new submission with [First Aid Injury] type', async ({ app }) => {
        await app.submissionPage.chooseDateTime();
        await app.submissionPage.chooseLocation(location);
        await app.submissionPage.chooseType(ConditionalTypes.FirstAidInjury);
        await app.submissionPage.fillDescription(faker.string.alpha({ length: 10 }));
        await app.submissionPage.chooseInjuryType(injuryType);
        await app.submissionPage.fillOtherInjuryType(faker.string.alpha({ length: 10 }));
        await app.submissionPage.chooseSeverity(severity);
        await app.submissionPage.chooseInjuryDetails(injuryDetail);
        await app.submissionPage.fillOtherInjuryDetails(faker.string.alpha({ length: 10 }));
        await app.submissionPage.chooseBodyPartWasInjured(bodyPart);
        await app.submissionPage.chooseCause(cause);
        await app.submissionPage.submit();
        await expect.soft(app.submissionPage.successfullySubmittedPopup,
            '"Successfully submitted" popup is visible')
            .toBeVisible({ timeout: 5_000 });
        await expect.soft(app.submissionPage.reportedSuccessfullyBanner,
            '"Reported successfully" banner is visible')
            .toBeVisible({ timeout: 5_000 });
    });
});
