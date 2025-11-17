
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

