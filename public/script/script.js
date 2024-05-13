window.onload = function() {
    // Noise
    const noisyElements = document.querySelectorAll('.noisy');
    noisyElements.forEach((element) => {
        const borderRadius = window.getComputedStyle(element).getPropertyValue('border-radius') || '0px';
        console.log(borderRadius);
        element.innerHTML = `<svg width="100%" height="100%" class="noise" style="border-radius: ${borderRadius}"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch"></feTurbulence></filter><rect width="100%" height="100%" filter="url(#noise)"></rect></svg> ${element.innerHTML}`;
        element.style.position = 'relative';
    });

    // Dark mode toggle
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });

}

