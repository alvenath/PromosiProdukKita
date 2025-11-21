document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];

    const productGrid = document.getElementById('product-grid-container');
    const countDisplay = document.getElementById('product-count-display');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const sortSelect = document.getElementById('sort');
    const searchInput = document.querySelector('.search-container input');
    const hero = document.querySelector(".hero");

    // Animasi Hero (Punya Teman)
    if (hero) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    hero.classList.add("show");
                    heroObserver.unobserve(hero);
                }
            });
        }, { threshold: 0.2 });
        heroObserver.observe(hero);
    }

    // Animasi Scroll Kartu (Punya Teman)
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Fetch Data (Punya Anda)
    async function fetchProducts() {
        try {
            const response = await fetch('../api/products-all.json');
            if (!response.ok) throw new Error('Gagal memuat data');
            
            const data = await response.json();
            allProducts = data.products;
            
            // Terapkan filter awal (agar pencarian dari halaman lain tetap jalan)
            applyFilters();
        } catch (error) {
            console.error(error);
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Gagal memuat produk.</p>';
        }
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';

        if (countDisplay) {
            countDisplay.textContent = `Showing ${products.length} Products`;
        }

        if (products.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Tidak ada produk yang ditemukan.</p>';
            return;
        }

        products.forEach((product) => {
            const card = document.createElement('div');
            card.className = 'product-card';
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
            cardObserver.observe(card); // Pasang animasi ke kartu baru
        });
    }

    function applyFilters() {
        let filtered = [...allProducts];

        // Filter Kategori
        const activeBtn = document.querySelector('.filter-buttons button.active');
        const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        
        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        // Filter Search (termasuk dari URL halaman lain)
        let keyword = '';
        if (searchInput && searchInput.value) {
            keyword = searchInput.value.toLowerCase();
        } else {
            // Cek URL parameter jika input kosong
            const urlParams = new URLSearchParams(window.location.search);
            const q = urlParams.get('q');
            if (q) {
                keyword = q.toLowerCase();
                if(searchInput) searchInput.value = q; // Isi kotak search
            }
        }

        if (keyword) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(keyword)
            );
        }

        // Sorting
        const sortValue = sortSelect ? sortSelect.value : 'popular';
        if (sortValue === 'low-to-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'high-to-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'newest') {
            filtered.sort((a, b) => b.id - a.id); // Asumsi ID angka
        }

        renderProducts(filtered);
    }

    // Event Listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            applyFilters();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters();
        });
    }

    // Mulai
    fetchProducts();
});