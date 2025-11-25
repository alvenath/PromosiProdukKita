document.addEventListener('DOMContentLoaded', () => {
    const wishlistGrid = document.getElementById('wishlist-grid');
    const statusText = document.getElementById('wishlist-status');
    const searchInput = document.querySelector('.search-container input');

    let currentWishlistData = []; 

    // 1. AMBIL DAFTAR ID DARI BROWSER (LocalStorage)
    let wishlistIds = JSON.parse(localStorage.getItem('myWishlist')) || [];

    if (wishlistIds.length === 0) {
        statusText.textContent = "Anda belum menambahkan barang apa pun ke wishlist.";
        return;
    }

    // 2. AMBIL DATA LENGKAP DARI DATABASE PRODUK (JSON)
    fetch('../api/products-all.json')
        .then(response => response.json())
        .then(data => {
            const allProducts = data.products;
            
            // Filter: Ambil produk yang ID-nya ada di daftar wishlist kita
            currentWishlistData = allProducts.filter(product => wishlistIds.includes(product.id.toString()));

            renderWishlist(currentWishlistData);
        })
        .catch(error => {
            console.error('Error:', error);
            statusText.textContent = "Gagal memuat data produk.";
        });

    // 3. FITUR SEARCH DI HALAMAN WISHLIST
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filteredProducts = currentWishlistData.filter(product => 
                product.name.toLowerCase().includes(keyword)
            );
            renderWishlist(filteredProducts);
        });
    }

    // FUNGSI TAMPILKAN PRODUK
    function renderWishlist(products) {
        wishlistGrid.innerHTML = '';

        if (products.length === 0) {
            if (currentWishlistData.length > 0) {
                statusText.textContent = "Produk yang dicari tidak ditemukan.";
            } else {
                statusText.textContent = "Wishlist Anda kosong.";
            }
            return;
        }

        statusText.textContent = `Menampilkan ${products.length} barang impian.`;

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Pakai style paksa agar langsung muncul (tanpa nunggu animasi scroll)
            card.style.opacity = '1'; 
            card.style.transform = 'none';
            
            const link = `../Product Page/product-detail.html?id=${product.id}`;

            card.innerHTML = `
                <a href="${link}" style="text-decoration: none; color: inherit;">
                    <div style="overflow: hidden; border-radius: 4px;">
                        <img src="${product.imageUrl}" class="product-image" alt="${product.name}" style="object-fit: cover; object-position: top;">
                    </div>
                    <div class="name-size">
                        <div class="product-name">${product.name}</div>
                    </div>
                    <div class="price">Rp ${product.price.toLocaleString('id-ID')}</div>
                </a>
                <button class="remove-btn" data-id="${product.id}" style="width: 100%; padding: 8px; margin-top: 10px; background: #ffe5e5; color: #d8000c; border: none; cursor: pointer; font-weight: bold; border-radius: 4px;">
                    Hapus
                </button>
            `;
            
            wishlistGrid.appendChild(card);
        });

        // Aktifkan Tombol Hapus
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToRemove = e.target.getAttribute('data-id');
                removeFromWishlist(idToRemove);
            });
        });
    }

    function removeFromWishlist(id) {
        // Hapus dari array
        wishlistIds = wishlistIds.filter(itemId => itemId !== id.toString());
        // Simpan balik ke browser
        localStorage.setItem('myWishlist', JSON.stringify(wishlistIds));
        
        // Hapus dari tampilan tanpa refresh
        currentWishlistData = currentWishlistData.filter(p => p.id.toString() !== id.toString());
        renderWishlist(currentWishlistData);
    }
});