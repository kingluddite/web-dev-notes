# Working with APIs
[Link to our Weather API](http://openweathermap.org/forecast5)

This Free API will let us grab 5 day weather forecast for a particular city

* Have to sign up for it to get an API key

## Endpoint we'll use
City is the `endpoint` we'll use

## What is REST?
[Nice video](https://www.youtube.com/watch?v=7YcW25PHnAA)

## What is an API endpoint?
In REST, the resource typically refers to some object or set of objects that are exposed at an **API endpoint**

## Example of API endpoint
`/api/users/johnny`

An endpoint by itself is just a reference to a `uri` that accepts web requests that may or may not be RESTful.

### Check out this API call:
`api.openweathermap.org/data/2.5/forecast?q={city name},{country code}`

#### Query string
Everything after the `?`

`q={city name},{country code}`

So the `q` we need to supply (_q means `query`_) is the **city name** and the **country code**

[api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml](http://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b1b15e88fa797225412429c1c50c122a1)

### JSON is king
* If you click on that link you will be taken to an XML document. We won't be using XML as the far more common format these days is JSON so...

Click on this JSON link

[JSON 5 day weather API link](http://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b1b15e88fa797225412429c1c50c122a1)

**note** You can generate nice JSON output using a Chrome extension

* This is a response for the city of London in Texas USA
* It has intelligent searching so if someone misspells the city there is a good chance it will give us the correctly spelled city's name
* Longitude and Latitude
* List object is filled with many objects
    - These objects are snapshots of weather data, 3 hours at a time
    - Time field - **dt_txt**: "2017-02-16 12:00:00"

**note** If anyone has 401 problems with the API data showing up, you need to:

1. Sign up with **openweathermap** (_the sign up option is all the way at the top_)
2. Get your own **API key** (_which should be in your new profile at openweathermap under the tab 'API Keys'_)
3. Copy the key
4. Go back to the URL for the forecast and replace the URL section after `appid=` with your API key and remove the part for xml (_remove this '&mode=xml'_) so it shows up as JSON instead

**note** You can get a JSON formatter from the Google chrome store named 'JSONView' by **gildas**, it will auto-unminify all JSON data that you look up in your browser

* To get the correct city name in the response use this base URL with your API key `http://api.openweathermap.org/data/2.5/forecast?q=London,uk&appid=`

### Plucking the data we need
We'll come back and discuss further how we can pluck out the data we need from the JSON

### Sign up for an API key on OpenWeatherMap
Once you get your API key you can copy it and we'll use it:

`src/actions/index.js`

Create `index.js` and add your API key at the top of the file:

`const API_KEY = 'COPY-AND-PASTE-YOUR-API-KEY-HERE';`

