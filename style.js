/* =========================================================
   The Dental Point — script.js
   Handles: loader, custom cursor, ambient particles, scroll
   progress, nav, counters, reveal animations, services &
   gallery rendering, before/after slider, timeline, FAQ,
   lightbox, appointment modal, forms.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     DATA — services & gallery (rendered into the DOM)
  --------------------------------------------------------- */
  const SERVICES = [
    {
      title: 'Root Canal Therapy',
      desc: 'Painless, precise root canal treatment that saves your natural tooth in as few visits as possible.',
      img: 'photos/root canal.webp',
      icon: '<path d="M12 2C9 2 6.5 3.8 6.5 7.2c0 2.1.6 3.1 1 5.4.4 2.2.4 5.6 1.6 7.7.5.9 1.2 1.5 1.9 1.5.9 0 1.2-1 1.5-2.6.2-1.2.4-2.7 1.5-2.7s1.3 1.5 1.5 2.7c.3 1.6.6 2.6 1.5 2.6.7 0 1.4-.6 1.9-1.5 1.2-2.1 1.2-5.5 1.6-7.7.4-2.3 1-3.3 1-5.4C17.5 3.8 15 2 12 2z" stroke="currentColor" stroke-width="1.4"/>'
    },
    {
      title: 'Dental Implants',
      desc: 'Long-lasting, natural-looking implants to replace missing teeth and restore full function.',
      img: 'photos/dental implant.webp',
      icon: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'
    },
    {
      title: 'Smile Makeover',
      desc: 'A tailored combination of cosmetic treatments designed to give you the smile you have always wanted.',
      img: 'photos/smaile maker.webp',
      icon: '<path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.4"/>'
    },
    {
      title: 'Braces & Aligners',
      desc: 'Traditional braces and clear aligners for kids and adults, planned around your lifestyle.',
      img: 'photos/braces and aliners.webp',
      icon: '<path d="M20 21c0-4-3.6-6-8-6s-8 2-8 6M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" stroke="currentColor" stroke-width="1.4"/>'
    },
    {
      title: 'Teeth Whitening',
      desc: 'Safe, fast in-clinic whitening that lifts years of staining for a brighter, more confident smile.',
      img: 'photos/teeth whitner.webp',
      icon: '<path d="M12 3l7 3v6c0 4.6-3 8.5-7 9.5-4-1-7-4.9-7-9.5V6l7-3z" stroke="currentColor" stroke-width="1.4"/>'
    },
    {
      title: 'Pediatric Dentistry',
      desc: 'Calm, friendly care designed to make young patients genuinely comfortable at the dentist.',
      img: 'photos/pediatric-dentist-talking-to-kid.webp',
      icon: '<path d="M20 21c0-4-3.6-6-8-6s-8 2-8 6M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" stroke="currentColor" stroke-width="1.4"/>'
    },
    {
      title: 'Full Mouth Rehabilitation',
      desc: 'Comprehensive restoration for patients needing multiple treatments, planned as one clear journey.',
      img: 'photos/full_mouth_rehabilitation_burbank_dental_lab_03.webp',
      icon: '<path d="M3 21l3-3m0 0a4 4 0 105-6 4 4 0 00-5 6zM14 10l7-7M17 3h4v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
    },
    {
      title: 'Emergency Care',
      desc: 'Same-day slots for dental pain, trauma, and urgent issues — because emergencies cannot wait.',
      img: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?fm=jpg&q=80&w=800&auto=format&fit=crop',
      icon: '<path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.4"/>'
    }
  ];

  const GALLERY = [
    { img: 'photos/G1.png', alt: 'Treatment chair at The Dental Point', tall: true },
    { img: 'photos/g2.png', alt: 'Sterilization area' },
    { img: 'photos/g3.png', alt: 'Consultation room' },
    { img: 'photos/g4.png', alt: 'Digital X-ray equipment' },
    { img: 'photos/g5.png', alt: 'Clinic reception area', tall: true },
    { img: 'photos/g6.png', alt: 'Treatment tools laid out' },
    { img: 'photos/g2.png', alt: 'Waiting lounge' },
    { img: 'photos/g2.png', alt: 'Dr. Pooja Gaur at work' }
  ];

  /* ---------------------------------------------------------
     LOADER
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('done'), 500);
  });
  // Safety fallback in case 'load' fires before listener attaches
  setTimeout(() => loader && loader.classList.add('done'), 2500);

  /* ---------------------------------------------------------
     CUSTOM CURSOR (glow + dot)
  --------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const cursorDot = document.getElementById('cursorDot');
  const isTouch = window.matchMedia('(max-width:900px)').matches || 'ontouchstart' in window;

  if (!isTouch && cursorGlow && cursorDot) {
    let glowX = 0, glowY = 0, dotX = 0, dotY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateGlow);
    }
    cursorGlow.style.left = '0px';
    cursorGlow.style.top = '0px';
    requestAnimationFrame(animateGlow);

    const growTargets = 'a, button, .service-card, .gallery-item, .ba-handle, input, select, textarea, .faq-q';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(growTargets)) cursorDot.classList.add('grow');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(growTargets)) cursorDot.classList.remove('grow');
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  }

  /* ---------------------------------------------------------
     AMBIENT PARTICLES (canvas)
  --------------------------------------------------------- */
  const canvas = document.getElementById('particlesCanvas');
  if (canvas && !window.matchMedia('(max-width:700px)').matches) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 46;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        o: Math.random() * 0.4 + 0.15
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31,143,255,${p.o})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------------------------------------------------------
     SCROLL PROGRESS BAR
  --------------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------------------------------------------------------
     NAV — scrolled state, mobile burger, active link, smooth scroll
  --------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  function updateNavScrolled() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', updateNavScrolled, { passive: true });
  updateNavScrolled();

  if (navBurger && navLinks) {
    navBurger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navBurger.classList.toggle('active');
      document.body.classList.toggle('no-scroll', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navBurger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 84;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Active nav link on scroll (scrollspy)
  const navAnchorLinks = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];
  const navSections = navAnchorLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function updateActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 140;
    navSections.forEach(section => {
      if (section.offsetTop <= scrollPos) currentId = '#' + section.id;
    });
    navAnchorLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === currentId);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------------------------------------------------------
     RENDER: SERVICES GRID
  --------------------------------------------------------- */
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map(s => `
      <div class="service-card" data-tilt>
        <div class="service-img">
          <div class="ph ph--photo">
            <img src="${s.img}" alt="${s.title} at The Dental Point" loading="lazy">
          </div>
          <div class="service-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">${s.icon}</svg>
          </div>
        </div>
        <div class="service-body">
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <a href="#contact" class="service-cta">Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    `).join('');
  }

  /* ---------------------------------------------------------
     RENDER: GALLERY GRID + LIGHTBOX
  --------------------------------------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    galleryGrid.innerHTML = GALLERY.map((g, i) => `
      <div class="gallery-item ${g.tall ? 'tall' : ''}" data-index="${i}">
        <div class="ph ph--photo">
          <img src="${g.img}" alt="${g.alt}" loading="lazy">
        </div>
      </div>
    `).join('');
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let lightboxIndex = 0;

  function openLightbox(index) {
    lightboxIndex = index;
    renderLightbox();
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
  }
  function renderLightbox() {
    const item = GALLERY[lightboxIndex];
    lightboxContent.innerHTML = `
      <div class="ph ph--photo">
        <img src="${item.img.replace('w=700', 'w=1400')}" alt="${item.alt}">
      </div>
    `;
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) openLightbox(parseInt(item.dataset.index, 10));
    });
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + GALLERY.length) % GALLERY.length;
    renderLightbox();
  });
  if (lightboxNext) lightboxNext.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % GALLERY.length;
    renderLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  /* ---------------------------------------------------------
     SCROLL REVEAL ([data-reveal] + [data-img-reveal])
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const imgRevealEls = document.querySelectorAll('[data-img-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  const imgRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        imgRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  imgRevealEls.forEach(el => imgRevealObserver.observe(el));

  /* ---------------------------------------------------------
     ANIMATED COUNTERS ([data-count])
  --------------------------------------------------------- */
  const counterEls = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const decimal = el.dataset.decimal ? parseInt(el.dataset.decimal, 10) : 0;
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = decimal > 0 ? value.toFixed(decimal) : Math.round(value).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimal > 0 ? target.toFixed(decimal) : target.toLocaleString('en-IN');
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));

  /* ---------------------------------------------------------
     PROCESS TIMELINE — fill line & activate dots on scroll
  --------------------------------------------------------- */
  const timeline = document.getElementById('processTimeline');
  const timelineFill = document.getElementById('timelineFill');
  const timelineItems = timeline ? Array.from(timeline.querySelectorAll('.timeline-item')) : [];

  function updateTimeline() {
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.85;
    const end = rect.height * 0.6;
    let progress = (start - rect.top) / (start + end - vh * 0.15);
    progress = Math.max(0, Math.min(1, progress));

    if (timelineFill) timelineFill.style.width = (progress * 100) + '%';

    const activeCount = Math.round(progress * timelineItems.length);
    timelineItems.forEach((item, i) => {
      item.classList.toggle('is-active', i < activeCount);
    });
  }
  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline);
  updateTimeline();

  /* ---------------------------------------------------------
     BEFORE / AFTER SLIDER
  --------------------------------------------------------- */
  const baSlider = document.getElementById('baSlider');
  const baAfter = document.getElementById('baAfter');
  const baHandle = document.getElementById('baHandle');

  if (baSlider && baAfter && baHandle) {
    let dragging = false;

    function setSlider(clientX) {
      const rect = baSlider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      baAfter.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      baHandle.style.left = pct + '%';
    }

    // init at 50%
    setSlider(baSlider.getBoundingClientRect().left + baSlider.getBoundingClientRect().width / 2);

    function startDrag(e) {
      dragging = true;
      document.body.classList.add('no-select');
    }
    function endDrag() {
      dragging = false;
      document.body.classList.remove('no-select');
    }
    function onMove(e) {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setSlider(clientX);
    }

    baHandle.addEventListener('mousedown', startDrag);
    baHandle.addEventListener('touchstart', startDrag, { passive: true });
    baSlider.addEventListener('mousedown', (e) => { startDrag(e); setSlider(e.clientX); });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
  }

  /* ---------------------------------------------------------
     FAQ ACCORDION
  --------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------------------------------------------------------
     3D TILT EFFECT ([data-tilt])
  --------------------------------------------------------- */
  function attachTilt(el) {
    const maxTilt = 8;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  }
  function initTiltTargets() {
    document.querySelectorAll('[data-tilt]').forEach(attachTilt);
  }
  initTiltTargets();
  // Re-init in case service cards were just injected (they were, above) —
  // this call is a safe no-op duplicate guard since listeners attach once per element.

  /* ---------------------------------------------------------
     FLOATING CARDS ([data-float]) — subtle idle bobbing
  --------------------------------------------------------- */
  document.querySelectorAll('[data-float]').forEach((el, i) => {
    el.style.animation = `float ${6 + (i % 3)}s ease-in-out infinite`;
    el.style.animationDelay = `${i * 0.4}s`;
  });

  /* ---------------------------------------------------------
     HERO PULSE PATH — subtle redraw animation
  --------------------------------------------------------- */
  const pulsePath = document.getElementById('pulsePath');
  if (pulsePath && window.gsap) {
    const len = pulsePath.getTotalLength();
    gsap.set(pulsePath, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(pulsePath, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.out', delay: 0.6 });
  }

  /* ---------------------------------------------------------
     GSAP SCROLLTRIGGER ENHANCEMENTS (progressive — optional)
  --------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.marquee-strip').forEach(() => {}); // marquee runs on pure CSS, no JS needed

    gsap.utils.toArray('.blob').forEach((blob) => {
      gsap.to(blob, {
        y: 40,
        scrollTrigger: {
          trigger: blob.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });
  }

  /* ---------------------------------------------------------
     APPOINTMENT MODAL
  --------------------------------------------------------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalForm = document.getElementById('modalForm');
  const openModalTriggers = document.querySelectorAll('[data-open-modal]');

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
  openModalTriggers.forEach(btn => btn.addEventListener('click', openModal));
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });

  /* ---------------------------------------------------------
     FORMS — modal (WhatsApp) + contact form (basic UX)
  --------------------------------------------------------- */
  const CLINIC_WHATSAPP = '919818077886';

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(modalForm);
      const name = data.get('name') || '';
      const phone = data.get('phone') || '';
      const date = data.get('date') || '';
      const treatment = data.get('treatment') || '';

      let msg = `Hi, I'd like to book an appointment at The Dental Point.%0A`;
      msg += `Name: ${encodeURIComponent(name)}%0A`;
      msg += `Phone: ${encodeURIComponent(phone)}%0A`;
      if (date) msg += `Preferred Date: ${encodeURIComponent(date)}%0A`;
      msg += `Treatment: ${encodeURIComponent(treatment)}`;

      window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${msg}`, '_blank', 'noopener');
      modalForm.reset();
      closeModal();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name') || '';
      const phone = data.get('phone') || '';
      const treatment = data.get('treatment') || '';
      const message = data.get('message') || '';

      let msg = `Hi, I'd like to request a callback from The Dental Point.%0A`;
      msg += `Name: ${encodeURIComponent(name)}%0A`;
      msg += `Phone: ${encodeURIComponent(phone)}%0A`;
      msg += `Treatment: ${encodeURIComponent(treatment)}`;
      if (message) msg += `%0AMessage: ${encodeURIComponent(message)}`;

      window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${msg}`, '_blank', 'noopener');
      contactForm.reset();
    });
  }

});