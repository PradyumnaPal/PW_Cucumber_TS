
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout, BeforeStep, AfterStep, Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { pageFixture } from './pageFixture';
import { invokeBrowser } from '../browsers/browserManager';
import { getEnv } from '../env/env';
import { createLogger } from 'winston';
import { options } from './logger';

let browser: Browser;
let context: BrowserContext;
let scenarioName: string;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
})

Before({ timeout: 60000 }, async function ({ pickle }) {
  scenarioName = pickle.name + " (" + pickle.id + ")";
  pageFixture.logger = createLogger(options(scenarioName));
  pageFixture.logger.info("Execution started for " + scenarioName);
  context = await browser.newContext({ viewport: null });
  pageFixture.page = await context.newPage();

})

After(async function ({ pickle, result }) {
  let img: Buffer;
  if (result?.status == Status.FAILED) {
    img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
    this.attach(img, "image/png");
  }

  //Cleanup objects
  await pageFixture.page.close();
  await context.close();
  pageFixture.logger.info("Execution completed for " + scenarioName);
})

AfterAll(async function () {
  await browser.close();
})