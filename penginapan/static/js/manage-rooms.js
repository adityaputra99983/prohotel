/* ========================================
   MANAGE ROOMS - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // Counter fix - set values immediately from Django context
    const natureStats = document.querySelector('.nature-stats');
    if (natureStats && !natureStats.dataset.counted) {
        natureStats.dataset.counted = 'true';
        const counters = natureStats.querySelectorAll('.nature-stat-number');
        counters.forEach(counter => {
            const rawTarget = counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            if (rawTarget && !isNaN(parseFloat(rawTarget))) {
                counter.textContent = parseFloat(rawTarget) + suffix;
            }
        });
    }

    // Image preview
    const imageFileInput = document.getElementById('imageFileInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const imageUploadZone = document.getElementById('imageUploadZone');

    if (imageFileInput) {
        imageFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreviewContainer.classList.add('active');
                    imageUploadZone.style.borderColor = 'var(--forest-primary)';
                    imageUploadZone.style.background = 'rgba(45, 90, 61, 0.05)';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Drag and drop
    if (imageUploadZone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            imageUploadZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                imageUploadZone.style.borderColor = 'var(--forest-primary)';
                imageUploadZone.style.background = 'rgba(45, 90, 61, 0.08)';
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            imageUploadZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                imageUploadZone.style.borderColor = '';
                imageUploadZone.style.background = '';
            });
        });

        imageUploadZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                imageFileInput.files = files;
                const event = new Event('change');
                imageFileInput.dispatchEvent(event);
            }
        });
    }
});
