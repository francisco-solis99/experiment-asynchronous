// an example to pass callbacks to use promises


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

  readFile('./stuff.txt', function(err, data){
    if(err) return console.log(err);
    cpnsole.log('date')
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

readFile('./stufff.txt')
	.then(data => console.log(data))
	.catch(error => console.error(error));
