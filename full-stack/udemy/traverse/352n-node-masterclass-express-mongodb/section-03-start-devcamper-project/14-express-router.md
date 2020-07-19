# Express Router
* Move routes into `routes/bootcamps.js`

`routes/bootcamps.js`

```
app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Show all bootcamps' },
    error: null,
  });
});

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Create a bootcamp' },
    error: null,
  });
});

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Update a bootcamp with ${req.params.id}` },
    error: null,
  });
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Delete a bootcamp with ${req.params.id}` },
    error: null,
  });
});
```

* But we no longer have access to `app`
* We'll import express and create a new variable called `router`

`routes/bootcamps.js`

```
const express = require('express');

const router = express.Router();

router.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Show all bootcamps' },
    error: null,
  });
});

router.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Create a bootcamp' },
    error: null,
  });
});

router.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Update a bootcamp with ${req.params.id}` },
    error: null,
  });
});

router.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Delete a bootcamp with ${req.params.id}` },
    error: null,
  });
});
```

## But we can control our routes even better
* We'll load in the `routes/bootcamp` in `server.js`

`server.js`

```
// MORE CODE

const dotenv = require('dotenv');

// Route files
const bootcamps = require('./routes/bootcamps'); // add this

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcamps); // add this
// MORE CODE
```

* Now we don't need `/api/v1/bootcamps` in `routes/bootcamps.js`
    - It will know automatically that that's the route for all of these

## Now we can update our routes
`routes/bootcamps.js`

```
// MORE CODE

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Show all bootcamps' },
    error: null,
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Create a bootcamp' },
    error: null,
  });
});

router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Update a bootcamp with ${req.params.id}` },
    error: null,
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Delete a bootcamp with ${req.params.id}` },
    error: null,
  });
});
```

## Don't forget to export the router!

`routes/bootcamps.js`

```
// MORE CODE
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Delete a bootcamp with ${req.params.id}` },
    error: null,
  });
});

module.exports = router; // this exports the router
```

## Test that all routes work as they did before

## Next - Adding controller methods
