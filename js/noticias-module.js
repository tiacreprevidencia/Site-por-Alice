(function(){
  const containers = Array.from(document.querySelectorAll('.slider-container'));
  if (!containers.length) return;

  const instances = [];

  function isMobile(){ return window.matchMedia('(max-width:767px)').matches; }
  function isTablet(){ return window.matchMedia('(min-width:768px) and (max-width:991px)').matches; }

  containers.forEach(container => {
    const root = container.closest('.acesso-rapido') || document;
    const mainImg = root.querySelector('.main-news img');
    const slider = container.querySelector('.slider');
    const items = Array.from(container.querySelectorAll('.slider-item'));
    const btnUp = container.querySelector('.arrow-up');
    const btnDown = container.querySelector('.arrow-down');

    if (!slider || !items.length) return;
    let currentIndex = 0;
    let itemH = 0;
    let visible = 1;

    function setDesktopHeights(){
      const mainH = mainImg ? mainImg.getBoundingClientRect().height : 0;
      const firstH = items[0].getBoundingClientRect().height || 0;
      const desiredContainerH = mainH || (firstH * 2) || 560;
      const calcItemH = Math.round(desiredContainerH / 2);

      container.style.height = desiredContainerH + 'px';
      items.forEach(it => {
        it.style.height = calcItemH + 'px';
        const img = it.querySelector('img');
        if (img) { img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover'; }
      });

      itemH = calcItemH; visible = 2;
    }

    function setMobileHeights(){
      const firstRect = items[0].getBoundingClientRect();
      const calcItemH = Math.max(Math.round(firstRect.height) || 260, 180);
      container.style.height = calcItemH + 'px';
      items.forEach(it => {
        it.style.height = calcItemH + 'px';
        const img = it.querySelector('img');
        if (img) { img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover'; }
      });

      itemH = calcItemH; visible = 1;
    }

    function setTabletHeights(){
      const mainH = mainImg ? mainImg.getBoundingClientRect().height : 0;
      const firstH = items[0].getBoundingClientRect().height || 0;
      const desiredContainerH = mainH || (firstH * 2) || 560;
      const calcItemH = Math.floor(desiredContainerH / 2);

      container.style.height = desiredContainerH + 'px';
      items.forEach(it => {
        it.style.height = calcItemH + 'px';
        const img = it.querySelector('img');
        if (img) { img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover'; }
      });

      itemH = calcItemH; visible = 2; 
    }

    function calc(){
      if (isMobile()) setMobileHeights();
      else if (isTablet()) setTabletHeights();
      else setDesktopHeights();

      currentIndex = Math.min(currentIndex, Math.max(0, items.length - visible));
      update(); 
      updateButtons();
    }

    function update(){ slider.style.transform = `translate3d(0, -${currentIndex * itemH}px, 0)`; }
    function updateButtons(){ 
      if (btnUp) btnUp.classList.toggle('disabled', currentIndex <= 0); 
      if (btnDown) btnDown.classList.toggle('disabled', currentIndex >= items.length - visible); 
    }

    function up(){ if (currentIndex <= 0) return; currentIndex = Math.max(0, currentIndex - 1); update(); updateButtons(); }
    function down(){ if (currentIndex >= items.length - visible) return; currentIndex = Math.min(items.length - visible, currentIndex + 1); update(); updateButtons(); }

    if (btnUp) btnUp.addEventListener('click', up);
    if (btnDown) btnDown.addEventListener('click', down);

    let startY=0, curY=0, touching=false;
    slider.addEventListener('touchstart', e => { if (e.touches.length !==1) return; touching=true; startY = e.touches[0].clientY; slider.style.transition='none'; }, {passive:true});
    slider.addEventListener('touchmove', e => { if (!touching) return; curY = e.touches[0].clientY; const diff = curY - startY; slider.style.transform = `translate3d(0, ${-currentIndex*itemH - diff}px, 0)`; }, {passive:true});
    slider.addEventListener('touchend', () => { if (!touching) return; touching=false; slider.style.transition=''; const diff = curY - startY; const threshold = (itemH || 120)*0.18; if (diff > threshold) currentIndex = Math.max(0, currentIndex - 1); else if (diff < -threshold) currentIndex = Math.min(items.length - visible, currentIndex + 1); update(); updateButtons(); startY=curY=0; }, {passive:true});

    const imgs = root.querySelectorAll('img');
    imgs.forEach(img => { if (!img.complete) img.addEventListener('load', calc); });

    let rT=null; window.addEventListener('resize', ()=>{ clearTimeout(rT); rT = setTimeout(calc,90); });

    setTimeout(calc,120);

    instances.push({ calc, up, down });
  });

  if (instances.length){ 
    window.moveUp = function(){ instances[0].up(); }; 
    window.moveDown = function(){ instances[0].down(); }; 
  }
  else { 
    window.moveUp = window.moveDown = function(){}; 
  }

})();