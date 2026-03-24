const itens = document.querySelectorAll("li");
const total = document.getElementById("valorTotal");

let valor = 0;
let itensSelecionados = [];

itens.forEach(item => {
  item.addEventListener("click", () => {
    const preco = Number(item.getAttribute("data-valor"));
    valor += preco;
    total.textContent = valor;
    itensSelecionados.push(item.textContent);
  });
});

function finalizarPedido() {
  if (valor === 0) {
    alert("Selecione ao menos um item!");
    return;
  }
  salvarPedido(itensSelecionados, valor);
}

function zerarTela() {
  valor = 0;
  itensSelecionados = [];
  total.textContent = 0;
}