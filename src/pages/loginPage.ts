import { expect, Page } from "@playwright/test";
import basePage from "./basePage";
export default class loginPage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    private loginPageElements = {
        userNameInput: "[name='username']",
        passwordInput: "[name='password']",
        loginBtn: "//*[text()=' Login ']"
    }

    async navigateToLoginPage() {
        await this.navigateTo(process.env.BASEURL);
        await this.verifyPageTitle(this.page, "OrangeHRMS");
    }
    async enterUserName(strUsername: string) {
        await this.fillField(this.page.locator(this.loginPageElements.userNameInput), strUsername);
    }
    async enterPassword(strPwd: string) {
        await this.fillField(this.page.locator(this.loginPageElements.passwordInput), strPwd);
    }

    async clickLoginButton() {
        await this.clickElement(this.page.locator(this.loginPageElements.loginBtn));
    }


}