# Updating data in Firebase
* We could update with `set()` and `remove()` but this is more efficient because we do it with only **one** call

## How to remove `name`, `age` and `isSingle` inefficiently
```
// MORE CODE
database
  .ref('name')
  .remove()
  .then(() => {
    console.log('name removed successfully');
  })
  .catch(error => {
    console.log('name not removed because of ', error);
  });
database
  .ref('age')
  .remove()
  .then(() => {
    console.log('age removed successfully');
  })
  .catch(error => {
    console.log('age not removed because of ', error);
  });
database
  .ref('isSingle')
  .remove()
  .then(() => {
    console.log('isSingle removed successfully');
  })
  .catch(error => {
    console.log('isSingle not removed because of ', error);
  });
```

## But that is really inefficient
* There is a better way with `update()`

## update()
* Unlike `set()` which can be called with anything we like
* **important** `update()` MUST be called with an object

`update(values: Object, onComplete?: function): Promise<any>`

```
// MORE CODE
// update multiple fields at one time
database
  .ref()
  .update({
    name: 'Johnny Doe',
    age: 333,
    isSingle: true,
  })
  .then(() => {
    console.log('update success!!');
  })
  .catch(error => {
    console.log('woops! Something went wrong. ', error);
  });
```

* All 3 fields should be updated in FB

## Update can also add new properties on
* You don't just update existing properties with `update()` you can also add new properties

```
// MORE CODE
// update multiple fields at one time
database
  .ref()
  .update({
    name: 'Johnny Doe',
    age: 333,
    isSingle: true,
    soccerFan: true, // totally new property added here!
  })
  .then(() => {
    console.log('update success!!');
  })
  .catch(error => {
    console.log('woops! Something went wrong. ', error);
  });
```

* Above we set a new property

## We can also delete another property
* I'll delete age
  - You don't just remove it, but instead you set their value equal to `null`

```
// MORE CODE
// update multiple fields at one time
database
  .ref()
  .update({
    name: 'Johnny Doe',
    age: null, // this line deletes age property!
    isSingle: true,
    soccerFan: true,
  })
  .then(() => {
    console.log('update success!!');
  })
  .catch(error => {
    console.log('woops! Something went wrong. ', error);
  });
```

## Let's try this:
```
// MORE CODE
database
  .ref()
  .set({
    name: 'John Doe',
    age: 40,
    job: 'front end dev',
    location: {
      city: 'LA',
      country: 'US',
    },
  })
  .then(() => {
    console.log('Data is saved');
  })
  .catch(error => {
    console.log('This failed!!', error);
  });
```

* We have a new property `job`
* TODO
  - We want to move our user to "Dallas"
  - And we want to change job to "CEO"
  - How can I update this?
  - We could do it with one update() call but not as you might expect

## Try this first
```
database
  .ref()
  .update({
    job: 'CEO',
    location: {
      city: 'Dallas',
    },
  })
  .then(() => {
    console.log('success');
  })
  .catch(error => {
    console.log('fail');
  });

```

* But that partially works
  - The job updates fine to "CEO"
  - But the nested object gets wiped and now we only have city (country is gone!)

## To properly update both root and nested properties we need to use a strange looking syntax
* We have to change our nested call
  - We do this by using the reference location as a key
  - But to do this we need to use a forward slash inside an object property which is NOT VALID

#
```
// MORE CODE
database
  .ref()
  .update({
    job: 'CEO',
    location/city: 'Dallas'
  })
  .then(() => {
    console.log('success');
  })
  .catch(error => {
    console.log('fail');
  });
```

* That will give you an ERROR - "Module build failed"
* This is because JavaScript won't let you add `/` in an object property name
  - But the good news is you just wrap it inside of quotes and it will work
  - **note** We won't use this technique often but I'm putting it here so you have it as a weapon in your coding arsenal

```
// MORE CODE
database
  .ref()
  .update({
    job: 'CEO',
    'location/city': 'Dallas',
  })
  .then(() => {
    console.log('success');
  })
  .catch(error => {
    console.log('fail');
  });
```

* And it works - we can update root and nested properties in one fell swoop

## Challenge
* Here is your starting code:

```
// MORE CODE
database
  .ref()
  .set({
    name: 'John Doe',
    age: 40,
    stressLevel: 7,
    job: {
      title: 'CFO',
      company: 'Atari',
    },
    location: {
      city: 'LA',
      country: 'US',
    },
  })
  .then(() => {
    console.log('Data is saved');
  })
  .catch(error => {
    console.log('This failed!!', error);
  });

```

* In one update call:

1. Change stress level to 9
2. Change job company to Wells Fargo
3. Change city to San Diego

```
// MORE CODE
database
  .ref()
  .update({
    stressLevel: 9, // we update the stressLevel
    'job/company': 'Wells Fargo', // we update a nested property
    'location/city': 'San Diego', // we update a nested property
  })
  .then(() => {
    console.log('update worked');
  })
  .catch(e => {
    console.log('update failed because of', e);
  });
```

## Recap
* We now know how to:
  - Write data
  - Update data
  - Remove data

## Next - Read Data from Database
* This will give us full CRUD!
