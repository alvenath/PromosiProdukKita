
document.addEventListener("DOMContentLoaded", () => {

  // Existing selectors...
  const aboutElements = document.querySelectorAll(".about-text, .about-image");
  const valueItems = document.querySelectorAll(".value-box div");
  const teamMembers = document.querySelectorAll(".member");  
  const metricItems = document.querySelectorAll(".metrics-grid > div");

  // NEW: CTA section
  const cta = document.querySelector(".cta");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe everything
  aboutElements.forEach(el => observer.observe(el));
  valueItems.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.15) + "s";
    observer.observe(el);
  });
  teamMembers.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.12) + "s";
    observer.observe(el);
  });
  metricItems.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.12) + "s";
    observer.observe(el);
  });

  // Observe CTA
  observer.observe(cta);

});
