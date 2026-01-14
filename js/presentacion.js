document.addEventListener('DOMContentLoaded', function() {
    const pres = document.getElementById('presentation');
    const slides = document.querySelectorAll('.slide');
    const total = slides.length;
    let current = 0;

    document.getElementById('total').textContent = total;

    function go(n) {
        current = n;
        if (current < 0) current = total - 1;
        if (current >= total) current = 0;
        pres.style.transform = 'translateX(-' + (current * 100) + 'vw)';
        document.getElementById('num').textContent = current + 1;
    }

    function next() { go(current + 1); }
    function prev() { go(current - 1); }

    // Exponer funciones globalmente para los botones
    window.next = next;
    window.prev = prev;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    let startX = 0;
    let startY = 0;
    let isScrolling = null;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = null;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (isScrolling === null) {
            let diffX = Math.abs(e.touches[0].clientX - startX);
            let diffY = Math.abs(e.touches[0].clientY - startY);
            isScrolling = diffY > diffX;
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        let diff = startX - e.changedTouches[0].clientX;
        if (diff > 60) next();
        if (diff < -60) prev();
    }, { passive: true });
});