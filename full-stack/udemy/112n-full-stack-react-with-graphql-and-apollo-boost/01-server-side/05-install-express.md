# Express Server setup
* Create a file in the root of your app
* A common name for this file is `server.js`

`server.js`

```
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
```

