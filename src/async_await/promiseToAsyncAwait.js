/*
  Debajo puedes encontrar el ejemplo “rethrow”. Rescríbelo usando async/await en vez de .then/catch.
  Y deshazte de la recursión en favor de un bucle en demoGithubUser: con async/await, que se vuelve fácil de hacer.
*/
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url){
  try {
      const response = await fetch(url);
      return await response.json();

  } catch(err) {
      throw new HttpError(response);
  }
}

async function demoRickAndMortyCharacter() {

  let user;
  while(true) {
    let character = prompt("Ingrese un numero de id:", "1");

    try {
      user = await loadJson(`https://rickandmortyapi.com/api/character/${character}`);
      break; // sin error, salir del bucle
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // bucle continúa después del alert
        alert("No existe tal usuario, por favor reingrese.");
      } else {
        // error desconocido, lo relanza
        throw err;
      }
    }
  }


  console.log(`Nombre completo: ${user.name}.`);
  return user;

}

demoRickAndMortyCharacter();
