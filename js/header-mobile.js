// Seleciona elementos
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.getElementById('overlay');
const submenuItems = document.querySelectorAll('.menu-item.has-submenu > a');

// Abrir menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  overlay.style.display = 'block';
});

// Fechar menu
function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  overlay.style.display = 'none';
}

closeMenu.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

// Abrir/fechar submenus
submenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault(); // evita redirecionamento
    const parent = item.parentElement;

    // Fecha outros submenus abertos
    submenuItems.forEach(i => {
      if (i !== item) i.parentElement.classList.remove('open');
    });

    // Abre ou fecha o submenu clicado
    parent.classList.toggle('open');
  });
});

// Fecha clicando no overlay
overlay.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
});