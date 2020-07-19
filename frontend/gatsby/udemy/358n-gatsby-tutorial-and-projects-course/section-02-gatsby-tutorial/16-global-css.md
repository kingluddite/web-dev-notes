# Global CSS
* **note** css is not JavaScript so you need to import it with a full path to the css file name/extension

`components/layout.js`

```
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

h1 {
  color: green;
  text-transform: capitalize;
}
```

`pages/index.js`

```
import React from 'react';
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>
      <div>
        <a href="https://cnn.com">CNN</a>
      </div>
    </Layout>
  );
}
```

* **note** Inline styles take power over global
