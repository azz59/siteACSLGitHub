/* =========================================================
   TÉLÉCHARGEMENT DES LOGOS
========================================================= */
function downloadAllLogos() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    var msg = document.getElementById('logos-mobile-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'logos-mobile-msg';
      msg.textContent = 'Logos ACSL : disponibles uniquement sur ordinateur.';
      msg.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:10px 18px;border-radius:10px;font-size:0.85rem;z-index:9999;text-align:center;max-width:80vw;box-shadow:0 4px 12px rgba(0,0,0,0.4);';
      document.body.appendChild(msg);
      setTimeout(function() { msg.remove(); }, 3500);
    }
    return;
  }

  const logos = [
    { url: 'docs/LOGOACSLToutBlanc.png', name: 'LOGOACSLToutBlanc.png' },
    { url: 'docs/LOGOACSLNoirFondTrans.png', name: 'LOGOACSLNoirFondTrans.png' },
    { url: 'docs/LOGOACSLFondBlanc.png', name: 'LOGOACSLFondBlanc.png' },
    { url: 'docs/LOGOACSLFondNoir.png', name: 'LOGOACSLFondNoir.png' },
    { url: 'docs/LOGOACSLBlancFondTrans.png', name: 'LOGOACSLBlancFondTrans.png' }
  ];
  logos.forEach(function(logo, i) {
    setTimeout(function() {
      const a = document.createElement('a');
      a.href = logo.url;
      a.download = logo.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, i * 300);
  });
}

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

/* =========================================================
   FORMULAIRE DE CONTACT
========================================================= */
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const contactClose = document.querySelector('.contact-close');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Ouvrir le modal
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    contactModal.style.display = 'block';
  });
}

// Fermer le modal
if (contactClose) {
  contactClose.addEventListener('click', () => {
    contactModal.style.display = 'none';
  });
}

// Fermer au clic en dehors du modal
window.addEventListener('click', (event) => {
  if (event.target === contactModal) {
    contactModal.style.display = 'none';
  }
});

// Gestion de l'envoi du formulaire avec EmailJS
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Désactiver le bouton d'envoi pendant le traitement
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    // Récupérer les données du formulaire
    const templateParams = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      to_email: 'acslomme@gmail.com'
    };

    try {
      // Envoi via EmailJS
      console.log('Tentative d\'envoi avec les paramètres:', templateParams);
      
      const response = await emailjs.send(
        'service_f0f51ab',
        'template_lxrp5jo',
        templateParams
      );

      console.log('Email envoyé avec succès!', response.status, response.text);

      // Afficher un message de succès
      formStatus.textContent = '✓ Message envoyé avec succès !';
      formStatus.className = 'form-status success';

      // Réinitialiser le formulaire
      contactForm.reset();

      // Fermer le modal après 3 secondes
      setTimeout(() => {
        contactModal.style.display = 'none';
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
      }, 3000);

    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Message d\'erreur:', error.text || error.message);
      console.error('Statut:', error.status);

      // Afficher un message d'erreur détaillé
      let errorMessage = '✗ Erreur lors de l\'envoi. ';
      
      if (error.text) {
        errorMessage += error.text;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Vérifiez votre configuration EmailJS.';
      }
      
      formStatus.textContent = errorMessage;
      formStatus.className = 'form-status error';
    } finally {
      // Réactiver le bouton
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer';
    }
  });
}
/* =========================================================
   COMPTE À REBOURS (OPTIMISÉ)
========================================================= */
function updateCountdown() {
    // Utilisation d'un format plus universel pour le constructeur Date
    const targetDate = new Date(2026, 3, 6).getTime(); // 3 = Avril (index 0)
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // On vérifie qu'au moins un élément existe avant de calculer
    if (!daysElement) return;

    if (timeRemaining > 0) {
        const d = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const h = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Affichage avec ajout d'un zéro devant si chiffre unique (ex: 09)
        daysElement.textContent = d;
        hoursElement.textContent = h < 10 ? '0' + h : h;
        minutesElement.textContent = m < 10 ? '0' + m : m;
        secondsElement.textContent = s < 10 ? '0' + s : s;
    } else {
        // Date passée : on met tout à zéro
        [daysElement, hoursElement, minutesElement, secondsElement].forEach(el => el.textContent = '00');
    }
}

// Démarrer le compte à rebours après le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('days')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});

/* =========================================================
   ACTU LOTO - MODAL PLEIN ÉCRAN (IMAGE)
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtnLoto = document.querySelector('.actu-toggle-loto');
  const modalLoto = document.getElementById('actuModalLoto');
  
  if (toggleBtnLoto && modalLoto) {
    const closeBtnLoto = modalLoto.querySelector('.actu-modal-close');
    const overlayLoto = modalLoto.querySelector('.actu-modal-overlay');
    
    // Ouvrir la modal
    toggleBtnLoto.addEventListener('click', function(e) {
      e.preventDefault();
      modalLoto.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    
    // Fermer la modal avec le bouton X
    if (closeBtnLoto) {
      closeBtnLoto.addEventListener('click', function() {
        modalLoto.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    
    // Fermer la modal en cliquant sur l'overlay
    if (overlayLoto) {
      overlayLoto.addEventListener('click', function() {
        modalLoto.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    
    // Fermer avec la touche Echap
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalLoto.style.display === 'flex') {
        modalLoto.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
});

/* =========================================================
   ACTU BADMINTON - MODAL PLEIN ÉCRAN (IMAGE)
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtnBadminton = document.querySelector('.actu-toggle-badminton');
  const modalBadminton = document.getElementById('actuModalBadminton');
  
  if (toggleBtnBadminton && modalBadminton) {
    const closeBtnBadminton = modalBadminton.querySelector('.actu-modal-close');
    const overlayBadminton = modalBadminton.querySelector('.actu-modal-overlay');
    
    // Ouvrir la modal
    toggleBtnBadminton.addEventListener('click', function(e) {
      e.preventDefault();
      modalBadminton.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    
    // Fermer la modal avec le bouton X
    if (closeBtnBadminton) {
      closeBtnBadminton.addEventListener('click', function() {
        modalBadminton.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    
    // Fermer la modal en cliquant sur l'overlay
    if (overlayBadminton) {
      overlayBadminton.addEventListener('click', function() {
        modalBadminton.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    
    // Fermer avec la touche Echap
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalBadminton.style.display === 'flex') {
        modalBadminton.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
});

/* =========================================================
   ACTU MEETING PARITÉ - MODAL PLEIN ÉCRAN (IMAGE)
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtnParite = document.querySelector('.actu-toggle-parite');
  const modalParite = document.getElementById('actuModalParite');
  
  if (toggleBtnParite && modalParite) {
    const closeBtnParite = modalParite.querySelector('.actu-modal-close');
    const overlayParite = modalParite.querySelector('.actu-modal-overlay');
    
    toggleBtnParite.addEventListener('click', function(e) {
      e.preventDefault();
      modalParite.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    
    if (closeBtnParite) {
      closeBtnParite.addEventListener('click', function() {
        modalParite.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    
    if (overlayParite) {
      overlayParite.addEventListener('click', function() {
        modalParite.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalParite.style.display === 'flex') {
        modalParite.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
});

/* =========================================================
   ACTU 3 - MODAL PLEIN ÉCRAN (TEXTE)
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.actu-toggle');
  const modal = document.getElementById('actuModal');
  
  if (toggleBtn && modal) {
    const closeBtn = modal.querySelector('.actu-modal-close');
    const overlay = modal.querySelector('.actu-modal-overlay');
    
    // Ouvrir la modal
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Empêche le scroll
    });
    
    // Fermer la modal avec le bouton X
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Réactive le scroll
      });
    }
    
    // Fermer la modal en cliquant sur l'overlay
    if (overlay) {
      overlay.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    
    // Fermer avec la touche Echap
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
});

/* =========================================================
   BANDEAUX CLUBS - DRAG TO SCROLL
========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel.clubs');
  
  carousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    // --- ÉVÉNEMENTS SOURIS (DESKTOP) ---
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      
      // Pause de l'animation CSS si elle existe
      const track = carousel.querySelector('.carousel-track');
      if (track) track.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      // Relance l'animation après un court délai
      setTimeout(() => {
        const track = carousel.querySelector('.carousel-track');
        if (track) track.style.animationPlayState = 'running';
      }, 500);
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Vitesse de scroll
      carousel.scrollLeft = scrollLeft - walk;
    });

    // --- ÉVÉNEMENTS TACTILES (MOBILE) ---
    // Le scroll naturel au doigt fonctionnera déjà grâce au CSS "overflow-x: auto",
    // mais on met en pause l'animation pour éviter les saccades.
    carousel.addEventListener('touchstart', () => {
      const track = carousel.querySelector('.carousel-track');
      if (track) track.style.animationPlayState = 'paused';
    }, {passive: true});

    carousel.addEventListener('touchend', () => {
      setTimeout(() => {
        const track = carousel.querySelector('.carousel-track');
        if (track) track.style.animationPlayState = 'running';
      }, 1000);
    }, {passive: true});
  });
});

/* =========================================================
   INFO SLIDES — CROSS-FADE SMOOTH
========================================================= */
(function () {
  const slides = Array.from(document.querySelectorAll('.info-slide'));
  if (slides.length < 2) return;

  let current = 0;
  const DISPLAY_DURATION = 8000; // ms avant le prochain fondu

  function goToNext() {
    const leaving = slides[current];
    current = (current + 1) % slides.length;
    const entering = slides[current];

    // Démarrer la sortie et l'entrée simultanément (vrai cross-fade)
    leaving.classList.remove('is-active');
    leaving.classList.add('is-leaving');

    entering.classList.add('is-active');

    // Nettoyer is-leaving après la transition
    leaving.addEventListener('transitionend', () => {
      leaving.classList.remove('is-leaving');
    }, { once: true });
  }

  setInterval(goToNext, DISPLAY_DURATION);
})();
