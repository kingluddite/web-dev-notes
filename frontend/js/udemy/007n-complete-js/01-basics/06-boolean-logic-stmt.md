# Boolean Logic Statements
```js
const age = 20;

if (age < 20 ) {
  console.log('I am a teenager');
} else if ( age >= 20 && age < 30) {
  console.log('I am a young man');
} else {
  console.log('I am a man');
} // I am a teenager

let job = 'teacher';

// add a prompt to ask the question
job = prompt('What does john do?');

switch (job) {
  case 'teacher':
    console.log('I am a teacher');
    break;
  case 'driver':
    console.log('I am a driver');
    break;
  case 'cop':
    console.log('I am a cop');
    break;
  default:
    console.log('I do not know what I am');
} // I am a teacher
```
