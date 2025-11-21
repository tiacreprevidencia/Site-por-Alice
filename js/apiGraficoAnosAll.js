function formatarValorBilhoes(value) {
    var valorEmBilhoes = (value / 1e9).toFixed(1); // Converter para bilhões com 1 casa decimal
    return valorEmBilhoes + ' B';
}

$(document).ready(function () {
    var ctx = document.getElementById("meuGrafico").getContext('2d');
    var meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Receitas',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Despesas',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, 
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: false, 
                        callback: function (value) {
                            return formatarValorBilhoes(value) + '    ';
                        },
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Bilhões' 
                    },
                    gridLines: {
                        color: '#eee'
                    }
                }]
            },
            
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var value = dataset.data[tooltipItem.index];
                        return dataset.label + ': R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }); // Formatar para bilhões nos tooltips
                    }
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'top',
                    align: 'top',
                    offset: 4, // Ajuste para afastar os rótulos do ponto
                    formatter: function (value, context) {
                        return meuGrafico.data.labels[context.dataIndex];
                    }
                }
            }
        }
    });

    // Função para carregar os dados
    function carregarDados(tipo) {
        $.get(`https://www.acreprevidencia.ac.gov.br/demonstrativo/api/anos?tipo=${tipo}`, function (data) {
            meuGrafico.data.labels = data.ano;
            meuGrafico.data.datasets[0].data = data.receitaTotal;
            meuGrafico.data.datasets[1].data = data.despesasTotal;
            meuGrafico.update();
        });
    }

    // Carregar os dados iniciais com o tipo "Simples" ao carregar a página
    carregarDados('Simples');

    document.addEventListener('DOMContentLoaded', function () {
        const tipoSelect = document.getElementById('tipoSelect');
        if (tipoSelect) {
            tipoSelect.addEventListener('change', async function (event) {
                event.preventDefault();
                const tipoSelecionado = event.target.value;
                // Mostrar gráficos para o novo tipo selecionado
                carregarDados(tipoSelecionado);
            });
        }
    });

});