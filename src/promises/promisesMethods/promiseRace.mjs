
// Promise.race using fetch (use this code in the browser)

// const p1 = fetch("//src/callback/index.js");
// const p2 = fetch("/stufff.txt");
// const p3 = fetch("/src/callback/index.html");

// // Promise.race([p1, p2, p3])
// Promise.race([p1, p2, p3])
//   .then(response => console.log(response.status, response.url, response))
//   .catch(err => console.log(err));






  // Promises.race reading files and using some node modules

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

Promise.race([readFile('./fileName.txt'), readFile('./fileName2.txt')])
    .then(data => resolve(data))
    .then(data2 => readFile(data2))
    .then(finalData => console.log(finalData))
    .catch(error => console.error(error));

/*
  Como vemos en el ejemplo otra vez leemos 2 archivos, pero esta vez solo obtenemos el contenido de 1, el que primero se termine de leer. O si alguno se completó con un error entonces entramos al catch y mostramos el error en consola.

*/


// Promise.resolve
Promise.resolve('./fileName.txt') // iniciamos la cadena con un string
	.then(fileName => resolve(fileName)) //obtenemos el path absoluto
	.then(file => {
    console.log(file);
    return readFile(file) //read the file
  })
	.then(data => console.log(data)) //show the content inside
	.catch(error => console.error(error));
