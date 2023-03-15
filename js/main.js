
const inputSearch = document.querySelector("#search-input");
const submitBtn = document.querySelector("#search-btn");
const Name = document.querySelector(".mainName");
const result = document.querySelector(".anime-result");
const anime = document.querySelector("#anime");
const animeDetails = document.querySelector(".anime-details");
const closeAnime = document.querySelector("#gif-close-btn");
const mainTitle = document.querySelector(".mainTi");
const divDetails = document.querySelector(".gif-details-content");


inputSearch.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitBtn.click();
    }
});

//fetch function
const fetch = (method, url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(JSON.parse(xhr.responseText))
        }
    }
    xhr.open(method, url);
    xhr.send();
}

window.onload = () => {
    inputSearch.value = `naurto`;
    submitBtn.click();
};


submitBtn.addEventListener('click', () => {
    anime.innerHTML = '';
    const animeName = inputSearch.value;
    const url1 = `https://kitsu.io/api/edge/anime?filter%5Btext%5D=${animeName}`

    const mainFun = (obj1) => {
        if (obj1.data.length !== 0) {
            obj1.data.forEach(e => {
                const card = document.createElement('div');
                card.classList.add('anime-item');
                anime.appendChild(card);

                const imgDiv = document.createElement('div');
                imgDiv.classList.add('anime-img');
                card.appendChild(imgDiv);

                const image = document.createElement('img');
                image.src = e.attributes.posterImage.original;
                imgDiv.appendChild(image);

                const titleContainer = document.createElement('div');
                titleContainer.classList.add('anime-name');
                card.appendChild(titleContainer);

                const title = document.createElement('h3');
                title.classList.add('mainAnime')
                title.textContent = e.attributes.titles.en_jp
                titleContainer.appendChild(title);

                const InfoDiv = document.createElement('div');
                InfoDiv.classList.add('synopsis');
                card.appendChild(InfoDiv);

                const Info = document.createElement('blockquote');
                Info.textContent = e.attributes.synopsis
                InfoDiv.appendChild(Info);

                const btnDiv = document.createElement('div');
                btnDiv.classList.add('anime-btn');
                card.appendChild(btnDiv);

                const btn = document.createElement('button');
                btn.classList.add('gifs-btn');
                btn.textContent = " GIF!"
                btnDiv.appendChild(btn);
            });

        }
        else {
            anime.innerHTML = '';
            const imageNotFound = document.createElement('div');
            imageNotFound.classList.add('notFound');
            const defaultImage = document.createElement('img');
            defaultImage.src = './imgs/error-404.png';
            defaultImage.setAttribute('width', '150px');
            imageNotFound.textContent = "We didn't find any Anime,try again!"
            result.appendChild(imageNotFound.appendChild(defaultImage));

        }
    }
    fetch('GET', url1, mainFun)
})





closeAnime.addEventListener("click", () => {
    animeDetails.style.display = 'None'
})




