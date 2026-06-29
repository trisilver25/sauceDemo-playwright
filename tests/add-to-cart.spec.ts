import { test, expect } from "@playwright/test";

test("Add a product to cart", async ({ page }) => {
  // Go to products page
  await page.goto("/inventory.html");

  // Retrieve the first product item
  let firstProductCard = page.locator(".inventory_item").first();

  // Store the products name from the 1st product card.
  let firstProductName = await firstProductCard
    .locator(".inventory_item_name")
    .textContent();

  // Store the add to cart button from the 1st product card.
  let firstButton = await firstProductCard.getByRole("button", {
    name: "Add to cart",
  });

  // Click "Add to Cart"
  await firstButton.click();

  // Click "Shopping Cart"
  await page.locator(".shopping_cart_link").click();

  // Pull the recently added cart item's name.
  let cartProductName = await page
    .locator(".inventory_item_name")
    .textContent();

  // Confirm the 1st product name matches the cart name
  expect(firstProductName).toEqual(cartProductName);
});
