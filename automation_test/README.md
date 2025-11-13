# Automation Test Project

This project contains end-to-end automation tests for the [Automation Exercise](https://automationexercise.com/) website using Playwright and TypeScript.

## 🎯 Test Scenario

The test suite covers a complete e-commerce user journey:

1. **Product Selection**: Navigate to products page and select a specific product
2. **Cart Management**: Add product with random quantity to cart
3. **User Registration**: Create a new user account with random data
4. **Checkout Process**: Complete order placement with payment
5. **User Logout**: Sign out from the application

## 🛠 Tech Stack

- **Framework**: [Playwright](https://playwright.dev/) - Modern end-to-end testing
- **Language**: TypeScript - Type-safe test development
- **Data Generation**: [Faker.js](https://fakerjs.dev/) - Random test data generation
- **Target Browser**: Chromium (Chrome) - Configurable for multi-browser testing

## 📁 Project Structure

```
automation_test/
├── tests/
│   └── web_automation_challenge.spec.ts  # Main test specification
├── utils/
│   └── actions.ts                        # Reusable test actions/functions
├── playwright-report/                    # HTML test reports
├── test-results/                         # Test execution artifacts
├── package.json                          # Dependencies and scripts
├── playwright.config.ts                  # Playwright configuration
└── README.md                            # This documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd automation_test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Optional: Update package.json scripts** (recommended)
   ```json
   {
     "scripts": {
       "test": "playwright test",
       "test:headed": "playwright test --headed",
       "test:ui": "playwright test --ui",
       "test:debug": "playwright test --debug",
       "report": "playwright show-report"
     }
   }
   ```

## ▶️ Running Tests

### Execute the test suite
```bash
npx playwright test
# OR if you've added the scripts to package.json:
npm test
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --headed
# OR with npm script:
npm run test:headed
```

### Run specific test file
```bash
npx playwright test web_automation_challenge.spec.ts
```

### Run tests with UI mode (interactive)
```bash
npx playwright test --ui
# OR with npm script:
npm run test:ui
```

### Run tests in debug mode
```bash
npx playwright test --debug
# OR with npm script:
npm run test:debug
```

### Generate and view HTML report
```bash
npx playwright show-report
# OR with npm script:
npm run report
```

## ⚙️ Configuration

The test configuration is managed in `playwright.config.ts`:

- **Base URL**: `https://automationexercise.com/`
- **Browser**: Chromium (Chrome)
- **Mode**: Non-headless (visual execution) - tests run with visible browser by default
- **Reports**: Console list + HTML report
- **Tracing**: Enabled on first retry

### Key Configuration Options

- `headless: false` - Tests run with visible browser by default (no need for --headed flag)
- `trace: 'on-first-retry'` - Captures trace on test failures for debugging
- `baseURL` - Target application URL (automationexercise.com)
- `testDir: './tests'` - Location of test files

> **Note**: Since `headless: false` is set in the config, tests will run with a visible browser by default. Use `--headed` flag only if you want to override a headless configuration.

## 📊 Test Reports

After test execution, reports are available in:
- **Console**: Real-time test results
- **HTML Report**: `playwright-report/index.html` - Detailed visual report
- **Test Results**: `test-results/` - Screenshots, videos, traces

## 🧪 Test Details

### Main Test Flow (`web_automation_challenge.spec.ts`)

1. **Navigation**: Go to homepage and products page
2. **Product Selection**: Select the 3rd product and view details
3. **Quantity Input**: Set random quantity (1-20)
4. **Add to Cart**: Add product and verify cart contents
5. **Checkout**: Proceed to checkout (triggers registration)
6. **Account Creation**: Complete signup with random user data
7. **Order Processing**: Fill order details and complete payment
8. **Validation**: Verify successful order placement
9. **Cleanup**: Logout from the application

### Utility Functions (`utils/actions.ts`)

- `signup()` - Complete user registration process
- `logout()` - User logout functionality
- `accountCreatedValidation()` - Verify account creation
- `payment()` - Handle payment process
- `orderPlacedValidation()` - Verify order completion

## 🔧 Customization

### Adding New Tests

1. Create new `.spec.ts` files in the `tests/` directory
2. Import required utilities from `utils/actions.ts`
3. Follow existing patterns for consistent test structure

### Modifying Test Data

- Random data is generated using Faker.js
- Modify generators in `utils/actions.ts` for different data patterns
- Adjust quantity ranges, name formats, etc.

### Browser Configuration

Update `playwright.config.ts` to enable additional browsers:

```markdown
### Browser Projects (as defined in playwright.config.ts)

The project is configured to run with Chromium by default (headless: false). If you want multi-browser testing, enable the commented projects and adjust headless for CI.

```typescript
projects: [
    {
        name: 'Chromium',
        use: { ...devices['Desktop Chrome'] },
    },
    {
        name: 'Mobile Safari',
        use: { ...devices['iPhone 13'] },
    },
],
```

Notes:
- For CI, set `headless: true` or override via CLI.
- Use `--headed` to force a visible browser when needed.
```

## 🐛 Debugging

### View Test Execution
- Tests run with visible browser by default (`headless: false` in config)
- Use browser developer tools during execution
- Use `--ui` flag for interactive test development and debugging

### Analyze Failures
- Check HTML report for detailed failure information:
  ```bash
  npx playwright show-report
  ```
- Review screenshots and videos in `test-results/` directory
- Use trace viewer for step-by-step debugging:
  ```bash
  npx playwright show-trace test-results/[trace-file].zip
  ```

### Debug Mode
- Run tests in debug mode for step-by-step execution:
  ```bash
  npx playwright test --debug
  ```
- Use Playwright Inspector for live debugging

## 📝 Notes

- Tests use random data generation for realistic scenarios
- Each test run creates unique user accounts and order data
- The test site (automationexercise.com) is a demo e-commerce platform
- All test data is fictional and generated by Faker.js

## 🤝 Contributing

1. Follow existing code patterns and naming conventions
2. Add appropriate error handling and assertions
3. Update documentation for new features
4. Ensure tests are reliable and maintainable

---

For more information about Playwright, visit the [official documentation](https://playwright.dev/).
