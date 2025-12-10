// ===== MENU BURGER =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');          // anime le hamburger
  navMenu.classList.toggle('nav-visible');     // affiche/masque le menu
  navMenu.classList.toggle('nav-hidden');
});

// Fermer le menu si on clique sur un lien (utile pour mobile)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('nav-visible');
    navMenu.classList.add('nav-hidden');
  });
});


// ===== SCROLL FLUIDE =====
document.querySelectorAll('#navMenu a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const href = this.getAttribute('href');

    if(href.startsWith('#')) {
      // Lien interne → scroll fluide
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) {
        target.scrollIntoView({behavior:'smooth'});
      }
    }
    // Lien externe ou vers une autre page → comportement normal

    // Fermer le menu dans tous les cas
    hamburger.classList.remove('open');
    navMenu.classList.add('nav-hidden');
    navMenu.classList.remove('nav-visible');
  });
});


// ===== CARDS CLUBS =====
// Afficher / cacher les listes au clic
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const listId = card.getAttribute('data-list');
    const ul = document.getElementById(listId);
    ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
  });
});



// ===== CARDS A PROPOS =====
document.querySelectorAll('.apropos-cards .card').forEach(card=>{
  card.addEventListener('click', ()=> card.classList.toggle('open'));
});



/* =========================================================
   RETOUR EN IMAGES (images + menu déroulant)
========================================================= */
// ===== CARTES "RETOUR EN IMAGES" =====
document.querySelectorAll('.info-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') return;
    card.classList.toggle('open');
  });

});









