// ===========================
// ĐẠT MOBILE – script.js
// ===========================

// ----- DATA -----
const pinStandard = [
  ["6G", 383], ["6S", 383], ["6P", 406], ["6SP", 406],
  ["7G", 390], ["7P", 409], ["8G", 390], ["8P", 409],
  ["X", 440], ["XR", 424], ["XS", 456], ["XS Max", 459],
  ["11", 438], ["11 Pro", 482], ["11 Pro Max", 500],
  ["SE2", 165], ["12 Mini", 431], ["12 / 12 Pro", 438],
  ["12 Pro Max", 644], ["13", 593], ["13 Pro", 644],
  ["13 Pro Max", 675], ["14", 644], ["14 Plus", 669],
  ["14 Pro", 710], ["14 Pro Max", 738],
  ["15", 644], ["15 Plus", 669], ["15 Pro", 715], ["15 Pro Max", 759]
];

const pinCao = [
  ["11 Pro Max", 750], ["12 / 12 Pro", 720], ["12 Pro Max", 820],
  ["13 Pro Max", 900], ["14 Pro Max", 945]
];

const pinChanDoan = [
  ["12 / 12 Pro", 720], ["12 Pro Max", 820],
  ["13", 690], ["13 Pro", 755], ["13 Pro Max", 900],
  ["14 Pro", 775], ["14 Pro Max", 945]
];

const manDat = [
  ["X Incell GX", 623], ["XS Incell GX", 624], ["XS Max Incell GX", 656],
  ["11 GX (dời IC)", 627], ["11 Pro Incell HL", 653], ["11 Pro Max", 670],
  ["12 / 12 Pro Incell GX", 682], ["12 Pro Max Incell HL", 893],
  ["13 Pro Incell GX", 925], ["13 Pro Max Incell HL", 1009],
  ["15 Plus Incell GX", 950], ["15 Pro Incell GX", 950],
  ["16 Incell GX", 960], ["6S Plus HD+", 539],
  ["7 Plus HD+", 539], ["8 Plus HD+", 539]
];

const manTiger = [
  ["XS Max HD+", 650], ["11 Pro HD+", 655], ["11 Pro Max HD+", 675],
  ["12 / 12 Pro HD+", 680], ["13 HD+", 905], ["13 Pro HD+", null],
  ["13 Pro Max HD+", 930], ["14", null], ["14 Pro HD+ 120Hz", 980],
  ["14 Pro Max HD+ 120Hz", 1020], ["14 Plus HD+", 970]
];

// ----- RENDER TABLE -----
function renderTable(bodyId, data) {
  const tbody = document.getElementById(bodyId);
  if (!tbody) return;
  tbody.innerHTML = data.map(([name, price]) => `
    <tr>
      <td><strong style="color:var(--white)">${name}</strong></td>
      <td>${price ? `<span class="price-badge">${price}K ( Đã bao gồm công )</span>` : '<span style="color:var(--text-muted)">Liên hệ</span>'}</td>
      <td><a href="tel:0933424434" class="contact-quick-btn"><i class="fas fa-phone-alt"></i> Hỏi giá</a></td>
    </tr>
  `).join('');
}

function initTables() {
  renderTable('pinStandardBody', pinStandard);
  renderTable('pinCaoBody', pinCao);
  renderTable('pinChanDoanBody', pinChanDoan);
  renderTable('manDatBody', manDat);
  renderTable('manTigerBody', manTiger);
}

// ----- TABS -----
function showTab(id) {
  // Find all tab-content siblings in same section
  const target = document.getElementById(id);
  if (!target) return;
  const section = target.closest('.price-section, .bg-alt, .section');
  const allContents = section ? section.querySelectorAll('.tab-content') : document.querySelectorAll('.tab-content');
  const allBtns = section ? section.querySelectorAll('.tab-btn') : document.querySelectorAll('.tab-btn');

  allContents.forEach(c => c.classList.remove('active'));
  allBtns.forEach(b => {
    const onclick = b.getAttribute('onclick') || '';
    if (onclick.includes(id)) b.classList.add('active');
    else b.classList.remove('active');
  });
  target.classList.add('active');
}

// ----- STICKY HEADER -----
function initStickyHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ----- BACK TO TOP -----
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ----- MOBILE NAV -----
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('navOverlay');
  if (!hamburger || !nav || !overlay) return;

  const toggleMenu = () => {
    nav.classList.toggle('open');
    overlay.classList.toggle('show');
    const icon = hamburger.querySelector('i');
    icon.className = nav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.querySelector('i').className = 'fas fa-bars';
      document.body.style.overflow = '';
    });
  });
}

// ----- ACTIVE NAV ON SCROLL -----
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }, { passive: true });
}

// ----- SMOOTH CARD REVEAL -----
function initReveal() {
  const cards = document.querySelectorAll('.service-card, .acc-card, .contact-card, .why-item, .gallery-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(card);
  });
}

// ----- NUMBER COUNTER ANIMATION -----
function animateCounter(el, target) {
  let start = 0;
  const duration = 1500;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + (el.dataset.suffix || '');
    if (start >= target) clearInterval(timer);
  }, 16);
}

function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        if (!isNaN(num) && num > 1) {
          el.dataset.suffix = text.replace(/\d/g, '').replace('+', '') ? text.replace(/^\d+/, '') : '+';
          animateCounter(el, num);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
}

// ----- POPUP -----
function initPopup() {
  const popup = document.getElementById('welcomePopup');
  const closeBtn = document.getElementById('closePopup');
  if (!popup || !closeBtn) return;

  // Show after 1s
  setTimeout(() => {
    popup.classList.add('show');
  }, 1000);

  closeBtn.onclick = () => popup.classList.remove('show');
  popup.onclick = (e) => {
    if (e.target === popup) popup.classList.remove('show');
  };
}

// ----- INIT -----
document.addEventListener('DOMContentLoaded', () => {
  initTables();
  initStickyHeader();
  initBackToTop();
  initMobileNav();
  initNavHighlight();
  initReveal();
  initCounters();
  initPopup();
  console.log('🍎 Đạt Mobile Website – Ready!');
});
