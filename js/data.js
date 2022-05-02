/* exported data */
var data = {
  pageview: null,
  // favorite: [],
  // skip: [],
  list: []
};

var previousDataListJSON = localStorage.getItem('javascript-local-storage');

if (previousDataListJSON !== null) {
  data.list = JSON.parse(previousDataListJSON);
}

function stringifyFunction(event) {
  var dataListJSON = JSON.stringify(data.list);
  localStorage.setItem('javascript-local-storage', dataListJSON);
}

window.addEventListener('beforeunload', stringifyFunction);
