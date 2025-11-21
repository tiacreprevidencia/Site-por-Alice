// Função para obter os dados da API consolidados
async function obterDadosAPIConsolidados() {
    try {
        const response = await fetch(`https://www.acreprevidencia.ac.gov.br/demonstrativo/api/anosConsolidados`);
        if (!response.ok) {
            throw new Error('Falha ao obter os dados da API');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para criar tabelas por ano específicos
async function mostrarGraficosConsolidados() {
    const dados = await obterDadosAPIConsolidados();

    if (dados) {
        const anos = Object.keys(dados);

        // Ordenar os anos em ordem decrescente
        anos.sort((a, b) => parseInt(b) - parseInt(a));

        const tableBody = $('#tableBodyConsolidado');

        anos.forEach(ano => {
            const infoAno = dados[ano];
            const meses = infoAno.mesPorExtenso;
            const mesesInt = infoAno.mes;
            const tipo = infoAno.tipo;

            // Preenche a tabela correspondente ao ano com os dados
            meses.forEach((mes, index) => {
                const newRow = $('<tr>');
                newRow.append($('<td>').text(ano));
                newRow.append($('<td>'));
                newRow.append($('<td>'));
                newRow.append($('<td>').html(`
                    <a href="https://www.acreprevidencia.ac.gov.br/mov-financeiro/pdf/consolidado/${ano}/${mesesInt}.pdf" type="button" target="_blank">Visualizar</a>
                `));

                tableBody.append(newRow);
            });
        });
    }
}

// Chama a função para exibir os gráficos consolidados
$(document).ready(function () {
    mostrarGraficosConsolidados();
});