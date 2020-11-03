// const scrape = import("./ScrapesCompany/ScrapeContasAPagar")
const ContasReceber = require("./ScrapesCompany/ScrapeContasReceber");
const ContasAPagar = require("./ScrapesCompany/ScrapeContasAPagar");
const ContasPagas = require("./ScrapesCompany/ScrapeContasPagas");
const estoque = require("./ScrapesCompany/scrapeEstoque");
const vendasPeriodo = require("./ScrapesCompany/ScrapeVendasPeriodo");
const vendasTotais = require("./ScrapesCompany/ScrapeVendasTotais");
const dtConvert = require("date-fns");

// Balance analysis Dates
const startDate = "01/05/2020";
const endDate = "27/08/2020";

// ContasReceber.scrape();
ContasAPagar.scrape();
// ContasPagas.scrape(startDate, endDate);
// estoque.scrape();
// vendasPeriodo.scrape(startDate, endDate);
// vendasTotais.scrape(startDate, endDate);

// if error try to pull again
