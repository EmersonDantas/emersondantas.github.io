/**
 * Emerson Dantas - Web Resume
 * Navigation, scroll animations, and mobile menu
 */

(function () {
  "use strict";

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#sideNav .nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
        mobileNavLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // --- Scroll Animations ---
  var animatedElements = document.querySelectorAll("[data-animate]");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Smooth Scroll for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("href");
      if (targetId === "#page-top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      var target = document.querySelector(targetId);
      if (target) {
        var offset = window.innerWidth >= 992 ? 0 : 64;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });
  // --- Footer Year ---
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
