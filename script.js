// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const start = window.pageYOffset;
        const end = target.getBoundingClientRect().top + start;
        const duration = 1600; // quanto maior, mais suave
        let startTime = null;

        function easeInOut(t) {
            return t < 0.5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        function scrollAnimation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOut(progress);

            window.scrollTo(0, start + (end - start) * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        requestAnimationFrame(scrollAnimation);
    });
});

// SCROLL REVEAL
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}
// ZOOM SUAVE NO VIDEO DO HERO
const hero = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // limita o efeito apenas dentro do hero
    if (scrollY <= heroHeight) {
        const zoom = 1 + (scrollY / heroHeight) * 0.15; 
        heroVideo.style.transform = 
            `translate(-50%, -50%) scale(${zoom})`;
    }
});
// ACCORDION METODOLOGIA
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        accordionItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });

        item.classList.toggle('active');
    });
});


// ACCORDION ENTREGÁVEIS
const entregaveis = document.querySelectorAll('.entregavel');

entregaveis.forEach(item => {
    const header = item.querySelector('.entregavel-header');

    header.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});



window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);