# try/catch errors
* Let users know if they did something wrong

`advanced/try-catch.js`

```
const getTip = amount => {
  return amount * 0.25;
};
const result = getTip(true);
console.log(result); // 0.25
```

* This will return an answer
* Why?
    - Because `true` will get coerced from boolean to a `1` number

## Houston we have a problem
* This is not what we want

### We have 2 choices to deal with this
1. We can leave as is 
2. We can perform "type checking" using the `typeof` operator we used before

```
const getTip = amount => {
  if (typeof amount === 'number') {
    return amount * 0.25;
  } else {
    // what do we do here?
  }
};
const result = getTip(true);
console.log(result);
```

* Now we make sure it is a number but what do we do amount is not a number?
    - We don't want to return a string or undefined
    - We can throw an error as JavaScript allows us to do this

## Figure out how to throw our own custom error
### We use `throw`
* We pass a string and let user know with enough info what went wrong

```
const getTip = amount => {
  if (typeof amount === 'number') {
    return amount * 0.25;
  } else {
    throw 'Argument must be an error';
  }
};
const result = getTip(true);
console.log(result);
```

* Will generate this error in Terminal:
    - We know what went wrong and what line number we need to fix

```
PATH/try-catch.js:5
    throw 'Argument must be an error';
    ^
Argument must be an error
```

* Benefit to throw:
    - We are now able to add type checking into some of our functions

## `throw Error()` - A slightly better way
* We only get one line of an error
* But there is a built-in error to give us more info to help us troubleshoot

```
const getTip = amount => {
  if (typeof amount === 'number') {
    return amount * 0.25;
  } else {
    throw Error('Argument must be a number');
  }
};
const result = getTip(true);
console.log(result);
```

* Now our error will give us more context as to what went wrong
* We get a stack trace of what happened that led to that error

### More info in Error
* More info, you also see on line 8 is where the function was called from

```
PATH/try-catch.js:5
    throw Error('Argument must be a number');
    ^

Error: Argument must be a number
    at getTip (PATH//try-catch.js:5:11)
    at Object.<anonymous> (PATH//try-catch.js:8:16)
    at Module._compile (internal/modules/cjs/loader.js:1151:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1171:10)
    at Module.load (internal/modules/cjs/loader.js:1000:32)
    at Function.Module._load (internal/modules/cjs/loader.js:899:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47
```

## Not all errors require a code change to be fixed
* We need a way to recover from errors "gracefully"

### This is what the `try/catch` statement is used for
* Prevents errors that aren't essential from breaking our app unnecessarily
* You don't want a phone call that doesn't get answer to generate an error and stop working, you want a way to gracefully keep working, leave a message if vm is available or just keep ringing.

```
// MORE CODE
try {
    const result = get('test');
    console.log(result);
} catch (e) {
    console.log('catch block is running');
}

// MORE CODE
```

## and here it is
```
const getTip = amount => {
  if (typeof amount === 'number') {
    return amount * 0.25;
  } else {
    throw Error('Argument must be a number');
  }
};

try {
  const result = getTip(true);
  console.log(result);
} catch (e) {
  console.log('catch block is running');
}
```

* Output in terminal will be: `catch block is running`

### What we get
* Our app still continues but we catch an error

#### Here is the `try` working
```
const getTip = amount => {
  if (typeof amount === 'number') {
    return amount * 0.25;
  } else {
    throw Error('Argument must be a number');
  }
};

try {
  const result = getTip(20);
  console.log(result);
} catch (e) {
  console.log('catch block is running');
}
```

* That will output `5` in terminal (the `try` is working because our code did not generate an error)

## Challenge
* Use try/catch and make sure only numbers are accepted

`grade-calc.js`

```
// students score, total possible score
// 15/20 -> You got a C (75%)!
// A 90-100, B 80-89, C 70-79, D 60-69, F 0-59

const gradeCalc = function (score, totalScore) {
  const percent = (score / totalScore) * 100;
  let letterGrade = '';

  if (percent >= 90) {
    letterGrade = 'A'
  } else if (percent >= 80) {
    letterGrade = 'B'
  } else if (percent >= 70) {
    letterGrade = 'C'
  } else if (percent >= 60) {
    letterGrade = 'D'
  } else {
    letterGrade = 'F'
  }

  return `You got a ${letterGrade} (${percent}%)!`
}

const result = gradeCalc(9, 20);
console.log(result);
```

## Challenge Solution
```
// students score, total possible score
// 15/20 -> You got a C (75%)!
// A 90-100, B 80-89, C 70-79, D 60-69, F 0-59

const gradeCalc = function(score, totalScore) {
  // make sure we get numbers
  if (typeof score === 'number' && typeof totalScore === 'number') {
    const percent = (score / totalScore) * 100;
    let letterGrade = '';

    if (percent >= 90) {
      letterGrade = 'A';
    } else if (percent >= 80) {
      letterGrade = 'B';
    } else if (percent >= 70) {
      letterGrade = 'C';
    } else if (percent >= 60) {
      letterGrade = 'D';
    } else {
      letterGrade = 'F';
    }

    return `You got a ${letterGrade} (${percent}%)!`;
  } else {
    throw Error('Both arguments need to be numbers');
  }
};

try {
  const result = gradeCalc(9, 20);
  console.log(result);
} catch (e) {
  console.log('Please provide numbers');
}
```

* We can grab the error message using `e.message`
* If we pass a bad argument (not a number)

```
// students score, total possible score
// 15/20 -> You got a C (75%)!
// A 90-100, B 80-89, C 70-79, D 60-69, F 0-59

const gradeCalc = function(score, totalScore) {
  // make sure we get numbers
  if (typeof score === 'number' && typeof totalScore === 'number') {
    const percent = (score / totalScore) * 100;
    let letterGrade = '';

    if (percent >= 90) {
      letterGrade = 'A';
    } else if (percent >= 80) {
      letterGrade = 'B';
    } else if (percent >= 70) {
      letterGrade = 'C';
    } else if (percent >= 60) {
      letterGrade = 'D';
    } else {
      letterGrade = 'F';
    }

    return `You got a ${letterGrade} (${percent}%)!`;
  } else {
    throw Error('Both arguments need to be numbers');
  }
};

try {
  const result = gradeCalc('yo', 20);
  console.log(result);
} catch (e) {
  console.log(e.message);
}
```

## Alternative way to structure this code
* Instead of checking for good data and then running that code for that good data, we are going to check for bad data and then throw the error, when we throw the error we already know that everything stops in place, so the function code below won't execute

* This is slightly "better" code
* We focus up top if things go wrong, if not, we run our code

```
// students score, total possible score
// 15/20 -> You got a C (75%)!
// A 90-100, B 80-89, C 70-79, D 60-69, F 0-59

const gradeCalc = function(score, totalScore) {
  // make sure we get numbers
  if (typeof score !== 'number' || typeof totalScore !== 'number') {
    throw Error('Both arguments need to be numbers');
  }

  const percent = (score / totalScore) * 100;
  let letterGrade = '';

  if (percent >= 90) {
    letterGrade = 'A';
  } else if (percent >= 80) {
    letterGrade = 'B';
  } else if (percent >= 70) {
    letterGrade = 'C';
  } else if (percent >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }

  return `You got a ${letterGrade} (${percent}%)!`;
};

try {
  const result = gradeCalc('yo', 20);
  console.log(result);
} catch (e) {
  console.log(e.message);
}
```
