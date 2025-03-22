
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout, BeforeStep, AfterStep, Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { pageFixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  pageFixture.page = await context.newPage();
})

After(async function () {
  await pageFixture.page.close();
  await context.close();
  await browser.close();
})

BeforeStep(async function () {
  console.log("This is BeforeStep");
})

AfterStep(async function () {
  console.log("This is AfterStep");
})

Before(async function () {
  console.log("This is Before");
})

After(async function () {
  console.log("This is After");
})
