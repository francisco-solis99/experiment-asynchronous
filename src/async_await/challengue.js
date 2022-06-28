
// import with commonJS
const fetchData = require('../utils/fetchData')
const API_URL = 'https://rickandmortyapi.com/api/character/';


/*  without the fetchData function
async function loadJson(url){
  const data = await fetch(url);
  return await data.json();
}


async function getAnswer(){
  try {
    const json = await loadJson(API_URL);
    console.log('Total Characters =>', json.info.count);
    console.log('Name Character =>', json.results[0].name);
    const urlOrigin = json.results[0].origin.url;
    const location = await loadJson(urlOrigin);
    console.log('Name Dimension =>', location.dimension);
  } catch(err) {
    console.log(err);
  }
}

getAnswer();
*/

// with the fetchData function
async function getData(){
  try {
    const data = await fetchData(API_URL);
    console.log('Total Characters =>', data.info.count);
    console.log('Name Character =>', data.results[0].name);
    const urlOrigin = data.results[0].origin.url;
    const location = await fetchData(urlOrigin);
    console.log('Name Dimension =>', location.dimension);
  } catch(err) {
    console.log(err);
  }
}

console.log('Before');
getData();
console.log('After');
