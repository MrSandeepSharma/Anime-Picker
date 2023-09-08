import { animeSeries } from "./data.js";

const genreContainer = document.getElementById("genre-container");
const checkBoxEl = document.getElementById("checkbox-el");
const modalEl = document.getElementById("modal");
const modalInnerEl = document.getElementById("modal-inner");
const closeModalBtn = document.getElementById("close-btn");
const findSeriesBtn = document.getElementById("find-series");

genreContainer.addEventListener("change", highlightRadioBtn);
document.addEventListener("click", closeModalOutside, true);
closeModalBtn.addEventListener("click", closeModal);
findSeriesBtn.addEventListener("click", renderSeries);

function highlightRadioBtn(e) {
  const activeRadio = document.getElementById(e.target.id);
  if (document.querySelector(".highlight")) {
    document.querySelector(".highlight").classList.remove("highlight");
  }
  activeRadio.parentElement.classList.add("highlight");
}

function closeModalOutside(e) {
  const inside = modalEl.contains(e.target);
  if (!inside) {
    closeModal();
  }
}

function closeModal() {
  modalEl.style.display = "none";
}

function renderSeries() {
  if (document.querySelector("input[type='radio']:checked")) {
    const series = getOneFavoriteGenreSeries();
    modalInnerEl.innerHTML = `
  <img class="modal-img" src="images/${series.image}" alt="${series.seriesName}" />
  <h2>${series.seriesName}</h2>
  <p>${series.summary}</p>
  `;
    modalEl.style.display = "block";
  }
}

function getOneFavoriteGenreSeries() {
  const seriesArray = getFavoriteGenreSeriesArray();
  if (seriesArray.length === 1) {
    return seriesArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * seriesArray.length);
    return seriesArray[randomNumber];
  }
}

function getFavoriteGenreSeriesArray() {
  const activeRadio = document.querySelector("input[type='radio']:checked").id;
  let hasChecked = checkBoxEl.checked;

  let favoriteGenreSeriesArray = animeSeries.filter(function (series) {
    if (hasChecked) {
      return series.genre.includes(activeRadio) && series.isDubbed === true;
    } else {
      return series.genre.includes(activeRadio);
    }
  });
  return favoriteGenreSeriesArray;
}

function getAnimeSeriesGenreArray() {
  const animeSeriesGenreArray = [];
  for (let series of animeSeries) {
    for (let genre of series.genre) {
      if (!animeSeriesGenreArray.includes(genre)) {
        animeSeriesGenreArray.push(genre);
      }
    }
  }
  return animeSeriesGenreArray;
}

function renderAnimeSeriesGenre() {
  const genreArray = getAnimeSeriesGenreArray();
  let genres = "";
  for (let genre of genreArray) {
    genres += `
        <div class="genre-radio">
            <label for="${genre}">${genre}</label>
            <input type="radio"
            id="${genre}"
            name="radio">
        </div>
    `;
  }
  genreContainer.innerHTML = genres;
}

renderAnimeSeriesGenre();
