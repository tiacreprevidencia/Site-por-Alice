// Seleciona os elementos
const btn1col = document.getElementById('btn1col');
const btn3col = document.getElementById('btn3col');
const linkCSS = document.querySelector('link[href*="transparencia"]'); // seleciona o CSS ativo

// Função para trocar o arquivo CSS
function trocarLayout(tipo) {
  if (tipo === 'list') {
    linkCSS.href = '/css/transparenciaList.css';
    btn1col.classList.add('ativo');
    btn3col.classList.remove('ativo');
  } else if (tipo === 'grid') {
    linkCSS.href = '/css/transparenciaGrid.css';
    btn3col.classList.add('ativo');
    btn1col.classList.remove('ativo');
  }
}

// Eventos dos botões
btn1col.addEventListener('click', () => trocarLayout('list'));
btn3col.addEventListener('click', () => trocarLayout('grid'));

// Garantir que em telas pequenas (ex: celular) mantenha o layout de 1 coluna
window.addEventListener('resize', () => {
  if (window.innerWidth < 768 && !linkCSS.href.includes('transparenciaList.css')) {
    trocarLayout('list');
  }
});