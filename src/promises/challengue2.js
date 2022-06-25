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
// using fetch
fetch(API)
  .then(response => response.json())
  .then(data => fetch(data.people))
  .then(response => response.json())
  .then(data => {
    generateRows('characters', data.results)
    const planetsUrls = data.results.map(item => item.homeworld);
    const planets = Array(data.results.length).fill(null);
    planetsUrls.forEach((url, index) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          planets.splice(index, 1, data);
          if(planets.every(planet => planet !== null)) generateRows('origin-planet', planets);
        })
        .catch(err => console.log(err));
    });
  })
  .catch(err => console.log(err));

