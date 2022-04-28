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
var backToSearchButton = document.querySelector('.back-to-search-container').querySelector('button');
var favSkipContainer = document.querySelector('.fav-skip-container');
var notificationContainer = document.querySelector('.notification-container');

function removeStatsList() {
  cityStatsCityStatsList.innerHTML = '';
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

var mobileFavSkipContainer = document.querySelector('.mobile-nav-container');

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

function addToFavorite() {
  var cityPropertiesForData = {};
  cityPropertiesForData.name = cityStatsCityNameElement.textContent;
  cityPropertiesForData.overallScore = overAllScoreElement.textContent;

  data.favorite.push(cityPropertiesForData);
}

function addToSkip(event) {
  var cityPropertiesForData = {};
  cityPropertiesForData.name = cityStatsCityNameElement.textContent;
  cityPropertiesForData.overallScore = overAllScoreElement.textContent;

  data.skip.push(cityPropertiesForData);
}

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
function showHomeView() {
  homeViewContainer.className = 'column-full height-fit-content';
  removeStatsList();
}

function showCityStatsView() {
  cityStatsViewContainer.className = 'column-full height-fit-content';
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
}

searchButtonElement.addEventListener('click', searchButtonClick);

// Back to Search Button Desktop View

function backToSearchButtonClick(event) {
  hideCityStatsView();
  showHomeView();
}

backToSearchButton.addEventListener('click', backToSearchButtonClick);
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
