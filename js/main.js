var searchBarElement = document.querySelector('#search-bar');
var searchFormElement = document.querySelector('form');
var searchButtonElement = document.querySelector('#search-btn');

// Mobile Nav Search Button

function searchButtonClick(event) {
  searchBarElement.focus();
}

searchButtonElement.addEventListener('click', searchButtonClick);

// Search Bar Submit Event

function submit(event) {
  event.preventDefault();
  // console.log(event.target);
  // console.log(event.target.tagName);
  var inputValue = searchFormElement.querySelector('input').value;
  // console.log(inputValue);

  if (inputValue.search(' ') !== -1) {
    var newInputValue = inputValue.replace(' ', '-');
    inputValue = newInputValue;
    // console.log(inputValue);
  }
  getCities(inputValue);
}

searchFormElement.addEventListener('submit', submit);

function getCities(city) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.teleport.org/api/urban_areas/slug%3A' + city + '/scores/');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);
    // console.log(xhr.status);
    // var categories = xhr.response.categories;
    // console.log({ categories });
  });
  xhr.send();
}
