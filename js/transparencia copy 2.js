// Seleciona os elementos
const btn1col = document.getElementById('btn1col');
const btn3col = document.getElementById('btn3col');
const linkCSS = document.querySelector('link[href*="transparencia"]'); // CSS ativo

// Função para trocar o arquivo CSS de forma rápida
function trocarLayout(tipo) {
  const timestamp = Date.now(); // cache-buster p/ evitar atraso de cache
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

  // Salva a escolha do usuário (opcional)
  localStorage.setItem('layoutPreferido', tipo);
}

// Eventos dos botões
btn1col.addEventListener('click', () => trocarLayout('list'));
btn3col.addEventListener('click', () => trocarLayout('grid'));

// Ao carregar a página, aplica o layout salvo ou padrão
window.addEventListener('DOMContentLoaded', () => {
  const preferido = localStorage.getItem('layoutPreferido');
  if (window.innerWidth < 768) {
    trocarLayout('list'); // sempre 1 coluna no mobile
  } else if (preferido === 'grid') {
    trocarLayout('grid');
  } else {
    trocarLayout('list');
  }
});

// Mantém 1 coluna ao redimensionar para telas pequenas
window.addEventListener('resize', () => {
  if (window.innerWidth < 768 && !linkCSS.href.includes('transparenciaList.css')) {
    trocarLayout('list');
  }
});