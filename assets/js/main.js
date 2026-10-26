/* ==========================================================================
   OFFICIAL ROYAL PORTAL - JAVASCRIPT LOGIC
   Featuring: Dark Mode, Parallel/Parallax Scrolling, Mobile Drawer,
   and Progressive Circular Reading Meter
   HRM Oba Olumide Atanda Osunsina (Òsómẹ̀kùn I)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure document scroll is completely free
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';

  // Elements

  const darkModeToggleBtn = document.getElementById('dark-mode-toggle');
  const darkModeDrawerBtn = document.getElementById('dark-mode-drawer-btn');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const heroCrestImg = document.getElementById('hero-crest-img');
  const heroCrestCard = document.querySelector('.hero-crest-card');
  const brandCrestImg = document.getElementById('brand-crest-img');
  const floatingStampImg = document.getElementById('floating-stamp-img');
  
  const floatingStamp = document.getElementById('royal-floating-stamp');
  const modalOverlay = document.getElementById('proclamation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openProclamationBtns = document.querySelectorAll('.trigger-proclamation');

  // Progressive Scroll Elements
  const scrollProgressBar = document.getElementById('royal-scroll-progress-bar');
  const stampProgressCircle = document.getElementById('stamp-progress-circle');
  const stampPercentText = document.getElementById('stamp-scroll-percent');

  // Parallax elements
  const parallaxShape1 = document.querySelector('.parallax-shape-1');
  const parallaxShape2 = document.querySelector('.parallax-shape-2');
  const parallaxShape3 = document.querySelector('.parallax-shape-3');
  const monarchPhotoFrame = document.querySelector('.monarch-photo-frame');

  // Asset paths (100% transparent vector extractions)
  const assets = {
    gold: 'assets/images/royal-crest-gold-transparent.png',
    navy: 'assets/images/royal-crest-navy-transparent.png',
    circularSeal: 'assets/images/royal-seal-circular-transparent.png'
  };

  // ==========================================================================
  // DARK MODE SYSTEM
  // ==========================================================================
  let isDarkMode = localStorage.getItem('royal-dark-mode') === 'true';

  function applyDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add('dark-mode');
      if (darkModeToggleBtn) {
        darkModeToggleBtn.innerHTML = `<span>☀️</span><span>Light Mode</span>`;
      }
      if (darkModeDrawerBtn) {
        darkModeDrawerBtn.innerHTML = `<span>☀️</span><span>Light Mode</span>`;
      }
      if (heroCrestImg) heroCrestImg.src = assets.gold;
      if (brandCrestImg) brandCrestImg.src = assets.gold;
      if (floatingStampImg) floatingStampImg.src = assets.gold;
    } else {
      document.body.classList.remove('dark-mode');
      if (darkModeToggleBtn) {
        darkModeToggleBtn.innerHTML = `<span>🌙</span><span>Dark Mode</span>`;
      }
      if (darkModeDrawerBtn) {
        darkModeDrawerBtn.innerHTML = `<span>🌙</span><span>Dark Mode</span>`;
      }
      if (heroCrestImg) heroCrestImg.src = assets.gold;
      if (brandCrestImg) brandCrestImg.src = assets.gold;
      if (floatingStampImg) floatingStampImg.src = assets.gold;
    }
    localStorage.setItem('royal-dark-mode', enabled);
  }

  // Initial Dark Mode load
  applyDarkMode(isDarkMode);

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    applyDarkMode(isDarkMode);
  }

  if (darkModeToggleBtn) darkModeToggleBtn.addEventListener('click', toggleDarkMode);
  if (darkModeDrawerBtn) darkModeDrawerBtn.addEventListener('click', toggleDarkMode);

  // ==========================================================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================================================
  function openDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ==========================================================================
  // PARALLEL / PARALLAX SCROLLING ENGINE
  // ==========================================================================
  const circumference = 2 * Math.PI * 45; // ~282.74

  let ticking = false;

  function updateParallelScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight > 0) {
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
    }

    // Parallel Background Layers: multi-velocity motion
    if (parallaxShape1) {
      parallaxShape1.style.transform = `translateY(${scrollTop * 0.18}px)`;
    }
    if (parallaxShape2) {
      parallaxShape2.style.transform = `translateY(${scrollTop * -0.12}px)`;
    }
    if (parallaxShape3) {
      parallaxShape3.style.transform = `translateY(${scrollTop * 0.15}px)`;
    }

    // Prominent Parallax on the First Landing Page Hero Logo (up to 950px scroll)
    if (heroCrestCard && scrollTop < 950) {
      const crestY = scrollTop * 0.45; // 45% parallel rate
      const crestScale = Math.max(1 - (scrollTop * 0.00035), 0.76); // Scales gracefully down
      const crestOpacity = Math.max(1 - (scrollTop * 0.0011), 0.25); // Subtle atmospheric fade
      const crestRotate = (scrollTop * 0.015); // Gentle rotational tilt

      heroCrestCard.style.transform = `translate3d(0, ${crestY}px, 0) scale(${crestScale}) rotate(${crestRotate}deg)`;
      heroCrestCard.style.opacity = crestOpacity;
    } else if (heroCrestCard && scrollTop === 0) {
      heroCrestCard.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
      heroCrestCard.style.opacity = '1';
    }




    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallelScroll);
      ticking = true;
    }
  }, { passive: true });

  updateParallelScroll(); // Initial run

  // Interactive 3D Cursor Parallax on Hero Logo
  const heroSection = document.getElementById('hero');
  if (heroSection && heroCrestCard && window.innerWidth > 992) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const crestY = scrollTop < 950 ? scrollTop * 0.45 : 0;
      const crestScale = scrollTop < 950 ? Math.max(1 - (scrollTop * 0.00035), 0.76) : 1;
      
      heroCrestCard.style.transform = `translate3d(${x * 12}px, ${crestY + y * 12}px, 0) scale(${crestScale}) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      updateParallelScroll();
    });
  }


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

  if (floatingStamp) floatingStamp.addEventListener('click', openModal);

  openProclamationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

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
