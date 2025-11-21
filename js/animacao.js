// BENEFÍCIOS CONCEDIDOS

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animarElementosVisiveis() {
    const itens = document.querySelectorAll('.dados-benef .item');

    itens.forEach((item) => {
        if (isElementInViewport(item)) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
}

function handleScroll() {
    animarElementosVisiveis();
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};

const observer = new IntersectionObserver(animarElementosVisiveis, options);

const itens = document.querySelectorAll('.dados-benef .item');
itens.forEach((item) => {
    observer.observe(item);
});

window.addEventListener('scroll', handleScroll);

animarElementosVisiveis();

function animarElementosVisiveis() {
    const itens = document.querySelectorAll('.dados-benef .item');
    let delay = 0;

    itens.forEach((item) => {
        if (isElementInViewport(item)) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, delay);
            delay += 600;
        }
    });
}