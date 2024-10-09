window.onload = function() {
    // Noise
    const noisyElements = document.querySelectorAll('.noisy');
    noisyElements.forEach((element) => {
        const borderRadius = window.getComputedStyle(element).getPropertyValue('border-radius') || '0px';
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


    // Get Learning
    const itLearningList = document.querySelector('#it_learning_list');
    const booksReadingList = document.querySelector('#books_reading_list');

    fetch('https://care-space-42021ec4f14c.herokuapp.com/notion/actual_learning')
        .then(response => response.json())
        .then(response => {
            if (response.it && response.it.length > 0) {
                itLearningList.innerHTML = response.it.map((item) => `<div>${item}</div>`).join('');
            } else {
                itLearningVide();
            }

            if (response.books && response.books.length > 0) {
                booksReadingList.innerHTML = response.books.map((item) => `<div>${item}</div>`).join('');
            } else {
                booksReadingVide();
            }

        })
        .catch(() => {
            itLearningVide();
            booksReadingVide();
        })
}

function itLearningVide () {
    const itLearningList = document.querySelector('#it_learning_list');
    itLearningList.innerHTML = '<div>🤞 Notion API</div><div>☸️ Kubernetes</div>';
}

function booksReadingVide() {
    const booksReadingList = document.querySelector('#books_reading_list');
    booksReadingList.innerHTML = '<div>🕶️ Blindness (novel)</div>';
}