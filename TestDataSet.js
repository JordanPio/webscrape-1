const fetch = require("node-fetch");

const getData = async () => {
  try {
    const response = await fetch("http://localhost:5000/balance");
    const dados = await response.json();

    let newSet = [];
    let datas = [];
    let valor = [];

    for (let i = 0; i < dados.length; i++) {
      datas = Object.keys(dados[i].json_object_agg);
      valor = Object.values(dados[i].json_object_agg);
      let outro = {};
      outro["conta"] = dados[i].conta;
      outro["tipo"] = dados[i].tipo;

      for (let j = 0; j < datas.length; j++) {
        let nome = datas[j];
        let dadinho = valor[j];

        outro[nome] = dadinho;
      }
      // outside the loop execute this

      newSet.push(outro);
    }

    console.log(newSet);
  } catch (error) {
    console.error(error.message);
  }
};

console.log(getData());
