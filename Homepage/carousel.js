document.addEventListener('DOMContentLoaded', () => {
  const apiURL = '../api/products-all.json';

  // Panggil fungsi utama
  loadHomeProducts();

  async function loadHomeProducts() {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      const products = data.products;

      // 1. Filter Produk untuk Carousel 1 (Fashion)
      // Ambil 8 produk pertama dari kategori fashion
      const fashionProducts = products.filter(p => p.category === 'fashion').slice(0, 8);
      renderCarousel('wrapper-fashion', fashionProducts);

      // 2. Filter Produk untuk Carousel 2 (Electronics)
      // Ambil 8 produk pertama dari kategori electronics
      const electronicProducts = products.filter(p => p.category === 'electronics').slice(0, 8);
      renderCarousel('wrapper-electronics', electronicProducts);

      // 3. Aktifkan Tombol Geser (Setelah produk dimuat)
      setupCarouselButtons('carousel-fashion');
      setupCarouselButtons('carousel-electronics');

    } catch (error) {
      console.error('Gagal memuat produk home:', error);
    }
  }

  function renderCarousel(wrapperId, products) {
    const wrapper = document.getElementById(wrapperId);
    wrapper.innerHTML = ''; // Bersihkan

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      
      // Link ke detail produk
      const link = `../Product Page/product-detail.html?id=${product.id}`;

      card.innerHTML = `
        <a href="${link}" style="text-decoration: none; color: inherit;">
          <img src="${product.imageUrl}" alt="${product.name}">
          <div class="product-name">${product.name}</div>
          <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
        </a>
      `;
      wrapper.appendChild(card);
    });
  }

  function setupCarouselButtons(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const wrapper = carousel.querySelector('.products-wrapper');
    const btnLeft = carousel.querySelector('.carousel-button.left');
    const btnRight = carousel.querySelector('.carousel-button.right');

    // Jarak geser (lebar kartu + gap)
    // Asumsi lebar kartu sekitar 200-250px. Kita geser 300px agar aman.
    const scrollAmount = 300; 

    btnRight.addEventListener('click', () => {
      wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    btnLeft.addEventListener('click', () => {
      wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
});