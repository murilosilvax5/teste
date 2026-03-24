const itens = document.querySelectorAll("li");
const total = document.getElementById("valorTotal");

let valor = 0;

itens.forEach(item => {
  item.addEventListener("click", () => {
    const preco = Number(item.getAttribute("data-valor"));
    valor += preco;
    total.textContent = valor;
  });
});

console.log("script carregou");