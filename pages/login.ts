import { Page, Locator } from "@playwright/test";

class LoginPage {
  // Initial Login Page
  page: Page;

  // Username Input Locator
  user_input: Locator;

  // Password Input Locator
  password_input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.user_input = page.locator('[data-test="user-name"]');
    this.password_input = page.locator('[data-test="password"]');
  }
}
