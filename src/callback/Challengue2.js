/* Request to Star wars API
   Make a table with the characters and his origin planet, also get the name of darth vader's ship using the XMLHttp object
*/

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

// get the data
function fetchData(url, callback) {
  const client = new XMLHttpRequest();
  client.open('GET', url, true);

  client.onreadystatechange = (event) => {
    if(client.readyState === 4) {
      if(client.status === 200) {
        callback(null, JSON.parse(client.responseText));
      }
      else {
        const err = new Error('Error with ' + url);
        callback(err, null);
      }
    }
  }
  client.send();
}

const API = 'https://swapi.dev/api/';

fetchData(API, (err, data) => {
  if(err) return console.log(err);
  const peopleUrl = data.people;
  fetchData(peopleUrl, (err2, data2) => {
    if(err2) return console.log(err2);
    generateRows('characters', data2.results);
    const planets = Array(data2.results.length).fill(null);
    console.log(planets);
    data2.results.forEach((character, index) => {
      fetchData(character.homeworld,(err3, data3) => {
        if(err3) return console.log(err3);
        planets.splice(index, 1, data3);
        if(planets.every(item => item)){
          generateRows('origin-planet', planets);
          // generateRows('characters', data2.results);
        }
      })
    })
  })
})


