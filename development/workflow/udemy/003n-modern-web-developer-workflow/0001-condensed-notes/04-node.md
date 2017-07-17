# Node is cool
* We can grab an image from the internet and pull it into our site

`app.js`

```
var showMeTheFiles = require('fs');
// important to look at URL and use http or https and require it
var https = require('https');

var stormTrooperUrl = 'https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg';
var stormTrooperFile = showMeTheFiles.createWriteStream(__dirname + '/storm-trooper.jpg');
var request = https.get(stormTrooperUrl, function(response) {
  response.pipe(stormTrooperFile);
});
```

* Run node

`$ node app.js`
