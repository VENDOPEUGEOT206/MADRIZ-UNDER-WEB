// =============================================
// MADRIZ UNDER — Slider JS
// =============================================

(function () {
  const sliders = {};

  function initSlider(id) {
    const track = document.getElementById('track-' + id);
    if (!track) return;
    const slides = track.querySelectorAll('.slide');
    const total = slides.length;
    let current = 0;
    let autoInterval;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = 'translateX(-' + current * 100 + '%)';
      // Update dots
      const dots = document.querySelectorAll('.slider-dot[data-slider="' + id + '"]');
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      autoInterval = setInterval(() => goTo(current + 1), 4000);
    }
    function stopAuto() { clearInterval(autoInterval); }

    // Buttons
    document.querySelectorAll('.slider-btn[data-slider="' + id + '"]').forEach(btn => {
      btn.addEventListener('click', e => {
        stopAuto();
        if (btn.classList.contains('next')) goTo(current + 1);
        else goTo(current - 1);
        startAuto();
      });
    });

    // Dots
    document.querySelectorAll('.slider-dot[data-slider="' + id + '"]').forEach(dot => {
      dot.addEventListener('click', () => {
        stopAuto();
        goTo(parseInt(dot.dataset.idx));
        startAuto();
      });
    });

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        stopAuto();
        goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
      }
    });

    startAuto();
    sliders[id] = { goTo, stopAuto, startAuto };
  }

  // Init all sliders found on page
  ['artistas', 'graffiti'].forEach(id => initSlider(id));
})();
