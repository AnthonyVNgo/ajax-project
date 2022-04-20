var searchBarElement = document.querySelector('#search-bar');
var searchFormElement = document.querySelector('form');

function submit(event) {
  event.preventDefault();
}

searchFormElement.addEventListener('submit', submit);

// Mobile Nav

var searchButtonElement = document.querySelector('#search-btn');

function searchButtonClick(event) {
  searchBarElement.focus();
}

searchButtonElement.addEventListener('click', searchButtonClick);

// AJAX

// function getCities() {
//   var xhr = XMLHttpRequest();

//   xhr.open('GET', 'https://api.teleport.org/api/cities/?search=irvine');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     console.log(xhr.status);
//     console.log(xhr.response);
//   });
//   xmr.send();
// }

// console.log(xmr.status)
// console.log(xmr.response)

// }
