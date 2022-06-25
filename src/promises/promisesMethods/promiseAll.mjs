


// Promise.all using fetch (use this code in the browser)

// const p1 = fetch("/fileName.txt");
// const p2 = fetch("/stufff.txt");
// const p3 = fetch("/src/callback/index.html");

// Promise.all([p1, p2, p3])
//   .then(responses => {
//     responses.forEach(response => {
//       console.log(response.status, response.url);
//     })
//     console.log(responses);
//   })
//   .catch(err => console.log(err));



// Promises.all reading files and using some node modules

import { resolve } from 'path'; //module to create a new absolute route
import fs from 'fs'; //module to read a file

function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (error, data) => {
			if (error) return reject(error);
			return resolve(data);
		});
	});
}

Promise.all([readFile('./fileName.txt'), readFile('./fileName2.txt')]) //  leer 2 archivos al tiempo
    .then(data => data.map(item => resolve(item))) //nos devuelve una lista (data) de contenidos, los cuales contienen la ruta para otro archivo, los convertimos entonces a una nueva lista de rutas absolutas (resolve)
    .then(data2 => {
			console.log(data2);
			return Promise.all(data2.map(item => readFile(item)))
		}) // usamos esas rutas para crear una nueva lista de promesas a partir de readFile
    .then(finalData => console.log(finalData))
    .catch(error => console.error(error));
