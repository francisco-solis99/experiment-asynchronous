// dependencia XMLHttp Request para usar callbacks
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

console.log('challengue');


function fetchData(urlApi, callback) {
  // object XMLHttpRequest instance
  const client =  new XMLHttpRequest();

  // prepare the request and send it
  client.open('GET', urlApi, true); // the third parameteris for actuive the asyncronismo
  client.send();

  // watch the content of the property .responseText using a XML event (asyncronous code)
  client.onreadystatechange = function(event) {
    if (client.readyState === 4) {
      if(client.status === 200){
        callback(null, JSON.parse(client.responseText));
      }
      else {
        console.log('Error');
        const error = new Error('Error ' + urlApi);
        callback(error, null);
      }
    }
  }
}


const API_URL = 'https://rickandmortyapi.com/api/character/';

fetchData(API_URL, function(err, data){
  if(err) {
    console.log(err);
    return;
  }
  fetchData(API_URL + data.results[0].id, function(err2, data2) {
    if(err2){
      return console.log(err2);
    }
    fetchData(data2.origin.url, function(err3, data3){
      if(err3) return console.log(err3);
      console.log('Total Characters =>', data.info.count);
      console.log('Name Cahracter =>', data2.name);
      console.log('Name Dimension =>', data3.dimension);

      // rutas de las peticiones en orden
      console.log(API_URL);
      console.log(API_URL + data.results[0].id);
      console.log(data2.origin.url);
    })
  })
});
