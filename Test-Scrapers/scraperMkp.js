const puppeteer = require("puppeteer");
const Standings = require("./scrapers/standMarkup");
// const Email = require("./utils/email");

/**
 * Run Standings
 */
(async () => {
  let browser;
  let page;
  const websiteUrl = "https://kanguruinfo.marketup.com/index.html#/login";

  try {
    browser = await puppeteer.launch({
      headless: false
    });

    page = await browser.newPage();

    // need to use this otherwise the page can detect this is a robot
    // page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36");

    await page.goto(websiteUrl);

    //set the browser to be in desktop size and do not hide the login menu
    await page.setViewport({ width: 2400, height: 1171 });

    await page.waitForSelector("#login§ds_login");

    //Type login details using fields IDS
    await page.type("#login§ds_login", "czpjunior@gmail.com");
    await page.type("#login§ds_password", "crono339");

    await Promise.all([page.waitForNavigation(), page.click("#login§bt_login")]);

    await page.waitForSelector('button[title="Fechar"]');
    await page.click('button[title="Fechar"]');

    // await page.goto("https://kanguruinfo.marketup.com/index.html#/report_financial_payable", { waitUntil: "domcontentloaded" });

    // await page.waitForNavigation({
    //   waitUntil: "networkidle0"
    // });

    // await page.waitForSelector(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");
    // await page.click(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");

    // // await for date field to be available
    // await page.waitForSelector(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine");

    // await page.type(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine", "01012020");
    // await page.type(".action-bar-container > .filters-container > .filter-date > .to > .ng-pristine", "01052020");
    // await page.click(".filters-container > .filter-date > .confirm-filter > button > .sprite-new-erp");

    const standings = await new Standings(browser, page).main();

    // Make sure to uncomment the email code if you want to test out the email functionality.
    // Just remember to add your e-mail credentials in utils/email first.

    // await Email.send(
    //   `<ul style="list-style:none;">
    //     ${standings.map(
    //       ([team, points], i) => `<li>${i + 1}: ${team} ${points}</li>`
    //     )}
    //   </ul>`.replace(/\,/g, "")
    // );
  } catch (error) {
    // await Email.send(error.stack, true);
  }

  await browser.close();
})();
