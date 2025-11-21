document.addEventListener('DOMContentLoaded', () => {
    let allProducts = []; // Wadah untuk menyimpan semua data produk

    // 1. Ambil elemen-elemen penting dari HTML
    const productGrid = document.getElementById('product-grid-container');
    const countDisplay = document.getElementById('product-count-display');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const sortSelect = document.getElementById('sort');
    const searchInput = document.querySelector('.search-container input'); // Search bar di header

    // 2. Fungsi Utama: Ambil Data dari API
    async function fetchProducts() {
        try {
            const response = await fetch('../api/products-all.json');
            if (!response.ok) throw new Error('Gagal memuat data');
            
            const data = await response.json();
            allProducts = data.products; // Simpan data ke variabel global
            
            // Tampilkan semua produk pertama kali
            renderProducts(allProducts);
        } catch (error) {
            console.error('Error:', error);
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Gagal memuat produk.</p>';
        }
    }

<<<<<<< HEAD
    // 3. Fungsi Penampil (Render)
    function renderProducts(products) {
        productGrid.innerHTML = ''; // Bersihkan grid sebelum diisi ulang
        
        // Update teks jumlah produk
        if (countDisplay) {
            countDisplay.textContent = `Showing ${products.length} Products`;
        }

        if (products.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Tidak ada produk yang ditemukan.</p>';
            return;
        }

        // Loop dan buat kartu produk
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Link ke detail produk
            const link = `product-detail.html?id=${product.id}`;

            card.innerHTML = `
                <a href="${link}" style="text-decoration: none; color: inherit;">
                    <div style="overflow: hidden; border-radius: 4px;">
                        <img src="${product.imageUrl}" class="product-image" alt="${product.name}">
                    </div>
                    <div class="name-size">
                        <div class="product-name">${product.name}</div>
                    </div>
                    <div class="price">Rp ${product.price.toLocaleString('id-ID')}</div>
                </a>
            `;
            productGrid.appendChild(card);
        });
    }

    // 4. Logika Filter, Sort, dan Search
    function applyFilters() {
        let filtered = [...allProducts]; // Salin data asli agar tidak rusak

        // A. Filter Kategori
        const activeBtn = document.querySelector('.filter-buttons button.active');
        const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        
        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        // B. Filter Search (Pencarian)
        const keyword = searchInput.value.toLowerCase();
        if (keyword) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(keyword)
            );
        }

        // C. Sorting (Pengurutan)
        const sortValue = sortSelect.value;
        if (sortValue === 'low-to-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'high-to-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'newest') {
            // Asumsi: ID lebih besar = produk lebih baru
            filtered.sort((a, b) => b.id - a.id);
        }
        // 'popular' kita biarkan default urutannya

        // Tampilkan hasil akhir
        renderProducts(filtered);
    }

    // 5. Event Listeners (Pemicu)
    
    // Tombol Kategori
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            filterButtons.forEach(b => b.classList.remove('active'));
            // Tambahkan ke tombol yang diklik
            btn.classList.add('active');
            // Terapkan filter
            applyFilters();
        });
    });

    // Dropdown Sort
    sortSelect.addEventListener('change', () => {
        applyFilters();
    });

    // Search Bar (Input)
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters();
        });
    }

    // Jalankan fungsi fetch saat halaman dibuka
    fetchProducts();
});
=======
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






>>>>>>> 96a3c668df9cc80f5c6d5531f1715db6d821e64d
