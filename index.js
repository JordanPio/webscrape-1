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


const puppeteer = require("puppeteer");

(async function main() {
  try {
    // to get started we need a browser and a page object

    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    // setup different user agent as this wont be detected as a robot
    // the one that puppeter gives as a default is detectable
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36')
    // we need to start a goto page
    await page.goto('https://experts.shopify.com/')
    // you need to tell the next thing to do
    // in this case we will be waiting for section to appear
    await page.waitForSelector('._1rA3U')
    console.log('its showing')

    const sections = await page.$$('._17BF0')
    // console.log(sections.length)
    // never use forEach

    for (const section of sections) {
      const button = await section.$('span._1rA3U')
      button.click()
      await page.waitForSelector('.Zk7Cl')
      const divs = await page.$$('div._3iz-t')

      // loop over each div on the page

      for (const div of divs) {
        const name = await div.$eval('h2', h2 => h2.innerText)
        console.log('name', name)
      }

    }


    
  } catch (e) {
    console.log("error", e)
  }
})();