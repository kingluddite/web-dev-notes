# Higher Order functions
## Filter
* Most import concept in functional programming

`intro.js`

```js
const animals = [
  { name: 'FluffyKins', species: 'rabbit' },
  { name: 'Caro', species: 'dog' },
  { name: 'Hamilton', species: 'dog' },
  { name: 'Harold', species: 'fish' },
  { name: 'Ursula', species: 'cat' },
  { name: 'Jimmy', species: 'fish' },
];

const dogs = animals.filter(animal => {
  return animal.species === 'dog';
});

// var dogs = [];
// for (var i = 0; i < animals.length; i++) {
//   if (animals[i].species === 'dog') {
//     dogs.push(animals[i]);
//   }
// }
```

## Reject and "composable" functions
* Reject is found inside underscore
