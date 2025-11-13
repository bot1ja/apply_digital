import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export async function logout(page: Page) {
  const logoutLink = page.locator('a[href="/logout"]');
  await expect(logoutLink).toBeVisible();
  await logoutLink.click();
  await expect(page).toHaveURL(/.*\/login/);
}

export async function signup(page: Page, firstName: string, lastName: string) {
    await page.click('a[href="/login"]');
    await expect(page).toHaveURL(/.*\/login/);

    const signupNameInput = page.locator('input[data-qa="signup-name"]');
    await signupNameInput.fill(`${firstName} ${lastName}`);
    await expect(signupNameInput).toHaveValue(`${firstName} ${lastName}`);

    const email = `${firstName}.${lastName}${faker.number.int({ min: 1, max: 9999 })}@example.com`.toLowerCase();
    const signupEmailInput = page.locator('input[data-qa="signup-email"]');
    await signupEmailInput.fill(email);
    await expect(signupEmailInput).toHaveValue(email);

    const signupButton = page.locator('button[data-qa="signup-button"]');
    await expect(signupButton).toBeVisible();
    await signupButton.click();

    // validate name and email carried from previous step
    await expect(page.locator('[data-qa="name"]')).toHaveValue(`${firstName} ${lastName}`);
    await expect(page.locator('[data-qa="email"]')).toHaveValue(email);

    // password
    const password = faker.internet.password();
    await page.locator('[data-qa="password"]').fill(password);
    await expect(page.locator('[data-qa="password"]')).toHaveValue(password);

    // random DOB
    const day = faker.number.int({ min: 1, max: 31 });
    const month = faker.number.int({ min: 1, max: 12 });
    const year = faker.number.int({ min: 1900, max: 2021 });

    await page.selectOption('[data-qa="days"]', String(day));
    await page.selectOption('[data-qa="months"]', String(month));
    await page.selectOption('[data-qa="years"]', String(year));

    await expect(page.locator('[data-qa="days"]')).toHaveValue(String(day));
    await expect(page.locator('[data-qa="months"]')).toHaveValue(String(month));
    await expect(page.locator('[data-qa="years"]')).toHaveValue(String(year));

    // check checkboxes
    await page.check('#newsletter');
    await page.check('#optin');
    await expect(page.locator('#newsletter')).toBeChecked();
    await expect(page.locator('#optin')).toBeChecked();

    // address information
    await page.locator('[data-qa="first_name"]').fill(firstName);
    await page.locator('[data-qa="last_name"]').fill(lastName);

    const company = faker.company.name();
    await page.locator('[data-qa="company"]').fill(company);

    const address = faker.location.streetAddress();
    await page.locator('[data-qa="address"]').fill(address);

    // select country United States
    await page.selectOption('[data-qa="country"]', 'United States');
    await expect(page.locator('[data-qa="country"]')).toHaveValue('United States');

    const state = faker.location.state();
    const city = faker.location.city();
    const zipcode = faker.location.zipCode();
    const mobile = faker.string.numeric(10);

    await page.locator('[data-qa="state"]').fill(state);
    await page.locator('[data-qa="city"]').fill(city);
    await page.locator('[data-qa="zipcode"]').fill(zipcode);
    await page.locator('[data-qa="mobile_number"]').fill(mobile);

    await expect(page.locator('[data-qa="first_name"]')).toHaveValue(firstName);
    await expect(page.locator('[data-qa="last_name"]')).toHaveValue(lastName);
    await expect(page.locator('[data-qa="company"]')).toHaveValue(company);
    await expect(page.locator('[data-qa="address"]')).toHaveValue(address);
    await expect(page.locator('[data-qa="state"]')).toHaveValue(state);
    await expect(page.locator('[data-qa="city"]')).toHaveValue(city);
    await expect(page.locator('[data-qa="zipcode"]')).toHaveValue(zipcode);
    await expect(page.locator('[data-qa="mobile_number"]')).toHaveValue(mobile);

    // submit and create account
    await page.locator('[data-qa="create-account"]').click();
}

export async function accountCreatedValidation(page: Page) {
    const ACCOUNT_CREATED_TITLE = 'Account Created!';
    const ACCOUNT_CREATED_P1 = 'Congratulations! Your new account has been successfully created!';
    const ACCOUNT_CREATED_P2 = 'You can now take advantage of member privileges to enhance your online shopping experience with us.';

    await expect(page).toHaveURL(/.*\/account_created/);

    const title = page.locator('[data-qa="account-created"]');
    await expect(title).toBeVisible();
    await expect(title).toHaveText(ACCOUNT_CREATED_TITLE);
    await expect(title).toHaveAttribute('style', /green/);

    const paragraphs = page.locator('.container .col-sm-9 p');
    await expect(paragraphs.nth(0)).toHaveText(ACCOUNT_CREATED_P1);
    await expect(paragraphs.nth(1)).toHaveText(ACCOUNT_CREATED_P2);
}

export async function payment(page: Page, firstName: string, lastName: string) {
  const placeOrderBtn = page.locator('a[href="/payment"].btn.btn-default.check_out');
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();
    await expect(page).toHaveURL(/.*\/payment/);

    const fullNameOnCard = `${firstName} ${lastName}`;
    await page.locator('[data-qa="name-on-card"]').fill(fullNameOnCard);
    await expect(page.locator('[data-qa="name-on-card"]')).toHaveValue(fullNameOnCard);

    const cardNumber = faker.finance.creditCardNumber().replace(/\D/g, '');
    await page.locator('[data-qa="card-number"]').fill(cardNumber);
    await expect(page.locator('[data-qa="card-number"]')).toHaveValue(cardNumber);

    const cvc = faker.string.numeric(3);
    await page.locator('[data-qa="cvc"]').fill(cvc);
    await expect(page.locator('[data-qa="cvc"]')).toHaveValue(cvc);

    const expiryMonth = String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0');
    await page.locator('[data-qa="expiry-month"]').fill(expiryMonth);
    await expect(page.locator('[data-qa="expiry-month"]')).toHaveValue(expiryMonth);

    const currentYear = new Date().getFullYear();
    const expiryYear = String(faker.number.int({ min: currentYear + 1, max: currentYear + 6 }));
    await page.locator('[data-qa="expiry-year"]').fill(expiryYear);
    await expect(page.locator('[data-qa="expiry-year"]')).toHaveValue(expiryYear);

    const payButton = page.locator('[data-qa="pay-button"]');
    await expect(payButton).toBeVisible();
    await payButton.click();
}

export async function orderPlacedValidation(page: Page) {
  const ORDER_PLACED_TITLE = 'Order Placed!';
    const ORDER_CONFIRMED_TEXT = 'Congratulations! Your order has been confirmed!';
    const STYLE_GREEN_REGEX = /green/;
    const STYLE_FONT_SIZE_REGEX = /font-size:\s*20px/i;
    const STYLE_GARAMOND_REGEX = /garamond/i;

    const orderH2 = page.locator('.col-sm-9.col-sm-offset-1 h2.title[data-qa="order-placed"]');
    await expect(orderH2).toBeVisible();
    await expect(orderH2).toHaveAttribute('style', STYLE_GREEN_REGEX);
    await expect(orderH2.locator('b')).toHaveText(ORDER_PLACED_TITLE);

    const orderP = page.locator('.col-sm-9.col-sm-offset-1 p');
    await expect(orderP).toBeVisible();
    await expect(orderP).toHaveText(ORDER_CONFIRMED_TEXT);
    await expect(orderP).toHaveAttribute('style', STYLE_FONT_SIZE_REGEX);
    await expect(orderP).toHaveAttribute('style', STYLE_GARAMOND_REGEX);
}