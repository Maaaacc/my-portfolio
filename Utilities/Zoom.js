document.querySelectorAll('.carousel-item img').forEach(img => {
    let scale = 1, posX = 0, posY = 0;
    let startX = 0, startY = 0;
    let isDragging = false;

    let initialDistance = 0; // for pinch zoom
    let pinchStartScale = 1;

    const maxScale = 3;
    const minScale = 1;

    function constrainPan() {
        const container = img.parentElement;
        const rect = container.getBoundingClientRect();

        const imgWidth = img.clientWidth * scale;
        const imgHeight = img.clientHeight * scale;

        const maxX = Math.max(0, (imgWidth - rect.width) / 2);
        const maxY = Math.max(0, (imgHeight - rect.height) / 2);

        posX = Math.min(maxX, Math.max(posX, -maxX));
        posY = Math.min(maxY, Math.max(posY, -maxY));
    }

    function updateTransform() {
        img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }

    img.addEventListener('dragstart', e => e.preventDefault());

    // Desktop: wheel zoom
    img.addEventListener('wheel', e => {
        if (scale <= 1 && !e.ctrlKey) return; // let modal scroll
        e.preventDefault();

        const zoomSpeed = 0.1;
        const oldScale = scale;
        if (e.deltaY < 0) scale = Math.min(scale + zoomSpeed, maxScale);
        else scale = Math.max(scale - zoomSpeed, minScale);

        const rect = img.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        posX -= dx * (scale - oldScale) / scale;
        posY -= dy * (scale - oldScale) / scale;

        if (scale <= 1) posX = posY = 0;
        else constrainPan();
        updateTransform();
    });

    // Desktop: drag
    img.addEventListener('mousedown', e => {
        if (scale <= 1) return;
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - posX;
        startY = e.clientY - posY;
        img.style.cursor = 'grabbing';
        img.style.transition = 'none';
    });

    img.parentElement.addEventListener('mousemove', e => {
        if (!isDragging) return;
        posX = e.clientX - startX;
        posY = e.clientY - startY;
        constrainPan();
        updateTransform();
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        img.style.cursor = scale > 1 ? 'grab' : 'default';
        img.style.transition = 'transform 0.1s ease';
    });

    // Mobile: pinch-to-zoom and drag
    img.addEventListener('touchstart', e => {
        if (e.touches.length === 2) {
            // Pinch start
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            initialDistance = Math.hypot(dx, dy);
            pinchStartScale = scale;
        } else if (e.touches.length === 1 && scale > 1) {
            // Single finger drag
            isDragging = true;
            startX = e.touches[0].clientX - posX;
            startY = e.touches[0].clientY - posY;
        }
    }, { passive: false });

    img.addEventListener('touchmove', e => {
        if (e.touches.length === 2) {
            e.preventDefault(); // pinch zoom
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.hypot(dx, dy);
            const zoom = distance / initialDistance;
            scale = Math.min(maxScale, Math.max(minScale, pinchStartScale * zoom));
            constrainPan();
            updateTransform();
        } else if (e.touches.length === 1 && isDragging) {
            e.preventDefault();
            posX = e.touches[0].clientX - startX;
            posY = e.touches[0].clientY - startY;
            constrainPan();
            updateTransform();
        }
    }, { passive: false });

    img.addEventListener('touchend', e => {
        if (e.touches.length === 0) {
            isDragging = false;
        }
    });

    // Reset on modal close
    const modal = img.closest('.modal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', () => {
            scale = 1;
            posX = 0;
            posY = 0;
            updateTransform();
            img.style.transition = 'transform 0.3s ease';
            img.style.cursor = 'grab';
        });
    }
});
