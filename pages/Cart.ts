import { Page, Locator } from "@playwright/test";

export class Cart {
  // Initial Cart Page
  page: Page;

  // Locators
  readonly contShopBtn: Locator;
  readonly checkoutBtn: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.contShopBtn = page.locator("[data-test='continue-shopping']");
    this.checkoutBtn = page.locator("[data-test='checkout']");
  }
}
