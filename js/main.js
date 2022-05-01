var searchBarElement = document.querySelector('#search-bar');
var searchFormElement = document.querySelector('form');
var searchButtonElement = document.querySelector('#search-btn');
var cityStatsCityNameElement = document.querySelector('#city-stats-view-city-name');
var cityStatsCityStatsList = document.querySelector('#city-stats-view-city-stats');
var cityStatsViewContainer = document.querySelector('#city-stats-view');
var homeViewContainer = document.querySelector('#home-view');
var overAllScoreElement = document.querySelector('.overall-score');
var xIcon = document.querySelector('.fa-xmark');
var summaryButton = document.querySelector('#summary-button');
var modalContainer = document.querySelector('.modal-container');

var favSkipContainer = document.querySelector('.fav-skip-container');
var notificationContainer = document.querySelector('.notification-container');
var mobileFavSkipContainer = document.querySelector('.mobile-nav-container');
var favAndSkipView = document.querySelector('#fav-and-skip-list-view');
var favAndSkipUlElement = document.querySelector('#fav-and-skip-list');

var containerElement = document.querySelector('.container');

function backToSearchButtonClick(event) {
  if (event.target.className === 'search-btn') {
    hideCityStatsView();
    showHomeView();
    hideFavAndSkipListView();
  }
}

containerElement.addEventListener('click', backToSearchButtonClick);

function favoriteAndSkipListView(event) {
  var listTitleElement = document.querySelector('#list-title');

  if (event.key === 'F') {
    while (favAndSkipUlElement.childElementCount > 0) {
      favAndSkipUlElement.firstChild.remove();
    }

    data.view = 'favorite';
    listTitleElement.textContent = 'Favorites';
    showFavAndSkipListView();
    hideHomeView();
    hideCityStatsView();
    createFavSkipList(data.favorite);
  } else if (event.key === 'S') {
    while (favAndSkipUlElement.childElementCount > 0) {
      favAndSkipUlElement.firstChild.remove();
    }

    data.view = 'skip';
    listTitleElement.textContent = 'Skipped';
    showFavAndSkipListView();
    hideHomeView();
    hideCityStatsView();
    createFavSkipList(data.skip);
  }

}

function showFavAndSkipListView() {
  favAndSkipView.className = 'column-full height-fit-content';
}

function hideFavAndSkipListView() {
  favAndSkipView.className = 'hidden';
}

function notificationPopUp() {
  notificationContainer.className = 'notification-container';
  setTimeout(hideNotificationPopUp, 750);
}

function hideNotificationPopUp() {
  notificationContainer.className = 'notification-container notification-container-fade';
}

function populateNotification(favOrSkip) {
  var notificationTextElement = notificationContainer.querySelector('p');
  notificationTextElement.innerHTML = cityStatsCityNameElement.innerHTML + ' added to ' + favOrSkip + ' list';
}

// DESKTOP FAV AND SKIP BUTTONS

function favSkipButtonClicked(event) {
  var btnEventTarget = event.target.className;
  if (btnEventTarget === 'fav-btn') {
    addToFavorite();
    notificationPopUp();
    populateNotification('Favorite');
  } else if (btnEventTarget === 'skip-btn') {
    addToSkip();
    notificationPopUp();
    populateNotification('Skip');
  }
}

favSkipContainer.addEventListener('click', favSkipButtonClicked);

// MOBILE FAV AND SKIP BUTTONS

function mobileFavSkipButtonClicked(event) {
  if (event.target.className === 'skip-btn' || event.target.className === 'fa-regular fa-face-frown') {
    addToSkip();
    notificationPopUp();
    populateNotification('Skip');
  } else if (event.target.className === 'fav-btn' || event.target.className === 'fa-regular fa-face-smile-beam') {
    addToFavorite();
    notificationPopUp();
    populateNotification('Favorite');
  }
}

mobileFavSkipContainer.addEventListener('click', mobileFavSkipButtonClicked);

document.addEventListener('keydown', favoriteAndSkipListView);

function checkIfListIncludes(input, value) {
  for (var i = 0; i < input.length; i++) {
    if (input[i].name === value) {
      return true;
    }
  }
  return false;
}

function addToList() {
  var city = {};
  city.name = cityStatsCityNameElement.textContent;
  city.overallScore = overAllScoreElement.textContent;
  city.boolean = true;
  data.list.push(city);
}

function updateCityBoolean(textContent, booleanValue) {
  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].name === textContent) {
      data.list[i].boolean = booleanValue;
    }
  }
}

function addToFavorite() {
  if (checkIfListIncludes(data.list, cityStatsCityNameElement.textContent) === false) {
    addToList();
  } else if (checkIfListIncludes(data.list, cityStatsCityNameElement.textContent) === true) {
    updateCityBoolean(cityStatsCityNameElement.textContent, true);
  }
}

function addToSkip() {
  if (checkIfListIncludes(data.list, cityStatsCityNameElement.textContent) === false) {
    addToList();
  } else if (checkIfListIncludes(data.list, cityStatsCityNameElement.textContent) === true) {
    updateCityBoolean(cityStatsCityNameElement.textContent, false);
  }
}

function createFavSkipListItem(name, score) {
  var liElement = document.createElement('li');
  var liContainer = document.createElement('div');
  var liStatsElement = document.createElement('p');
  var liScoreElement = document.createElement('p');

  liContainer.className = 'row justify-content-space-between';
  liStatsElement.textContent = name;
  liScoreElement.textContent = score;

  liElement.appendChild(liContainer);
  liContainer.appendChild(liStatsElement);
  liContainer.appendChild(liScoreElement);
  favAndSkipUlElement.appendChild(liElement);
}

function createFavSkipList(listArr) {
  for (var i = 0; i < listArr.length; i++) {
    createFavSkipListItem(listArr[i].name, listArr[i].overallScore);
  }
}

// function checkCityBooleanProperty(input) {
//   for (var i = 0; i < input.length; i++) {
//     if (input[i].boolean === true) {
//       return true;
//     }
//   }
//   return false;
// }

function showModal() {
  modalContainer.className = 'modal-container';
}

function hideModal() {
  modalContainer.className = 'hidden';
}

function summaryModal(event) {
  showModal();
}

summaryButton.addEventListener('click', summaryModal);

function exitCitySummaryMobile(event) {
  hideModal();
}

xIcon.addEventListener('click', exitCitySummaryMobile);

// View Swapping Functions

function hideHomeView() {
  homeViewContainer.className = 'hidden';
}

function removeStatsList() {
  while (cityStatsCityStatsList.childElementCount > 0) {
    cityStatsCityStatsList.firstChild.remove();
  }
}

function showHomeView() {
  homeViewContainer.className = 'column-full height-fit-content';
  removeStatsList();
  data.view = 'home';
}

function showCityStatsView() {
  cityStatsViewContainer.className = 'column-full height-fit-content';
  data.view = 'stats';
}

function hideCityStatsView() {
  cityStatsViewContainer.className = 'hidden';
}

// City Stats View Stuff

function createListItem(score) {
  var liElement = document.createElement('li');
  var liContainer = document.createElement('div');
  var liStatsElement = document.createElement('p');
  var liScoreElement = document.createElement('p');

  liContainer.className = 'row justify-content-space-between';

  liStatsElement.textContent = score.name;
  liScoreElement.textContent = Math.floor(score.score_out_of_10) + '/10';

  liElement.appendChild(liContainer);
  liContainer.appendChild(liStatsElement);
  liContainer.appendChild(liScoreElement);
  cityStatsCityStatsList.appendChild(liElement);

  // Returning the score of each category so we can add and find the average for the overall score
  return Math.floor(score.score_out_of_10);
}

// adds each of the 17 list items onto the ul element
function createList(scores) {
  var sumAllScores = 0;

  for (var i = 0; i < scores.length; i++) {
    sumAllScores += createListItem(scores[i]);
  }
  var newSum = (Math.round(sumAllScores / 17));
  overAllScore(newSum);
}

// updates the overall green highlited score in the city stats view
function overAllScore(score) {
  overAllScoreElement.textContent = score + '/10';
}

function updateCityStatsCityName(cityNameFromInput) {
  if (cityNameFromInput.search('-') !== -1) {
    var updatedCityStatCityName = cityNameFromInput.replace('-', ' ');
    cityStatsCityNameElement.textContent = updatedCityStatCityName;
  }
}

function populateSummaryMobile(xhrResponseSummaryProperty) {
  var modalContainer = document.querySelector('.modal');
  var summaryElement = modalContainer.querySelector('p');
  summaryElement.innerHTML = xhrResponseSummaryProperty;
}

function populateSummaryDesktop(xhrResponseSummaryProperty) {
  var summaryDesktopContainer = document.querySelectorAll('.stats-column')[1];
  var summaryElement = summaryDesktopContainer.querySelector('p');
  summaryElement.innerHTML = xhrResponseSummaryProperty;
}

function cityStatsView() {
  hideHomeView();
  showCityStatsView();
  overAllScore();
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
  searchFormElement.reset();
}

searchFormElement.addEventListener('submit', homePageCitySearchSubmit);

// Mobile Nav Search Button

function searchButtonClick(event) {
  searchBarElement.focus();
  hideCityStatsView();
  showHomeView();
  hideFavAndSkipListView();
}

searchButtonElement.addEventListener('click', searchButtonClick);

// Back to Search Button Desktop View

// Ajax Data Stuff

function getCities(city) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.teleport.org/api/urban_areas/slug%3A' + city + '/scores/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var cityStats = xhr.response.categories;
    createList(cityStats);
    var citySummary = xhr.response.summary;
    populateSummaryMobile(citySummary);
    populateSummaryDesktop(citySummary);
  });
  xhr.send();
}
