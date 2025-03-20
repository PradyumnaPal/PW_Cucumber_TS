
import { chromium, Browser, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000 * 2);
let browser: Browser;
let page: Page;
Given('I am on Login Page of OrangeHRMS', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
});


When('I enter userid as {string} and password as {string}', async function (userid, password) {
  await page.locator("[name='username']").fill(userid);
  await page.locator("[name='password']").fill(password);
});


When('I click on Login button', async function () {
  await page.locator("//*[text()=' Login ']").click();
});

Then('I verify the login status message as {string}', async function (msg) {
  if (msg == "Dashboard") {
    await expect(page.locator("//span[text()='Dashboard']")).toBeVisible();
  } else if (msg == "Invalid credentials") {
    await expect(page.locator("//*[text()='Invalid credentials']")).toBeVisible();
  }
  await page.waitForTimeout(2000);
  await page.close();
  await browser.close();
});
