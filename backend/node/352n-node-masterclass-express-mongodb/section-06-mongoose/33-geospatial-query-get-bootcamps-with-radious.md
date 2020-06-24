# Geospatial Query - Get Bootcamps Within Radious
* We'll create our route and controller method to be able to be able to get bootcamps within a radius of zipcode
    - We can do this because our field is a `geojson` field

## $centerSphere
* [docs](https://docs.mongodb.com/manual/reference/operator/query/centerSphere/)

### What is $centerSphere
* Defines a circle for a geospatial query that uses spherical geometry
* The query returns documents that are within the bounds of the circle
* You can use the $centerSphere operator on both GeoJSON objects and legacy coordinate pairs

### $centerSphere usage
```
{
   <location field>: {
      $geoWithin: { $centerSphere: [ [ <x>, <y> ], <radius> ] }
   }
}
```

* We will use lng and lat and radius of the earth (in miles)

`controller-bootcamps.js`

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

* We could not use the geocoder and just have the user enter the lat and lng
    - But we are keeping this friendly and just want users to enter a zipcode only and keep it user friendly

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
    locations: {
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
* Save route in Postman as `Get Bootcamps by Distance`
    - Desc: `Get bootcamps within a radius of a specific zipcode`


## Next
* Work with getAllBootcamps
* Add filter
* Add pagination
* Select certain fields to be returned rather than all of them 
