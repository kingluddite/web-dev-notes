# Classes
* Blueprint to create an object with some fields (values) and methods (functions) to represent a "thing"

```js
class Vehicle {
  drive(): void {
    console.log('yo');
  }

  honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle();
vehicle.drive();
vehicle.honk();
```

* Call in terminal with

`$ ts-node classes.ts`

## We can extend class with `extends` (inheritence)
```js
class Vehicle {
  drive(): void {
    console.log('yo');
  }

  honk(): void {
    console.log('beep');
  }
}

// We refer to Car as a child class
//  because it is extending Vehicle
// We refer to Vehicle as the super class
//  aka parent class
class Car extends Vehicle {
  // we can overide parent class methods
  drive(): void {
    console.log('vroom');
  }
}

const car = new Car();
car.drive();
car.honk();
```
## Class Method Modifiers
* public
    - This method can be called any where, any time
    - By default everything is public
* private
    - This method can be only called by other methods in this class
* protected
    - This method can be called by other methods in this class, or by other methods in child classes

### Nothing changed below with public added
```js
class Vehicle {
  public drive(): void {
    console.log('yo');
  }

  public honk(): void {
    console.log('beep');
  }
}

// We refer to Car as a child class
//  because it is extending Vehicle
// We refer to Vehicle as the super class
//  aka parent class
class Car extends Vehicle {
  // we can overide parent class methods
  public drive(): void {
    console.log('vroom');
  }
}

const car = new Car();
car.drive();
car.honk();
```

## This won't work because of private
* And we get an alert of wrongdoing by TS
```js
class Car extends Vehicle {
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }
}

const car = new Car();
car.drive();
car.honk();
```

* More with private

```js
class Vehicle {
  public honk(): void {
    console.log('beep');
  }
}

// We refer to Car as a child class
//  because it is extending Vehicle
// We refer to Vehicle as the super class
//  aka parent class
class Car extends Vehicle {
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
  }
}

const car = new Car();
car.startDrivingProcess();
car.honk();

```

## Protected
```js
class Vehicle {
  protected honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle();
vehicle.honk(); // not allow to call honk only in child classes

// We refer to Car as a child class
//  because it is extending Vehicle
// We refer to Vehicle as the super class
//  aka parent class
class Car extends Vehicle {
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car();
car.startDrivingProcess();

```

## Fields in classes
```js
class Vehicle {
  protected honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle();
vehicle.honk(); // not allow to call honk only in child classes

// We refer to Car as a child class
//  because it is extending Vehicle
// We refer to Vehicle as the super class
//  aka parent class
class Car extends Vehicle {
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car();
car.startDrivingProcess();

```

## If we need to pass arguments into a class we need to define a constructor
* Any time we define a constructor it will be instantly executed right when we create a new instance of the class

```js
class Vehicle {
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  protected honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

// We refer to Car as a child class
//  because it is extending Vehicle
// We refer to Vehicle as the super class
//  aka parent class
// class Car extends Vehicle {
//   // we can overide parent class methods
//   private drive(): void {
//     console.log('vroom');
//   }

//   startDrivingProcess(): void {
//     this.drive();
//     this.honk();
//   }
// }

// const car = new Car();
// car.startDrivingProcess();

```

`$ ts-node classes.ts` (you will see orange logged)

## A shortcut to reduce repeated code
```js
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);
```

### When we comment in the Car extends class of Vehicle we get an error
* We do because our Vehicle now expects a color
* So if we pass it in we get rid of the error
* **note** Even though you don't see a constructor in Car the parent construct in Vehicle is called automatically
```js
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

// We refer to Car as a child class
//  because it is extending Vehicle
// We refer to Vehicle as the super class
//  aka parent class
class Car extends Vehicle {
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car('red');
car.startDrivingProcess();
```

## child class adding contructor
```js
class Car extends Vehicle {
  constructor(public wheels: number) {}
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}
```
* We get an error because TS let's us know we need to call the super() class
    - The word `super` is a reference to the super class (aka parent class - Vehicle)
* We add super() in but we get another error that we are missing color so we pass that in like this:

```js
class Car extends Vehicle {
  constructor(public wheels: number) {
    super('red');
  }
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}
```
### We don't want to hard code it so:
* We add another argument
    - We don't make the color argument `public` because the field `color` belongs to vehicle
    - Then we pass in the variable to super()

```js
class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
  }
  // we can overide parent class methods
  private drive(): void {
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}
```
* We get an error at the bottom because we are missing an argument

```
// MORE CODE

const car = new Car(8, 'red');
// MORE CODE
```


