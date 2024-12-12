# Playwright Tests Repository

This repository contains end-to-end tests written using Playwright. The project follows best practices, including the Page Object Model, linting with ESLint, and code formatting with Prettier. Husky is used for pre-commit hooks.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** This project requires Node.js. [Download and install Node.js](https://nodejs.org/).

## Table of Contents

- [Installation](#installation)
- [Run Tests](#run-tests)
- [Folder Structure](#folder-structure)
- [Test Reporting](#test-reporting)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sergey-mario/vatix-assignment.git
    cd vatix-assignment
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Run Tests

Execute the following command to run the Playwright tests:

```bash
npm test
```

Execute the following command to run the specific tests

```bash
npm test <test-file-name>
```

To run tests in headed mode, use the following command:

```bash
npm run test --headed
```

To run specific project (e.g. chromium), use the following command:

```bash
npm run test --project=chromium
```

## Folder Structure

The project structure follows the Page Object Model for better organization and maintainability.

```
|-- pageobject/
|   |-- page_1
|   |-- page_2
|   |-- app.ts
|-- playwright.config.ts
|-- package.ts
```

The `app.ts` file is main class that receives the page and passes it to each page object class.
`App` class pass the page fixture and through it, so we can access the page objects we have defined for our application.
It provides a way to use this `app` object directly in our tests without needing to instantiate it manually in every test,
thus reducing even more the verboseness.

## Test Reporting

Repository uses Playwright for test reporting.

Playwright report generated automatically as html file after each test run.

The generated reports can be found in the `playwright-report` folder.

To show report, use the following command:

```bash
npm run show:report
```

## Check lists
- All required fields must be filled to submit the form (automated)
- Conditional fields appear when Type is set to “Near Miss” and all required fields must be filled to submit the form (automated)
- Conditional fields appear when Type is set to “First Aid Injury” and all required fields must be filled to submit the form (automated)
- Submission without date and time shows an error (automated)
- Submission without location shows an error (automated)
- Submission without type shows an error (automated)
- Submission without description shows an error (automated)
- Submission with optional fields filled
- Conditional fields disappear when Type is changed to a non-conditional option
- Invalid date-time formats are rejected
- All fields have correct placeholders
- All dropdowns have expected options
- The file can be attached
- Add/remove an additional note
