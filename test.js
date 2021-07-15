const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'password123';
const someOtherPlaintextPassword = 'not_bacon';

const salt = bcrypt.genSaltSync();
// const hash = bcrypt.hashSync(myPlaintextPassword, salt);
const hash = '$2b$10$.jYKuelEI2A9.eunUZLM3eSQ3AoSIzl/8/YKcWkDW9o/KG.FqvvCW'

// const validate = bcrypt.compareSync(myPlaintextPassword, hash); // true
// const wrong = bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
const comparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
);
// console.log(hash)
// console.log(validate)
// console.log(wrong)
const validate = comparePassword(myPlaintextPassword,hash)
console.log(validate)