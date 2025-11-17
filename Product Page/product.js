
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const products = document.querySelectorAll('.product-card');
   const countDisplay = document.getElementById('product-count-display');

function updateCount() {
    const visibleProducts = [...products].filter(p => p.style.display !== 'none');
    countDisplay.textContent = "Showing " + visibleProducts.length + " Products";
  }

    updateCount();

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {

      // highlight active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      products.forEach(product => {
        const category = product.getAttribute('data-category');

        if (filter === 'all' || filter === category) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
        updateCount();
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hero.classList.add("show");
        observer.unobserve(hero);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(hero);
});

  // Observe scroll animation
  const cards = document.querySelectorAll('.product-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));


  // ✨ Re-animate with stagger when changing filter
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {

      setTimeout(() => {
        let delay = 0;

        products.forEach(product => {

          // Show only visible items
          if (product.style.display !== 'none') {
            
            // Reset instantly
            product.classList.add('reset');

            // Apply stagger delay per card
            setTimeout(() => {
              product.classList.remove('reset');
              product.classList.add('show');
            }, delay);

            delay += 80; // delay between each card (80ms)
          }
        });

      }, 10);

    });
  });






