import { Page, Locator } from "@playwright/test";

export class Login {
  // Initial Login Page
  page: Page;

  // Locators
  readonly userInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }

  async sign_in(user: string, pass: string) {
    await this.page.goto("");
    await this.userInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async isErrorVisible() {
    return this.error.isVisible();
  }

  async getErrorMessage() {
    return this.error.innerText();
  }
}
