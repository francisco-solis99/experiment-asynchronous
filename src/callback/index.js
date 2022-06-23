
function sum(num1, num2){
  return num1 + num2;
}

function calc(num1, num2, callback) {
  return callback(num1, num2);
}

const result = calc(3,2, (num1, num2) => num1 + num2);
// const result = calc(3,2, sum); //  tambien puede ser asi
console.log(result);


// callback using setTimeout
function date(callback) {
  console.log(new Date);
  setTimeout(function() {
    let date = new Date;
    callback(date);
  }, 3000)
}

function printDate(date){
  console.log(date)
}

date(printDate);
// date((date) => console.log(date)) //another way to do the same
