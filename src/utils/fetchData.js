const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


function fetchData(urlApi) {
  return new Promise((resolve, reject) => {
    // object XMLHttpRequest instance
    const client =  new XMLHttpRequest();
    // prepare the request and send it
    client.open('GET', urlApi, true); // the third parameteris for actuive the asyncronismo
    client.send();

    // event when detected a change in the state
    client.onreadystatechange = () => {
      if (client.readyState === 4) {
        (client.status === 200)
            ? resolve(JSON.parse(client.responseText))
            : reject(new Error('Error ', urlApi));
      }
    };

  });
}

// export with common JS
module.exports = fetchData;
