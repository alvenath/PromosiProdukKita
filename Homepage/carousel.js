const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const wrapper = carousel.querySelector('.products-wrapper');
  const btnLeft = carousel.querySelector('.carousel-button.left');
  const btnRight = carousel.querySelector('.carousel-button.right');

  // Duplicate children for infinite effect
  wrapper.innerHTML += wrapper.innerHTML;

  const items = wrapper.querySelectorAll('.product-card');
  const itemWidth = items[0].offsetWidth + 24; // 24px = your card gap, adjust if needed

  function getVisibleCount() {
    return Math.floor(wrapper.clientWidth / itemWidth);
  }

  function getGroupWidth() {
    return getVisibleCount() * itemWidth;
  }

  const maxScroll = (items.length * itemWidth) / 2;

  btnRight.addEventListener('click', () => {
    wrapper.scrollBy({ left: getGroupWidth(), behavior: 'smooth' });
  });

  btnLeft.addEventListener('click', () => {
    wrapper.scrollBy({ left: -getGroupWidth(), behavior: 'smooth' });
  });

  // Loop reset with smooth-safe snapping
  let isSnapping = false;
  wrapper.addEventListener('scroll', () => {
    if (isSnapping) return;
    isSnapping = true;

    setTimeout(() => {
      if (wrapper.scrollLeft >= maxScroll - 5) {
        wrapper.scrollLeft = 1;
      } else if (wrapper.scrollLeft <= 0) {
        wrapper.scrollLeft = maxScroll - 5;
      }
      isSnapping = false;
    }, 200); // Delay matches scroll-behavior smooth
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    wrapper.scrollLeft = 0;
  });
});
