import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

function ContasPagar() {
  const [pagarTabela, setPagarTabela] = useState([]);
  const [detalhes, setDetalhes] = useState([]);

  // generate IDs
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Setup apagar Chart

  let apagarLabels = [];
  let apagarData = [];

  pagarTabela.map(arrays => {
    apagarLabels.push(arrays.conta);
    apagarData.push(arrays.total);
    return 0;
  });

  const pagarChart = {
    labels: apagarLabels,
    datasets: [
      {
        label: "Contas",
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#00A6B4", "#6800B4", "#2FDE00", "#E7E9ED", "#4BC0C0"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350", "#35014F"],
        data: apagarData
      }
    ]
  };

  useEffect(() => {
    const getData = async () => {
      try {
        //Get apagar details

        const resPagar = await fetch("http://localhost:5000/pagarTabela");
        const jsonPagarTab = await resPagar.json();
        setPagarTabela(jsonPagarTab);

        const responsePagar = await fetch("http://localhost:5000/totalPagar");
        const jsonDataPagar = await responsePagar.json();

        let DetalhesApagar = {};
        DetalhesApagar["contasPagar"] = jsonDataPagar[0].total;

        setDetalhes(DetalhesApagar);

        // console.log(cashflow);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h3 className="mt-4">Contas a Pagar Total = R${detalhes.contasPagar}</h3>

      <div className="row mt-4">
        <div className="col table-responsive ">
          <div>
            <table className="table table-striped table-sm mt-4 ">
              <thead>
                <tr>
                  <th> Conta</th>
                  <th> Total</th>
                </tr>
              </thead>
              <tbody>
                {pagarTabela.map(items => (
                  <tr key={uid()}>
                    <td>{items.conta}</td>
                    <td>R${items.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col table-responsive mt-5">
          <Pie data={pagarChart} />
        </div>
      </div>
    </>
  );
}

export default ContasPagar;
