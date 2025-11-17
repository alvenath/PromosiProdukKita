    // Basic filtering + sorting logic
    const grid = document.getElementById('productGrid');
    const cards = Array.from(grid.querySelectorAll('.card'));
    const countEl = document.getElementById('count');
    const sortSelect = document.getElementById('sortSelect');
    const applyBtn = document.getElementById('applyBtn');
    const clearBtn = document.getElementById('clearBtn');

    function updateCount(){
      const visible = cards.filter(c => c.style.display !== 'none').length;
      countEl.textContent = visible;
    }

    function getSelectedFilters(){
      const stock = document.querySelector('input[name="stock"]:checked')?.value || 'all';
      const price = document.querySelector('input[name="price"]:checked')?.value || 'all';
      const cats = Array.from(document.querySelectorAll('input[name="cat"]:checked')).map(i=>i.value);
      return {stock, price, cats};
    }

    function applyFilters(){
      const {stock, price, cats} = getSelectedFilters();

      cards.forEach(card=>{
        const cStock = card.dataset.stock;
        const cPrice = Number(card.dataset.price);
        const cCat = card.dataset.category;

        let visible = true;
        if(stock !== 'all' && cStock !== stock) visible = false;

        if(price !== 'all'){
          if(price === '0-50' && !(cPrice >=0 && cPrice <=50)) visible = false;
          if(price === '50-150' && !(cPrice >=50 && cPrice <=150)) visible = false;
          if(price === '150+' && !(cPrice >150)) visible = false;
        }

        if(cats.length>0 && !cats.includes(cCat)) visible = false;

        card.style.display = visible ? '' : 'none';
      });

      updateCount();
    }

    function clearFilters(){
      document.querySelectorAll('input[type=checkbox]').forEach(i=>i.checked=false);
      document.querySelectorAll('input[name=stock]').forEach(i=>{ if(i.value==='all') i.checked=true});
      document.querySelectorAll('input[name=price]').forEach(i=>{ if(i.value==='all') i.checked=true});
      applyFilters();
    }

    function sortProducts(){
      const val = sortSelect.value;
      let sorted = [...cards];
      if(val === 'price-asc') sorted.sort((a,b)=>Number(a.dataset.price)-Number(b.dataset.price));
      else if(val === 'price-desc') sorted.sort((a,b)=>Number(b.dataset.price)-Number(a.dataset.price));
      else if(val === 'name') sorted.sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name));
      else if(val === 'new') sorted = cards; // default order

      // append in order (only append visible ones in sorted order)
      sorted.forEach(c=>grid.appendChild(c));
    }

    applyBtn.addEventListener('click', ()=>{ applyFilters(); sortProducts(); });
    clearBtn.addEventListener('click', ()=>{ clearFilters(); sortProducts(); });
    sortSelect.addEventListener('change', ()=>{ sortProducts(); });

    // init
    updateCount();

    // small enhancement: allow Enter to apply when pressing Enter in sidebar
    document.querySelectorAll('.sidebar input').forEach(i=>i.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ applyFilters(); sortProducts(); }}));
