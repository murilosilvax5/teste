async function salvarPedido(itens, total) {
  const db = firebase.firestore();

  await db.collection("pedidos").add({
    itens: itens,
    total: total,
    data: new Date().toISOString(),
    dataDia: new Date().toLocaleDateString("pt-br")
  });

  alert("Pedido salvo com sucesso!");

  
  zerarTela();
}

console.log("pedidos.js carregou");

function sair() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch((erro) => {
        console.error("Erro ao sair:", erro);
    });
}