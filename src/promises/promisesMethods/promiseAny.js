

// Promise.AllSeattled, use this code in the browser

const p1 = fetch("/fileName.txt");
const p2 = fetch("/stufff.txt");
const p3 = fetch("/src/callback/index.html");

Promise.any([p1, p2, p3])
  .then(response => console.log(response.status, response.url, response));
