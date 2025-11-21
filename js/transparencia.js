// === Transparência - Controle de Layout (ajustado para padrão GRID) ===

// Seleciona os elementos
const btn1col = document.getElementById('btn1col');
const btn3col = document.getElementById('btn3col');
const linkCSS = document.querySelector('link[href*="transparencia"]'); // CSS ativo

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
    // Mobile: força lista no primeiro acesso
    trocarLayout('list');
  } else if (preferido === 'grid') {
    trocarLayout('grid');
  } else if (preferido === 'list') {
    trocarLayout('list');
  } else {
    // Desktop sem preferência -> não faz nada, já está em grid pelo HTML
    btn3col.classList.add('ativo');
    btn1col.classList.remove('ativo');
  }
});

// Corrige bug no mobile: evita forçar layout repetidamente
let layoutBloqueadoMobile = false;

window.addEventListener('resize', () => {
  const largura = window.innerWidth;

  if (largura < 768 && !layoutBloqueadoMobile) {
    trocarLayout('list');
    layoutBloqueadoMobile = true;
  }

  if (largura >= 768 && layoutBloqueadoMobile) {
    layoutBloqueadoMobile = false;
    const preferido = localStorage.getItem('layoutPreferido');
    if (preferido === 'grid') trocarLayout('grid');
    else if (preferido === 'list') trocarLayout('list');
    else {
      // se não tiver preferência, mantém grid padrão
      btn3col.classList.add('ativo');
      btn1col.classList.remove('ativo');
    }
  }
});