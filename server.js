const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // req.body

app.listen(5000, () => {
  console.log("server started on port 5000");
});

//Queries

app.get("/totalPagar", async (req, res) => {
  try {
    const receberTabela = await pool.query("select data, SUM(saldo) as TOTAL from apagar where data='2020-08-27'group by data");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/pagarTabela", async (req, res) => {
  try {
    const receberTabela = await pool.query("select conta, sum(saldo) as total, (sum(saldo)/sum(sum(saldo)) over()) as percenttotal from apagar where data ='2020-08-27' group by conta order by total desc");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/pagasTabela", async (req, res) => {
  try {
    const receberTabela = await pool.query("select conta, sum(pago) as TOTAL, (sum(pago)/ sum(sum(pago)) over ()) as percenttotal from pagas where datapagamento >='2020-05-01' and datapagamento <='2020-08-27' and conta not like '%Retirada%' and conta not like '%Mercadoria%' and conta not like '%Impostos%' and conta not like '%Frete%' and conta not like '%Tarifas Mercado Livre%' and conta not like '%Difere%' and descricao not like '%TARIFAS B2W%' and descricao not like '%COMISSAO B2W%' and descricao not like '%COMISSAO MAGAZINE LUIZA%' group by conta order by total desc");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/pagasByContas", async (req, res) => {
  try {
    const receberTabela = await pool.query("select conta, json_object_agg(month, total ORDER BY month) FROM (select conta, date_trunc('month', vencimento::date) as month, sum(pago) as total from pagas where datapagamento >='2020-04-01' and datapagamento <='2020-06-01' and conta not like '%Mercadoria%' GROUP BY conta, month order by conta, month) s group by conta order by conta");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/pagasByDescricao", async (req, res) => {
  try {
    const receberTabela = await pool.query("select conta, descricao, json_object_agg(month, total ORDER BY month) FROM (SELECT conta, descricao, date_trunc('month', vencimento::date) as month, sum(pago) as total FROM pagas where datapagamento >='2020-04-01' and datapagamento <='2020-06-01' and conta not like '%Mercadoria%' GROUP BY conta, descricao, month) s GROUP BY conta, descricao ORDER BY conta, descricao");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/devolucoes", async (req, res) => {
  try {
    const receberTabela = await pool.query("select descricao, sum(pago) as total from pagas where datapagamento >='2020-05-01' and datapagamento <='2020-08-27' and conta like '%Dif%' group by descricao order by total desc;");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/cashflowReceber", async (req, res) => {
  try {
    const receberTabela = await pool.query("select date_trunc('week', vencimento::date) as weekly, sum(saldo) as receber from receber where descricao not like '%CREDITO%' and data='2020-08-27' group by weekly order by weekly");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/cashflowPagar", async (req, res) => {
  try {
    const receberTabela = await pool.query("select date_trunc('week', vencimento::date) as weekly, sum(saldo) from apagar where data='2020-08-27' group by weekly order by weekly");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/totalVendas", async (req, res) => {
  try {
    const receberTabela = await pool.query("select sum(totalliquido) as TotalVendas from vendasperiodo where data >='2020-05-01'and data <='2020-08-27' order by totalvendas desc");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/vendasdre", async (req, res) => {
  try {
    const receberTabela = await pool.query("select sum(totalvendas) as TotalVendido, sum(custototal) as TotalCusto, sum(lucro) as TotalLucro from vendastotais where de='2020-05-01' and ate='2020-08-27'");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/vendasOnline", async (req, res) => {
  try {
    const receberTabela = await pool.query("select cliente, sum(totalliquido) as TotalVendas from vendasperiodo where data >='2020-05-01'and data <='2020-08-27' and cliente='B2W' or cliente like '%MAGAZINE%' or cliente like '%Mercado%' group by cliente order by totalvendas desc");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/receberTabela", async (req, res) => {
  try {
    const receberTabela = await pool.query("select cliente, sum(saldo) as TOTAL, (sum(saldo)/sum(sum(saldo)) over ()) as percentage from receber where descricao not like '%CREDITO%' and data='2020-08-27' group by cliente order by total desc");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/receberAtrasadas", async (req, res) => {
  try {
    const receberTabela = await pool.query("select cliente, sum(saldo) total from receber where descricao not like '%CREDITO%' and data='2020-08-27' and vencimento < now()::date group by cliente order by total desc");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/totalReceber", async (req, res) => {
  try {
    const receberTabela = await pool.query("select data, SUM(saldo) as TOTAL from receber where descricao not like '%CREDITO%' and data='2020-08-27' group by data");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/totalEstoque", async (req, res) => {
  try {
    const receberTabela = await pool.query("select date, SUM(custototal) as custototal from estoque where date ='2020-08-24' group by date");
    res.json(receberTabela.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/balance", async (req, res) => {
  try {
    // const ativos = await pool.query("select * from balanco");
    const ativos = await pool.query("select conta, tipo, json_object_agg(data, total ORDER BY data) FROM ( SELECT conta, tipo, data, total FROM balanco GROUP BY conta, tipo, data, total) s GROUP BY conta, tipo ORDER BY conta; ");
    // const ativos = await pool.query("SELECT conta, data, total FROM balanco GROUP BY conta, data, total ORDER BY conta crosstabview; ");

    res.json(ativos.rows);
  } catch (error) {
    console.error(error.message);
  }
});
