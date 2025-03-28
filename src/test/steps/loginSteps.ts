import { expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../../helper/utils/pageFixture';
import LoginPage from '../../pages/loginPage';

setDefaultTimeout(60 * 1000 * 2);
let loginPage:LoginPage;

Given('I am on Login Page of OrangeHRMS', async function () {
  loginPage=new LoginPage(pageFixture.page);
  loginPage.navigateTo("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  pageFixture.logger.info("Opening browser = "+"https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
});


When('I enter userid as {string} and password as {string}', async function (userid, password) {
  await loginPage.enterUserName(userid);
  await loginPage.enterPassword(password);
  pageFixture.logger.info("Entered username and Password");
});


When('I click on Login button', async function () {
  await loginPage.clickLoginButton();
  pageFixture.logger.info("Clicked on Login button");
});

Then('I verify the login status message as {string}', async function (msg) {
  if (msg == "Dashboard") {
    await loginPage.elementIsVisible(this.page.locator("//span[text()='Dashboard']"));
  } else if (msg == "Invalid credentials") {
    await loginPage.elementIsVisible(this.page.locator("//*[text()='Invalid credentials']"));
  }
  //await pageFixture.page.waitForTimeout(2000);
  pageFixture.logger.info("Verifying status message on page completed");

});
