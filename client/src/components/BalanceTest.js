import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function BalanceTest() {
  // states

  const [datas, setDatas] = useState([]);
  const [dadosPivot, setDadosPivot] = useState([]);

  // --------Functions

  // generate IDs
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  let chartNumb = [];
  let chartDados = [];

  dadosPivot
    .filter(items => {
      if (items.conta === "CAPITAL SOCIAL") {
        return items;
      } else {
        return null;
      }
    })
    .map(items =>
      datas.map(datas => {
        if (datas.select === true) {
          chartNumb.push(items[datas.data]);
          return items;
        } else {
          return null;
        }
      })
    );

  for (let i = chartNumb.length - 1; i >= 0; i--) {
    if (chartNumb[i - 1]) {
      let calc = chartNumb[i] - chartNumb[i - 1];
      chartDados.unshift(calc.toFixed(2));
    } else {
      let calc = 59155.27;
      chartDados.unshift(calc.toFixed(2));
    }
  }

  let chartLab = [];

  datas.map(items => {
    if (items.select === true) {
      chartLab.push(`${new Date(items.data).getDate()}/${new Date(items.data).getMonth() + 1}/${new Date(items.data).getFullYear()}`);
      return `${new Date(items.data).getDate()}/${new Date(items.data).getMonth() + 1}/${new Date(items.data).getFullYear()}`;
    } else {
      return null;
    }
  });

  // graphs
  const chartData = {
    labels: chartLab,
    datasets: [
      {
        label: "Crecimento em Patrimonio Liquido",
        data: chartDados,
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  };

  useEffect(() => {
    const getData = async () => {
      try {
        //get Balance Data
        const response = await fetch("http://localhost:5000/balance");
        const jsonData = await response.json();

        // set contas

        let newSet = [];
        let datas = [];
        let valor = [];

        for (let i = 0; i < jsonData.length; i++) {
          datas = Object.keys(jsonData[i].json_object_agg);
          valor = Object.values(jsonData[i].json_object_agg);
          let outro = {};
          outro["conta"] = jsonData[i].conta;
          outro["tipo"] = jsonData[i].tipo;

          for (let j = 0; j < datas.length; j++) {
            let nome = datas[j];
            let dadinho = valor[j];

            outro[nome] = dadinho;
          }
          // outside the loop execute this for when the dataset outro is ready
          newSet.push(outro);
        }

        setDadosPivot(newSet);

        // SET Unique Dates

        const uniqDates = datas.map(items => {
          return { id: uid(), data: items, select: true };
        });
        setDatas(uniqDates);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1 className="text-center mt-5">Balance Sheet</h1>
      <div className="container mt-5">
        <div className="row justify-content">
          {datas.map(d => (
            <div className="col-md-auto" key={d.id}>
              <input
                type="checkbox"
                checked={d.select}
                onChange={event => {
                  let checked = event.target.checked;
                  setDatas(
                    datas.map(items => {
                      if (d.id === items.id) {
                        items.select = checked;
                      }
                      return items;
                    })
                  );
                }}
                // handleChange={handleChange(datas.id)}
              />
              {`${new Date(d.data).getDate()}/${new Date(d.data).getMonth() + 1}/${new Date(d.data).getFullYear()}`}
            </div>
          ))}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col table-responsive ">
          <div>
            <h3 className="mt-4">Ativo Circulante</h3>
            <table className="table table-striped table-sm mt-4 ">
              <thead>
                <tr>
                  <th>Periodo</th>

                  {datas.map(
                    datas => (datas.select === true ? <th key={uid()}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : null)
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dadosPivot.map((items, index) =>
                  items.tipo === "Ativo Circulante Total" ? (
                    <tr className="font-weight-bold table-info" key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : items.tipo === "Ativo Circulante" ? (
                    <tr key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
            <h3 className="mt-5">Realizavel Longo Prazo</h3>

            <table className="table table-striped table-sm mt-4"></table>

            <h3 className="mt-4">Ativo Circulante</h3>
            <table className="table table-striped table-sm mt-4 ">
              <thead>
                <tr>
                  <th>Periodo</th>

                  {datas.map(
                    datas => (datas.select === true ? <th key={uid()}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : null)
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dadosPivot.map((items, index) =>
                  items.tipo === "Ativo Permanente Total" ? (
                    <tr className="font-weight-bold table-info" key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : items.tipo === "Ativo Permanente" ? (
                    <tr key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col table-responsive">
          {" "}
          <div className="table-responsive">
            <h3 className="mt-4">Passivo Circulante</h3>
            <table className="table table-striped table-sm mt-4 ">
              <thead>
                <tr>
                  <th>Periodo</th>

                  {datas.map(
                    datas => (datas.select === true ? <th key={uid()}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : null)
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dadosPivot.map((items, index) =>
                  items.tipo === "Passivo Circulante Total" ? (
                    <tr className="font-weight-bold table-info" key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : items.tipo === "Passivo Circulante" ? (
                    <tr key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>

            <h3 className="mt-4">Exigivel Longo Prazo</h3>
            <table className="table table-striped table-sm mt-4 ">
              <thead>
                <tr>
                  <th>Periodo</th>

                  {datas.map(
                    datas => (datas.select === true ? <th key={uid()}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : null)
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dadosPivot.map((items, index) =>
                  items.tipo === "Passivo Exigivel a Longo Prazo" ? (
                    <tr key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : items.tipo === "Passivo Exigivel a Longo Prazo Total" ? (
                    <tr className="font-weight-bold table-info" key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
            <h3 className="mt-4">Patrimonio Liquido</h3>
            <table className="table table-striped table-sm mt-4 ">
              <thead>
                <tr>
                  <th>Periodo</th>

                  {datas.map(
                    datas => (datas.select === true ? <th key={uid()}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : null)
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dadosPivot.map((items, index) =>
                  items.tipo === "Patrimonio Liquido" ? (
                    <tr key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : items.tipo === "Patrimonio Liquido Total" ? (
                    <tr className="font-weight-bold table-info" key={uid()}>
                      <td>{items.conta}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                      {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h3 className="mt-5">Analise</h3>
      <table className="table table-striped table-sm mt-4 ">
        <thead>
          <tr>
            <th>Periodo</th>

            {datas.map(
              datas => (datas.select === true ? <th key={uid()}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : null)
              // <th>{`${datas.}`}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {dadosPivot.map((items, index) =>
            items.tipo === "Analise" && items.conta !== "CRESCIMENTO EM PATRIMONIO LIQUIDO" && items.conta !== "Meses de um Periodo ao Outro" ? (
              <tr key={uid()}>
                <td>{items.conta}</td>
                {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                {datas.map(datas => (datas.select === true ? <td key={uid()}>R${items[datas.data].toLocaleString()}</td> : null))}
                {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
              </tr>
            ) : items.conta === "CRESCIMENTO EM PATRIMONIO LIQUIDO" ? (
              <tr className="font-weight-bold table-info" key={uid()}>
                <td>{items.conta}</td>
                {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                {chartDados.map(dados => (
                  <td key={uid()}>R${dados}</td>
                ))}
                {/* {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))} */}
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      <div className="container">
        <div className="row">
          <div className="col">
            <Line data={chartData} />
          </div>

          <div className="col"></div>
        </div>
      </div>
    </>
  );
}

export default BalanceTest;
