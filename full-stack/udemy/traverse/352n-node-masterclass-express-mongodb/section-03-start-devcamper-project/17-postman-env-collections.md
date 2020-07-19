# Postman, Environment and Collections
## Postman
* Close all open tabs
* Clear all history

### To create documentation
* You need to create a Postman account and login

### Create a new environment
* Click on eye

![create postman environment](https://i.imgur.com/26rEhed.png)

* Name it `devcamper`

### We can create global variables
* Variable URL
    - Initial Value: `http://localhost:5000`
        + Do not have a forward slash after the port
            * We'll want to add them in manually
        + This makes it easy so I never have to retype this
        + But also if we deploy it we can change it in one spot and that saves us a ton of time
* Click `Add` button

### Congrats - Now we have an environment called `devcamper`

### Use our new URL global variable
* Select the `devcamper` environment from list of other environments (if they exist)
* In address bar of Postman type `{{` and you'll see URL and select it
    - It will be green and then it will add {{URL}}
* Try our new endpoint using a Postman global variable

GET `{{URL}}/api/v1/bootcamps` and press `Send`

* It should work as it did before

### Save our endpoints in a Postman collection
* Create a new Collection (Click Collections tab) and click `+ New Collection` button
    - Name it DevCamper API
    - Description: `Backend API for the DevCamper application to manage bootcamps, courses, reviews, users and authentication`
    - Click `Save`
        + It will say 0 requests because we haven't saved any yet

### Create a folder in the collection
* Name it Bootcamps
    - Description: Bootcamps CRUD functionality

### Save our route as
![save as route](https://i.imgur.com/nopdHrK.png)

* Now we have a folder within our collection
* Our request fetches all bootcamps
    - It doesn't do that yet as we haven't implemented a Database but it will and it will be the same route
    - Save as `Get All Bootcamps`
        + Request Description: `Fetch all bootcamps from Database. Includes pagination, filtering, etc`
    - Search and save it in the `Bootcamps` folder
* Now we change the route to:
    - `{{URL}}/api/v1/bootcamps/1` and save as:
        + Request Name: `Get Single Bootcamp`
            * Request desc: `Get single bootcamp by ID`
        + Save request to Bootcamps folder
    - `POST` `{{URL}}/api/v1/bootcamps` bootcamp and save as:
        + Request name: `Create New Bootcamp`
            * Desc: `Add new bootcamp to database. Must be authenticated and must be publisher or admin`
        + Save request to Bootcamps folder
    - `PUT` `{{URL}}/api/v1/bootcamps/1` bootcamp and save as:
        + Request name: Update single Bootcamp`
            * Desc: `Update single bootcamp to database. Must be authenticated and must be publisher or admin`
            * Save request to Bootcamps folder
    - `DELETE` `{{URL}}/api/v1/bootcamps/1` bootcamp and save as:
        + Request name: Delete single Bootcamp`
            - Desc: Delete single bootcamp to database. Must be authenticated and must be publisher or admin`
            - Save request to Bootcamps folder

## Now we are ready
* We have our:
    - environment
        + Collection
            - Our Bootcamps folder
                + All our requests
* Now to use we just open up the request we need inside the collection and click send

# Next - MongoDB, Atlas and Compass
