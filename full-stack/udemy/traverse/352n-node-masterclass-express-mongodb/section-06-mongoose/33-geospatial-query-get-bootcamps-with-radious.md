# Geospatial Query - Get Bootcamps Within Radious
* We'll create our `route` and `controller` method to be able to be able to get bootcamps within a radius of **zipcode**
    - We can do this because our field is a `geojson` field

## $centerSphere
* [docs](https://docs.mongodb.com/manual/reference/operator/query/centerSphere/)

### What is $centerSphere
* Defines a circle for a `geospatial` query that uses **spherical geometry**
* The query returns documents that are within the bounds of the circle
* You can use the `$centerSphere` operator on both GeoJSON objects and legacy coordinate pairs

### $centerSphere usage
```
{
   <location field>: {
      $geoWithin: { $centerSphere: [ [ <x>, <y> ], <radius> ] }
   }
}
```

* We will use `lng` and `lat` and `radius` of the earth (in miles)

`controller-bootcamps.js`

* **note** Miles are the default unit

```
// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
```

* If you wanted to change from mile to another unit use:

```
// MORE CODE

const geocoder = require('../utils/geocoder');

// MORE CODE

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
// @access  Private
```

* We could not use the geocoder and just have the user enter the `lat` and `lng`
    - But we are keeping this friendly and just want users to enter a `zipcode` only and keep it user friendly

## Here is our completed method
```
// MORE CODE
// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
```

## Now we need to create the route
* Right now our controller will do nothing because we have no way to access it
  - So we need to open our route file

`routes/api/v1/bootcamps.js`

```
// MORE CODE

const router = express.Router();

// /api/v1/bootcamps // ADD!
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius); // add 

// /api/v1/bootcamps
router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

// MORE CODE
```

## Test in Postman
* New route:

`{{URL}}/api/v1/bootcamps/radius/02118/10`

* **note** the data in the MongoDB is from Boston, Mass. so the above zipcode is from nearby to those Database cities

### Response sent to client (shown in Postman)
* We only get a count of 1 because only one devcamp is in boston

```
{
    "success": true,
    "count": 1,
    "data": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -71.104028,
                    42.350846
                ],
                "formattedAddress": "233 Bay State Rd, Boston, MA 02215-1405, US",
                "street": "233 Bay State Rd",
                "city": "Boston",
                "zipcode": "02215-1405"
            },
            "careers": [
                "Web Development",
                "UI/UX",
                "Business"
            ],
            "photo": "no-phone.jpg",
            "housing": true,
            "jobAssistance": true,
            "jobGuarantee": false,
            "acceptGi": true,
            "_id": "5d713995b721c3bb38c1f5d0",
            "name": "Devworks Bootcamp",
            "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
            "website": "https://devworks.com",
            "phone": "(111) 111-1111",
            "email": "enroll@devworks.com",
            "createdAt": "2020-09-11T00:20:27.465Z",
            "slug": "devworks-bootcamp",
            "__v": 0
        }
    ]
}
```

* But if we increase the radius to 30 (miles) then we'll capture more devcamps

`{{URL}}/api/v1/bootcamps/radius/02118/30`

* And the response is has a count of 2 now

```
// MORE CODE

{
    "success": true,
    "count": 2,
    "data": [
// MORE CODE
```

* And if we increase the miles to 200 then we get all 4 devcamps in our Database

`{{URL}}/api/v1/bootcamps/radius/02118/200`


* And if you put a California zipcode we should get no bootcamps

`{{URL}}/api/v1/bootcamps/radius/90210/200`

```
{
    "success": true,
    "count": 0,
    "data": []
}
```


* Save route in Postman as `Get Bootcamps by Distance`
    - Desc: `Get bootcamps within a radius of a specific zipcode`
    - Save in Bootcamps Collection


## Next
* Work with `getAllBootcamps`
* Add `filter`
* Add `pagination`
* Select certain fields to be returned rather than all of them 
