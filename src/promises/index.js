// promise

const getPromise = () => {
  return new Promise((resolve, reject) => {
    if(false) resolve('Resolve');
    else reject('Whoops');
  })
}


getPromise()
    .then(resolve => console.log(resolve))
    .catch(err => console.log(err));


const getPromise2 = () => {
  return new Promise((resolve, reject) => {
    if(true){
      setTimeout(() => {
        resolve('Peaches 🚗');
      }, 2000)
    }
    else {
      const err = new Error('Error🚫');
      reject(err);
    }
  })
}

getPromise2()
    .then(resolve => console.log(resolve))
    .catch(err => console.log(err));


// usihng Promise.all, if one promise is rejected, no matter if the others are resolve, this going to show the error
Promise.all([getPromise(), getPromise2()])
    .then(response => {
      console.log('Array of promises => ' + response)
    })
    .catch(err => console.log(err));

// using Promise.
