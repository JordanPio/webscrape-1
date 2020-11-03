import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function BalanceSheet() {
  const [receberTabela, setReceberTabela] = useState([]);
  const [dadosBalanco, setdadosBalanco] = useState([]);
  const [balancete, setBalancete] = useState([]);
  const [datas, setDatas] = useState([]);
  const [contas, setContas] = useState([]);
  const [ativoCirculante, setAtivoCirculante] = useState([]);
  const [passivoCirculante, setPassivoCirculante] = useState([]);
  const [ativoPermanente, setAtivoPermanente] = useState([]);
  const [Exigivel, setExigivel] = useState([]);
  const [patrimonio, setPatrimonio] = useState([]);
  const [analise, setAnalise] = useState([]);

  let patGraph = [];

  const patCrescimentoData = dadosBalanco
    .filter(items => {
      if (items.conta === "CRESCIMENTO EM PATRIMONIO LIQUIDO") {
        return items.total;
      }
    })
    .map(test =>
      datas.map(data => {
        if (data.select === true && data.data === test.data) {
          patGraph.push(test.total);
        }
      })
    );

  console.log(datas);

  const chartData = {
    labels: datas.map(items => {
      return `${new Date(items.data).getDate()}/${new Date(items.data).getMonth()}/${new Date(items.data).getFullYear()}`;
    }),
    datasets: [
      {
        label: "Crecimento em Patrimonio Liquido",
        data: patGraph,
        borderColor: "#3e95cd",
        fill: false
      },
      {
        label: "Sales for 2019 (M)",
        data: [1, 3, 2, 2, 3, 6],
        borderColor: "#8e5ea2",
        fill: false
      }
    ]
  };

  // const getReceber = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/receberTabela");
  //     const jsonData = await response.json();
  //     setReceberTabela(jsonData);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const getdadosBalanco = async () => {
    try {
      const response = await fetch("http://localhost:5000/balance");
      const jsonData = await response.json();
      setdadosBalanco(jsonData);
      const balanco22 = jsonData.map(items => {
        return { conta: items.conta, data: items.data, total: items.total, tipo: items.tipo, select: true, id: uid() };
      });
      setBalancete(balanco22);

      const uniqueDates = [...new Set(jsonData.map(items => items.data))]; // Create new dataset with unique dates

      const uniqDatesV2 = uniqueDates.map(items => {
        return { id: uid(), data: items, select: true };
      });
      setDatas(uniqDatesV2);
      const uniqueContas = [...new Set(jsonData.map(items => items.conta))];
      setContas(uniqueContas);
      const ativoCircu = [
        ...new Set(
          jsonData.map(function (items) {
            if (items.tipo.includes("Ativo Circulante")) {
              return items.conta;
            }
          })
        )
      ];
      setAtivoCirculante(ativoCircu);
      const passivoCirc = [
        ...new Set(
          jsonData.map(function (items) {
            if (items.tipo.includes("Passivo Circulante")) return items.conta;
          })
        )
      ];

      setPassivoCirculante(passivoCirc);

      const ativoPerma = [
        ...new Set(
          jsonData.map(items => {
            if (items.tipo.includes("Ativo Permanente")) {
              return items.conta;
            }
          })
        )
      ];

      setAtivoPermanente(ativoPerma);

      const exigi = [
        ...new Set(
          jsonData.map(items => {
            if (items.tipo.includes("Passivo Exigivel a Longo Prazo")) {
              return items.conta;
            }
          })
        )
      ];

      setExigivel(exigi);

      // const patri = [
      //   ...new Set(
      //     jsonData.map(items => {
      //       if (items.tipo.includes("Patrimonio Liquido")) {
      //         return items.conta;
      //       }
      //     })
      //   )
      // ];
      //test
      const patri = [
        ...new Set(
          jsonData.map(items => {
            if (items.tipo.includes("Patrimonio Liquido")) {
              return items.conta;
            }
          })
        )
      ];

      const patrimonio = patri.map(items => {
        return { conta: items, select: false, id: uid() };
      });
      setPatrimonio(patrimonio);

      const analise = [
        ...new Set(
          jsonData.map(items => {
            if (items.tipo.includes("Analise")) {
              return items.conta;
            }
          })
        )
      ];
      const analise2 = analise.map(items => {
        return { conta: items, id: uid() };
      });
      setAnalise(analise2);
    } catch (error) {
      console.error(error.message);
    }
  };


  // create UniqueID for the keys
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // for (let i = 0; i < dadosBalanco.length; i++) {
  //   for (let j = 0; j < dadosBalanco[i].length; j++) {
  //     console.log(dadosBalanco[i][j])

  //   }

  // }

  //   // const date = new Date(receber.data);
  //   // const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  useEffect(() => {
    // getReceber();
    getdadosBalanco();
  }, []);

  useEffect(() => {}, [datas.select]);

  return (
    <>
        <h1 className="text-center mt-5">Balance Sheet</h1>
        {datas.map(d => (
          <div key={d.id}>
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
                setBalancete(items => {
                  if (d.id === items.id) {
                    items.select = checked;
                  }
                  return items;
                });
              }}
              // handleChange={handleChange(datas.id)}
            />
            {`${new Date(d.data).getDate()}/${new Date(d.data).getMonth() + 1}/${new Date(d.data).getFullYear()}`}
          </div>
        ))}
      {/* <form className='d-flex mt-5'>
        <input type='date' className="form"></input>
        <input type='date' className="form"></input>
        <button className="btn btn-success"> Start</button>
      </form> */}

      <div className="row ">
        <div className="col table-responsive ">
          <div>
            <h3 className="mt-4">Ativo Circulante</h3>
            <table className="table table-striped table-sm mt-4 ">
              <thead>
                <tr>
                  <th>Periodo</th>

                  {datas.map(
                    datas => (datas.select === true ? <th key={datas.id}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : "")
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {ativoCirculante.map(contas =>
                  contas !== "Total do Ativo Circulante" ? (
                    <tr>
                      {contas}
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  ) : (
                    <tr className="font-weight-bold table-info">
                      <td>{contas}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <h3 className="mt-5">Realizavel Longo Prazo</h3>

            <table className="table table-striped table-sm mt-4"></table>

            <h3 className="mt-5">Ativo Permanente</h3>

            <table className="table table-striped table-sm mt-4">
              <thead>
                <tr>
                  <th>Periodo</th>
                  {datas.map(
                    datas => (datas.select === true ? <th key={datas.id}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : "")
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {ativoPermanente.map(contas =>
                  contas !== "Total Ativo Permanente" ? (
                    <tr>
                      {contas}
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  ) : (
                    <tr className="font-weight-bold table-info">
                      <td>{contas}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col table-responsive">
          {" "}
          <div className="table-responsive">
            <h3 className="mt-4">Passivo Circulante</h3>

            <table className="table table-striped table-sm mt-4">
              <thead>
                <tr>
                  <th>Periodo</th>
                  {/* <th>20/11/2017</th>
                    <th>10/04/2018</th>
                    <th>10/04/2018</th>
                    <th>10/04/2018</th>
                    <th>10/04/2018</th>
                    <th>10/04/2018</th> */}
                  {datas.map(
                    datas => (datas.select === true ? <th key={datas.id}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : "")
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {passivoCirculante.map(contas =>
                  contas === "Total do Passivo Circulante" ? (
                    <tr className="font-weight-bold table-info">
                      <td>{contas}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  ) : (
                    <tr>
                      {contas}
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <h3 className="mt-5">Exigivel Longo Prazo</h3>

            <table className="table table-striped table-sm mt-4">
              <thead>
                <tr>
                  <th>Periodo</th>
                  {datas.map(
                    datas => (datas.select === true ? <th key={datas.id}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : "")
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Exigivel.map(contas =>
                  contas !== "Total Exigivel a Longo Prazo" ? (
                    <tr>
                      {contas}
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  ) : (
                    <tr className="font-weight-bold table-info">
                      <td>{contas}</td>
                      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === contas && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <h3 className="mt-5">Patrimonio Liquido</h3>

            <table className="table table-striped table-sm mt-4">
              <thead>
                <tr>
                  <th>Periodo</th>
                  {datas.map(
                    datas => (datas.select === true ? <th key={datas.id}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : "")
                    // <th>{`${datas.}`}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {patrimonio.map(items =>
                  items.conta !== "Total Patrimonio Liquido" ? (
                    <tr>
                      {items.conta}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === items.conta && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  ) : (
                    <tr className="font-weight-bold table-info">
                      {items.conta}
                      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === items.conta && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h3 className="mt-5">Analise</h3>
      <table className="table table-striped table-sm mt-4">
        <thead>
          <tr>
            <th>Periodo</th>
            {datas.map(
              datas => (datas.select === true ? <th key={datas.id}>{`${new Date(datas.data).getDate()}/${new Date(datas.data).getMonth() + 1}/${new Date(datas.data).getFullYear()}`}</th> : "")
              // <th>{`${datas.}`}</th>
            )}
          </tr>
        </thead>
        {analise.map(items =>
          items.conta !== "CRESCIMENTO EM PATRIMONIO LIQUIDO" ? (
            <tr>
              {items.conta}
              {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === items.conta && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
            </tr>
          ) : (
            <tr className="font-weight-bold table-info">
              {items.conta}
              {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas.data && dadosBalanco.conta === items.conta && datas.select === true ? <td> {dadosBalanco.total}</td> : "")))}
            </tr>
          )
        )}
      </table>
      <div className="chart">
        <Line data={chartData} />
      </div>
    </>
  );
}

export default BalanceSheet;
