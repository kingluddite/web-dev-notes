# Prepare and push our app to Github
* `config/config.env` doesn't get pushed to Github because it is in our `.gitignore`

## A few ways to handle this
* We'll create another file
* We'll create a new file in config called `config.env.env`

`config.env.env`

```
MONGO_URI=
MONGO_DB_PWD=
MONGO_DB_USERNAME=
NODE_ENV=Development
JWT_SECRET=
PORT=5000
GITHUB_ACCESS_TOKEN=
GEOCODER_PROVIDER=
GEOCODER_API_KEY=
FILE_UPLOAD_PATH= ./public/uploads
MAX_FILE_UPLOAD=1000000
JWT_SECRET=
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=
SMTP_PASSWORD=
FROM_EMAIL=
FROM_NAME=
```

## Create README.md
`README.md`

```
# DevCamper API

> Backend API for DevCamper application
> which is a bootcamp directory website

## Usage

Rename `config/config.env.env` to `config/congig.env` and update the values/settings to your own

## Install Dependencies
3 BACK TICKS
npm install
3 BACK TICKS

## Run App
3 BACK TICKS
# Run in dev mode
npm run dev

# Run in prod mode
npm start
3 BACK TICKS

- Version: 1.0.0
- License: MIT
```

* Add and commit `Added readme and starter config`
* Push it to Github

## Next
* Clone the repo to the server
