# Strapi and cloudinary
* Sign up for a free account
* [cloudinary](https://cloudinary.com/)

## Add a plugin `strapi-provider-upload-cloudinary`
* [npm module for this plugin](https://www.npmjs.com/package/strapi-provider-upload-cloudinary)
* **IMPORTANT** You are adding this npm module to your strapi project (not your gatsby project)

`$ npm i strapi-provider-upload-cloudinary`

* If you already have images you would have to manually update the markdown path for all those images in your strapi dashboard!!!

I got stuck on this for 30 minutes but I followed John's advice and got it working. I'm adding some additional observations/steps I followed to get it working and I'm just adding them to maybe save others some time:My steps are for the current https://www.npmjs.com/package/strapi-provider-upload-cloudinary * I created a `.env` in the root of my strapi API site that looks like this:

`.env`

Populate these environment variables with info from your cloudinary dashboard

```
CLOUDINARY_NAME=elvislives
CLOUDINARY_KEY=795735134641111
CLOUDINARY_SECRET=X07lm8ejmA6IUBZr0Ej2BO3-LLL
```

Create a file called `plugins.js` inside the `config` folder

`config/plugins.js`

```
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
  },
  // ...
});
```

Then run your strapi app `$ npm run develop`

After doing this I was getting strange strapi modules not loaded errors. I could not resolve these issues so I did the tried and trusted troubleshooting method of blowing up my `node_modules` and `package-lock.json`

`$ rm -rf node_modules package-lock.json` (be careful with this command!)

I ran npm run develop again and my strapi server started with no problems (Victory!)

Now on my strapi dashboard I tried to upload a new image in media and strapi was acting strange. I received errors but the image appeared. I did this a few times with similar behavior. I think this was happening because of a delay to update my media to the new cloudinary domain but that's just a guess.Then I tried to add an image as markdown and I saw that the image was being served from cloudinary

![image_4.jpg](https://res.cloudinary.com/elvisisking/image/upload/v1602388111/image_4_6f99609111.jpg) 

## The great thing about this way is the images will work when you deploy, becuse the URL is live to cloudinary but before it was pointing to `localhost:1337`
