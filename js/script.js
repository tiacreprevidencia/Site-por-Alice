// Carrega o conteúdo da página externa
$(document).ready(function(){    
    $("#cabecario").load("/header.html");
    $("#rodape").load("/footer.html");
});

// CONSELHOS
document.addEventListener("DOMContentLoaded", function () {
    const tabs = ['tabOne', 'tabTwo', 'tabThree', 'tabFour'];

    // Ativa a primeira guia por padrão
    const firstTab = document.getElementById('tabOne');
    if (firstTab) {
        firstTab.classList.add('active-tab');
    }

    // Adicione a classe 'active-tab' ao conteúdo da primeira guia
    const firstContent = document.getElementById('contentOne');
    if (firstContent) {
        firstContent.classList.add('active-tab');
    }

    tabs.forEach(tab => {
        const tabElement = document.getElementById(tab);
        if (tabElement) {
            tabElement.addEventListener('click', () => {
                // Remove a classe 'active-tab' de todas as abas
                tabs.forEach(t => {
                    const tTab = document.getElementById(t);
                    const tContent = document.getElementById(`content${t.slice(3)}`);
                    if (tTab && tContent) {
                        tTab.classList.remove('active-tab');
                        tContent.classList.remove('active-tab');
                    }
                });

                // Adiciona a classe 'active-tab' à aba e ao conteúdo da aba clicada
                tabElement.classList.add('active-tab');
                const tabContent = document.getElementById(`content${tab.slice(3)}`);
                if (tabContent) {
                    tabContent.classList.add('active-tab');
                }
            });
        }
    });
});

// ACCORDION
document.addEventListener('DOMContentLoaded', function () {
    const detailsElements = document.querySelectorAll('.card-sub-pages details');

    detailsElements.forEach(function (details) {
        details.addEventListener('toggle', function () {
            if (details.open) {
                // Fecha todos os outros detalhes
                detailsElements.forEach(function (otherDetails) {
                    if (otherDetails !== details && otherDetails.open) {
                        otherDetails.removeAttribute('open');
                    }
                });
            }
        });
    });
});






