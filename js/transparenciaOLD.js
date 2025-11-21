// === Transparência - Controle de Layout ===

// Seleciona os elementos
const btn1col = document.getElementById('btn1col');
const btn3col = document.getElementById('btn3col');
const linkCSS = document.querySelector('link[href*="transparencia"]'); // CSS ativo

// Função para trocar o arquivo CSS de forma rápida
function trocarLayout(tipo) {
  const timestamp = Date.now(); // evita cache
  const basePath = '/css/';

  if (tipo === 'list') {
    linkCSS.href = `${basePath}transparenciaList.css?v=${timestamp}`;
    btn1col.classList.add('ativo');
    btn3col.classList.remove('ativo');
  } else if (tipo === 'grid') {
    linkCSS.href = `${basePath}transparenciaGrid.css?v=${timestamp}`;
    btn3col.classList.add('ativo');
    btn1col.classList.remove('ativo');
  }

  // Salva a preferência
  localStorage.setItem('layoutPreferido', tipo);
}

// Eventos dos botões
btn1col.addEventListener('click', () => trocarLayout('list'));
btn3col.addEventListener('click', () => trocarLayout('grid'));

// Ao carregar a página, aplica o layout salvo ou padrão
window.addEventListener('DOMContentLoaded', () => {
  const preferido = localStorage.getItem('layoutPreferido');

  if (window.innerWidth < 768 && !preferido) {
    // em telas pequenas e sem preferência, força lista
    trocarLayout('list');
  } else if (preferido === 'grid') {
    trocarLayout('grid');
  } else {
    trocarLayout('list');
  }
});

// Corrige bug no mobile: evita forçar layout repetidamente
let layoutBloqueadoMobile = false;

window.addEventListener('resize', () => {
  const largura = window.innerWidth;

  // Bloqueia múltiplas execuções no mobile
  if (largura < 768 && !layoutBloqueadoMobile) {
    trocarLayout('list');
    layoutBloqueadoMobile = true;
  }

  // Ao voltar para desktop, restaura preferência
  if (largura >= 768 && layoutBloqueadoMobile) {
    layoutBloqueadoMobile = false;
    const preferido = localStorage.getItem('layoutPreferido');
    if (preferido === 'grid') trocarLayout('grid');
    else trocarLayout('list');
  }
});