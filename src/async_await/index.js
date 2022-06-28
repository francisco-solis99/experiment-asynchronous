
function asyncAction() {
  return new Promise((resolve, reject) => {
    (true)
    ? setTimeout(() => resolve('success'), 1000)
    : reject(new Error('error'));
  });
}

const doSomethingAsync = async () => {
  try {
    const something = await doSomethingAsync();
    console.log(something);
  } catch(error){
      console.log(error)
  }
}

const print = async () => {
  console.log('Before');
  await doSomethingAsync();
  console.log('After');
}

print();
