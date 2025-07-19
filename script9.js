// ROLAGEM SUAVE AO CLICAR EM "SWIPE"
document.addEventListener('DOMContentLoaded', function () {
  const swipe = document.querySelector('.swipe');
  const rankingSection = document.querySelector('.ranking');

  if (swipe && rankingSection) {
    swipe.addEventListener('click', () => {
      rankingSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
// ROLAGEM SUAVE AO CLICAR EM "SWIPE"
document.addEventListener('DOMContentLoaded', function () {
  const swipe = document.querySelector('.swipe');
  const rankingSection = document.querySelector('.ranking');

  if (swipe && rankingSection) {
    swipe.addEventListener('click', () => {
      rankingSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// ANIMAÇÃO DE ENTRADA SIMPLES
const revealOnScroll = () => {
  const elements = document.querySelectorAll('.place, .hero h1, .descriptions p, .reveal');

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;

    if (isVisible) {
      el.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
