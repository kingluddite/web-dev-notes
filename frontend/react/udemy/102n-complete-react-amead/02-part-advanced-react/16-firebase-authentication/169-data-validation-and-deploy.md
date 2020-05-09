# Data Validation and Deployment
* We need to validate before the data is written
* We need both `client` and ` ` side validation
    - client side to give users useful information quickly
    - server side to make sure nothing that's not valid gets saved

```
{
  "rules": {
    ".read": false,
    ".write": false,
      "users": {
        "$user_id": {
          ".read": "$user_id === auth.uid",
          ".write": "$user_id === auth.uid",
         "expenses": {
           "$expense_id": {
             
           }
         },
        "$other": {
          ".validate": false
        }
        }
      }
  }
}
```

* `$expense_id` - is dynamic
* User can only add expenses

## Catch all with $other
* If you use `$other` after another property we use it as a catch all, if expenses do this, for everything else, do this
* You can add expenses but for everything else you can't (.validate: false)

### Try to simulate
* This won't work

`users/3d041ceb-66b5-4c1e-a1ba-1d83317f2f52/test`

* But this will (both read and write)

`users/3d041ceb-66b5-4c1e-a1ba-1d83317f2f52/expenses`

## Complex Validation
* [all database rules](https://firebase.google.com/docs/reference/security/database/?authuser=0)
* Above docs show all you can do in the db json rules
    - `.read`
    - `.write`
    - `.validate`
    - hasChildren([children])
        + make sure data we are saving has children
    - tons more
* We will put these together to validate the expenses
    - We want to make sure what was saved in our db is what we expected to save

```
{
  "rules": {
    ".read": false,
    ".write": false,
      "users": {
        "$user_id": {
          ".read": "$user_id === auth.uid",
          ".write": "$user_id === auth.uid",
         "expenses": {
           "$expense_id": {
             ".validate": "newData.hasChildren(['description','note', 'createdAt', 'amount'])",
             "description": {
               ".validate": "newData.isString() && newData.val().length > 0"
             },
             "note": {
               ".validate": "newData.isString()"
             },
             "createdAt": {
               ".validate": "newData.isNumber()"
             },
             "amount": {
               ".validate": "newData.isNumber()"
             },
             "$other": {
               ".validate": false
             }
           }
         },
        "$other": {
          ".validate": false
        }
        }
      }
  }
}
```

## Test by running simulations
* This will be denied

`users/3d041ceb-66b5-4c1e-a1ba-1d83317f2f52/expenses/123`

* This will fail too

`users/3d041ceb-66b5-4c1e-a1ba-1d83317f2f52/expenses/`

* It fails because it has no children

### When we add children it passes
* set option selected
* Add this json object

```on
{
  "description": "Rent",
  "note": "",
  "amount": 0,
  "createdAt": 123
}
```

* Click run and it will validate

### Trigger lots of errors with:
```on
{
  "description": "",
  "note": true,
  "amount": "one",
  "createdAt": "five"
}
```

* All 4 fields will not validate

### Important config change to heroku
* We need to _enable authentication from that specific URL_
* Push to heroku
* All our code is up on heroku
* But we need to make one important change in Firebase

#### Open Firebase console
* We were using `localhost` by default
* We have to add our live heroku domain or it will fail when it tries to connect to firebase
* Console > Your DB > Authentication > Sign-in Method > Add Domain > Paste your heroku domain
    - **note** Might take 20 seconds for domain to take effect
* You can click another gmail account and enter expenses
    - You only see your own expenses
