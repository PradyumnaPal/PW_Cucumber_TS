import { expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../../utils/pageFixture';

setDefaultTimeout(60 * 1000 * 2);

Given('I am on Login Page of OrangeHRMS', async function () {
  await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
});


When('I enter userid as {string} and password as {string}', async function (userid, password) {
  await pageFixture.page.locator("[name='username']").fill(userid);
  await pageFixture.page.locator("[name='password']").fill(password);
});


When('I click on Login button', async function () {
  await pageFixture.page.locator("//*[text()=' Login ']").click();
});

Then('I verify the login status message as {string}', async function (msg) {
  if (msg == "Dashboard") {
    await expect(pageFixture.page.locator("//span[text()='Dashboard']")).toBeVisible();
  } else if (msg == "Invalid credentials") {
    await expect(pageFixture.page.locator("//*[text()='Invalid credentials1']")).toBeVisible();
  }
  await pageFixture.page.waitForTimeout(2000);

});
