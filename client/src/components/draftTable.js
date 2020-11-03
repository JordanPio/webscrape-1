const { ja } = require("date-fns/locale");

<>
  <h1 className="text-center mt-5">Balance Sheet</h1>
  {/* <form className='d-flex mt-5'>
        <input type='date' className="form"></input>
        <input type='date' className="form"></input>
        <button className="btn btn-success"> Start</button>
      </form> */}

  <table className="table table-striped table-sm mt-4">
    <thead>
      <tr>
        <th>Data</th>
        <th>Conta</th>
        <th>Cliente</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>{/* <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td> */}</tr>
      {receberTabela.map(receber => (
        <tr>
          <td>{`${new Date(receber.data).getDate()}/${new Date(receber.data).getMonth() + 1}/${new Date(receber.data).getFullYear()}`}</td>
          <td>{receber.conta}</td>
          <td>{receber.cliente}</td>
          <td>{receber.total}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="container">
    <div className="row ">
      <div className="col table-responsive text-nowrap">
        <div>
          <h3 className="mt-4">Ativo Circulante</h3>
          <table className="table table-striped table-sm mt-4 ">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Caixa</td>
                <td>test</td>
                <td></td>
              </tr>
              <tr>
                <td>Contas a Receber</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>Bancos</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
              <tr>
                <td className="font-weight-bold ">Total Ativo Circulante</td>
              </tr>
            </tbody>
          </table>
          <h3 className="mt-5">Realizavel Longo Prazo</h3>

          <table className="table table-striped table-sm mt-4">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Caixa</td>
                <td>test</td>
                <td></td>
              </tr>
              <tr>
                <td>Contas a Receber</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>Bancos</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
              <td className="font-weight-bold">Total Realizavel Longo Prazo</td>
            </tbody>
          </table>

          <h3 className="mt-5">Ativo Permanente</h3>

          <table className="table table-striped table-sm mt-4">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Caixa</td>
                <td>test</td>
                <td></td>
              </tr>
              <tr>
                <td>Contas a Receber</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>Bancos</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
              <td className="font-weight-bold">Total Ativo Permanente</td>
            </tbody>
          </table>
          <table className="table table-striped table-sm mt-4">
            <thead>
              <tr>
                <th>Total Ativo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="col table-responsive">
        {" "}
        <div className="table-responsive text-nowrap">
          <h3 className="mt-4">Passivo Circulante</h3>

          <table className="table table-striped table-sm mt-4">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Caixa</td>
                <td>test</td>
                <td></td>
              </tr>
              <tr>
                <td>Contas a Receber</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>Bancos</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Total Ativo Circulante</td>
              </tr>
            </tbody>
          </table>
          <h3 className="mt-5">Exigivel Longo Prazo</h3>

          <table className="table table-striped table-sm mt-4">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Caixa</td>
                <td>test</td>
                <td></td>
              </tr>
              <tr>
                <td>Contas a Receber</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>Bancos</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
              <td className="font-weight-bold">Total Realizavel Longo Prazo</td>
            </tbody>
          </table>

          <h3 className="mt-5">Patrimonio Liquido</h3>

          <table className="table table-striped table-sm mt-4">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Caixa</td>
                <td>test</td>
                <td></td>
              </tr>
              <tr>
                <td>Contas a Receber</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>Bancos</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
              <td className="font-weight-bold">Total Ativo Permanente</td>
            </tbody>
          </table>

          <table className="table table-striped table-sm mt-4">
            <thead>
              <tr>
                <th>Total Passivo</th>
                <th>20/11/2017</th>
                <th>10/04/2018</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</>;

// Pesquena TABELA

<table className="table table-striped table-sm mt-4">
  <thead>
    <tr>
      <th>Data</th>
      <th>Conta</th>
      <th>Cliente</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>{/* <td>John</td>
<td>Doe</td>
<td>john@example.com</td> */}</tr>
    {receberTabela.map(receber => (
      <tr>
        <td>{`${new Date(receber.data).getDate()}/${new Date(receber.data).getMonth() + 1}/${new Date(receber.data).getFullYear()}`}</td>
        <td>{receber.conta}</td>
        <td>{receber.cliente}</td>
        <td>{receber.total}</td>
      </tr>
    ))}
  </tbody>
</table>;


{ativos.map(ativos =>
  ativos.tipo.includes("Ativo Circulante") ? (
    <tr>
      {ativos.conta}
      {datas.map(datas => (
        <td>{datas}</td>
      ))}
      {/* {ativos.data ==='2017-11-19T13:00:00.000Z' ? <td> {ativos.total}</td> : ''} */}
    </tr>
  ) : (
    ""
  )
)}



quase la

{ativos.map(ativos =>
  ativos.tipo.includes("Ativo Circulante")&& ativos.data ==='2017-11-19T13:00:00.000Z' ? (
    <tr>
      {ativos.conta}
      {datas.map(datas => (
        <td>{ativos.total}</td>
      ))}
      {/* {ativos.data ==='2017-11-19T13:00:00.000Z' ? <td> {ativos.total}</td> : ''} */}
    </tr>
  ) : (
    ""
  )
)}


// CORRETO!!!

{ativoCirculante.map(contas => (
  <tr>
    {contas}
    {/* {ativos.data ==='2017-11-19T13:00:00.000Z' ? <td> {ativos.total}</td> : ''} */}
    {datas.map(datas => ativos.map(ativos => (ativos.data === datas && ativos.conta === contas ? <td> {ativos.total}</td> : "")))}
  </tr>
))}



patrimonio liquido mudado ja
{patrimonio.map(items =>
  items.conta !== "Total Patrimonio Liquido" ? (
    <tr>
      {items.conta}
      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas && dadosBalanco.conta === items.conta ? <td> {dadosBalanco.total}</td> : "")))}
    </tr>
  ) : (
    <tr className="font-weight-bold table-info">
      <td>{items.conta}</td>
      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas && dadosBalanco.conta === items.conta ? <td> {dadosBalanco.total}</td> : "")))}
    </tr>
  )
)}

{patrimonio.map(contas =>
  contas !== "Total Patrimonio Liquido" ? (
    <tr>
      {contas}
      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas && dadosBalanco.conta === contas ? <td> {dadosBalanco.total}</td> : "")))}
    </tr>
  ) : (
    <tr className="font-weight-bold table-info">
      <td>{contas}</td>
      {/* {dadosBalanco.data ==='2017-11-19T13:00:00.000Z' ? <td> {dadosBalanco.total}</td> : ''} */}
      {datas.map(datas => dadosBalanco.map(dadosBalanco => (dadosBalanco.data === datas && dadosBalanco.conta === contas ? <td> {dadosBalanco.total}</td> : "")))}
    </tr>
  )
)}


analise.map(items => {
  dadosBalanco.map(dados => {
    if(items.conta === 'CRESCIMENTO EM PATRIMONIO LIQUIDO' && items.conta === dados.conta) {
      return dados.total
    }
  })
})
const test = dadosBalanco.filter(items => {
  if (items.conta === 'CRESCIMENTO EM PATRIMONIO LIQUIDO') {
    return items.total
  }
})

console.log(datas.map(datas => test.map(items => {
  if (datas.select === true && datas.data === items.data ) {
    return items.total
  }
})));

analise.map(items =>
  if (items.conta !== "CRESCIMENTO EM PATRIMONIO LIQUIDO"){
    datas.map(datas => dadosBalanco.map(dadosBalanco => ( 
      if (dadosBalanco.data === datas.data && dadosBalanco.conta === items.conta && datas.select === true) 
{return dadosBalanco.total} }
)

console.log(analise.map(items => {
  if (items.conta === 'CRESCIMENTO EM PATRIMONIO LIQUIDO') {
    datas.map(datas => dadosBalanco.map(dados => {
      if (dados.data === datas.data && dados.conta === items.conta && datas.select === true) {
        return dados.total
      }
    }))
  }
}))



pat.map(items =>
  datas.map(datas => {
    if (datas.select === true && datas.data === items.data) {
      return items.total;
    }
  })
)

console.log(
  pat.map(items =>
    datas.map(datas => {
      if (datas.select === true && datas.data === items.data) {
        return parseFloat(items.total.replace(",", "").replace("$", ""));
      }
    })
  )
);  


{totalVendas.map(items => (
  <h6 key={uid()} className="mt-4">
    TotalVendas: {items.totalvendas}
  </h6>
))}
{totalEstoque.map(items => (
  <h6 key={uid()} className="mt-4">
    Estoque: {items.custototal} em {`${new Date(items.date).getDate()}/${new Date(items.date).getMonth() + 1}/${new Date(items.date).getFullYear()}`}{" "}
  </h6>
))}
{totalPagar.map(pagar => (
  <h6 key={uid()} className="mt-4">
    Contas a Pagar: {pagar.total} em {`${new Date(pagar.data).getDate()}/${new Date(pagar.data).getMonth() + 1}/${new Date(pagar.data).getFullYear()}`}{" "}
  </h6>
))}
{totalReceber.map(receber => (
  <h6 key={uid()} className="mt-4">
    Contas a Receber: {receber.total} em {`${new Date(receber.data).getDate()}/${new Date(receber.data).getMonth() + 1}/${new Date(receber.data).getFullYear()}`}{" "}
  </h6>
))}


<td id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
{pgsDescricao.map(det => (
  det.conta === e.conta ? <td>{det.descricao}</td> : null 
  
))}
</td>



draft


<table className="table table-striped table-sm table-hover mt-4">
<thead>
  <tr>
    <th>Contas</th>
    {datas.map(items => (
      <th key={uid()}>{`${new Date(items).getDate()}/${new Date(items).getMonth() + 1}/${new Date(items).getFullYear()}`}</th>
    ))}
  </tr>

  {/* <tr>
    <th>Conta</th>
    <th>Total</th>
    <th>% Total</th>
  </tr> */}
</thead>
<tbody>
  {pgsContas.map(e => (
    <tr key={uid()}>
      <td data-toggle="collapse" data-target={`#${e.conta}`} aria-expanded="true" aria-controls={e.conta}>
        {e.conta}

        {pgsDescricao.map(det => {
          if (det.conta === e.conta) {
            return (
              <div key={uid()} id={det.conta} className="collapse" aria-labelledby={det.conta} data-parent="#accordion">
                {det.descricao}
              </div>
            );
          } else {
            return null;
          }
        })}
      </td>
      {datas.map(data =>
        e[data] ? (
          <td key={uid()} data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-controls={e.conta}>
            R${e[data]}
            {pgsDescricao.map(detalhe => {
              if (detalhe.conta === e.conta) {
                if (detalhe[data] > 0) {
                  return (
                    <div key={uid()} id={e.conta} className="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      R${detalhe[data]}{" "}
                    </div>
                  );
                } else {
                  return (
                    <div key={uid()} id={e.conta} className="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      R$0
                    </div>
                  );
                }
              } else {
                return null;
              }
            })}
          </td>
        ) : (
          <td key={uid()}></td>
        )
      )}
    </tr>
  ))}
</tbody>
</table>


pgsContas.forEach(items => {
  let outro = {};
  outro["conta"] = items.conta;
  let valores = [];
  datas.forEach(data => {
    // console.log(outro);
    if (items[data]) {
      // outro.values.push(items[data])
      valores.push(items[data]);
    } else {
      // outro[data] = 0
      // outro.values.push(0)
      valores.push(0);
    }
  });

  outro["values"] = valores;
  // outro["values"] = Object.values(items).slice(1);
  // outro.values.slice(1);
  contasTot.push(outro);
});
