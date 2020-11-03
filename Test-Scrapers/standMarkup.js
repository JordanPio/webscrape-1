const writeFileSync = require("fs").writeFileSync;

/**
 * @class Standings
 */
module.exports = class Standings {
  /**
   * @constructor
   */
  constructor(browser, page) {
    this.browser = browser;
    this.page = page;

    this.standings = [];
    this.url = "https://kanguruinfo.marketup.com/index.html#/report_financial_payable";
  }

  /**
   * @method main
   */
  async main() {
    await this.page.goto(this.url);

    await this.page.waitForSelector("tbody tr");

    // await this.page.waitForNavigation({
    //   waitUntil: "networkidle0"
    // });

    // await this.page.waitForSelector(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");
    // await this.page.click(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");

    // // await for date field to be available
    // await this.page.waitForSelector(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine");

    // await this.page.type(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine", "01012020");
    // await this.page.type(".action-bar-container > .filters-container > .filter-date > .to > .ng-pristine", "01052020");
    // await this.page.click(".filters-container > .filter-date > .confirm-filter > button > .sprite-new-erp");

    // Decided to add more data for fun. Notice how I also refactored to cut down on some boilerplate
    // by adding a reusable function inside of the map statement.
    // tomorow try a bit more change the CHILD THING and see what we get

    const titlesArray = await page.evaluate(() => Array.from(document.querySelectorAll("tbody tr")).map(partner => partner.textContent));
    console.log(titlesArray);

    this.standings = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll("tbody tr")).map(team => {
        const getData = child => team.querySelector(`.td-${child}`).getAttribute("title");
        return [getData(2), getData(7), getData(5), getData(3), getData(7)];
      })
    );

    // await this.page.waitFor(2000);

    this.standings2 = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll("tbody tr")).map(team => {
        const getData = child => team.querySelector(`.td-5:nth-child(${child})`).getAttribute("title");
        return [getData(2), getData(7), getData(5), getData(3), getData(7)];
      })
    );

    this.standings3 = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll("tbody > tr")).map(team => {
        const getData = child => team.querySelector(`td.td-${child}.text-ellipsis.ng-binding`).getAttribute("title");
        return [getData(2), getData(7), getData(5), getData(3), getData(7)];
      })
    );

    this.standings4 = await this.page.evaluate(() => Array.from(document.querySelectorAll("tbody tr")));

    const row = "tbody > tr";

    let test = await this.page.evaluate(sel => document.querySelectorAll(sel).innerText, row);

    console.log("test", test);
    console.log(this.standings);
    console.log(this.standings2);
    console.log(this.standings3);
    console.log(this.standings4);

    this.writeToJson();
    return this.standings;
  }

  /**
   * @method writeToJson
   */
  writeToJson() {
    writeFileSync("./data/standings.json", JSON.stringify(this.standings));
  }
};
