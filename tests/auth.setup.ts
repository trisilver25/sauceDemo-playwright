import path from "path";
import fs from "fs";
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const loginDataFile = path.resolve(
  __dirname,
  "../playwright/.auth/loginData.json",
);

const loginData = JSON.parse(fs.readFileSync(loginDataFile, "utf-8")) as {
  user: string;
  pass: string;
};

test("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.sign_in(loginData.user, loginData.pass);
});
