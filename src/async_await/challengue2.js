const app = document.querySelector('#app');

// generate the columns
const generateColumn = (nameCol) => {
  const col = document.createElement('div');
  col.classList.add('star-wars__column', 'skeleton');
  col.dataset.column = nameCol.toLowerCase();
  col.innerHTML = /*html*/`<h3 class="column__title">${nameCol}</h3>`
  return col;
}

const listOfCols = ['Characters', 'Origin-Planet']

listOfCols.forEach(col => {
  const htmlColum = generateColumn(col);
  app.appendChild(htmlColum);
})


// functions to fill with the data
const generateRows = (nameCol, dataArray) => {
  const htmlColumn = document.querySelector(`.star-wars__column[data-column="${nameCol}"]`);
  if(!htmlColumn) return console.warn('Column not found, chec the name of the column tha you passed');
  const fragment = document.createDocumentFragment();
  console.log(dataArray);
  dataArray.forEach((element, index) => {
       const p = document.createElement('p');
       p.textContent = element.name;
       p.classList.add('star-wars__row',`star-wars__row-${nameCol}`);
       p.dataset.id = index;
       fragment.append(p);
  });
  htmlColumn.classList.remove('skeleton');
  htmlColumn.appendChild(fragment);
}

const API = 'https://swapi.dev/api/';
// using async/await


async function loadJson(url){
  const data = await fetch(url);
  return await data.json();
}

async function fillRowsData() {
  try {
    const response = await loadJson('https://swapi.dev/api/');
    const {results: people} = await loadJson(response.people);
    const planetsUrls = people.map(element => element.homeworld);
    const dataPlanets = Promise.all(planetsUrls.map(async (url) => await loadJson(url)));
    const planets = await dataPlanets; //also could be dataPlanets.then(planets => generateRows('origin-planet', planets))
    generateRows('characters', people);
    generateRows('origin-planet', planets);

  } catch(err) {
    console.log(new Error(err));
  }
}

fillRowsData();

