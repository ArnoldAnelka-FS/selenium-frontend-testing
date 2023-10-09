const { Builder, By, until } = require('selenium-webdriver');
require('dotenv').config();
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const chromeOptions = new chrome.Options();
chromeOptions.headless(false); 


const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

describe("Selenium NextJS Frontend Website Test", () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();

        await driver.manage().window().maximize();
    });

    afterAll(async () => {
        await driver.quit();
    });

    const setDelay = async () => {
        await driver.sleep(1000);
    }

    it("Chrome should open frontend provided and check that the title is 'Home'.", async () => {
        await driver.get(process.env.url);
        await driver.getTitle().then((title) => {
            expect(title).to.equal("Home");
        });
        await setDelay();
    });
    
    it("Contact page once clicked should open and check the title is 'Contact Us'", async () => {
        await setDelay(1000)
        await driver.get(process.env.url + "/contact")
        await driver.wait(until.titleIs("Contact Us"), 1000)
    })
    it("Sign up for more info via email is clicked and check the message is 'More info coming to ' and then the email address entered", async () => {
        await setDelay(1000)
        await driver.get(process.env.url + "/contact")
        await driver.findElement(By.id("formInput")).sendKeys(process.env.EMAIL)
        await setDelay(1000)
        await driver.findElement(By.id("formSubmit")).click()
        await driver.wait(until.elementLocated(By.id("formMessage")), 1000)
        const message = await driver.findElement(By.id("formMessage")).getText()
        expect(message).to.equal("More info coming to " + process.env.EMAIL)
    })
 
});
