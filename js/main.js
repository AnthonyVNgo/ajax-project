var searchBarElement = document.querySelector('#search-bar');
var searchFormElement = document.querySelector('form');
var searchButtonElement = document.querySelector('#search-btn');

// data stuff

var cityData = [];

// Mobile Nav Search Button

function searchButtonClick(event) {
  searchBarElement.focus();
}

searchButtonElement.addEventListener('click', searchButtonClick);

// Search Bar Submit Event

function submit(event) {
  event.preventDefault();
  var inputValue = searchFormElement.querySelector('input').value;

  if (inputValue.search(' ') !== -1) {
    var newInputValue = inputValue.replace(' ', '-');
    inputValue = newInputValue;
  }
  getCities(inputValue);
}

searchFormElement.addEventListener('submit', submit);

function getCities(city) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.teleport.org/api/urban_areas/slug%3A' + city + '/scores/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var cityStats = xhr.response;
    cityData.push(cityStats);
    // console.log(cityData);
  });
  xhr.send();
}
