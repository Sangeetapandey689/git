const name = 'Max';
let age = 29;
const hasHobby = true;

age = 30;
const summarizeUser = (userName, userAge, userhasHobby) => {
    return(
    'Name is ' +
     userName + 
     ', age is ' + 
     userAge +
     'and the user hasHobby: ' +
     userhasHobby
    );
};

// const add = (a,b) => a+b;
// const addOne = (a) => a + 1;
const addRandom = () => 1+2;

// console.log(add(1, 2));

// console.log(addOne(1));
console.log(addRandom());

console.log(summarizeUser(name, age, hasHobby));