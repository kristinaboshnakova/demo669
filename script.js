const slides = [
    {
      image: "img/house-niki-view.webp",
      kicker: "КЪЩА ЗА ГОСТИ • НИКИ ",
      title: "КЪЩА ЗА ГОСТИ\nНИКИ",
      line1: "Напълно обновена в сърцето на Родопите",
      line2: "уют • стил • спокойствие • природа • близо до Пампорово и Смолян",
      statValue: "1",
      statUnit: "КЪЩА",
      statLabel: "НОВО ОБНОВЕНА",
      facebook: "https://www.facebook.com/",
      primary: {
        text: "За вилата",
        href: "#about"
      },
      secondary: {
        text: "Галерия",
        href: "#gallery"
      }
    },
    {
      image: "img/house-niki1.webp",
      kicker: "ШИРОКА ЛЪКА • РОДОПИ",
      title: "НОВ ЛУКС\nНОВ УЮТ",
      line1: "Създадена с вкус, внимание към детайла и любов към Родопите",
      line2: "идеална за почивка • семейни ваканции • релакс сред природа",
      statValue: "10",
      statUnit: "КМ",
      statLabel: "ДО ПАМПОРОВО",
      facebook: "https://www.facebook.com/",
      primary: {
        text: "Удобства",
        href: "#amenities"
      },
      secondary: {
        text: "Цени",
        href: "#prices"
      }
    },
    {
      image: "img/vunshna-mehana.webp",
      kicker: "ПРИРОДА • СПОКОЙСТВИЕ • ИЗЖИВЯВАНЕ",
      title: "ПОЧИВКА\nКОЯТО СЕ ПОМНИ",
      line1: "Близо до Ягодинската пещера, Дяволското гърло и Девин",
      line2: "разходки •  родопска атмосфера",
      statValue: "20",
      statUnit: "КМ",
      statLabel: "ДО СМОЛЯН",
      facebook: "https://www.facebook.com/",
      primary: {
        text: "Локация",
        href: "#location"
      },
      secondary: {
        text: "Контакти",
        href: "#contact"
      }
    }
  ];
  
  // ===== ELEMENTS =====
  const header = document.getElementById("siteHeader");
  
  const sliderEl = document.getElementById("heroSlider");
  const kickerEl = document.getElementById("heroKicker");
  const titleEl = document.getElementById("heroTitle");
  const line1El = document.getElementById("heroLine1");
  const line2El = document.getElementById("heroLine2");
  
  const primaryCta = document.getElementById("primaryCta");
  const secondaryCta = document.getElementById("secondaryCta");
  
  const statValueEl = document.getElementById("statValue");
  const statUnitEl = document.getElementById("statUnit");
  const statLabelEl = document.getElementById("statLabel");
  
  const counterEl = document.getElementById("progressCounter");
  const barsEl = document.getElementById("progressBars");
  
  const prevBtn = sliderEl?.querySelector?.("[data-prev]");
  const nextBtn = sliderEl?.querySelector?.("[data-next]");
  
  // ===== OFFCANVAS MENU =====
  const burgerBtn = document.getElementById("burgerBtn");
  const offcanvas = document.getElementById("offcanvas");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  
  // ===== STATE =====
  let index = 0;
  let timerId = null;
  let revealTimers = [];
  
  const AUTOPLAY_MS = 6500;
  const STAGGER_TITLE_MS = 40;
  const STAGGER_L1_MS = 220;
  const STAGGER_L2_MS = 420;
  
  // ===== HELPERS =====
  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  
  function setMultilineTitle(text) {
    if (!titleEl) return;
    titleEl.innerHTML = (text || "").replaceAll("\n", "<br/>");
  }
  
  function setActiveBars(i) {
    if (!barsEl) return;
    const bars = [...barsEl.querySelectorAll(".bar")];
    bars.forEach((b, idx) => b.classList.toggle("is-active", idx === i));
  }
  
  function applyRevealClasses() {
    kickerEl?.classList?.add("reveal");
    titleEl?.classList?.add("reveal");
    line1El?.classList?.add("reveal");
    line2El?.classList?.add("reveal");
  }
  
  function fastStaggerIn() {
    revealTimers.forEach(t => clearTimeout(t));
    revealTimers = [];
  
    [kickerEl, titleEl, line1El, line2El].forEach(el => el?.classList?.remove("is-in"));
    if (titleEl) void titleEl.offsetWidth;
  
    revealTimers.push(setTimeout(() => kickerEl?.classList?.add("is-in"), 0));
    revealTimers.push(setTimeout(() => titleEl?.classList?.add("is-in"), STAGGER_TITLE_MS));
    revealTimers.push(setTimeout(() => line1El?.classList?.add("is-in"), STAGGER_L1_MS));
    revealTimers.push(setTimeout(() => line2El?.classList?.add("is-in"), STAGGER_L2_MS));
  }
  
  function renderSlide(i) {
    const s = slides[i];
    if (!sliderEl || !s) return;
  
    sliderEl.style.backgroundImage = `url("${s.image}")`;
    sliderEl.style.transition = "none";
    sliderEl.style.setProperty("--bgZoom", "108%");
    void sliderEl.offsetWidth;
    sliderEl.style.transition = "background-size 6.6s ease";
    sliderEl.style.setProperty("--bgZoom", "118%");
  
    const kickerText = kickerEl?.querySelector?.(".k-text");
    if (kickerText) kickerText.textContent = s.kicker || "";
  
    setMultilineTitle(s.title || "");
    if (line1El) line1El.textContent = s.line1 || "";
    if (line2El) line2El.textContent = s.line2 || "";
  
    if (statValueEl) statValueEl.textContent = s.statValue ?? "";
    if (statUnitEl) statUnitEl.textContent = s.statUnit || "";
    if (statLabelEl) statLabelEl.textContent = s.statLabel || "";
  
    const fbBtn = document.getElementById("heroFacebook");
    if (fbBtn) fbBtn.href = s.facebook || "https://www.facebook.com/";
  
    if (primaryCta) {
      primaryCta.innerHTML = `${s.primary?.text || "Виж повече"} <span class="btn-ic">▶</span>`;
      primaryCta.href = s.primary?.href || "#about";
    }
  
    if (secondaryCta) {
      secondaryCta.textContent = s.secondary?.text || "Галерия";
      secondaryCta.href = s.secondary?.href || "#gallery";
    }
  
    if (counterEl) counterEl.textContent = `${pad2(i + 1)}/${pad2(slides.length)}`;
    setActiveBars(i);
  
    fastStaggerIn();
  }
  
  function go(dir) {
    index = (index + dir + slides.length) % slides.length;
    renderSlide(index);
    restartAutoplay();
  }
  
  function restartAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => go(1), AUTOPLAY_MS);
  }
  
  function stopAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
  
  // ===== OFFCANVAS OPEN/CLOSE =====
  function openMenu() {
    document.body.classList.add("menu-open");
    burgerBtn?.setAttribute("aria-expanded", "true");
    offcanvas?.setAttribute("aria-hidden", "false");
    if (menuOverlay) menuOverlay.hidden = false;
    setTimeout(() => closeMenuBtn?.focus?.(), 50);
  }
  
  function closeMenu() {
    document.body.classList.remove("menu-open");
    burgerBtn?.setAttribute("aria-expanded", "false");
    offcanvas?.setAttribute("aria-hidden", "true");
  
    setTimeout(() => {
      if (!document.body.classList.contains("menu-open") && menuOverlay) {
        menuOverlay.hidden = true;
      }
    }, 280);
  }
  
  burgerBtn?.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    if (isOpen) closeMenu();
    else openMenu();
  });
  
  closeMenuBtn?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu();
  });
  
  offcanvas?.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    closeMenu();
  });
  
  // ===== SLIDER EVENTS =====
  prevBtn?.addEventListener("click", () => go(-1));
  nextBtn?.addEventListener("click", () => go(1));
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });
  
  window.addEventListener("scroll", () => {
    header?.classList?.toggle("is-solid", window.scrollY > 10);
  });
  
  sliderEl?.addEventListener("mouseenter", stopAutoplay);
  sliderEl?.addEventListener("mouseleave", restartAutoplay);
  
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else restartAutoplay();
  });
  
  // ===== TOUCH SWIPE =====
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;
  
  sliderEl?.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    isSwiping = true;
    stopAutoplay();
  }, { passive: true });
  
  sliderEl?.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - touchStartX);
    const dy = Math.abs(t.clientY - touchStartY);
    if (dy > dx && dy > 12) isSwiping = false;
  }, { passive: true });
  
  sliderEl?.addEventListener("touchend", (e) => {
    if (!isSwiping) {
      restartAutoplay();
      return;
    }
  
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const SWIPE_THRESHOLD = 40;
  
    if (dx > SWIPE_THRESHOLD) go(-1);
    else if (dx < -SWIPE_THRESHOLD) go(1);
  
    isSwiping = false;
    restartAutoplay();
  }, { passive: true });
  
  // ===== INIT =====
  applyRevealClasses();
  renderSlide(index);
  restartAutoplay();



  // ===== GALLERY TABS =====
const galleryTabs = [...document.querySelectorAll("[data-gallery-tab]")];
const galleryPanels = [...document.querySelectorAll("[data-gallery-panel]")];

function setGalleryTab(tabName) {
  galleryTabs.forEach(tab => {
    const isActive = tab.dataset.galleryTab === tabName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  galleryPanels.forEach(panel => {
    const isActive = panel.dataset.galleryPanel === tabName;
    panel.classList.toggle("is-active", isActive);
  });
}

galleryTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    setGalleryTab(tab.dataset.galleryTab);
  });
});


// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById("galleryLightbox");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let lightboxItems = [];
let lightboxIndex = 0;

function getVisibleLightboxItems() {
  const activePanel = document.querySelector(".gallery-panel.is-active");
  if (!activePanel) return [];

  return [
    ...activePanel.querySelectorAll(".gallery-card"),
    ...activePanel.querySelectorAll(".food-card--image")
  ];
}

function renderLightboxItem(i) {
  const item = lightboxItems[i];
  if (!item || !lightboxImg) return;

  const img = item.querySelector("img");
  lightboxImg.src = item.getAttribute("href") || img?.src || "";
  lightboxImg.alt = img?.alt || "";
  if (lightboxCaption) {
    lightboxCaption.textContent = img?.alt || "";
  }
}

function openLightbox(index) {
  lightboxItems = getVisibleLightboxItems();
  lightboxIndex = index;

  if (!lightboxItems.length || !lightbox) return;

  renderLightboxItem(lightboxIndex);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImg) lightboxImg.src = "";
  document.body.classList.remove("menu-open");
}

function prevLightboxItem() {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  renderLightboxItem(lightboxIndex);
}

function nextLightboxItem() {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
  renderLightboxItem(lightboxIndex);
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".gallery-card, .food-card--image");
  if (!card) return;

  e.preventDefault();

  const items = getVisibleLightboxItems();
  const index = items.indexOf(card);
  if (index !== -1) {
    openLightbox(index);
  }
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", prevLightboxItem);
lightboxNext?.addEventListener("click", nextLightboxItem);

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox?.classList.contains("is-open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevLightboxItem();
  if (e.key === "ArrowRight") nextLightboxItem();
});


// ===== VIDEO CARDS CUSTOM PLAY =====
const videoCards = [...document.querySelectorAll(".video-card--styled")];

videoCards.forEach((card) => {
  const video = card.querySelector("video");
  const playBtn = card.querySelector(".video-card__play");

  if (!video || !playBtn) return;

  playBtn.addEventListener("click", () => {
    // pause other videos
    videoCards.forEach((otherCard) => {
      if (otherCard !== card) {
        const otherVideo = otherCard.querySelector("video");
        otherVideo?.pause?.();
        otherCard.classList.remove("video-card--is-playing");
      }
    });

    card.classList.add("video-card--is-playing");
    video.setAttribute("controls", "controls");
    video.play();
  });

  video.addEventListener("play", () => {
    card.classList.add("video-card--is-playing");
    video.setAttribute("controls", "controls");
  });

  video.addEventListener("pause", () => {
    if (video.currentTime === 0 || video.ended) {
      card.classList.remove("video-card--is-playing");
    }
  });

  video.addEventListener("ended", () => {
    card.classList.remove("video-card--is-playing");
  });
});





// ===== BOOKING FORM =====
const bookingCheckin = document.getElementById("bookingCheckin");
const bookingCheckout = document.getElementById("bookingCheckout");
const bookingGuests = document.getElementById("bookingGuests");
const bookingType = document.getElementById("bookingType");
const bookingSummary = document.getElementById("bookingSummary");

function formatBgDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

function updateBookingSummary() {
  if (!bookingSummary) return;

  const checkin = bookingCheckin?.value || "";
  const checkout = bookingCheckout?.value || "";
  const guests = bookingGuests?.value || "";
  const type = bookingType?.value || "";

  if (!checkin && !checkout && !guests && !type) {
    bookingSummary.textContent = "Изберете период и попълнете данните за вашето запитване.";
    return;
  }

  const parts = [];

  if (checkin) parts.push(`от ${formatBgDate(checkin)}`);
  if (checkout) parts.push(`до ${formatBgDate(checkout)}`);
  if (guests) parts.push(`${guests} гости`);
  if (type) parts.push(type);

  bookingSummary.textContent = `Вашето запитване е за престой ${parts.join(" • ")}.`;
}

if (bookingCheckin && bookingCheckout) {
  const today = new Date().toISOString().split("T")[0];
  bookingCheckin.min = today;
  bookingCheckout.min = today;

  bookingCheckin.addEventListener("change", () => {
    if (bookingCheckin.value) {
      bookingCheckout.min = bookingCheckin.value;

      if (bookingCheckout.value && bookingCheckout.value < bookingCheckin.value) {
        bookingCheckout.value = "";
      }
    }
    updateBookingSummary();
  });

  bookingCheckout.addEventListener("change", updateBookingSummary);
}

bookingGuests?.addEventListener("input", updateBookingSummary);
bookingType?.addEventListener("change", updateBookingSummary);


/* ===================================
   SIMPLE AUTO GLOBAL SITE ANIMATION
   WITHOUT GALLERY
=================================== */
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(`
      .about-mist__top,
      .about-mist__content,
      .about-mist__visual,
  
      .amenities-elegant__intro,
      .amenities-elegant__main,
      .amenities-elegant__side,
  
      .prices-editorial__intro,
      .price-editorial-card,
      .prices-editorial__footer,
  
      .location-mist__intro,
      .location-mist__main,
      .location-mist__side,
  
      .contact-mist__intro,
      .contact-main-card,
      .contact-info-card,
  
      .booking-mist__intro,
      .booking-info-card,
      .booking-form-card,
  
      .faq-mist__intro,
      .faq-item
    `);
  
    const directions = ["left", "right", "up", "rotate"];
  
    elements.forEach((el, index) => {
      el.classList.add("site-animate");
  
      if (el.matches(".about-mist__top, .amenities-elegant__intro, .prices-editorial__intro, .location-mist__intro, .contact-mist__intro, .booking-mist__intro, .faq-mist__intro")) {
        el.setAttribute("data-dir", "up");
      } else if (el.matches(".about-mist__content, .amenities-elegant__main, .location-mist__main, .contact-main-card, .booking-info-card")) {
        el.setAttribute("data-dir", "left");
      } else if (el.matches(".about-mist__visual, .amenities-elegant__side, .location-mist__side, .contact-info-card, .booking-form-card")) {
        el.setAttribute("data-dir", "right");
      } else {
        el.setAttribute("data-dir", directions[index % directions.length]);
      }
    });
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    });
  
    document.querySelectorAll(".site-animate").forEach(el => observer.observe(el));
  });

  
/* ==============================
   SCROLL TO TOP – FINAL FIX
================================= */

document.addEventListener("DOMContentLoaded", function () {

  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  function toggleScrollBtn() {
    if (document.documentElement.scrollTop > window.innerHeight * 0.8) {
      scrollBtn.classList.add("is-visible");
    } else {
      scrollBtn.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", toggleScrollBtn);

  scrollBtn.addEventListener("click", function () {

    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});

window.addEventListener("load", function () {
  const loader = document.getElementById("siteLoader");

  setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 700); // можеш да смениш 700 ако искаш по-дълго
});