# Postman Environments
* This will make switching between local and production environments easier
* Currently, switching between local and heroku URLs isn't easy

## Create Environments
* We'll create one for our local machine and one for Heroku
* We'll create a variable in Postman and use the top right to switch the variable

## Steps to create an environment on postman
1. Copy Heroku URL
2. Top right of Post click `Manage Environments`

![manage environments](https://i.imgur.com/wUC4OwD.png)

3. Click `Add`
4. Name it `Todo App Local`
5. add a `url` key
6. add a `localhost:3000` value
7. Add another environment
8. Name it `Todo App Heroku`
9. add a `url` key
10. add a `URL` (paste your Heroku URL here)
     * Make sure it is base URL (with not routes appended on it)

![heroku app url postman](https://i.imgur.com/LkuQmVx.png)

### Update the URL with template variable
* Click each of your saved routes in your collection and convert the base URL from `localhost:3000/todos` to `{{url}}/todos`
* Do that for your other two saved routes

![template variables postmas](https://i.imgur.com/l2vuOFO.png)

* Make sure to save all three after making the changes

## Houston we have a problem!
* When you hit `Send` on any of those routes in the saved collection you get an error that it could not find any response
* That is because we need to switch to an environment
* Choose either saved environment and hit send
* Now it works in both environments

![choose a postman environment](https://i.imgur.com/mce090V.png)

* Make sure you are running local mongod `$ mongod`
* Locally make sure you are running test watch `$ npm run test-watch`
* **tip** Make sure you use different ids for finding a single todo because the ids will obviously be different locally and on heroku
* **tip** You could add a second variable for the id on heroku and local to save time
