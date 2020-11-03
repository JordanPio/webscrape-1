import React, { useEffect, useState } from "react";
import { Polar } from "react-chartjs-2";

function ContasReceber() {
  const [receberTabela, setReceberTabela] = useState([]);
  const [receberAtrasadas, setReceberAtrasadas] = useState([]);
  const [detalhes, setDetalhes] = useState([]);

  // generate IDs
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const atrasadasChart = {
    labels: ["Em Dia", "Atrasadas"],
    datasets: [
      {
        label: "Atrasadas",
        backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [detalhes.PercentEmDia, detalhes.percentAtrasadas]
      }
    ]
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // Get Receber Details
        const responseTabela = await fetch("http://localhost:5000/receberTabela");
        const jsonDataReceber = await responseTabela.json();
        setReceberTabela(jsonDataReceber);
        const totalReceber = jsonDataReceber.reduce((a, b) => ({ total: a.total + b.total }));

        const resRecAt = await fetch("http://localhost:5000/receberAtrasadas");
        const jsonRecAt = await resRecAt.json();
        setReceberAtrasadas(jsonRecAt);

        const totAtrasadas = jsonRecAt.reduce((a, b) => ({ total: a.total + b.total }));

        let detalhesReceber = {};
        detalhesReceber["contasReceber"] = totalReceber.total;
        detalhesReceber["receberAtrasadas"] = totAtrasadas.total.toFixed(2);
        detalhesReceber["PercentEmDia"] = (((totalReceber.total - totAtrasadas.total) / totalReceber.total) * 100).toFixed(2);
        detalhesReceber["percentAtrasadas"] = ((totAtrasadas.total / totalReceber.total) * 100).toFixed(2);

        // console.log(detalhesReceber);
        setDetalhes(detalhesReceber);

        // console.log(cashflow);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h3 className="mt-4">Contas a Receber = R${detalhes.contasReceber}</h3>
      <div className="row mt-4">
        <div className="col table-responsive mt-2">
          <h6 className="text-center mt-2">Maiores contas a receber</h6>

          <table className="table table-striped table-sm mt-1">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Total</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {receberTabela.map((items, index) => {
                if (items.percentage >= 0.04) {
                  return (
                    <tr key={uid()}>
                      <td>{items.cliente}</td>
                      <td>R${items.total}</td>
                      <td>{(items.percentage * 100).toFixed(2)}%</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
          <h6 className="text-center mt-2">% Em dia vs Atrasadas</h6>
          <div className="mt-4"></div>
          <Polar data={atrasadasChart} />
        </div>
        <div className="col table-responsive mt-2">
          <div>
            <h6 className="text-center mt-2">Atrasadas</h6>

            <table className="table table-striped table-sm mt-1 ">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {receberAtrasadas.map((items, index) => {
                  return (
                    <tr key={uid()}>
                      <td>{items.cliente}</td>
                      <td>R${items.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContasReceber;
