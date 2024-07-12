const form = document.querySelector('form');
const sortBtn = document.getElementById('sortBtn');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');
let searchData = [];

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    try {
        const searchTerm = form.elements.query.value;
        const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        searchData = data; 
        tvShowsSearch(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

sortBtn.addEventListener('click', function() {
    const sortedData = sortShowsByRating();
    tvShowsSearch(sortedData);
});

ratingSlider.addEventListener('input', function() {
    ratingValue.textContent = ratingSlider.value;
});

const tvShowsSearch = (data) => {
    const divShow = document.querySelector('.showing');


    while (divShow.firstChild) {
        divShow.removeChild(divShow.firstChild);
    }

    data.forEach(d => {
        if (d.show.image && (!ratingSlider.value || d.show.rating.average >= ratingSlider.value)) {
            const container = document.createElement('div');
            container.classList.add('show-container'); 
            const img = document.createElement('img');
            img.src = d.show.image.medium;
            img.classList.add('show-image'); 

            const span = document.createElement('span');
            span.innerText = d.show.name;
            span.classList.add('show-name'); 
            container.appendChild(img);
            container.appendChild(span);
            divShow.appendChild(container);
        }
    });
};

const sortShowsByRating = () => {
    const searchTerm = form.elements.query.value;
    const filteredData = searchTerm ? searchData.filter(d => d.show.name.toLowerCase().includes(searchTerm.toLowerCase())) : searchData;
    const sortedData = filteredData.sort((a, b) => {
        if (!a.show.rating.average) return 1;
        if (!b.show.rating.average) return -1;
        return b.show.rating.average - a.show.rating.average;
    });
    return sortedData;
};
