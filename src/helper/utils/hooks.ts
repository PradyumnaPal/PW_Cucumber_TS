
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout, BeforeStep, AfterStep, Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { pageFixture } from './pageFixture';
import { invokeBrowser } from '../browsers/browserManager'; 
import { getEnv } from '../env/env';
import { createLogger } from 'winston';
import { options } from './logger';

let browser: Browser;
let context: BrowserContext;
let scenarioName:string;

Before(async function ({pickle}) {
  scenarioName=pickle.name +" ("+ pickle.id+")";
  pageFixture.logger=createLogger(options(scenarioName));
  pageFixture.logger.info("Execution started for "+scenarioName);
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
  pageFixture.logger.info("Execution completed for "+scenarioName);
})
