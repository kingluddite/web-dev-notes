# Arrays
* Avoid "any" as much as possible

## Empty array
* It doesn't know so we need to tell it
```
const carMakers: string[] = [];
```

## If we have strings inside
* In can infer (implicit) strings so we can leave it off  
```
const carMakers: string[] = ['ford', 'toyota', 'checvy'];
```

```
const carMakers = ['ford', 'toyota', 'checvy'];
```

* If you hover over variable you will see the type annotation for an array of dates
```
const carMakers = [new Date(), new Date()];
```

* And it will give you implicitly the type annotation for a two dimensional array

```
const carsByMake = [['ford', 'bmw']];
```

![an array that contains an array of strings](https://i.imgur.com/cBuzyh0.png)

## map()
```
carMakers.map((car: string): string => {
  return car;
});
```

* Then because TS knows car is a string it will give us all the String methods and properties when we type a dot `.` after car

![inference for a string](https://i.imgur.com/wLh9NRt.png)

## OR |
* If you see `(string | Date)`

```
const importantDates = [new Date(), '1111-11-11'];
```


