document.addEventListener("DOMContentLoaded", () => {
  

  // 1. caroussel vitesses et boucles

  const track = document.querySelector('.carousel__content');

  if (track) {
    // On récupère les cartes originales
    const originalCards = Array.from(track.children);

    // On clone chaque carte pour l'effet infini
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Calcul de la largeur totale
    const computeWidth = () => {
      const set = Array.from(track.children).slice(0, originalCards.length);
      let total = 0;
      set.forEach(el => {
        const style = window.getComputedStyle(el);
        const marginRight = parseFloat(style.marginRight) || 0;
        total += el.offsetWidth + marginRight;
      });
      return total;
    };

    // Application des variables CSS
    const scrollWidth = computeWidth();
    track.style.setProperty('--scroll-width', scrollWidth + 'px');

    const speed = 60; // Vitesse (pixels/seconde)
    const duration = scrollWidth / speed;
    track.style.setProperty('--animation-duration', duration + 's');

    // Recalcul au redimensionnement
    window.addEventListener('resize', () => {
      const newW = computeWidth();
      track.style.setProperty('--scroll-width', newW + 'px');
      const newD = newW / speed;
      track.style.setProperty('--animation-duration', newD + 's');
    });
  }

 // Nav responsive pour mobile
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      menu.classList.toggle('hidden');
      console.log("Menu basculé !");
    });
  }

});