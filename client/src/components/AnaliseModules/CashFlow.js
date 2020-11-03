import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function CashFlow() {
  const [cashflow, setCashflow] = useState([]);

  // Setup Cashflow Details for Graph
  let cashflowLabels = [];
  let cashflowReceberTotals = [];
  let cashflowPagarTotals = [];

  cashflow.map(arrays => {
    cashflowLabels.push(`${new Date(arrays.weekly).getDate()}/${new Date(arrays.weekly).getMonth() + 1}/${new Date(arrays.weekly).getFullYear()}`);
    cashflowReceberTotals.push(arrays.receber);
    if (arrays.pagar) {
      cashflowPagarTotals.push(arrays.pagar);
    } else {
      cashflowPagarTotals.push(0);
    }
    return `${new Date(arrays.weekly).getDate()}/${new Date(arrays.weekly).getMonth() + 1}/${new Date(arrays.weekly).getFullYear()}`;
  });

  const chartCash = {
    labels: cashflowLabels,
    datasets: [
      {
        label: "Receber",
        data: cashflowReceberTotals,
        borderColor: "#3e95cd",
        fill: true
      },
      {
        label: "Pagar",
        data: cashflowPagarTotals,
        borderColor: "#c45850",
        fill: true
      }
    ]
  };

  useEffect(() => {
    const getData = async () => {
      try {
        //get Balance Data

        const resCashRec = await fetch("http://localhost:5000/cashflowReceber");
        const jsonCashRec = await resCashRec.json();

        const resCashPag = await fetch("http://localhost:5000/cashflowPagar");
        const jsonCashPag = await resCashPag.json();

        let cashflow = [...jsonCashRec];

        // console.log(cashflow)

        for (let i = 0; i < cashflow.length; i++) {
          // console.log(cashflow[i].weekly);
          for (let j = 0; j < jsonCashPag.length; j++) {
            // console.log(jsonCashPag[j]);
            if (cashflow[i].weekly === jsonCashPag[j].weekly) {
              cashflow[i]["pagar"] = jsonCashPag[j].sum;
            }
          }
        }

        setCashflow(cashflow);

        // console.log(cashflow);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h5 className=" text-center mt-5">Analise Fluxo de Caixa </h5>
      <Line data={chartCash} />
    </>
  );
}

export default CashFlow;
