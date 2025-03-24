
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout, BeforeStep, AfterStep, Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { pageFixture } from './pageFixture';
import {invokeBrowser} from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';

let browser: Browser;
let context: BrowserContext;

Before(async function () {
  getEnv();
  browser = await invokeBrowser();
  context = await browser.newContext();
  pageFixture.page = await context.newPage();
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
