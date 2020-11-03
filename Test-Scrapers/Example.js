const puppeteer = require("puppeteer");
const writeFileSync = require("fs").writeFileSync;

(async () => {
  const websiteUrl = "https://kanguruinfo.marketup.com/index.html#/login";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // prevent detection as robot
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36");

    await page.goto(websiteUrl);

    //set the browser to be in desktop size and do not hide the login menu
    await page.setViewport({ width: 1366, height: 768 });

    await page.waitForSelector("#login§ds_login");

    //Type login details using fields IDS
    await page.type("#login§ds_login", "czpjunior@gmail.com");
    await page.type("#login§ds_password", "crono339");

    await Promise.all([page.waitForNavigation(), page.click("#login§bt_login")]);

    // await page.waitForSelector('button[title="Fechar"]');
    // await page.click('button[title="Fechar"]');

    // old working

    // await page.waitForSelector(".new-erp > .new-content > .new-container > .advertise-full-page > button");
    // if (page.waitForSelector(".new-erp > .new-content > .new-container > .advertise-full-page > button")) {
    //   await page.click(".new-erp > .new-content > .new-container > .advertise-full-page > button");
    // } else {
    //   throw new Error("Banner Not Found");
    // }

    page.on("dialog", async dialog => {
      console.log(dialog.message());
      await dialog.dismiss();
      await browser.close();
    });

    // await page.click(".new-erp > .new-content > .new-container > .advertise-full-page > button");

    //maybe replace wait for selector with await page.$eval('#link', elem => elem.click()); // works

    // Using v1.11.0 for puppeter instead

    // const bannerFdp = await page.waitForSelector('button[title="Fechar"]');

    // if (bannerFdp.length > 0) {
    //   await bannerFdp[0].click();
    // } else {
    //   throw new Error("Banner Not Found");
    // }
    // await page.click('button[title="Fechar"]');

    // const banner01 = await page.$x("//button[contains(text(), 'Fechar')]");

    // if (banner01.length > 0) {
    //   await banner01[0].click();
    // } else {
    //   throw new Error("Banner Not Found");
    // }

    // page.on("dialog", async dialog => {
    //   console.log(dialog.message());
    //   await dialog.dismiss();
    // });

    await page.goto("https://kanguruinfo.marketup.com/index.html#/report_financial_payable", { waitUntil: "networkidle0" });

    // Click on Button that says Paid Bills
    await page.waitForSelector(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");
    // await page.click(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");
    // await page.focus(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)");
    // await (await page.$(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)")).press("Enter");
    await page.$eval(".filter > .filters-container > .alternate-buttons > .buttons-center > .btn:nth-child(2)", elem => elem.click());

    // select Date Range and click on filter button
    // await page.type(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine", "01012020", { delay: 100 });

    await page.waitForSelector("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.from > input");
    await page.type("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.from > input", "01012020", { delay: 100 });

    // #############worked until 11-08
    // await page.waitForSelector(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine");
    // await page.type("input.ng-pristine.ng-valid.ng-not-empty.ng-touched", "01012020", { delay: 100 });

    // await page.focus(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine");
    // await page.keyboard.type("01012020");

    // Ultimate TEST
    // await page.evaluate(text => {
    //   document.getElementById("my-input").value = text;
    // }, "text-to-inject");

    // await (await page.$(".action-bar-container > .filters-container > .filter-date > .from > .ng-pristine")).type("01012020");

    await page.waitForSelector("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.to > input");
    await page.type("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.to > input", "01052020", { delay: 100 });

    // #############worked until 11-08
    // await page.type(".action-bar-container > .filters-container > .filter-date > .to > .ng-pristine", "01052020", { delay: 100 });
    // await page.waitForSelector(".action-bar-container > .filters-container > .filter-date > .to > .ng-pristine");
    // await page.type("input.ng-pristine.ng-untouched.ng-valid.ng-not-empty", "01052020", { delay: 100 });

    // await page.focus(".action-bar-container > .filters-container > .filter-date > .to > .ng-pristine");
    // await page.keyboard.type("01052020");

    // trying on a different click button

    // await (await page.$('input[type="PAGAS"]')).press("Enter");

    // const buttonFilter = await page.$x("//button[contains(text(), 'PAGAS')]");
    // await (await page.$(".filters-container > .filter-date > .confirm-filter > button > .sprite-new-erp")).click();
    await page.$eval("body > div.new-content.ng-scope > div > section > div > div > ng-include > div.top-action-bar.report-bar.ng-scope > div > div.right > div > div.filters-container.flex > div > div.confirm-filter > button", elem => elem.click());

    // if (buttonFilter.length > 0) {
    //   await buttonFilter[0].click();
    // } else {
    //   throw new Error("Button Pagas not found!");
    // }

    // click on filter ORIGINAL
    // await page.waitForSelector(".filters-container > .filter-date > .confirm-filter > button > .sprite-new-erp");
    // await page.click(".filters-container > .filter-date > .confirm-filter > button > .sprite-new-erp", { waitUntil: "networkidle0" });

    // wait for table data to be present
    await page.waitForSelector("td");

    // await scrollToBottom(page);
    // await page.waitFor(4000);

    // await page.evaluate(scrollToBottom);
    // await page.waitFor(5000);

    // new scroll
    // const delay = 3000;
    // let preCount = 0;
    // let postCount = 0;
    // do {
    //   preCount = await getCount(page);
    //   await scrollDown(page);
    //   await page.waitFor(delay);
    //   postCount = await getCount(page);
    // } while (postCount > preCount);
    // await page.waitFor(delay);

    // ACTIVATING AUTOSCROLL
    await autoScroll(page);

    // Test Area (I've tried many codes as below and everything return an EMPTY ARRAY)

    // const test01 = await page.evaluate(() => Array.from(document.querySelectorAll("tbody tr"), e => e.href));
    // console.log(test01);

    // let list = await page.$$eval(".tbody tr", a => a.title);
    // console.log(list);

    // const sel = await page.evaluate(() => Array.from(document.querySelectorAll("tbody tr")));

    // const linky = await this.page.evaluate(sel => {
    //   let elements = Array.from(document.querySelectorAll(sel));
    //   let links = elements.map(element => {
    //     return element.href;
    //   });
    //   return links;
    // }, sel);

    // console.log(linky);

    // const allElements = await page.evaluateHandle(() => [...document.querySelectorAll("*")]);

    // const numberOfElements = await page.evaluate(elements => elements.length, allElements);

    // console.log(numberOfElements);

    // ok

    // const test99 = await page.$$eval("td", links => links.map(link => link.title));
    // console.table(test99);

    // ok
    // const test100 = await page.$$eval("th", links => links.map(link => link.innerText));
    // console.table(test100);

    // // ok
    // const data1 = await page.evaluate(() => {
    //   const tds = Array.from(document.querySelectorAll("table tr td"));
    //   return tds.map(td => td.innerText);
    // });

    // console.log(data1);

    // ok
    // const result = await page.$$eval("table tr", rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll("td");
    //     return Array.from(columns, column => column.innerText);
    //   });
    // });

    // console.table(result); // "C2"

    const data1 = await page.evaluate(() => Array.from(document.querySelectorAll("table.table-report tr"), row => Array.from(row.querySelectorAll("th, td"), cell => cell.innerText)));
    console.table(data1); // "C2"

    // const test05 = await page.$$eval(() => {
    //   const rows = document.querySelectorAll("td");
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll("th");
    //     return Array.from(columns, column => column.innerText);
    //   });
    // });

    // const test1000 = await page.$$eval("td", links => links.map(link => link.title));
    // console.table(test1000);

    // console.log(test05);

    // const result = await page.$$eval("td", rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll("th");
    //     return Array.from(columns, column => column.innerText);
    //   });
    // });

    // console.log(result);

    // test99.writeToJson();
    // return test99;

    // const inputContent = await page.evaluate(async () => {
    //   var elements = document.querySelectorAll("tbody tr")[3].querySelectorAll("*")[0];
    //   return elements.getAttribute("title");
    // });

    // console.log("test:" + inputContent);

    // const test02 = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll("tbody tr")).map(rows => {
    //     const getData = child => rows.querySelector(`.td-${child}`).getAttribute("title");
    //     return [getData(2), getData(7), getData(5), getData(3), getData(7)];
    //   })
    // );

    // console.log(test02);

    // const test03 = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll("tbody tr")).map(rows => {
    //     const getData = child => rows.querySelector(`.td-5:nth-child(${child})`).getAttribute("title");
    //     return [getData(2), getData(7), getData(5), getData(3), getData(7)];
    //   })
    // );

    // console.log(test03);

    // const test04 = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll("tbody > tr")).map(rows => {
    //     const getData = rows => team.querySelector(`td.td-${child}.text-ellipsis.ng-binding`).getAttribute("title");
    //     return [getData(2), getData(7), getData(5), getData(3), getData(7)];
    //   })
    // );
    // console.log(test04);

    // const test05 = page.evaluate(() => {
    //   const rows = document.querySelectorAll(".table-report tr td");
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll(".table-report tr th");
    //     return Array.from(columns, column => column.innerText);
    //   });
    // });

    // console.log(test05);

    // const simpleTest = await page.evaluate(() => Array.from(document.querySelectorAll("tbody tr")));

    // console.log(simpleTest);

    // const simpletest2 = simpleTest.writeToJson();
    // console.log(simpletest2);
  } catch (e) {
    console.log("error", e);
  }

  // writeToJson() {
  //   writeFileSync("./data/test99.json", JSON.stringify());
  // }

  // await browser.close();
})();

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

// Maybe classname is wrong
// async function getCount(page) {
//   return await page.$$eval(".td-4.text-ellipsis.ng-binding", a => a.length);
// }

// async function scrollDown(page) {
//   await page.$eval(".td-4.text-ellipsis.ng-binding", e => {
//     e.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
//   });
// }

// HAS A BIT OF POTENTIAL
// async function scrollToBottom(page) {
//   const distance = 400; // should be less than or equal to window.innerHeight
//   const delay = 100;
//   while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
//     await page.evaluate(y => {
//       document.scrollingElement.scrollBy(0, y);
//     }, distance);
//     await page.waitFor(delay);
//   }
// }

// async function scrollToBottom() {
//   await new Promise(resolve => {
//     const distance = 400; // should be less than or equal to window.innerHeight
//     const delay = 100;
//     const timer = setInterval(() => {
//       document.scrollingElement.scrollBy(0, distance);
//       if (document.scrollingElement.scrollTop + window.innerHeight >= document.scrollingElement.scrollHeight) {
//         clearInterval(timer);
//         resolve();
//       }
//     }, delay);
//   });
// }
