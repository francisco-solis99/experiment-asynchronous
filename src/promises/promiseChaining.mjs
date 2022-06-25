// an example using multiple promisesto read the file stuff.txt reading the fileName.txt


/*
  Using callbacks and HttpRequest
  function readFile(path) {
    const client = new XMLHttpRequest();

    client.open('GET', path, true);
    client.send();

    client.onreadystatechange = function(event){
      if (client.readyState === 4) {
        if(client.status === 200){
          callback(null, client.responseText);
        }
        else {
          console.log('Error');
          const error = new Error('Error ' + urlApi);
          callback(error, null);
        }
      }
    }
  }

  readFile('../../fileName.txt', function(err, data){
    if(err) return console.log(err);
     readFile(data, (err2, data2) => {
         if(err2) return console.log(err2);
         console.log(data2);
     })
})


*/


// using promises
import fs from 'fs';

function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (error, data) => {
			if (error) return reject(error);
			return resolve(data);
		});
	});
}

readFile('./fileName.txt')
  .then(path => readFile(path)) // also could be .then(readFile)
	.then(data => console.log(data))
	.catch(error => console.error(error));

