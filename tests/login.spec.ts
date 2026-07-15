import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import fs from "fs";
import path from "path";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

// Grab the location of the LoginData Path.
const loginDataFile = path.resolve(
  __dirname,
  "../playwright/.auth/loginData.json",
);

// Parse the json data from the loginDataFile and create an object to hold the Username.
const testUser = JSON.parse(fs.readFileSync(loginDataFile, "utf-8")) as {
  user: string;
  invalid_pass: string;
};

test.beforeEach(async ({ page }) => {
  // Go to Login Page
  await page.goto("");
});

test("Verify error message, for a missing username", async ({ page }) => {
  // Create a LoginPage Object
  const LoginPage = new Login(page);

  // Click "Login"
  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).toBeTruthy();

  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Username is required",
  );
});

test("Verify error message, for a missing password", async ({ page }) => {
  // Create a LoginPage Object
  const LoginPage = new Login(page);

  // Fill in the username field using the testUser
  await LoginPage.userInput.fill(testUser.user);

  // Click "Login"
  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).toBeTruthy();
  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Password is required",
  );
});

test("Verify error message, for an incorrect password", async ({ page }) => {
  const LoginPage = new Login(page);

  // Fill in the username field using the testUser
  await LoginPage.userInput.fill(testUser.user);

  // Fill in the password field using testUser
  await LoginPage.passwordInput.fill(testUser.invalid_pass);

  // Click "Login"
  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).toBeTruthy();

  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Verify error message, for a Locked Out User", async ({ page }) => {
  const LoginPage = new Login(page);

  const lockedOutData = path.resolve(
    __dirname,
    "../playwright/.auth/lockedOutData.json",
  );

  const lockedOutUser = JSON.parse(fs.readFileSync(lockedOutData, "utf-8")) as {
    user: string;
    pass: string;
  };

  await LoginPage.userInput.fill(lockedOutUser.user);
  await LoginPage.passwordInput.fill(lockedOutUser.pass);

  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).resolves.toBeTruthy();

  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
