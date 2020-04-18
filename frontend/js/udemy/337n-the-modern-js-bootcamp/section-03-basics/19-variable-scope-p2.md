# Variable Scope (Part 2)
* Let's discuss a couple of edge cases when it comes to scope

```
// SCOPE TREE
// Global (name)
//   Local
//     Local
//   Local

let name = "John";
if (true) {
  if (true) {
    console.log(name);
  }
}

if (true) {
}

```

* **note** When we have different scopes we can define variables with the same name in each scope
    - There is a rule that you can't define variable with the same name "in the same scope"

## Check this out
```
// SCOPE TREE
// Global (name)
//   Local
//     Local
//   Local

let name = "John";
if (true) {
  let name = "Jay";
  if (true) {
    console.log(name);
  }
}

if (true) {
}

```

## "Variable Shadowing" in JavaScript
* It is when a variable in a Local scope uses its value instead of variable in a parent scope
    - So the Local variable is shadowing over the parents (basically hiding it from existence)
* The output will be `Jay`
    - Why?
        + Because we start where we log name and we look for the variable `name`, we don't find it so we move to the parent and then we find name is `Jay` so that is what we output

## Now what happens when we do this?
```
// SCOPE TREE
// Global (name)
//   Local
//     Local
//   Local

let name = "John";
if (true) {
  let name = "Jay";
  if (true) {
    console.log(name);
  }
}

if (true) {
  console.log(name);
}
// output
// Jay
// John
```

## What happens when we "assign" a value to a variable?
```
// SCOPE TREE
// Global (name)
//   Local
//     Local
//   Local

let name = "John";
if (true) {
  console.log(name);

  if (true) {
    name = "Jen";
    console.log(name);
  }
}

if (true) {
  console.log(name);
}

```

* So now we overwrite `Jay` with `Jen`
* **note** When assigning values to variables it is important to take scope into consideration

## What if you don't define a variable?
```
// SCOPE TREE
// Global (name)
//   Local
//     Local
//   Local

// let name = "John";
if (true) {
  // let name = "Jay";

  if (true) {
    name = "Jen";
    console.log(name);
  }
}

if (true) {
  console.log(name);
}
```

* You will get `Jen` for both logs
    - How it works:
        + It will look in Local scope for name - doesn't find it
        + It moves up and up until it gets to top of Scope tree and if it doesn't find it, it will declare the variable in the root
            * **warning** This is a problem - If we don't define variables we are inadvertently creating a global variable
            * This is referred to as a **leaked global**
                - Leaked Global: when you assign a value to a variable but that variable was never explicitly defined

## How to avoid creating leaked globals?
* Just explicitly declare the variable somewhere in the scope tree
* `let name = 'Tim';`

```
// SCOPE TREE
// Global (name)
//   Local
//     Local
//   Local

// let name = "John";
if (true) {
  // let name = "Jay";

  if (true) {
    let name = "Jen";
    console.log(name);
  }
}

if (true) {
  console.log(name);
}

```

* We will see Jen and then an error because the 2nd log is trying to access a variable that is not defined
