
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout, BeforeStep, AfterStep, Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { pageFixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  pageFixture.page = await context.newPage();
})

After(async function () {
  
})

After(async function ({ pickle, result }) {
  let img: Buffer;
  if(result?.status==Status.FAILED){
    img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
    this.attach(img, "image/png");
  }
  
  //Cleanup objects
  await pageFixture.page.close();
  await context.close();
  await browser.close();
})
