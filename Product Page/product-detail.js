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
    // Ambil data produk (termasuk data marketplace)
    const response = await fetch(`../api/products/${productId}.json`);
    
    if (!response.ok) {
      throw new Error('Gagal mengambil data produk.');
    }
    
    const product = await response.json();

    // 1. Isi Info Utama Produk
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `Rp ${product.price.toLocaleString('id-ID')}`;
    document.getElementById('product-description').textContent = product.description;
    
    const specElement = document.getElementById('product-spec');
     if (specElement) {
        // Jika ada data spec di JSON, tampilkan. Jika tidak, strip.
        specElement.textContent = product.spec || "-"; 
    }

    const productImage = document.getElementById('product-image');
    productImage.src = product.imageUrl; 
    productImage.alt = product.name;

    // 2. Isi Data Rating Marketplace
    if (product.marketplaces) {
        // Shopee
        document.getElementById('rate-shopee').textContent = product.marketplaces.shopee.rating;
        document.getElementById('sold-shopee').textContent = product.marketplaces.shopee.sold;
        document.getElementById('link-shopee').href = product.marketplaces.shopee.url;

        // Tokopedia
        document.getElementById('rate-tokopedia').textContent = product.marketplaces.tokopedia.rating;
        document.getElementById('sold-tokopedia').textContent = product.marketplaces.tokopedia.sold;
        document.getElementById('link-tokopedia').href = product.marketplaces.tokopedia.url;

        // TikTok
        document.getElementById('rate-tiktok').textContent = product.marketplaces.tiktok.rating;
        document.getElementById('sold-tiktok').textContent = product.marketplaces.tiktok.sold;
        document.getElementById('link-tiktok').href = product.marketplaces.tiktok.url;
    }

    // ... (kode pengisian data shopee/tokopedia sebelumnya) ...

    // 3. LOGIKA TOMBOL "BELI VIA MARKETPLACE" (BARU)
    const buyBtn = document.getElementById('btn-buy-action');
    const marketplaceSection = document.querySelector('.marketplace-section');

    if (buyBtn && marketplaceSection) {
        buyBtn.addEventListener('click', () => {
            // Efek scroll halus ke bawah
            marketplaceSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Opsional: Beri efek kedip pada kartu marketplace agar user sadar
            marketplaceSection.style.opacity = '0.5';
            setTimeout(() => { marketplaceSection.style.opacity = '1'; }, 300);
        });
    }


  } catch (error) {
    console.error('Error:', error);
    document.querySelector('.product-details-grid').innerHTML = `<p>${error.message}</p>`;
  }
}