function formatarValorMilhoes(value) {
    // Dividir o valor por um milhão e arredondar para 0 casas decimais
    var valorEmMilhoes = (value / 1000000).toFixed(0);
    return valorEmMilhoes + ' M';
}

// Função para obter os dados da API
async function obterDadosAPI(tipo) {
    try {
        const response = await fetch(`https://www.acreprevidencia.ac.gov.br/demonstrativo/api/meses?tipoMov=${tipo}`);
        if (!response.ok) {
            throw new Error('Falha ao obter os dados da API');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para criar e exibir os gráficos separados por ano em canvas específicos
async function mostrarGraficosPorAno(tipo) {

    const dados = await obterDadosAPI(tipo);

    if (dados) {
        const anos = Object.keys(dados);

        anos.forEach(ano => {
            const infoAno = dados[ano];
            const meses = infoAno.mesPorExtenso;
            const receitaMes = infoAno.receitaMes;
            const saldoMes = infoAno.saldoMes;
            const despesas = infoAno.despesas;
            const mesesPorExtenso = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];

            // Encontra o elemento canvas correspondente ao ano
            const canvas = document.getElementById(`meuGrafico${ano}`);

            // Cria um gráfico com Chart.js para cada ano
            if (canvas) {
                new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: mesesPorExtenso,
                        datasets: [
                            {
                                label: 'Saldo',
                                data: saldoMes,
                                backgroundColor: 'rgb(77, 75, 192, 0.2)',
                                borderColor: 'rgba(77, 75, 192, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Receitas',
                                data: receitaMes,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Despesas',
                                data: despesas,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    // beginAtZero: true,
                                    callback: formatarValorMilhoes
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Milhões'
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false // Oculta as linhas de grade no eixo x
                                }
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var value = dataset.data[tooltipItem.index];
                                    return dataset.label + ': R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                                }
                            }
                        },
                    },
                });
            }

            // Preenche a tabela correspondente ao ano com os dados
            const tableBody = $(`#tableBody${ano}`);
            meses.forEach((mes, index) => {
                const newRow = $('<tr>');
                newRow.append($('<td>').text(mes));
                newRow.append($('<td>'));
                newRow.append($('<td>'));
                newRow.append($('<td style="width: 307px;">').html(`
                    <a href="https://www.acreprevidencia.ac.gov.br/mov-financeiro/pdf/${ano}/${infoAno.meses[index]}.pdf" type="button" target="_blank">Visualizar</a>
                   
                `));
                tableBody.append(newRow);
            });
        });
    }
}

// Chama a função para exibir os gráficos separados por ano em canvas específicos
document.addEventListener('DOMContentLoaded', async function () {
    await mostrarGraficosPorAno('Simples');
});
