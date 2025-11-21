var inputServico = document.getElementById("servico");
var resultadosDiv = document.getElementById("resultados");

inputServico.addEventListener("input", function () {
    var consulta = inputServico.value;

    var resultadosSimulados = [
        { nome: "Conselho Estadual de Previdência Social - CEPS", link: "/institucional/conselhos/ceps.html" },
        { nome: "Conselho Fiscal", link: "/institucional/conselhos/conselho-fiscal.html" },
        { nome: "Estrutura Organizacional", link: "/institucional/sobre-o-instituto/estrutura-organizacional.html" },
        { nome: "História", link: "/institucional/sobre-o-instituto/quem-somos.html" },
        { nome: "Missão, Visão e Valores", link: "/institucional/sobre-o-instituto/quem-somos.html" },
        { nome: "Presidente", link: "/institucional/sobre-o-instituto/quem-somos.html" },
        { nome: "Quem Somos", link: "/institucional/sobre-o-instituto/quem-somos.html" },

        { nome: "Cédula C", link: "https://www.acreprevidencia.ac.gov.br/financeiro/" },
        { nome: "Contracheque Online", link: "https://www.acreprevidencia.ac.gov.br/financeiro/" },
        { nome: "DAP (Declaração de Aptidão ao Pronaf)", link: "/servicos/dap/index.html" },
        { nome: "Documentos Requeridos - Abono de Permanência", link: "/servicos/documentos-e-requerimentos.html" },
        { nome: "Documentos Requeridos - Aposentadoria", link: "/servicos/documentos-e-requerimentos.html" },
        { nome: "Documentos Requeridos - Auxílio Funeral", link: "/servicos/documentos-e-requerimentos.html" },
        { nome: "Documentos Requeridos - Declaração Auxílio-Invalidez", link: "/servicos/documentos-e-requerimentos.html" },
        { nome: "Documentos Requeridos - Certidão de Tempo de Contribuição - CTC", link: "/servicos/documentos-e-requerimentos.html" },
        { nome: "Documentos Requeridos - Pensão", link: "/servicos/documentos-e-requerimentos.html" },
        { nome: "Formulários e Requerimentos", link: "/servicos/documentos-e-requerimentos.html" },
        { nome: "Prova de Vida", link: "/servicos/prova-de-vida.html" },
        { nome: "Simulador de Aposentadoria", link: "https://www.acreprevidencia.ac.gov.br/SIMULADOR/" },
        { nome: "Sistemas", link: "https://www.acreprevidencia.ac.gov.br/security/login" },
        { nome: "Acesso Restrito", link: "http://www.acreprevidencia.ac.gov.br:8080/provadevida/faces/atualizacao/acessar.xhtml" },
        { nome: "Validação de CTC", link: "https://www.acreprevidencia.ac.gov.br/ctc/validacao/verifica" },

        { nome: "Estudo Atuarial", link: "/financeiro/estudo-atuarial.html" },
        { nome: "Movimento Financeiro", link: "/financeiro/movimento-financeiro.html" },

        { nome: "Aposentadoria", link: "/beneficios/beneficiarios.html" },
        { nome: "Auxílio Doença", link: "/beneficios/beneficiarios.html" },
        { nome: "Salário Família", link: "/beneficios/beneficiarios.html" },
        { nome: "Salário Maternidade", link: "/beneficios/beneficiarios.html" },

        { nome: "Dependentes - Auxílio Reclusão", link: "/beneficios/dependentes/auxilio-reclusao.html" },
        { nome: "Dependentes - Pensão", link: "/beneficios/dependentes/pensao.html" },
        { nome: "Benefícios Concedidos - Aposentadorias e Pensões", link: "/beneficios/historico-de-concendidos.html" },

        { nome: "Legislação Estadual", link: "/legislacao/estadual.html" },
        { nome: "Legislação Federal", link: "/legislacao/federal.html" },
        { nome: "Ouvidoria", link: "/ouvidoria.html" }
    ];

    var resultadosFiltrados = resultadosSimulados.filter(function (resultado) {
        return resultado.nome.toLowerCase().includes(consulta.toLowerCase());
    });

    if (consulta.trim() === "") {
        resultadosDiv.innerHTML = "";
    } else {
        exibirResultados(resultadosFiltrados);
    }
});

function exibirResultados(resultados) {
    resultadosDiv.innerHTML = "";
    resultadosDiv.classList.remove("sem-resultado");

    if (resultados.length === 0) {
        resultadosDiv.innerHTML = "Nenhum serviço encontrado...";
        resultadosDiv.classList.add("sem-resultado");
    } else {
        var ul = document.createElement("ul");
        ul.classList.add("flexdatalist-results");

        resultados.forEach(function (resultado) {
            var li = document.createElement("li");
            var link = document.createElement("a");
            link.textContent = resultado.nome;
            link.href = resultado.link;

            li.addEventListener("click", function () {
                window.location.href = resultado.link;
            });

            li.appendChild(link);
            ul.appendChild(li);
        });
        resultadosDiv.appendChild(ul);
    }
}

// APAGAR O QUE TA ESCRITO (SEARCH)
document.addEventListener("DOMContentLoaded", function () {
    const campoPesquisa = document.getElementById("servico");
    const limparCampo = document.getElementById("limpar-campo");
    const resultadosDiv = document.getElementById("resultados");
    const body = document.body;

    function limparCampoEPesquisa() {
        campoPesquisa.value = "";
        campoPesquisa.focus();
        resultadosDiv.innerHTML = "";
        resultadosDiv.style.display = "none";
        limparCampo.style.display = "none";
    }

    function ocultarResultados() {
        resultadosDiv.innerHTML = "";
        resultadosDiv.style.display = "none";
    }

    limparCampo.addEventListener("click", function () {
        limparCampoEPesquisa();
    });

    campoPesquisa.addEventListener("input", function () {
        if (campoPesquisa.value !== "") {
            limparCampo.style.display = "block";
            resultadosDiv.style.display = "block";
        } else {
            limparCampo.style.display = "none";
            resultadosDiv.style.display = "none";
        }
    });

    if (campoPesquisa.value === "") {
        limparCampo.style.display = "none";
    }

    campoPesquisa.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            limparCampoEPesquisa();
        }
    });

    body.addEventListener("click", function (event) {
        if (event.target !== campoPesquisa) {
            ocultarResultados();
        }
    });
});