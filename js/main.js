// var searchBarElement = document.querySelector('#search-bar');
var searchFormElement = document.querySelector('form');
// var searchButtonElement = document.querySelector('#search-btn');
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

// view swapping start
function hideCityStatsView() {
  cityStatsViewContainer.className = 'hidden';
}

function hideHomeView() {
  homeViewContainer.className = 'hidden';
}

function hideFavAndSkipListView() {
  favAndSkipView.className = 'hidden';
}

function showFavAndSkipListView() {
  favAndSkipView.className = 'column-full height-fit-content';
}

function showCityStatsView() {
  cityStatsViewContainer.className = 'column-full height-fit-content';
  data.pageview = 'stats';
}

function removeStatsList() {
  while (cityStatsCityStatsList.childElementCount > 0) {
    cityStatsCityStatsList.firstChild.remove();
  }
}

function showHomeView() {
  homeViewContainer.className = 'column-full height-fit-content';
  removeStatsList();
  data.pageview = 'home';
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

function checkCityBooleanProperty(booleanValue) {
  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].boolean === booleanValue) {
      createFavSkipListItem(data.list[i].name, data.list[i].overallScore);
    }
  }
}

function homeView() {
  showHomeView();
  hideCityStatsView();
  hideFavAndSkipListView();
}

function cityStatsView() {
  hideHomeView();
  showCityStatsView();
  overAllScore();
}

function favoriteView() {
  showFavAndSkipListView();
  hideHomeView();
  hideCityStatsView();
  checkCityBooleanProperty(true);
  document.querySelector('#list-title').textContent = 'Favorites';
}

function skipView() {
  showFavAndSkipListView();
  hideHomeView();
  hideCityStatsView();
  checkCityBooleanProperty(false);
  document.querySelector('#list-title').textContent = 'Skip';
}

function lastSearchOnLoad(lastsearch) {
  updateCityStatsCityName(lastsearch);
  getCities(lastsearch);
  cityStatsView();
}

function pageLoadViews() {
  if (data.pageview === 'home') {
    homeView();
  } else if (data.pageview === 'stats') {
    lastSearchOnLoad(data.lastsearch);
  } else if (data.pageview === 'favorite') {
    favoriteView();
  } else if (data.pageview === 'skip') {
    skipView();
  }
}

function contentLoaded(event) {
  pageLoadViews();
}
document.addEventListener('DOMContentLoaded', contentLoaded);

function backToSearchButtonClick(event) {
  if (event.target.className === 'column-thirds mobile-search-btn' || event.target.className === 'desktop-search-btn') {
    homeView();
  }
}
document.addEventListener('click', backToSearchButtonClick);

function favoriteAndSkipListView(event) {
  var listTitleElement = document.querySelector('#list-title');

  if (event.target.className === 'column-50 mobile-favorited-btn' || event.target.className === 'desktop-favorited-btn') {
    while (favAndSkipUlElement.childElementCount > 0) {
      data.pageview = 'favorite';
      favAndSkipUlElement.firstChild.remove();
    }

    data.pageview = 'favorite';
    listTitleElement.textContent = 'Favorites';
    showFavAndSkipListView();
    hideHomeView();
    hideCityStatsView();
    checkCityBooleanProperty(true);
  } else if (event.target.className === 'column-50 mobile-skipped-btn' || event.target.className === 'desktop-skipped-btn') {
    data.pageview = 'skip';
    while (favAndSkipUlElement.childElementCount > 0) {
      favAndSkipUlElement.firstChild.remove();
    }

    data.pageview = 'skip';
    listTitleElement.textContent = 'Skipped';
    showFavAndSkipListView();
    hideHomeView();
    hideCityStatsView();
    checkCityBooleanProperty(false);
  }
}

containerElement.addEventListener('click', favoriteAndSkipListView);

// view swapping end

// notification start

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

function mobileFavSkipButtonClicked(event) {
  // if (event.target.className === 'skip-btn' || event.target.className === 'fa-solid fa-xmark') {
  if (event.target.className === 'column-thirds mobile-skip-btn') {
  // if (event.target.className === 'mobile-skip-btn') {
    addToSkip();
    notificationPopUp();
    populateNotification('Skip');
  // } else if (event.target.className === 'fav-btn' || event.target.className === 'fa-solid fa-heart') {
  // } else if (event.target.className === 'mobile-fav-btn') {
  } else if (event.target.className === 'column-thirds mobile-fav-btn') {
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

function addToList(booleanInput) {
  var city = {};
  city.name = cityStatsCityNameElement.textContent;
  city.overallScore = overAllScoreElement.textContent;
  city.boolean = booleanInput;
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
    addToList(true);
  } else if (checkIfListIncludes(data.list, cityStatsCityNameElement.textContent) === true) {
    updateCityBoolean(cityStatsCityNameElement.textContent, true);
  }
}

function addToSkip() {
  if (checkIfListIncludes(data.list, cityStatsCityNameElement.textContent) === false) {
    addToList(false);
  } else if (checkIfListIncludes(data.list, cityStatsCityNameElement.textContent) === true) {
    updateCityBoolean(cityStatsCityNameElement.textContent, false);
  }
}

function removeFromDataList(cityName) {
  for (var i = 0; i < data.list.length; i++) {
    if (cityName === data.list[i].name) {
      data.list.splice(i, 1);
    }
  }
}

function removeFromFavSkipList(event) {
  if (event.target.tagName === 'DIV') {
    removeFromDataList(event.target.querySelector('p').textContent);
    favAndSkipUlElement.removeChild(event.target.parentNode);
  }
}

favAndSkipUlElement.addEventListener('click', removeFromFavSkipList);

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
  return Math.floor(score.score_out_of_10);
}

function createList(scores) {
  var sumAllScores = 0;

  for (var i = 0; i < scores.length; i++) {
    sumAllScores += createListItem(scores[i]);
  }
  var newSum = (Math.round(sumAllScores / 17));
  overAllScore(newSum);
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
  data.lastsearch = inputValue;
  searchFormElement.reset();
}

searchFormElement.addEventListener('submit', homePageCitySearchSubmit);

// function searchButtonClick(event) {
//   searchBarElement.focus();
//   hideCityStatsView();
//   showHomeView();
//   hideFavAndSkipListView();
// }

// searchButtonElement.addEventListener('click', searchButtonClick);

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

// if response message === 404 or something, then return invalid request, try "los angeles"
