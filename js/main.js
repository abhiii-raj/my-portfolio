/* ════════════════════════════════════════════════
   ABHI RAJ PORTFOLIO — SUPERMAN THEME
   main.js
════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── LOADER ──────────────────────────────────── */
  const loader = document.getElementById("loader");
  const loaderFill = document.getElementById("loaderFill");

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      loaderFill.style.width = "100%";
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.style.overflow = "";
        triggerHeroReveal();
      }, 500);
    }
    loaderFill.style.width = progress + "%";
  }, 80);

  document.body.style.overflow = "hidden";

  function triggerHeroReveal() {
    document.querySelectorAll("#hero .reveal-up").forEach((el) => {
      el.classList.add("visible");
    });
  }

  /* ── CURSOR ───────────────────────────────────── */
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - cursor.offsetWidth / 2}px, ${mouseY - cursor.offsetHeight / 2}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.transform = `translate(${ringX - cursorRing.offsetWidth / 2}px, ${ringY - cursorRing.offsetHeight / 2}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button, .skill-card, .project-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovered");
      cursorRing.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovered");
      cursorRing.classList.remove("hovered");
    });
  });

  /* ── NAVBAR ───────────────────────────────────── */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* ── STARS CANVAS ─────────────────────────────── */
  const canvas = document.getElementById("starsCanvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 5000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      star.alpha += star.twinkleSpeed * star.twinkleDir;
      if (star.alpha >= 0.9) star.twinkleDir = -1;
      if (star.alpha <= 0.1) star.twinkleDir = 1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 215, 255, ${star.alpha})`;
      ctx.fill();
    });
    animFrame = requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  drawStars();
  window.addEventListener("resize", resizeCanvas);

  /* ── HERO PHOTO PARALLAX ─────────────────────── */
  const heroShield = document.getElementById("heroShield");
  document.addEventListener("mousemove", (e) => {
    if (!heroShield) return;
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 14;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 10;
    heroShield.style.transform = `translateY(-50%) translate(${xRatio * 0.3}px, ${yRatio * 0.3}px)`;
  });

  /* ── INTERSECTION OBSERVER (scroll reveals) ──── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
    // Don't observe hero elements — they are triggered by loader
    if (!el.closest("#hero")) {
      revealObserver.observe(el);
    }
  });

  /* ── SKILL BARS ───────────────────────────────── */
  const skillBarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
            const w = bar.getAttribute("data-width");
            setTimeout(() => {
              bar.style.width = w + "%";
            }, 200);
          });
          skillBarObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".skill-card").forEach((card) => {
    skillBarObserver.observe(card);
  });

  /* ── COUNTER ANIMATION ────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    let current = 0;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, stepTime);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".stat-num").forEach(animateCounter);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const aboutCard = document.querySelector(".about-card-frame");
  if (aboutCard) statsObserver.observe(aboutCard);

  /* ── ACTIVE NAV LINK on scroll ────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navAnchor = document.querySelectorAll(".nav-links a");

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchor.forEach((a) => {
            a.style.color = "";
            if (a.getAttribute("href") === "#" + entry.target.id) {
              a.style.color = "var(--yellow)";
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => activeObserver.observe(section));

  /* ── FIREBASE INITIALIZATION ─────────────────── */
  let db = null;

  if (window.firebase && window.firebaseConfig) {
    // Initialize Firebase app once, then use Firestore
    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    }
    db = firebase.firestore();
  }

  /* ── CONTACT FORM ─────────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector(".btn-primary");
      const btnText = btn?.querySelector(".btn-text");
      if (btnText) btnText.textContent = "Sending...";
      if (btn) btn.disabled = true;

      try {
        // Only save to Firebase if initialized
        if (db) {
          // Collect form data
          const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          };

          // Save to Firestore 'submissions' collection
          await db.collection("submissions").add(formData);
          console.log("Form submission saved to Firestore!");
        }

        // Show success message
        if (formSuccess) {
          formSuccess.classList.add("visible");
        }
        
        // Clear form
        contactForm.reset();
        if (btnText) btnText.textContent = "Send Message";
        if (btn) btn.disabled = false;

        // Redirect to thank you page after 1.5 seconds
        setTimeout(() => {
          window.location.href = "pages/thank-you.html";
        }, 1500);
      } catch (error) {
        console.error("Error saving form submission:", error);
        if (btnText) btnText.textContent = "Error - Try Again";
        if (btn) btn.disabled = false;
        alert("Error saving your message. Please try again.");
      }
    });
  }

  /* ── TILT EFFECT on project cards ────────────── */
  document.querySelectorAll(".project-card:not(.cta-card)").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transformStyle = "preserve-3d";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ── SMOOTH ANCHOR SCROLL ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

})();
