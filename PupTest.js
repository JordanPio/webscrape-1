const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const test = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const usuario = process.env.USUARIO;
  const password = process.env.SENHA;
  // const usuario = "czpjunior@gmail.com";
  // const password = "crono339";
  try {
    // prevent detection as robot
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36");

    await page.goto("https://kanguruinfo.marketup.com/#/login", { waitUntil: "networkidle0" });

    await page.setViewport({ width: 2400, height: 1171 });

    // const button = await frame.$("#login§ds_login");
    // const [loginBt] = await page.$x("//*[@id='login§ds_login']");
    // await button.click();
    // await loginBt.type("czpjunior@gmail.com");

    // attempt 2
    // await page.waitForSelector("body > ng-include > div > div > aside > div > form > fieldset > div.input-line.user-line.flex > div");
    // await page.type("body > ng-include > div > div > aside > div > form > fieldset > div.input-line.user-line.flex > div", password, { delay: 100 });
    // await page.waitForSelector("body > ng-include > div > div > aside > div > form > fieldset > div.input-line.password-line.flex > div");
    // await page.type("body > ng-include > div > div > aside > div > form > fieldset > div.input-line.password-line.flex > div", password, { delay: 100 });

    // next attempt
    // await page.$eval(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)", elem => elem.click());

    // try to find the frame
    // const frame = await page.frames().find(f => f.name() === "iframe");
    // const button = await frame.$("#login§ds_login");
    await page.waitForSelector("#login§ds_login");
    await page.type("#login§ds_login", usuario, { delay: 100 });
    await page.type("#login§ds_password", password, { delay: 100 });
    // await page.click("#login§bt_login");

    await Promise.all([page.waitForNavigation(), page.click("#login§bt_login")]);

    page.on("dialog", async dialog => {
      console.log(dialog.message());
      await dialog.dismiss();
      await browser.close();
    });
  } catch (error) {
    console.log(error);
  }
  // await page.waitForSelector("#login§ds_login");
  // await page.click("#login§ds_login");

  // await page.type("#login§ds_login", "czpjunior@gmail.com");

  // await page.waitForSelector(".ng-invalid #loginA7 ds_password");
  // await page.click(".ng-invalid #loginA7 ds_password");
  // await page.type(".ng-invalid #loginA7 ds_password", "crono339");

  // await page.waitForSelector(".box-login #loginA7 bt_login");
  // await page.click(".box-login #loginA7 bt_login");

  // await browser.close();
};

test();
