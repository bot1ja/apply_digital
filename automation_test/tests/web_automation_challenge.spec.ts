import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { signup, logout, accountCreatedValidation, payment, orderPlacedValidation } from '../utils/actions';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

test('The user adds a product to the cart, creates an account, places an order and logs out', async ({ page }) => {

    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL(/products/);

    const thirdProduct = page.locator('.features_items .col-sm-4').nth(2);
    const viewProductLink = thirdProduct.locator('a[href="/product_details/3"]');
    await expect(thirdProduct).toBeVisible();
    await viewProductLink.click();
    await expect(page).toHaveURL(/product_details\/3/);

    const randomQty = faker.number.int({ min: 1, max: 20 });
    const quantityInput = page.locator('#quantity');
    await quantityInput.click();
    await quantityInput.fill(String(randomQty));
    await expect(quantityInput).toHaveValue(String(randomQty));

    const addToCartBtn = page.locator('.product-details .product-information button.cart');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    const viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
    await expect(viewCartLink).toBeVisible();
    await viewCartLink.click();
    await expect(page).toHaveURL(/view_cart/);

    const cartQtyBtn = page.locator('.cart_quantity button.disabled');
    await expect(cartQtyBtn).toBeVisible();
    await expect(cartQtyBtn).toHaveText(String(randomQty));

    const proceedBtn = page.locator('a.btn.btn-default.check_out');
    await expect(proceedBtn).toBeVisible();
    await proceedBtn.click();

    const registerLink = page.locator('.modal-content .modal-body a[href="/login"]');
    await expect(registerLink).toBeVisible();
    await registerLink.click();
    await page.waitForURL(/login/);
    await expect(page).toHaveTitle(/login/i);

    // signup
    await signup(page, firstName, lastName);

   // validate account created
    await accountCreatedValidation(page);
   
    const continueBtn = page.locator('[data-qa="continue-button"]');
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    const cartNavLink = page.locator('.shop-menu .nav.navbar-nav a[href="/view_cart"]');
    await expect(cartNavLink).toBeVisible();
    await cartNavLink.click();
    await expect(page).toHaveURL(/view_cart/);
    await expect(proceedBtn).toBeVisible();
    await proceedBtn.click();

    const orderMessage = faker.lorem.paragraph();
    const orderMsgInput = page.locator('textarea');
    await expect(orderMsgInput).toBeVisible();
    await orderMsgInput.fill(orderMessage);
    await expect(orderMsgInput).toHaveValue(orderMessage);

    // payment
    await payment(page, firstName, lastName);

    // validate order placed
    await orderPlacedValidation(page);

    // logout
    await logout(page); 
});