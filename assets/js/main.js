/* ==========================================================================
   OFFICIAL ROYAL PORTAL - JAVASCRIPT LOGIC WITH PROGRESSIVE SCROLLING
   HRM Oba Olumide Atanda Osunsina (Òsómẹ̀kùn I) - The Olu of Ifoland
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-label');
  const heroCrestImg = document.getElementById('hero-crest-img');
  const heroCrestCard = document.querySelector('.hero-crest-card');
  const brandCrestImg = document.getElementById('brand-crest-img');
  const explorerCrestImg = document.getElementById('explorer-crest-img');
  const floatingStampImg = document.getElementById('floating-stamp-img');
  
  const editionBtns = document.querySelectorAll('.edition-btn');
  const floatingStamp = document.getElementById('royal-floating-stamp');
  const modalOverlay = document.getElementById('proclamation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openProclamationBtns = document.querySelectorAll('.trigger-proclamation');

  // Progressive Scroll Elements
  const scrollProgressBar = document.getElementById('royal-scroll-progress-bar');
  const stampProgressCircle = document.getElementById('stamp-progress-circle');
  const stampPercentText = document.getElementById('stamp-scroll-percent');

  // Asset paths (100% transparent vector extractions)
  const assets = {
    gold: 'assets/images/royal-crest-gold-transparent.png',
    navy: 'assets/images/royal-crest-navy-transparent.png',
    circularSeal: 'assets/images/royal-seal-circular-transparent.png'
  };

  // State: 'gold' or 'navy'
  let currentTheme = localStorage.getItem('royal-theme') || 'gold';

  // Apply Theme Function
  function applyTheme(theme) {
    if (theme === 'navy') {
      document.body.classList.add('theme-navy');
      if (themeLabel) themeLabel.textContent = 'Royal Navy Edition';
      if (heroCrestImg) heroCrestImg.src = assets.navy;
      if (brandCrestImg) brandCrestImg.src = assets.navy;
      if (explorerCrestImg) explorerCrestImg.src = assets.navy;
      if (floatingStampImg) floatingStampImg.src = assets.navy;
      
      // Sync edition buttons
      editionBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.edition === 'navy');
      });
    } else {
      document.body.classList.remove('theme-navy');
      if (themeLabel) themeLabel.textContent = 'Imperial Gold Edition';
      if (heroCrestImg) heroCrestImg.src = assets.gold;
      if (brandCrestImg) brandCrestImg.src = assets.gold;
      if (explorerCrestImg) explorerCrestImg.src = assets.gold;
      if (floatingStampImg) floatingStampImg.src = assets.gold;

      // Sync edition buttons
      editionBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.edition === 'gold');
      });
    }
    localStorage.setItem('royal-theme', theme);
  }


  // Initial Theme load
  applyTheme(currentTheme);

  // Toggle Theme Listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'gold' ? 'navy' : 'gold';
      applyTheme(currentTheme);
    });
  }

  // Edition Switcher Buttons in Explorer Section
  editionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedEdition = btn.dataset.edition;
      applyTheme(selectedEdition);
    });
  });

  // ==========================================================================
  // PROGRESSIVE SCROLLING SYSTEM
  // ==========================================================================

  const circumference = 2 * Math.PI * 45; // ~282.74

  function handleScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight <= 0) return;

    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    const progressPercent = Math.round(progress * 100);

    // 1. Top linear bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress * 100}%`;
    }

    // 2. Circular progress ring on lower right stamp
    if (stampProgressCircle) {
      const offset = circumference - (progress * circumference);
      stampProgressCircle.style.strokeDashoffset = offset;
    }

    // 3. Percentage badge on stamp
    if (stampPercentText) {
      stampPercentText.textContent = `${progressPercent}%`;
    }

    // 4. Subtle Parallax on Hero Crest (first 800px)
    if (heroCrestCard && scrollTop < 800) {
      const parallaxY = scrollTop * 0.12;
      heroCrestCard.style.transform = `translateY(${parallaxY}px)`;
    }
  }

  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress(); // Initial run

  // ==========================================================================
  // INTERSECTION OBSERVER FOR SCROLL REVEALS
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-scroll, .reveal-scroll-scale');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.02,
      rootMargin: '60px 0px 60px 0px'
    });


    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ==========================================================================
  // MODAL: PROCLAMATION POPUP
  // ==========================================================================
  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (floatingStamp) {
    floatingStamp.addEventListener('click', openModal);
  }

  openProclamationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
