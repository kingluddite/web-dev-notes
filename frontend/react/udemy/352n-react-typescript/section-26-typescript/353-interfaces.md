# Interfaces
* Creates a new type, describing the property names and value types of an object
    - We are creating another new type just like String, Number or Boolean

```js
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true
}

const printVehicle = (vehicle: { name: string; year: number; broken: boolean; }):void => {
  console.log(`name: ${vehicle.name}`);
  console.log(`name: ${vehicle.year}`);
  console.log(`name: ${vehicle.broken}`);
}

printVehicle(oldCivic);
```

* And now we'll use an interface

```js
interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log(`name: ${vehicle.name}`);
  console.log(`name: ${vehicle.year}`);
  console.log(`name: ${vehicle.broken}`);
};

printVehicle(oldCivic);
```

## We have a problem
* The type notation is getting long and hard to read
* If we have more properties it will be harder to read
* If we have several functions that expect to be called with oldCivic we would have lots of duplicate not DRY code

## Interfaces will solve this
* **note** Anytime we create a new interface we are creating a new type
    - **remember** a type is the same a string type, a number type or a boolean type but we are making our own type
* When we create interfaces we capitalize them
* We use generic names for interfaces

```js
interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log(vehicle.summary());
};

printVehicle(oldCivic);
```

* Look at above
  - We are not limited to primitive values
  - We can express functions inside our interface type definition

```js
// we rename to make more generic and not tied to vehicle but report
interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);
```
* We can make our interfaces generic and use them in completely different object shapes that share a common trait

```js
interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  },
};

const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink);

```


