// === acessibilidade.js ===
function initAccessibilityMenu() {

  // HTML do menu de acessibilidade
  document.body.insertAdjacentHTML("beforeend", `
    
    <button id="ac-toggle" aria-label="Abrir menu de acessibilidade" aria-haspopup="true" aria-expanded="false">
      <i class="fa-solid fa-universal-access"></i>
    </button>

    <div id="ac-menu" role="menu">
      <button role="menuitem" id="ac-read" aria-label="Leitor de Tela"><i class="fa-solid fa-volume-up"></i> Leitor de Tela</button>
      <button role="menuitem" id="ac-contrast" aria-pressed="false" aria-label="Ativar alto contraste"><i class="fa-regular fa-circle"></i> Alto contraste</button>
      <button role="menuitem" id="ac-grayscale" aria-pressed="false" aria-label="Ativar tons de cinza"><i class="fa-solid fa-adjust"></i> Tons de cinza</button>
      <button role="menuitem" id="ac-increase-font" aria-label="Aumentar fonte"><i class="fa-solid fa-plus"></i> A+ Aumentar fonte</button>
      <button role="menuitem" id="ac-original-font" aria-label="Fonte original"><i class="fa-solid fa-font"></i> Aa Fonte original</button>
      <button role="menuitem" id="ac-decrease-font" aria-label="Diminuir fonte"><i class="fa-solid fa-minus"></i> A- Diminuir fonte</button>
      <button role="menuitem" id="ac-highlight-links" aria-pressed="false" aria-label="Destacar links"><i class="fa-solid fa-link"></i> Destacar links</button>
      <button role="menuitem" id="ac-marker" aria-pressed="false" aria-label="Marcador de texto"><i class="fa-solid fa-keyboard"></i> Marcador</button>
      <button role="menuitem" id="ac-guide-line" aria-pressed="false" aria-label="Linha guia"><i class="fa-solid fa-keyboard"></i> Linha guia</button>
      <button role="menuitem" id="ac-reset" aria-label="Redefinir acessibilidade"><i class="fa-solid fa-rotate-left"></i> Redefinir</button>
    </div>
  `);

  // Configurações iniciais do menu
  let acFontSize = 16;
  const toggleBtn = document.getElementById("ac-toggle");
  const menu = document.getElementById("ac-menu");

  toggleBtn.addEventListener("click", () => {
    const isOpen = menu.style.display === "flex";
    menu.style.display = isOpen ? "none" : "flex";
    toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  let isReading = false;
  const readBtn = document.getElementById("ac-read");

  readBtn.onclick = () => {
    if (isReading || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isReading = false;
    } else {
      const text = document.body.innerText;
      if (text.trim()) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
          isReading = false;
        };
        window.speechSynthesis.speak(utterance);
        isReading = true;
      }
    }
  };
  // Ativa alto contraste
  document.getElementById("ac-contrast").onclick = function () {
    const isActive = document.body.classList.toggle("ac-contrast");
    this.setAttribute("aria-pressed", String(isActive));
  };
  // Ativa tons de cinza
  document.getElementById("ac-grayscale").onclick = function () {
  const isActive = document.body.classList.toggle("ac-grayscale");
  this.setAttribute("aria-pressed", String(isActive));
  };
  // Aumenta o tamanho da fonte
  document.getElementById("ac-increase-font").onclick = () => {
    acFontSize += 2;
    document.body.style.fontSize = `${acFontSize}px`;
  };
  // Restaura o tamanho original da fonte
  document.getElementById("ac-original-font").onclick = () => {
    acFontSize = 16;
    document.body.style.fontSize = `${acFontSize}px`;
  };
  // Diminui o tamanho da fonte
  document.getElementById("ac-decrease-font").onclick = () => {
    acFontSize = Math.max(12, acFontSize - 2);
    document.body.style.fontSize = `${acFontSize}px`;
  };
  // Destaca links
  document.getElementById("ac-highlight-links").onclick = function () {
    const isActive = document.body.classList.toggle("ac-highlight-links");
    this.setAttribute("aria-pressed", String(isActive));
  };
  // Marca texto selecionado
  let marking = false;
  document.getElementById("ac-marker").onclick = function () {
    marking = !marking;
    this.classList.toggle("active", marking);
    this.setAttribute("aria-pressed", String(marking));
    document.body.style.cursor = marking ? "text" : "";
    if (marking) {
      document.addEventListener("mouseup", highlightSelection);
    } else {
      document.removeEventListener("mouseup", highlightSelection);
    }
  };
  // Adiciona linha guia
  function highlightSelection() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.className = "ac-marker-highlight";

  try {
    span.appendChild(range.extractContents());
    range.insertNode(span);
  } catch (e) {
    console.warn("Erro ao marcar texto:", e);
  }

  selection.removeAllRanges();
  }

  let guideLine = null;
  document.getElementById("ac-guide-line").onclick = function () {
    const active = !guideLine;
    this.setAttribute("aria-pressed", String(active));
    if (active) {
      guideLine = document.createElement("div");
      guideLine.id = "ac-guide-line-bar";
      document.body.appendChild(guideLine);
      document.addEventListener("mousemove", moveGuideLine);
    } else {
      guideLine.remove();
      guideLine = null;
      document.removeEventListener("mousemove", moveGuideLine);
    }
  };
// Redefine acessibilidade
  function moveGuideLine(e) {
    if (guideLine) {
      guideLine.style.top = `${e.clientY}px`;
    }
  }

  document.getElementById("ac-reset").onclick = () => {
    document.body.classList.remove("ac-contrast", "ac-grayscale", "ac-highlight-links");
    document.body.style.fontSize = "";

    document.querySelectorAll(".ac-marker-highlight").forEach(el => {
      el.replaceWith(...el.childNodes);
    });

    if (guideLine) {
      guideLine.remove();
      guideLine = null;
    }

    document.body.style.cursor = "";
    document.querySelectorAll("#ac-marker, #ac-guide-line, #ac-highlight-links, #ac-contrast, #ac-grayscale").forEach(btn => {
      btn.setAttribute("aria-pressed", "false");
      btn.classList.remove("active");
    });
  };
}

function adjustAccessibilityButtonPosition() {
  const acToggle = document.querySelector("#ac-toggle");
  const vlibrasButton = document.querySelector("div[vw] > div[vw-access-button].vlibras-toggle");

  if (!acToggle) return;

  // Correção dinâmica de margem mínima conforme densidade da tela
  const pixelRatio = window.devicePixelRatio || 1;
  const baseSpacing = 10; // espaçamento visual mínimo desejado
  const spacing = Math.max(baseSpacing * (1 / pixelRatio), 8); // mantém proporção visual

  // Detectar iPhone via user agent (seguro, apenas para ajuste fino)
  const isIphone = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const safeInsetTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)')) || 0;
  const safeOffset = isIphone ? safeInsetTop + 4 : safeInsetTop;

  if (vlibrasButton) {
    const vlRect = vlibrasButton.getBoundingClientRect();
    const newTop = vlRect.bottom + spacing + window.scrollY + safeOffset;

    // Aplica valor com margem mínima garantida
    acToggle.style.top = `${newTop}px`;
  } else {
    // fallback seguro quando não há VLibras
    acToggle.style.top = `calc(env(safe-area-inset-top) + 130px)`;
  }
}

// Monitoramento reativo e responsivo
window.addEventListener("load", () => setTimeout(adjustAccessibilityButtonPosition, 800));
window.addEventListener("resize", adjustAccessibilityButtonPosition);
window.addEventListener("orientationchange", adjustAccessibilityButtonPosition);

const observer = new MutationObserver(() => {
  adjustAccessibilityButtonPosition();
});
observer.observe(document.body, { childList: true, subtree: true });

function positionAccessibilityMenu() {
  const acToggle = document.querySelector("#ac-toggle");
  const acMenu = document.querySelector("#ac-menu");
  if (!acToggle || !acMenu) return;

  // Distância entre o botão e o menu
  const spacing = 10;

  // Pega a posição real do botão na tela
  const toggleRect = acToggle.getBoundingClientRect();
  const topPosition = toggleRect.bottom + spacing + window.scrollY;
  const rightPosition = window.innerWidth - toggleRect.right;
  // Aplica a posição calculada ao menu
  acMenu.style.top = `${topPosition}px`;
  acMenu.style.right = `${rightPosition}px`;
}

// Chama quando a tela muda
window.addEventListener("resize", positionAccessibilityMenu);
window.addEventListener("scroll", positionAccessibilityMenu);
window.addEventListener("orientationchange", positionAccessibilityMenu);
window.addEventListener("load", () => setTimeout(positionAccessibilityMenu, 700));

// Garante que o menu se alinhe quando for aberto
document.addEventListener("click", (e) => {
  const toggle = document.getElementById("ac-toggle");
  const menu = document.getElementById("ac-menu");

  if (toggle && e.target.closest("#ac-toggle")) {
    const isVisible = menu.classList.toggle("active");
    positionAccessibilityMenu();
    toggle.setAttribute("aria-expanded", String(isVisible));
  } else if (!e.target.closest("#ac-menu")) {
    // Clica fora => fecha
    menu.classList.remove("active");
  }
});

// Inicializa automaticamente
if (document.readyState !== "loading") {
  initAccessibilityMenu();
} else {
  document.addEventListener("DOMContentLoaded", initAccessibilityMenu);
}