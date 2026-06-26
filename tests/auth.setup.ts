import path from "path";
import fs from "fs";
import { test, expect } from "@playwright/test";

const loginDataFile = path.resolve(
  __dirname,
  "../../playwright/.auth/loginData.json",
);

const loginData = JSON.parse(fs.readFileSync(loginDataFile, "utf-8")) as {
  user: string;
  pass: string;
};

test("authenticate", async ({ page }) => {
  await page.goto("");
});
