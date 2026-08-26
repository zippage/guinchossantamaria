/* ============================================
   MAIN.JS — Guinchos Santa Maria
   Scroll reveal + tracking de conversão (GTM/GA4)
   ============================================ */

(function () {
  "use strict";

  /* ---------- dataLayer (Google Tag Manager / GA4) ---------- */
  window.dataLayer = window.dataLayer || [];
  function trackEvent(eventName, params) {
    window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
    // console.log("[GTM]", eventName, params); // descomente para debug
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Conversão: WhatsApp / Telefone / Instagram ---------- */
  document.querySelectorAll('[data-track="whatsapp"]').forEach(function (el) {
    el.addEventListener("click", function () {
      trackEvent("whatsapp_click", { link_location: el.dataset.location || "unknown" });
    });
  });

  document.querySelectorAll('[data-track="phone"]').forEach(function (el) {
    el.addEventListener("click", function () {
      trackEvent("phone_click", { link_location: el.dataset.location || "unknown" });
    });
  });

  document.querySelectorAll('[data-track="instagram"]').forEach(function (el) {
    el.addEventListener("click", function () {
      trackEvent("instagram_click", { link_location: el.dataset.location || "unknown" });
    });
  });

  /* ---------- Scroll depth (25/50/75/100%) ---------- */
  var depthsFired = {};
  var thresholds = [25, 50, 75, 100];
  function checkScrollDepth() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var pct = Math.round((scrollTop / docHeight) * 100);
    thresholds.forEach(function (t) {
      if (pct >= t && !depthsFired[t]) {
        depthsFired[t] = true;
        trackEvent("scroll_depth", { percent: t });
      }
    });
  }
  var scrollTicking = false;
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        checkScrollDepth();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  /* ---------- FAQ: fecha os outros ao abrir um (accordion) ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
        trackEvent("faq_open", { question: item.dataset.question || "" });
      }
    });
  });

  /* ---------- Header: leve sombra ao rolar ---------- */
  var header = document.querySelector(".header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.style.boxShadow = window.scrollY > 8 ? "0 8px 24px rgb(0 0 0 / 0.28)" : "none";
      },
      { passive: true }
    );
  }
})();
