
// Promise.AllSeattled, use this code in teh browser

const p1 = fetch("/fileName.txt");
const p2 = fetch("https://google.com/index.css");
const p3 = fetch("/src/callback/index.html");

Promise.all([p1, p2, p3])
  .then(responses => {
    responses.forEach(response => {
      console.log(response.status, response.url);
    })
    console.log(responses);
  })
  .catch(err => console.log(err));


