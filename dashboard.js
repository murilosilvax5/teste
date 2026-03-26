
const db = firebase.firestore();

async function carregarDashboard() {
    try {
        const snapshot = await db.collection("pedidos")
            .orderBy("data", "desc")
            .get();

        const pedidos = snapshot.docs.map(doc => doc.data());

        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();

        const pedidosDoMes = pedidos.filter(p => {
            const data = p.data?.toDate ? p.data.toDate() : new Date(p.data);
            return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
        });

        const total = pedidosDoMes.length;
        const faturamento = pedidosDoMes.reduce((acc, p) => acc + (p.total || 0), 0);

        document.getElementById("totalPedidos").textContent = total;
        document.getElementById("faturamentoMensal").textContent = `R$ ${faturamento},00`;

        montarGrafico(pedidos);

    } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);
    }
}

function montarGrafico(pedidos) {
    
    const dias = [];
    const valores = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const diaFormatado = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
        dias.push(diaFormatado);

        const total = pedidos
            .filter(p => {
                const data = p.data?.toDate ? p.data.toDate() : new Date(p.data);
                return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) === diaFormatado;
            })
            .reduce((acc, p) => acc + (p.total || 0), 0);

        valores.push(total);
    }

    const ctx = document.getElementById("graficoFaturamento").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: dias,
            datasets: [{
                label: "Faturamento (R$)",
                data: valores,
                backgroundColor: "#d41414",
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => `R$ ${value}`
                    }
                }
            }
        }
    });
}

function sair() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(erro => {
        console.error("Erro ao sair:", erro);
    });
}

carregarDashboard();