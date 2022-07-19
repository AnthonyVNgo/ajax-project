var searchBarElement = document.querySelector('#search-bar');
var searchFormElement = document.querySelector('form');
var cityStatsCityNameElement = document.querySelector('#city-stats-view-city-name');
var cityStatsCityStatsList = document.querySelector('#city-stats-view-city-stats');
var cityStatsViewContainer = document.querySelector('#city-stats-view');
var homeViewContainer = document.querySelector('#home-view');
var overAllScoreElement = document.querySelector('.overall-score');
var xIcon = document.querySelector('.fa-xmark');
var summaryButton = document.querySelector('#summary-button');
var modalContainer = document.querySelector('.modal-container');
var notificationContainer = document.querySelector('.notification-container');
var favAndSkipView = document.querySelector('#fav-and-skip-list-view');
var favAndSkipUlElement = document.querySelector('#fav-and-skip-list');

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

function showHomeView() {
  homeViewContainer.className = 'column-full height-fit-content';
  removeStatsList();
  data.pageview = 'home';
}

function removeStatsList() {
  while (cityStatsCityStatsList.childElementCount > 0) {
    cityStatsCityStatsList.firstChild.remove();
  }
}

// function emptyListResponse() {
//   console.log('this list is empty');
// }

// function checkIfListIncludesFavOrSkippedObject(booleanValue) {
//   let conditionalvalue;
//   for (let i = 0; i < data.list.length; i++) {
//     if (data.list[i].boolean === booleanValue) {
//       conditionalvalue = true;
//     } else conditionalvalue = false;
//   }
//   return conditionalvalue;
// }

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

function favoritedAndSkippedListView(booleanValue) {
  showFavAndSkipListView();
  hideHomeView();
  hideCityStatsView();
  checkCityBooleanProperty(booleanValue);
  if (booleanValue === true) {
    document.querySelector('#list-title').textContent = 'Favorites';
    data.pageview = 'favorite';
    if (cityStatsCityStatsList.childElementCount === 0) {
      // emptyListResponse();
    }
  } else if (booleanValue === false) {
    document.querySelector('#list-title').textContent = 'Skipped';
    data.pageview = 'skip';
    if (cityStatsCityStatsList.childElementCount === 0) {
      // emptyListResponse();
    }
  }
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
    favoritedAndSkippedListView(true);
  } else if (data.pageview === 'skip') {
    favoritedAndSkippedListView(false);
  }
}

function contentLoaded(event) {
  pageLoadViews();
}
document.addEventListener('DOMContentLoaded', contentLoaded);

function searchButtonClick(event) {
  if (event.target.className === 'column-thirds mobile-search-btn' || event.target.className === 'fa-solid fa-magnifying-glass' || event.target.className === 'desktop-search-btn') {
    homeView();
    searchBarElement.focus();
  }
}

document.addEventListener('click', searchButtonClick);

function favoritedAndSkippedBtnClick(event) {
  if (event.target.className === 'column-50 mobile-favorited-btn' || event.target.className === 'desktop-favorited-btn') {
    while (favAndSkipUlElement.childElementCount > 0) {
      favAndSkipUlElement.firstChild.remove();
    }
    favoritedAndSkippedListView(true);
  } else if (event.target.className === 'column-50 mobile-skipped-btn' || event.target.className === 'desktop-skipped-btn') {
    while (favAndSkipUlElement.childElementCount > 0) {
      favAndSkipUlElement.firstChild.remove();
    }
    favoritedAndSkippedListView(false);
  }
}

document.addEventListener('click', favoritedAndSkippedBtnClick);

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

// adding to favorites or skipped lists

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

function UniverwsalFavSkipButtonClicked(event) {
  var btnEventTarget = event.target.className;
  if (btnEventTarget === 'column-thirds mobile-skip-btn' || btnEventTarget === 'skip-btn' || btnEventTarget === 'fa-solid fa-xmark') {
    addToSkip();
    notificationPopUp();
    populateNotification('Skip');
  } else if (btnEventTarget === 'column-thirds mobile-fav-btn' || btnEventTarget === 'fav-btn' || btnEventTarget === 'fa-solid fa-heart') {
    addToFavorite();
    notificationPopUp();
    populateNotification('Favorite');
  }
}

document.addEventListener('click', UniverwsalFavSkipButtonClicked);

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
