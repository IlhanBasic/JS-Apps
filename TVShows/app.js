const form = document.querySelector('form');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    try {
        const searchTerm = form.elements.query.value;
        const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        tvShowsSearch(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

const tvShowsSearch = (data) => {
    const divShow = document.querySelector('.showing');

    // Prvo uklanjamo sve prethodno prikazane slike
    while (divShow.firstChild) {
        divShow.removeChild(divShow.firstChild);
    }

    // Dodajemo nove slike
    data.forEach(d => {
        if (d.show.image) {
            const container = document.createElement('div');
            container.classList.add('show-container'); // Dodajemo klasu za stilizaciju

            const img = document.createElement('img');
            img.src = d.show.image.medium;
            img.classList.add('show-image'); // Dodajemo klasu za stilizaciju

            const span = document.createElement('span');
            span.innerText = d.show.name;
            span.classList.add('show-name'); // Dodajemo klasu za stilizaciju

            container.appendChild(img);
            container.appendChild(span);
            divShow.appendChild(container);
        }
    });
};
