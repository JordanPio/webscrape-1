const puppeteer = require("puppeteer");
const writeFileSync = require("fs").writeFileSync;
const manipulate = require("../manipulate");
const dotenv = require("dotenv");
dotenv.config();
// DATA RANGE

exports.scrape = async () => {
  const websiteUrl = "https://kanguruinfo.marketup.com/index.html#/login";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const usuario = process.env.USUARIO;
  const senha = process.env.SENHA;

  try {
    // prevent detection as robot
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36");

    await page.goto(websiteUrl, { waitUntil: "networkidle0" });

    //set the browser to be in desktop size and do not hide the login menu
    await page.setViewport({ width: 2400, height: 1171 });

    await page.waitForSelector("#login§ds_login");

    //Type login details using fields IDS
    await page.type("#login§ds_login", usuario, { delay: 100 });
    await page.type("#login§ds_password", senha, { delay: 100 });

    await Promise.all([page.waitForNavigation(), page.click("#login§bt_login")]);

    page.on("dialog", async dialog => {
      console.log(dialog.message());
      await dialog.dismiss();
      await browser.close();
    });

    await page.goto("https://kanguruinfo.marketup.com/index.html#/report_stock_location_status/search/JTdCJTIyU3RvY2tMb2NhdGlvbklEJTIyOjElN0Q=", { waitUntil: "networkidle0" });

    // // Click on Button that says LOCALIZACAO
    // await page.waitForSelector("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.left > div > div.filter > div > div.report-stock-location.ng-scope > div > select");

    // await page.$eval("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.left > div > div.filter > div > div.report-stock-location.ng-scope > div > select", elem => elem.click());

    // // select Date Range and click on filter button

    // await page.waitForSelector("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.from > input");
    // await page.type("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.from > input", startDate, { delay: 100 });

    // await page.waitForSelector("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.to > input");
    // await page.type("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.to > input", endDate, { delay: 100 });
    // //repeat typying starting date to prevent issue
    // await page.type("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.from > input", startDate, { delay: 100 });

    // await page.$eval("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.confirm-filter > button", elem => elem.click());

    // await page.waitForSelector("td");

    // ACTIVATING AUTOSCROLL
    await autoScroll(page);

    const data1 = await page.evaluate(() => Array.from(document.querySelectorAll("table.table-report tr"), row => Array.from(row.querySelectorAll("th, td"), cell => cell.innerText)));
    const columns = await page.evaluate(() => Array.from(document.querySelectorAll("table.table-report tr"), row => Array.from(row.querySelectorAll("th"), cell => cell.innerText)));
    const linhas = await page.evaluate(() => Array.from(document.querySelectorAll("table.table-report tr"), row => Array.from(row.querySelectorAll("td"), cell => cell.innerText)));

    // console.table(data1); // check RESULTS
    // console.log(linhas); // check RESULTs

    writeFileSync(__dirname + "/../data/Estoque.json", JSON.stringify(data1));
    writeFileSync(__dirname + "/../data/colunasEstoque.json", JSON.stringify(columns));
    writeFileSync(__dirname + "/../data/linhasEstoque.json", JSON.stringify(linhas));

    const rowsData = manipulate.formatEstoque(linhas);

    validation = 0;
    for (let i = 0; i < rowsData.length; i++) {
      if (!rowsData[i][0].match(/exibindo/i)) {
        continue;
      } else {
        validation = 1;
      }

      if (validation === 1) {
        manipulate.insertEstoqueData(rowsData);
        console.log("Scrape was Successful");
      } else {
        console.log("Scrape falhou em puxar os dados");
      }
    }
  } catch (e) {
    console.log("error", e);
  }

  await browser.close();
};

// scrape();

// AUTO SCROLL END OF PAGE
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
