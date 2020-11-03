// const puppeteer = require("puppeteer");

// (async function main() {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     // page.setUserAgent(
//     //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36"
//     // );

//     // MAC
//             page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36')

//     // await page.goto("https://kanguruinfo.marketup.com/index.html#/login");

//     await page.goto("https://experts.shopify.com");

//     await page.waitForSelector(".section");

//     const sections = await page.$$(".section");
//     console.log(sections.length);
//   } catch (e) {
//     console.log("our error", e);
//   }
// })();

// // code for getting the browser details

// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });

//   console.log(await browser.userAgent());

//   await browser.close();
// })();

// Shopfy Version
// const puppeteer = require("puppeteer");

// (async function main() {
//   try {
//     // to get started we need a browser and a page object

//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     const movieUrl = 'https://experts.shopify.com/'

//     // setup different user agent as this wont be detected as a robot
//     // the one that puppeter gives as a default is detectable
//     page.setUserAgent(
//       "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36"
//     );
//     // we need to start a goto page
//     await page.goto(movieUrl);
//     // you need to tell the next thing to do
//     // in this case we will be waiting for section to appear
//     await page.waitForSelector("._1rA3U");
//     console.log("its showing");

//     const sections = await page.$$("._17BF0");
//     // console.log(sections.length)
//     // never use forEach

//     for (const section of sections) {
//       const button = await section.$("span._1rA3U");
//       button.click();
//       await page.waitForSelector(".Zk7Cl");
//       const divs = await page.$$("div._3iz-t");

//       // loop over each div on the page

//       for (const div of divs) {
//         const name = await div.$eval("h2", h2 => h2.innerText);
//         console.log("name", name);
//       }
//     }

//     // test
//   } catch (e) {
//     console.log("error", e);
//   }
// })();

/**  some queries to get the details
type this in the console 

document.querySelector('div[class="title_wrapper"] >h1' ).innerText


*/

// Marketup attempt 3

const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const request = require("request-promise");

(async () => {
  try {
    // select website for login
    const websiteUrl = "https://kanguruinfo.marketup.com/index.html#/login";

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // need to use this otherwise the page can detect this is a robot
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36");

    // const navigationPromise = page.waitForNavigation();

    await page.goto(websiteUrl);

    // THIS VERSION OF PAGE GOTO WAIT FOR THE NETWORK REQUEST TO TOTALLY FINISH
    // await page.goto(websiteUrl, {
    //   waitUntil: "networkidle0"
    // });

    //set the browser to be in desktop size and do not hide the login menu
    await page.setViewport({ width: 2400, height: 1171 });

    //wait for the menu box to be available ONLY APPLICABLE IF NOT ADJUST VIEWPORT
    // await page.waitForSelector("a.open-menu");
    // click on the menu box to make the login and text available
    // await page.click("a.open-menu");
    // await Promise.all([page.waitForNavigation(), page.click("a.open-menu")]);

    await page.waitForSelector("#login§ds_login");

    //Type login details using fields IDS
    await page.type("#login§ds_login", "czpjunior@gmail.com");
    await page.type("#login§ds_password", "crono339");

    await Promise.all([page.waitForNavigation(), page.click("#login§bt_login")]);

    // close sales popoup
    // const popupSales = await page.waitForSelector('button[title="Fechar"]');
    // if (popupSales) {
    //   await page.click('button[title="Fechar"]');
    // }

    await page.waitForSelector('button[title="Fechar"]');
    await page.click('button[title="Fechar"]');

    // await page.waitForSelector(".new-erp > .new-content > .new-container > .advertise-full-page > button");
    // await page.click(".new-erp > .new-content > .new-container > .advertise-full-page > button");

    // page.on("dialog", async dialog => {
    //   console.log(dialog.message());
    //   await dialog.dismiss();
    // });

    // // move to contas a pagar
    await page.goto("https://kanguruinfo.marketup.com/index.html#/report_financial_payable");

    // await page.waitForSelector("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.left > div > div.filter > div > div > div > button:nth-child(2)");
    // await page.click("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.left > div > div.filter > div > div > div > button:nth-child(2)");

    // await page.$x("//button[contains(., 'PAGAS')]");
    // const [button] = await page.$x("//button[contains(., 'PAGAS')]");
    // if (button) {
    //   await button.click();
    // }

    await page.waitForSelector(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");
    await page.click(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");

    // await for date field to be available
    await page.waitForSelector(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine");

    await page.type(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine", "01012020");
    await page.type(".action-bar-container > .filters-container > .filter-date > .to > .ng-pristine", "01052020");
    await page.click(".filters-container > .filter-date > .confirm-filter > button > .sprite-new-erp");


    // filters worked until 10-08-2020

    // await page.waitForSelector(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");
    // await page.click(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");

    // // await for date field to be available
    // await page.waitForSelector(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine");

    // await page.type(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine", "01012020");
    // await page.type(".action-bar-container > .filters-container > .filter-date > .to > .ng-pristine", "01052020");
    // await page.click(".filters-container > .filter-date > .confirm-filter > button > .sprite-new-erp");

    // const result = await request.get("https://kanguruinfo.marketup.com/index.html#/report_financial_payable");
    // const $ = cheerio.load(result);
    // grab data from the table

    // const contasPagas = await page.evaluate(() => {
    //   const grabFromRow = (row, classname) => row.querySelector(`td.${classname}`).innerText.trim();
    // });

    // console.log(contasPagas);

    // new attempt
    // const items = Array.from(document.querySelectorAll("tbody > tr"));

    // const result = await page.$$eval("table-report td.td", rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll("th.td");
    //     return Array.from(columns, column => column.innerText);
    //   });
    // });

    // console.log(result); // "C2"

    // //defining selector
    // const RowSelector = 'tr'

    // //array to store data
    // const data = []

    // const

    //hope

    // const contentPagas = await page.content();

    // const $ = cheerio.load(contentPagas);

    // const scrapedData = [];
    // const tableHeaders = [];
    // $("body > div.new-content.ng-scope > div > section > div > div > div > div > div > div.flex > div.report-data-wrapper > div > div").each((index, element) => {
    //   scrapedData.push($($(element).find("td")[0]).text());
    // });

    // console.table(scrapedData);
    // $("body > div.new-content.ng-scope > div > section > div > div > div > div > div > div.flex > div.report-data-wrapper > div > div").each((index, element) => {
    //   if (index === 0) {
    //     const ths = $(element).find("th");
    //     $(ths).each((i, element) => {
    //       tableHeaders.push($(element).text().toLowerCase());
    //     });
    //     return true;
    //   }

    //   ths.push(stage1);

    //   const tds = $(element).find("td");

    //   tds.push(stage2);

    //   const tableRow = {};

    //   $(tds).each((i, element) => {
    //     tableRow[tableHeaders[i]] = $(element).text();
    //   });
    //   scrapedData.push(tableRow);
    // });

    // await page.screenshot({ path: "example.png" });

    // const test1 = await page.$$eval("body > div.new-content.ng-scope > div > section > div > div > div > div > div > div.flex > div.report-data-wrapper > div > div", rows => {
    //   return Array.from(rows);
    // });

    // const test1 = await page.evaluate(() => {
    //   const rows = document.querySelectorAll(".table-report tr th");
    //   return Array.from(rows);
    // });

    const teams = await page.evaluate(() => {
      const grabFromRow = (row, classname) => row.querySelector(`td.${classname}`).innerText.trim();

      //defining selector

      const TEAM_ROW_SELECTOR = "tr";

      //array to store data
      const data1 = [];

      const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR);

      // looping over each team row

      for (const tr of teamRows) {
        data1.push({
          name: grabFromRow(tr, "name"),
          name: grabFromRow(tr, "year"),
          name: grabFromRow(tr, "wins"),
          name: grabFromRow(tr, "losses")
        });
      }
      return data1;
    });

    const teams2 = JSON.stringify(teams, null, 2);
    console.log(teams);

    // const test2 = () => {
    //   test1.forEach(element => {
    //     const columns = element.querySelectorAll(".table-report tr th");
    //     return Array.from(columns, column => column.innerText);
    //   });
    // };

    // await browser.close();
  } catch (e) {
    console.log("error", e);
  }
})();

//JQUERY FOMULAR
//     const scrapedData = [];
//     const tableHeaders = [];

//     $("body > div.new-content.ng-scope > div > section > div > div > div > div > div > div.flex > div.report-data-wrapper > div > div").each((index, element) => {
//       if (index === 0) {
//         const ths = $(element).find("th");
//         $(ths).each((i, element) => {
//           tableHeaders.push($(element).text().toLowerCase());
//         });
//         return true;
//       }

//       const tds = $(element).find("td");
//       const tableRow = {};
//       $(tds).each((i, element) => {
//         tableRow[tableHeaders[i]] = $(element).text();
//       });
//       scrapedData.push(tableRow);
//     });

//     console.log(scrapedData);

//     // await page.screenshot({ path: "example.png" });

//     // await browser.close();
//   } catch (e) {
//     console.log("error", e);
//   }
// })();

// getting tired

// const table2 = () => {
//   const rows = document.querySelectorAll(".table-report tr td");
//   return Array.from(rows, row => {
//     const columns = row.querySelectorAll(".table-report tr th");
//     return Array.from(columns, column => column.innerText);
//   });
// };

// const table2 = function () {
//   const rf = document.querySelectorAll(".table-report tr td");
//   const rows = rf.map(td => td.innerText);
//   return Array.from(rows, row => {
//     const columns = row.querySelectorAll(".table-report tr th");
//     return Array.from(columns, column => column.innerText);
//   });
// };

// const testColuna = function () {
//   const columns = document.querySelectorAll(".table-report tr th");
//   return Array.from(columns, column => column.innerText);
// };

// const testLinha = function () {
//   const rowsDraft = document.querySelectorAll(".table-report tr td");
//   return Array.from(rowsDraft, row => row);
// };

// const table2 = function () {
//   const rows = test
//   return Array.from(rows, row => {
//     const columns = row.querySelectorAll(".table-report tr th");
//     return Array.from(columns, column => column.innerText);
//   });
// };

// const table6 = function () {
//   const rf = document.querySelectorAll(".table-report tr td");
//   const rows = rf.map(td => td.innerText);
//   return Array.from(rows, row => {
//     const columns = row.querySelectorAll(".table-report tr th");
//     return Array.from(columns, column => column.innerText);
//   });
// };

// const table7 = page.evaluate(() => {
//   const rows = document.querySelectorAll('.table-report tr td');
//   return Array.from(rows, row => {
//     const columns = row.querySelectorAll('.table-report tr th');
//     return Array.from(columns, column => column.innerText);
//   });
// });

// const scrapedData = []
// const tableHeaders = []

// $('body > div.new-content.ng-scope > div > section > div > div > div > div > div > div.flex > div.report-data-wrapper > div > div').each((index, element) => {

//   if (index === 0) {

//     const ths = $(element).find("th");
//     $(ths).each((i, element) => {
//       tableHeaders.push($(element).text().toLowerCase()

//       )
//     })
//     return true;
//   }

//   const tds = $(element).find("td")
//   const tableRow = {};
//   $(tds).each((i, element) => {
//     tableRow[tableHeaders[i]] = $(element).text()
//   })
//   scrapedData.push(tableRow)
// })
// console.log(scrapedData)
