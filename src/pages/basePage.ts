
import { expect, Locator, Page } from '@playwright/test'
import { TIMEOUT } from 'dns';

let time = 60000;
let element: Locator;
export default class basePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }
    async elementIsVisible(element: Locator) {
        await expect(element, "element is not visible " + element).toBeVisible({ timeout: time });
    }

    async clickElement(element: Locator) {
        await element.waitFor();
        await expect(element).toBeVisible();
        await this.scrollToWebElement(element);
        await element.click();
    }

    async scrollToWebElement(element: Locator) {
        await element.first().waitFor();
        await element.scrollIntoViewIfNeeded();
    }

    async fillField(element: Locator, value: string) {
        await this.clickElement(element);
        await element.fill(value);
    }

    async clearField(element: Locator) {
        this.fillField(element, '');
    }

    async getValue(element: Locator) {
        await element.first().waitFor();
        return element.inputValue();
    }


    async hoverElement(element: Locator) {
        await element.first().waitFor();
        return element.hover();
    }

    async acceptPopup() {
        const popupPromise = this.page.waitForEvent('popup');
        const popup = await popupPromise;
        await popup.getByRole('button').click();
    }

    async selectCheckBox(element: Locator) {
        await element.first().waitFor();
        element.check();
        this.verifyCheckBoxIsChecked(element);
    }

    async verifyCheckBoxIsChecked(element: Locator) {
        await element.first().waitFor();
        await expect(element).toBeChecked();
    }

    async uncheckCheckBox(element: Locator) {
        await element.first().waitFor();
        element.uncheck();
        this.verifyCheckBoxIsNotChecked(element);
    }

    async verifyCheckBoxIsNotChecked(element: Locator) {
        await element.first().waitFor();
        await expect(element).not.toBeChecked();
    }

    async verifyElementIsNotVisible(element: Locator) {
        await expect(element).not.toBeVisible({ timeout: time });
    }

    async pressKeyBoardButton(key: string) {
        await this.page.keyboard.press(key);
    }

    async elementIsEnabled(element: Locator) {
        await element.first().waitFor();
        await expect(element).toBeEnabled();
    }

    async elementIsdisabled(element: Locator) {
        await element.first().waitFor();
        await expect(element).toBeDisabled();
    }

    async elementHaveValue(element: Locator, value: string) {
        await element.first().waitFor();
        await expect(element).toHaveValue(value);
    }

    async elementHaveAttributeValue(element: Locator, attributeType: string, attributeValue: string) {
        await element.first().waitFor();
        await expect(element).toHaveAttribute(attributeType, attributeValue);
    }

    async elementNotHaveAttributeValue(element: Locator, attributeType: string, attributeValue: string) {
        await element.first().waitFor();
        await expect(element).not.toHaveAttribute(attributeType, attributeValue);
    }

    async verifyUrlOfPage(page: Page, url: string) {
        await element.first().waitFor();
        await expect(page).toHaveURL(url);
    }

    async verifyPageTitle(page: Page, strTitle: string) {
        await element.first().waitFor();
        await expect(page).toHaveTitle(strTitle);
    }

    async verifyFieldCharCapacity(element: Locator, len: string) {
        const text = 'a'.repeat(Number(len) + 1);
        await this.fillField(element, text);
        const filedValue = await this.getValue(element);
        return filedValue;
    }
}