// Populate year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
(function () {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    const isOpen = nav.classList.contains("active");
    toggle.textContent = isOpen ? "✕" : "☰";
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when clicking nav links
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.textContent = "☰";
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// Theme toggle with localStorage persistence
(function () {
  const toggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  if (!toggle) return;

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark";

  // Apply the saved theme
  if (currentTheme === "light") {
    html.classList.add("light");
    toggle.textContent = "☀️";
  } else {
    html.classList.remove("light");
    toggle.textContent = "🌙";
  }

  // Toggle theme on button click
  toggle.addEventListener("click", () => {
    html.classList.toggle("light");

    // Update icon and save preference
    if (html.classList.contains("light")) {
      toggle.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      toggle.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });
})();

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("modal-active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("modal-active");
    document.body.style.overflow = "";
  }
}

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal-active");
    if (activeModal) {
      activeModal.classList.remove("modal-active");
      document.body.style.overflow = "";
    }
  }
});

// Navigate to Expo card with animation
function navigateToExpo(event) {
  event.preventDefault();

  // Step 1: Smooth scroll to achievements section
  const achievementsSection = document.getElementById("achievements");
  achievementsSection.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  // Step 2: Wait for scroll, then highlight and open modal
  setTimeout(() => {
    const expoCard = document.querySelector('[onclick*="expo-modal"]');

    // Add pulse animation
    expoCard.classList.add("card-spotlight");

    // Step 3: After highlight, open modal
    setTimeout(() => {
      expoCard.classList.remove("card-spotlight");
      openModal("expo-modal");
    }, 1500);
  }, 800);
}

// Navigate to ShellHacks card with animation
function navigateToShellHacks(event) {
  event.preventDefault();

  // Step 1: Smooth scroll to achievements section
  const achievementsSection = document.getElementById("achievements");
  achievementsSection.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  // Step 2: Wait for scroll, then highlight and open modal
  setTimeout(() => {
    const shellHacksCard = document.querySelector(
      '[onclick*="shellhacks-modal"]'
    );

    // Add pulse animation
    shellHacksCard.classList.add("card-spotlight");

    // Step 3: After highlight, open modal
    setTimeout(() => {
      shellHacksCard.classList.remove("card-spotlight");
      openModal("shellhacks-modal");
    }, 1500);
  }, 800);
}

// Lightbox functionality
let currentLightboxGallery = [];
let currentLightboxIndex = 0;

const lightboxImages = {
  miruta: [
    "img/miRuta/1.jpeg",
    "img/miRuta/2.jpeg",
    "img/miRuta/3.jpeg",
    "img/miRuta/4.jpeg",
  ],
  shellhacks: [
    "img/nexusHack/1.jpeg",
    "img/nexusHack/2.jpeg",
    "img/nexusHack/3.jpeg",
    "img/nexusHack/4.jpeg",
  ],
};

function openLightbox(gallery, index) {
  currentLightboxGallery = lightboxImages[gallery];
  currentLightboxIndex = index;

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const currentSpan = document.getElementById("lightbox-current");
  const totalSpan = document.getElementById("lightbox-total");

  lightboxImage.src = currentLightboxGallery[currentLightboxIndex];
  currentSpan.textContent = currentLightboxIndex + 1;
  totalSpan.textContent = currentLightboxGallery.length;

  lightbox.classList.add("lightbox-active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("lightbox-active");
  document.body.style.overflow = "";
}

function changeLightboxImage(direction) {
  currentLightboxIndex += direction;

  // Loop around
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentLightboxGallery.length - 1;
  } else if (currentLightboxIndex >= currentLightboxGallery.length) {
    currentLightboxIndex = 0;
  }

  const lightboxImage = document.getElementById("lightbox-image");
  const currentSpan = document.getElementById("lightbox-current");

  lightboxImage.src = currentLightboxGallery[currentLightboxIndex];
  currentSpan.textContent = currentLightboxIndex + 1;
}

// Keyboard controls for lightbox
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  const isLightboxActive =
    lightbox && lightbox.classList.contains("lightbox-active");

  if (isLightboxActive) {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      changeLightboxImage(-1);
    } else if (e.key === "ArrowRight") {
      changeLightboxImage(1);
    }
  }
});

// Mobile touch support for flip cards
(function () {
  // Only on touch devices
  if ("ontouchstart" in window) {
    const flipCards = document.querySelectorAll(".card-flip");

    flipCards.forEach((card) => {
      card.addEventListener("click", function (e) {
        // Don't flip if clicking a link
        if (e.target.tagName === "A" || e.target.closest("a")) {
          return;
        }

        // Toggle flipped state
        this.classList.toggle("card-flipped");
      });
    });
  }
})();
