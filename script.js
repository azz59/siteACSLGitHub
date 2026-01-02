/* =========================================================
   MENU BURGER
========================================================= */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('nav-visible');
    navMenu.classList.toggle('nav-hidden');
  });

  // Fermer le menu au clic sur un lien
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('nav-visible');
      navMenu.classList.add('nav-hidden');
    });
  });
}

/* =========================================================
   SCROLL FLUIDE (ANCRES)
========================================================= */
document.querySelectorAll('#navMenu a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Ferme le menu dans tous les cas (mobile)
    if (hamburger && navMenu) {
      hamburger.classList.remove('open');
      navMenu.classList.add('nav-hidden');
      navMenu.classList.remove('nav-visible');
    }
  });
});

/* =========================================================
   CARDS CLUBS (LISTES)
========================================================= */
document.querySelectorAll('.card[data-list]').forEach(card => {
  card.addEventListener('click', () => {
    const listId = card.getAttribute('data-list');
    const ul = document.getElementById(listId);
    if (ul) {
      ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
    }
  });
});

/* =========================================================
   CARDS À PROPOS
========================================================= */
document.querySelectorAll('.apropos-cards .card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});

/* =========================================================
   RETOUR EN IMAGES
========================================================= */
document.querySelectorAll('.retour-en-images .image-block').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.buttons a')) return;
    card.classList.toggle('open');
  });
});

/* =========================================================
   CARROUSEL ÉVÉNEMENTS + POINTS
========================================================= */
const eventsTrack = document.querySelector('.events-track');
const events = document.querySelectorAll('.events-track .event');
const dotsContainer = document.querySelector('.events-dots');

if (eventsTrack && events.length && dotsContainer) {
  const dots = [];

  // Création des points
  events.forEach((_, index) => {
    const dot = document.createElement('button');
    if (index === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
      eventsTrack.scrollTo({
        left: index * eventsTrack.clientWidth,
        behavior: 'smooth'
      });
    });

    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  // Synchronisation scroll → point actif
  eventsTrack.addEventListener('scroll', () => {
    const index = Math.round(eventsTrack.scrollLeft / eventsTrack.clientWidth);
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  });
}
