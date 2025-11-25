document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    if (!productId) {
      document.querySelector('.container').innerHTML = '<h1>Error: Produk tidak ditemukan.</h1>';
      return;
    }
  
    fetchProductDetails(productId);
});
  
async function fetchProductDetails(productId) {
    try {
      // 1. AMBIL DATA PRODUK DARI JSON
      const response = await fetch(`../api/products/${productId}.json`);
      if (!response.ok) throw new Error('Gagal mengambil data produk.');
      const product = await response.json();
  
      // Isi Info Utama
      if(document.getElementById('product-name')) document.getElementById('product-name').textContent = product.name;
      if(document.getElementById('product-price')) document.getElementById('product-price').textContent = `Rp ${product.price.toLocaleString('id-ID')}`;
      if(document.getElementById('product-description')) document.getElementById('product-description').textContent = product.description;
      if(document.getElementById('product-spec')) document.getElementById('product-spec').textContent = product.spec || "-";
      
      const elImg = document.getElementById('product-image');
      if (elImg) { elImg.src = product.imageUrl; elImg.alt = product.name; }
  
      // 2. ISI RATING MARKETPLACE
      if (product.marketplaces) {
          const m = product.marketplaces;
          if(document.getElementById('rate-shopee')) document.getElementById('rate-shopee').textContent = m.shopee.rating;
          if(document.getElementById('sold-shopee')) document.getElementById('sold-shopee').textContent = m.shopee.sold;
          if(document.getElementById('link-shopee')) document.getElementById('link-shopee').href = m.shopee.url;
          
          if(document.getElementById('rate-tokopedia')) document.getElementById('rate-tokopedia').textContent = m.tokopedia.rating;
          if(document.getElementById('sold-tokopedia')) document.getElementById('sold-tokopedia').textContent = m.tokopedia.sold;
          if(document.getElementById('link-tokopedia')) document.getElementById('link-tokopedia').href = m.tokopedia.url;
          
          if(document.getElementById('rate-tiktok')) document.getElementById('rate-tiktok').textContent = m.tiktok.rating;
          if(document.getElementById('sold-tiktok')) document.getElementById('sold-tiktok').textContent = m.tiktok.sold;
          if(document.getElementById('link-tiktok')) document.getElementById('link-tiktok').href = m.tiktok.url;
      }

      // 3. LOGIKA TOMBOL "BELI VIA MARKETPLACE" (Scroll)
      const buyBtn = document.getElementById('btn-buy-action');
      const marketplaceSection = document.querySelector('.marketplace-section');
      
      if (buyBtn && marketplaceSection) {
          buyBtn.addEventListener('click', () => {
              marketplaceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              marketplaceSection.style.opacity = '0.5';
              setTimeout(() => { marketplaceSection.style.opacity = '1'; }, 300);
          });
      }
  
      // 4. LOGIKA WISHLIST (VERSI LOCALSTORAGE - YANG BENAR)
      const wishlistBtn = document.querySelector('.btn-wishlist');
      
      // Ambil data dari memori browser
      let myWishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
      let isWishlisted = myWishlist.includes(productId.toString());

      // Update warna tombol saat halaman dibuka
      updateWishlistButton(wishlistBtn, isWishlisted);

      if (wishlistBtn) {
          wishlistBtn.addEventListener('click', () => {
              // Ambil data terbaru lagi (jaga-jaga jika tab lain update)
              myWishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
              
              if (isWishlisted) {
                  // Hapus dari daftar
                  myWishlist = myWishlist.filter(id => id !== productId.toString());
                  isWishlisted = false;
              } else {
                  // Tambah ke daftar
                  myWishlist.push(productId.toString());
                  isWishlisted = true;
              }

              // Simpan PERMANEN ke browser
              localStorage.setItem('myWishlist', JSON.stringify(myWishlist));
              
              // Update tampilan tombol
              updateWishlistButton(wishlistBtn, isWishlisted);
          });
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
}

function updateWishlistButton(btn, active) {
    if(!btn) return;
    if (active) {
        btn.textContent = "❤️ Tersimpan";
        btn.style.backgroundColor = "#d8000c";
        btn.style.color = "white";
    } else {
        btn.textContent = "Add to Wishlist";
        btn.style.backgroundColor = "#000";
        btn.style.color = "white";
    }
}