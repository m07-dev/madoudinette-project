document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carousel__content');

  // Sécurité : si la section n'existe pas sur la page, on arrête.
  if (!track) return;

  // 1) On récupère les cartes originales
  const originalCards = Array.from(track.children);

  // 2) On clone chaque carte et on l'ajoute à la fin
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // Bonne pratique pour l'accessibilité
    track.appendChild(clone);
  });

  // 3) Fonction pour calculer la largeur totale du "set original"
  // C'est ce qui permet à l'animation de savoir exactement quand boucler.
  const computeWidth = () => {
    // On prend seulement les cartes originales (la première moitié)
    const set = Array.from(track.children).slice(0, originalCards.length);

    let total = 0;
    set.forEach(el => {
      const style = window.getComputedStyle(el);
      // On inclut la marge droite (le fameux mr-8 de Tailwind) dans le calcul
      const marginRight = parseFloat(style.marginRight) || 0;
      total += el.offsetWidth + marginRight;
    });
    return total;
  };

  // On calcule et on applique la variable CSS
  const scrollWidth = computeWidth();
  track.style.setProperty('--scroll-width', scrollWidth + 'px');

  // 4) Ajuste la durée selon la largeur (Vitesse constante)
  // Plus il y a de cartes, plus le temps augmente pour garder la même vitesse de défilement
  const speed = 60; // Pixels par seconde (ajustez ce chiffre pour aller +/- vite)
  const duration = scrollWidth / speed;
  track.style.setProperty('--animation-duration', duration + 's');

  // 5) Recalcul automatique si on redimensionne la fenêtre
  window.addEventListener('resize', () => {
    const newW = computeWidth();
    track.style.setProperty('--scroll-width', newW + 'px');
    const newD = newW / speed;
    track.style.setProperty('--animation-duration', newD + 's');
  });
});
  // On récupère le bouton et le menu mobile
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  // Quand on clique sur le bouton...
  btn.addEventListener('click', () => {
  // On ajoute ou enlève la classe "hidden"
  menu.classList.toggle('hidden');
});
