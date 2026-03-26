const db = firebase.firestore();
let todosPedidos = [];

async function carregarPedidos() {
    const snapshot = await db.collection("pedidos")
        .orderBy("data", "desc")
        .get();

    todosPedidos = snapshot.docs.map(doc => doc.data());

    preencherFiltro();
    renderizarTabela(todosPedidos);
    atualizarCards(todosPedidos);
}

function preencherFiltro() {
    const select = document.getElementById("filtroDia");

    // Pega só os dias únicos
    const dias = [...new Set(todosPedidos.map(p => p.dataDia))];

    dias.forEach(dia => {
        const opt = document.createElement("option");
        opt.value = dia;
        opt.textContent = dia;
        select.appendChild(opt);
    });
}

function filtrarDia() {
    const diaSelecionado = document.getElementById("filtroDia").value;

    const filtrados = diaSelecionado
        ? todosPedidos.filter(p => p.dataDia === diaSelecionado)
        : todosPedidos;

    renderizarTabela(filtrados);
    atualizarCards(filtrados);
}

function limparFiltro() {
    document.getElementById("filtroDia").value = "";
    renderizarTabela(todosPedidos);
    atualizarCards(todosPedidos);
}

function renderizarTabela(pedidos) {
    const tbody = document.getElementById("tabelaPedidos");
    tbody.innerHTML = "";

    if (pedidos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="sem-dados">Nenhum pedido encontrado.</td></tr>`;
        return;
    }

    pedidos.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.dataDia}</td>
            <td>${p.itens.join(", ")}</td>
            <td>R$ ${p.total},00</td>
        `;
        tbody.appendChild(tr);
    });
}

function atualizarCards(pedidos) {
    const total = pedidos.length;
    const faturamento = pedidos.reduce((acc, p) => acc + p.total, 0);
    const ticket = total > 0 ? (faturamento / total).toFixed(2) : 0;

    document.getElementById("totalPedidos").textContent = total;
    document.getElementById("faturamentoTotal").textContent = `R$ ${faturamento},00`;
    document.getElementById("ticketMedio").textContent = `R$ ${ticket}`;
}

// Inicia carregando os pedidos
carregarPedidos();

