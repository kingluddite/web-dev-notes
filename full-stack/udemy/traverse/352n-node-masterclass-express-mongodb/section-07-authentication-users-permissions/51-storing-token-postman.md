# Storing Token in Postman
* This is a cool trick in Postman
* We have the functionality where we have our `protect` middleware so we can send an authorization in the Header with the Bearer token of the logged in user to access certain routes
    - But manually grabbing a token and adding Authorization and Bearer + the token for every single route is tedious to say the least
    - Just imagine if you wanted to DELETE a bootcamp, or Create a Bootcamp or UPDATE a bootcamp and every time having to add the Authorization Header with your Bearer token

## Go in `Login User`
* Click on `Tests` tab
    - We are going to create an environment variable based off something in the response
    - `pm` is "postman" shorthand

```
pm.environment.set("TOKEN", pm.response.json().token)
```

* So when we login we are getting a token from the `response.json()` and we are storing that in an environment variable called "TOKEN"
* Save it
* Also save it for Register User request (both requests generate a token)

## Let's test if it works
* If you login, check your environment variables and you'll see the environment variable token is automatically added

![environment postman variable added for token](https://i.imgur.com/iLAYgdO.png)

* Log in as another user and that token is now added as an environment variable

### Now to use this token in protected routes
* Click 'Get Logged In User via Token' request route and delete the Headers Authorization setting
* Click on the `Authorization` tab and add `{{TOKEN}}` inside the Token field

![Auth token](https://i.imgur.com/AWqCMmw.png)

* Click `Send` to test and you'll get that user back in the response
* **IMPORTANT** Make sure to click to Save this so that it will always be set

## Now let's show you how fast this is
1. Log in as another user
2. Then Click Get Logged in User
3. You will get that user in the response
4. **note** This is working because that Authorization Bearer Token is looking at the the TOKEN environment variable which is being set automatically as soon as I log in or register 

## We need to do this for all protected routes
* Let's try to delete a bootcamp
* Grab the `id` of an existing bootcamp
* Try to delete that bootcamp and you will get a 401 Unauthorized fail 'Not Authorized to access this route'
* WE CAN DELETE IT but we first must go to `Authorization` tab of the Delete Bootcamp request route and select Bearer Token and add `{{TOKEN}}` and now try to delete and you will get 200 success
* Make sure to save this request

## Do the same (add Bearer token) with:
* Bootcamps
    - Create Bootcamp
    - Update Bootcamp
    - Delete Bootcamp
    - Upload Photo

* Courses
    - Create Course
    - Update Course
    - Delete Course 

## This is really amazing!
* **note** After doing the above we just need to login in or register and then we can access all the protected routes

## Make sure in Postman
* You save to variables and not global variables (the latter is if you want to use with multiple REST API collections)

## Export Postman as JSON (You can share this with team members)
