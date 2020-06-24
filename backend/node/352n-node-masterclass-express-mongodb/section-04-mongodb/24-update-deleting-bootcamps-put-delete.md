# Updating and Deleting bootcamps - PUT DELETE
* Mongoose
    - Update - findbyIdAndUpdate(id, what-we-will-insert(req.body), optons)
        + We use async/await
        + We get the id from the URL so we use `req.params.id`
        + For options we have an object
            * We use `new: true`
                - Because when we get our response we want the data to be the **updated** data
                - We also want to run our mongoose validators on update `runValidators: true`
                - We need to check that the `bootcamp` exists
                    + We need to `return` our res.status to prevent the other `res` in the `try` block from also running and giving us the `headers already sent` error
                - We only send a status of `200` (not 201) because we are not creating a new resource just modifying an existing resource

## Update code
`controller-bootcamps.js`

```
// MORE CODE

exports.updateBootcamp = async (req, res, next) => {
  const bootcamp = Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: bootcamp });
};
// MORE CODE
```

* Then you need to copy an id to the clipboard from an existing bootcamp in MongoDB and paste onto the URL/route using `PUT` HTTP request method

### How do we update using Postman
* We save our GET pointing to a bootcamp id in URL `{{URL}}/api/v1/bootcamps/5ec17a8b1956be6716e6b126`
* We switch to PUT
* We will test and change `housing` to true (or anything you want to change)
* Click on Update bootcamp tab 

![update bootcamp tab](https://i.imgur.com/DWpBEs2.png)

* Paste the id you had for a bootcamp into URL `{{URL}}/api/v1/bootcamps/5ec17a8b1956be6716e6b126`
* Click Headers tab and select `JSON Content` type preset
* Click Body tab and choose raw
* Set housing to true

`Body > raw`

```
{
    "housing": true
}
```

* Hit `Send` in Postman
* You will get back the response and you'll see `housing` is set to `false`

### How would we add a new career with update?
```
{
    "careers": [
            "Web Development",
            "UI/UX",
            "Businesses",
            "Soccer Star"
        ]
}
```

* But we we run into ENUM errors because we can only use the set values in our model
* To change it like we did above and not get a validation error, update your model

#### But we can remove a career
* After our server crashes we need to stop it with `ctrl` + `c` and re-start it with `$ npm run dev`
* Click `Send` in Postman and we removed the career
* Save that Update Bootcamp

#### Woops - we forgot to add our try/catch in our update
`controller-bootcamps.js`

```
// MORE CODE

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.response(400).json({ success: false });
  }
};
// MORE CODE
```

## DELETE
* We'll create a new "dummy" bootcamp to delete
    - Use POST tab to create dummy bootcamp
    - Make sure to save JSON type preset in POST
    - Copy to clipboard the `id` from the Dummy bootcamp so we can delete this bootcamp
    - `5ec17f2db7fa99954d88f9f7`
* Add id to DELETE URL - `{{URL}}/api/v1/bootcamps/5ec17f2db7fa99954d88f9f7`
* Test URL with wrong id and completely different id and see they both fail error handling
* Test with dummy id and the document will be deleted

```
// MORE CODE

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
// MORE CODE
```

* You could also send back and empty object

```
// MORE CODE

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
// MORE CODE
```

## Helper info
* When we get all bootcamps let's also get back the length of the bootcamps

```
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    error: null,
  });
};
```

* And when you hit Send on this HTTP GET request you get this response:

```
// MORE CODE

{
    "success": true,
    "count": 4, // how cool is that!!!?
    "data": [
// MORE CODE
```

## We have a basic CRUD API
* We can get all bootcamps
* A single bootcamp
* We can add a bootcamp
* We can delete a bootcamp
* We can update a bootcamp

