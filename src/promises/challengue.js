
console.log('challengue');

// import with commonJS
const fetchData = require('../utils/fetchData')
const API_URL = 'https://rickandmortyapi.com/api/character/';

// using the fetchData function created by us

fetchData(API_URL)
  .then(data => {
    console.log('Total Characters =>', data.info.count);
    return fetchData(`${API_URL}${data.results[0].id}`);
  })
  .then(data => {
    console.log('Name Cahracter =>', data.name);
    return fetchData(data.origin.url);
  })
  .then(data => {
    console.log('Name Dimension =>', data.dimension);
  })
  .catch(err => console.log(err));


// using directly fetch (browser API), use this code in the browser (or brint the module node-fetch)
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
     console.log('Total Characters =>', data.info.count);
     console.log('Name Character =>', data.results[0].name);
     return fetch(data.results[0].origin.url);
    })
    .then(response => response.json())
    .then(data =>  console.log('Name Dimension =>', data.dimension))
    .catch(err => console.log(err))


