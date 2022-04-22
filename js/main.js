var searchBarElement = document.querySelector('#search-bar');
var searchFormElement = document.querySelector('form');
var searchButtonElement = document.querySelector('#search-btn');
var cityStatsCityNameElement = document.querySelector('#city-stats-view-city-name');
var cityStatsCityStatsList = document.querySelector('#city-stats-view-city-stats');
var cityStatsViewContainer = document.querySelector('#city-stats-view');
var homeViewContainer = document.querySelector('#home-view');
var overAllScoreElement = document.querySelector('.overall-score');

// data stuff

var cityData = [];

// View Swapping Functions

function hideHomeView() {
  homeViewContainer.className = 'hidden';
}
function showHomeView() {
  homeViewContainer.className = 'column-full height-fit-content';
}

function showCityStatsView() {
  cityStatsViewContainer.className = 'column-full height-fit-content';
}

function hideCityStatsView() {
  cityStatsViewContainer.className = 'hidden';
}

// City Stats View Stuff

function createListItem(city, score) {
  var liElement = document.createElement('li');
  var liContainer = document.createElement('div');
  var liStatsElement = document.createElement('p');
  var liScoreElement = document.createElement('p');

  liContainer.className = 'row justify-content-space-between';

  liStatsElement.textContent = 'rosemead';
  liScoreElement.textContent = score + '/10';

  liElement.appendChild(liContainer);
  liContainer.appendChild(liStatsElement);
  liContainer.appendChild(liScoreElement);
  cityStatsCityStatsList.appendChild(liElement);
}

function createList() {
  for (var i = 0; i < 6; i++) {
    createListItem();
  }
}

function overAllScore(score) {
  overAllScoreElement.textContent = score + '/10';
}

function updateCityStatsCityName(cityNameFromInput) {
  if (cityNameFromInput.search('-') !== -1) {
    var updatedCityStatCityName = cityNameFromInput.replace('-', ' ');
    cityStatsCityNameElement.textContent = updatedCityStatCityName;
  }
}

function cityStatsView() {
  hideHomeView();
  showCityStatsView();
  overAllScore();
  createList();
}

// Search Bar Submit Event

function homePageCitySearchSubmit(event) {
  event.preventDefault();
  var inputValue = searchFormElement.querySelector('input').value;

  if (inputValue.search(' ') !== -1) {
    var newInputValue = inputValue.replace(' ', '-');
    inputValue = newInputValue;
  }

  updateCityStatsCityName(inputValue);
  getCities(inputValue);
  cityStatsView();
  // console.log(cityData);
  // console.log(cityData[0]);
  // liAutofill();
}

searchFormElement.addEventListener('submit', homePageCitySearchSubmit);

// Mobile Nav Search Button

function searchButtonClick(event) {
  searchBarElement.focus();
  hideCityStatsView();
  showHomeView();
}

searchButtonElement.addEventListener('click', searchButtonClick);

// Ajax Data Stuff

function getCities(city) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.teleport.org/api/urban_areas/slug%3A' + city + '/scores/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var cityStats = xhr.response.categories;
    // console.log(cityStats);
    cityData.push(cityStats);
    // console.log(cityData);
    // console.log(cityData[0]);
  });
  xhr.send();
}

// function liAutofill() {
//   console.log(cityData);
//   console.log(cityData[0]);
// }

// function populateListContent() {
//   // var simpleCityData = cityData[0].categories;
//   console.log(cityData['0']);
//   // for (var i = 0; i < cityStatsCityStatsList.children.length; i++) {
//   //   if (i === 0) {
//   //     cityStatsCityStatsList.children[i].querySelector('div').firstElementChild.textContent = consolidatedCityData[0].name;
//   //     cityStatsCityStatsList.children[i].querySelector('div').lastElementChild.textContent = consolidatedCityData[0].score;
//   //   } else if (i === 1) {
//   //     cityStatsCityStatsList.children[i].querySelector('div').firstElementChild.textContent = 'yee';
//   //     cityStatsCityStatsList.children[i].querySelector('div').lastElementChild.textContent = 'haw';
//   //   } else if (i === 2) {
//   //     cityStatsCityStatsList.children[i].querySelector('div').firstElementChild.textContent = 'yipee';
//   //     cityStatsCityStatsList.children[i].querySelector('div').lastElementChild.textContent = 'kaiyay';
//   //   } else if (i === 3) {
//   //     cityStatsCityStatsList.children[i].querySelector('div').firstElementChild.textContent = 'motha';
//   //     cityStatsCityStatsList.children[i].querySelector('div').lastElementChild.textContent = 'fffff';
//   //   } else if (i === 4) {
//   //     cityStatsCityStatsList.children[i].querySelector('div').firstElementChild.textContent = 'a';
//   //     cityStatsCityStatsList.children[i].querySelector('div').lastElementChild.textContent = 'b';
//   //   } else if (i === 5) {
//   //     cityStatsCityStatsList.children[i].querySelector('div').firstElementChild.textContent = 'c';
//   //     cityStatsCityStatsList.children[i].querySelector('div').lastElementChild.textContent = 'd';
//   //   }
//   // }
// }
