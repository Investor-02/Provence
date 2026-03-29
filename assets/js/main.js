const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const pageMap = {
  home: "index.html",
  paris: "paris.html",
  marsel: "marsel.html",
  gallery: "gallery.html",
  contacts: "contacts.html",
};

const currentPage = document.body.dataset.page;
const currentHref = pageMap[currentPage];

if (currentHref) {
  document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentHref) {
      link.classList.add("active");
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox__image");
const lightboxClose = lightbox?.querySelector(".lightbox__close");
const galleryImages = document.querySelectorAll("[data-lightbox]");

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.style.overflow = "";
};

if (lightbox && lightboxImage && galleryImages.length) {
  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

const callModal = document.getElementById("call-modal");
const callModalClose = callModal?.querySelector(".call-modal__close");
const callTriggers = document.querySelectorAll("[data-call-trigger]");

const closeCallModal = () => {
  if (!callModal) return;
  callModal.classList.remove("is-open");
  callModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

if (callModal && callTriggers.length) {
  callTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      callModal.classList.add("is-open");
      callModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  callModalClose?.addEventListener("click", closeCallModal);

  callModal.addEventListener("click", (event) => {
    if (event.target === callModal) {
      closeCallModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && callModal.classList.contains("is-open")) {
      closeCallModal();
    }
  });
}
