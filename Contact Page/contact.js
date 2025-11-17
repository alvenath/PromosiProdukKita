
  const heroSection = document.querySelector('.hero');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroSection.classList.add('show');
      }
    });
  }, { threshold: 0.5 });

  observer.observe(heroSection);

const promoText = document.querySelector('.promo-text');

const observerPromo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      promoText.classList.add('show');
    }
  });
}, { threshold: 0.4 });

observerPromo.observe(promoText);

const productPreview = document.querySelector('.product-preview');

const previewObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      productPreview.classList.add('show');
    }
  });
}, { threshold: 0.4 });

previewObserver.observe(productPreview);

