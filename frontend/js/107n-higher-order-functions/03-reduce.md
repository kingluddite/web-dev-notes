# Reduce
`02-map.js`

```js
const animals = [
  { name: 'FluffyKins', species: 'rabbit' },
  { name: 'Caro', species: 'dog' },
  { name: 'Hamilton', species: 'dog' },
  { name: 'Harold', species: 'fish' },
  { name: 'Ursula', species: 'cat' },
  { name: 'Jimmy', species: 'fish' },
];

const names = [];
for (let i = 0; i < animals.length; i++) {
  names.push(animals[i].name);
}

console.log(names);
```

`$ node 02-reduce.js`

* Output

```js
[ 'FluffyKins', 'Caro', 'Hamilton', 'Harold', 'Ursula', 'Jimmy' ]
```

## The beautfy of 'map'

```js
const names = animals.map(animal => animal.name);
```

* Same output but in one line and way less characters
