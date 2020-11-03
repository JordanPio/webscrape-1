import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

function VendasDados() {
  const [detalhes, setDetalhes] = useState([]);
  const [pagasTabela, setPagasTabela] = useState([]);

  // generate IDs
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const vendasChart = {
    labels: ["Fisica", "Online"],
    datasets: [
      {
        data: [detalhes.percentFisica, detalhes.percentOnline],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"]
      }
    ],
    text: "23%"
  };

  const lucroChart = {
    labels: ["Loja Fisica", "B2W", "Magazine Luiza", "MercadoPago"],
    datasets: [
      {
        data: [detalhes.lucroLojaFisica, detalhes.lucroB2W, detalhes.lucroMagazineLuiza, detalhes.mercadoPago],
        backgroundColor: ["#8e5ea2", "#3e95cd", "#3cba9f", "#FF6384"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#e8c3b9", "#FF6384"]
      }
    ],
    text: "23%"
  };

  const formNumb = function (params) {
    if (typeof params === "number") {
      return params.toLocaleString(navigator.language, { maximumFractionDigits: 2 });
    } else {
      return 0;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const responseEstoque = await fetch("http://localhost:5000/totalEstoque");
        const jsonDataEstoque = await responseEstoque.json();

        // // Get Vendas Details
        const responseVendas = await fetch("http://localhost:5000/totalVendas");
        const jsonVendas = await responseVendas.json();

        const responseOnline = await fetch("http://localhost:5000/vendasOnline");
        const jsonOnline = await responseOnline.json();
        const totalOnline = jsonOnline.reduce((a, b) => ({ totalvendas: a.totalvendas + b.totalvendas }));

        const responseDRE = await fetch("http://localhost:5000/vendasdre");
        const jsonDRE = await responseDRE.json();

        let vd = {};

        //GET Devolucoes & Remove B2W
        const resdevo = await fetch("http://localhost:5000/devolucoes");
        const jsonDevo = await resdevo.json();
        // setPagasTabela(jsonPagasT);
        const devoTotal = jsonDevo.filter(({ descricao }) => !descricao.includes("B2W")).reduce((a, b) => ({ total: a.total + b.total }));

        const devoB2W = jsonDevo.filter(({ descricao }) => descricao.includes("B2W"));

        vd["devoB2W"] = devoB2W[0].total;
        vd["devoTotal"] = devoTotal.total;

        vd["vendasOnline"] = totalOnline.totalvendas;
        vd["vendastotal"] = jsonVendas[0].totalvendas;
        vd["vendasBruta"] = jsonVendas[0].totalvendas - vd.devoTotal - vd.devoB2W;
        vd["vendasLojaFisica"] = jsonVendas[0].totalvendas - totalOnline.totalvendas;
        vd["percentFisica"] = ((vd["vendasLojaFisica"] / vd["vendastotal"]) * 100).toFixed(2);
        vd["percentOnline"] = ((vd.vendasOnline / vd["vendastotal"]) * 100).toFixed(2);
        vd["estoque"] = jsonDataEstoque[0].custototal;
        vd["imposto"] = vd.vendasBruta * 0.05;

        // custom detalhes
        jsonOnline.forEach(items => {
          if (items.cliente === "B2W") {
            vd["B2W"] = items.totalvendas - vd.devoB2W;
            vd["taxasB2W"] = vd.B2W * 0.1225;
            vd["freteB2W"] = items.totalvendas * 0.13;
          }
          if (items.cliente === "MAGAZINE LUIZA") {
            vd["magazineLuiza"] = items.totalvendas;
            vd["taxasMagazineLuiza"] = vd.magazineLuiza * 0.12;
          }
          if (items.cliente === "Mercado Livre") {
            vd["mercadoPago"] = items.totalvendas;
            vd["taxasMercadoPago"] = vd.mercadoPago * 0.05;
          }
        });

        if (jsonVendas[0].totalvendas === jsonDRE[0].totalvendido) {
          vd["totalCMV"] = jsonDRE[0].totalcusto;
          vd["totaLucroBruto"] = jsonDRE[0].totallucro;
        } else {
          console.log("Valores total Vendas nao batem em vendasDados");
        }

        // contas pagas

        const responsepagasT = await fetch("http://localhost:5000/pagasTabela");
        const jsonPagasT = await responsepagasT.json();
        setPagasTabela(jsonPagasT);
        // console.log(jsonPagasT);

        const totalPagas = jsonPagasT.reduce((a, b) => ({ total: a.total + b.total }));
        vd["totalPagas"] = totalPagas.total;
        vd["lucroBruto"] = vd.vendastotal - vd.totalCMV - vd.imposto - vd.taxasB2W - vd.taxasMagazineLuiza - vd.taxasMercadoPago - vd.freteB2W;
        vd["lucroLiquido"] = vd.lucroBruto - vd.totalPagas;
        vd["lucroSobFaturamento"] = ((vd.lucroLiquido / vd.vendasBruta) * 100).toFixed(2);
        // No calculo aqui usamos uma % sobre o faturamente pra calcular o lucro Bruto (faturamento - CMV) baseado no marketup de 40% revertido
        vd["lucroB2W"] = Math.round(((vd.B2W - vd.freteB2W) * 0.311583 - vd.taxasB2W - vd.B2W * 0.05) * 100) / 100;
        vd["lucroMagazineLuiza"] = Math.round((vd.magazineLuiza * 0.311583 - vd.taxasMagazineLuiza - vd.magazineLuiza * 0.05) * 100) / 100;
        vd["lucroMercadoPago"] = Math.round((vd.mercadoPago * 0.311583 - vd.taxasMercadoPago - vd.mercadoPago * 0.05) * 100) / 100;
        vd["lucroLojaFisica"] = Math.round((vd.lucroLiquido - (vd.lucroB2W + vd.lucroMagazineLuiza + vd.lucroMercadoPago)) * 100) / 100;
        vd["lucroSobFaturamentoB2W"] = ((vd.lucroB2W / (vd.B2W - vd.freteB2W)) * 100).toFixed(2);
        vd["lucroSobFaturamentoMagazine"] = ((vd.lucroMagazineLuiza / vd.magazineLuiza) * 100).toFixed(2);
        vd["lucroSobFaturamentoFisica"] = ((vd.lucroLojaFisica / vd.vendasLojaFisica) * 100).toFixed(2);

        // console.log(vd.lucroBruto);
        // console.log(vd);
        setDetalhes(vd);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h3 className="mt-4">Dados</h3>
            <h6 className="mt-4">Vendas Total: R${formNumb(detalhes.vendastotal)}</h6>
            <h6 className="mt-4">Loja Fisica: R${formNumb(detalhes.vendasLojaFisica)}</h6>
            <h6 className="mt-4">Loja Online: R${formNumb(detalhes.vendasOnline)}</h6>
            <h6 className="mt-4">Estoque Atual: R${formNumb(detalhes.estoque)}</h6>
            <h6 className="mt-4">Lucro Sob Faturamento: {detalhes.lucroSobFaturamento}%</h6>
            <h6 className="mt-4">Lucro Sob Faturamento B2W: {detalhes.lucroSobFaturamentoB2W}%</h6>
            <h6 className="mt-4">Lucro Sob Faturamento Magazine: {detalhes.lucroSobFaturamentoMagazine}%</h6>
            <h6 className="mt-4">Lucro Sob Faturamento Fisica: {detalhes.lucroSobFaturamentoFisica}%</h6>
          </div>
          <div className="col">
            <h6 className="mt-4 text-center">% Vendas</h6>

            <Doughnut data={vendasChart} />
          </div>
          <div className="col">
            <h6 className="mt-4 text-center"> Lucro</h6>

            <Doughnut data={lucroChart} />
          </div>
        </div>
      </div>
      {/* Have to do a bit manual to ensure its always the same */}
      <div className="container">
        <div className="row mt-1">
          <div className="col table-responsive mt-2">
            <h3 className="mt-2">DRE </h3>

            <table className="table table-striped table-sm table-hover mt-4">
              <thead>
                <tr>
                  <th>Lancamento</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>(=) Receita Total de Vendas</td>
                  <td>R${formNumb(detalhes.vendastotal)}</td>
                </tr>
                <tr>
                  <td>(-) Devolucoes</td>
                  <td>R${formNumb(detalhes.devoTotal + detalhes.devoB2W)}</td>
                </tr>
                <tr>
                  <td>
                    <h6>(=) Receita Bruta de Vendas </h6>
                  </td>
                  <td>R${formNumb(detalhes.vendasBruta)}</td>
                </tr>
                <tr>
                  <td>(-) Total CMV</td>
                  <td>R${formNumb(detalhes.totalCMV)}</td>
                </tr>
                <tr>
                  <td>(-) Impostos NF</td>
                  <td>R${formNumb(detalhes.imposto)}</td>
                </tr>
                <tr>
                  <td>(-) Taxas B2W</td>
                  <td>R${formNumb(detalhes.taxasB2W)}</td>
                </tr>
                <tr>
                  <td>(-) Taxas Magazine Luiza</td>
                  <td>R${formNumb(detalhes.taxasMagazineLuiza)}</td>
                </tr>
                <tr>
                  <td>(-) Taxas Mercado Pago</td>
                  <td>R${formNumb(detalhes.taxasMercadoPago)}</td>
                </tr>
                <tr>
                  <td>(-) Frete B2W</td>
                  <td>R${formNumb(detalhes.freteB2W)}</td>
                </tr>
                <tr>
                  <td>
                    <h6>(=) Total Lucro Bruto</h6>
                  </td>
                  <td>R${formNumb(detalhes.lucroBruto)}</td>
                </tr>
                <tr>
                  <td>
                    <h6>(=) Despesas Operacionais</h6>
                  </td>
                  <td>R${formNumb(detalhes.totalPagas)}</td>
                </tr>
                <tr>
                  <td>
                    <h6>(=) Total Lucro Liquido</h6>
                  </td>
                  <td>R${formNumb(detalhes.lucroLiquido)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col table-responsive mt-2">
            <h6 className="mt-4 mb-2">Despesas Operacionais </h6>

            <table className="table table-striped table-sm table-hover mt-4">
              <thead>
                <tr>
                  <th>Conta</th>
                  <th>Total</th>
                  <th>% Total</th>
                </tr>
              </thead>
              <tbody>
                {pagasTabela.map(items => (
                  <tr key={uid()}>
                    <td>{items.conta}</td>
                    <td>R${formNumb(items.total)}</td>
                    <td>{formNumb(items.percenttotal * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendasDados;
