# Intro to Nextjs
## [video tutorial](https://www.youtube.com/watch?v=IkOVe40Sy0U)

## Build simple react nextjs app
* [documentation](https://github.com/zeit/next.js/)

## Install
* Create a directory locally
* `$ mkdir bitzprice`
* `$ cd bitzprice`

### Create `package.json`
* `$ npm init -y`

### Install next js and react stuff
* `$ npm install --save next react react-dom`

### Add Scripts
* And add a script to your package.json like this:

`package.json`

```
// MORE CODE
},
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
},
// MORE CODE
```

`pages/index.js`

```
import Navbar from '../components/Navbar';

const Home = () => (<div>
    <Navbar />
    <h1>Hello from Next.js</h1></div>);

export default Home;
```

## Run server
`$ npm run dev`

## Add another page
`pages/about.js`

```
import Navbar from '../components/Navbar';

const About = () => (
    <div>
        <Navbar />
        <div>
            <h1>Welcome to BitzPrice</h1>
            <p>App to view Bitcoin prices</p>
        </div>
    </div>
);

export default About;
```

`components/Navbar.js`

```
import React, { Component } from 'react'
import Link from 'next/link';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link href="/"><a>Home</a></Link>
                    </li>
                    <li>
                        <Link href="/about"><a>About</a></Link>
                    </li>
                </ul>

                <style jsx>{`
                  ul {
                      background: #333;
                      color: #fff;
                      list-style: none;
                      display: flex;
                  }

                  ul li {
                      font-size: 18px;
                      margin-right: 20px;
                  }

                  ul li a {
                      color: #fff;
                      text-decoration: none;
                  }
                `}
                </style>
            </div>
        )
    }
}
```

* The CSS is scoped only to this Navbar component
* This avoids collisions using global CSS
    - This means if use used a ul in another component it would be unaffected with the above CSS 

### Reuse Navbar with a Layout
`pages/index.js`

```
import Layout from '../components/Layout';

const Index = () => (
    <Layout>
        <div>
            <h1>Welcome to BitzPrice</h1>
        </div>
    </Layout >
);

export default Index;
```

`pages/about.js`

```
import Layout from '../components/Layout';

const About = () => (
    <Layout>
        <div>
            <h1>About BitzPrice</h1>
            <p>App to view Bitcoin prices</p>
        </div>
    </Layout>
);

export default About;
```

`components/Layout.js`

```
import Navbar from './Navbar';

const Layout = (props) => (
    <div>
        <Navbar />
        {props.children}
    </div>
)

export default Layout;
```

* **note** It will look just like it did before but now it is more maintainable 

## Add Bootstrap 4
`components/Layout.js`

```
import Head from 'next/head';
import Navbar from './Navbar';

const Layout = (props) => (
    <div>
        <Head>
            <title>BitzPrice</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        </Head>
        <Navbar />
        <div className="container">
            {props.children}
        </div>
    </div>
)

export default Layout;
```

* The `Head` enables you to add `head` meta data to your app

`Navbar.js`

```
import Link from 'next/link';

const Navbar = () => (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">BitzPrice</a>
        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link href="/"><a class="nav-link">Home</a></Link>
                </li>
                <li class="nav-item">
                    <Link href="/about"><a class="nav-link">About</a></Link>
                </li>
            </ul>

        </div>
    </nav>
)

export default Navbar;
```

### Use API - BPI real-time data
* [coindesk api](https://www.coindesk.com/api/)

#### isomorphic-unfetch
* We need to bring in a new module
    - isomorphic-unfetch
    - Enables us to use the API on the client and the server
* `$ npm install isomorphic-unfetch`
    - Has same syntax as standard client-side fetch

* Newer versions of npm automatically add to package.json without `--save`

`Index.js`

```
import Fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

const Index = (props) => (
    <Layout>
        <div>
            <h1>Welcome to BitzPrice</h1>
            {props.bpi.time.updated}
        </div>
    </Layout >
);

Index.getInitialProps = async function () {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await res.json();

    return {
        bpi: data
    }
}

export default Index;
```

* **note** We just want to output the time to make sure it is working
* We bring in `isomorphic-unfetch`
* We use `async-await`
* We `fetch` from our API and store it in `res` (result)
* We just point to our API URL but because we use `fetch` it returns a `Promise` and then we need to map that to json
    - And this means we need to do another `await`

## Prices
* We don't have to import React with next (it's just there)

`index.js`

```
import Fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Prices from '../components/Prices';

const Index = (props) => (
    <Layout>
        <div>
            <h1>Welcome to BitzPrice</h1>
            <Prices bpi={props.bpi} />
        </div>
    </Layout >
);

Index.getInitialProps = async function () {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await res.json();

    return {
        bpi: data.bpi
    }
}

export default Index;
```

`components/Prices.js`

```
class Prices extends React.Component {
    state = {
        currency: 'USD'
    }

    render() {
        return (
            <div>
                Prices
            </div>
        )
    }
}

export default Prices;
```

## Test Prices
* Should just output simple text to let us know the Prices component is working properly

`Prices.js`

```
class Prices extends React.Component {
    state = {
        currency: 'USD'
    }

    render() {
        let list = '';

        if (this.state.currency === 'USD') {
            list = <li className="list-group-item">
                Bitcoin rate for {this.props.bpi.USD.description}:
                <span className="bage badge-primary">{this.props.bpi.USD.code}</span>
                <strong>{this.props.bpi.USD.rate}</strong>
            </li >;
        } else if (this.state.currency === 'GBP') {
            list = <li className="list-group-item">
                Bitcoin rate for {this.props.bpi.GBP.description}:
                <span className="bage badge-primary">{this.props.bpi.GBP.code}</span>
                <strong>{this.props.bpi.GBP.rate}</strong>
            </li >;
        } else if (this.state.currency === 'EUR') {
            list = <li className="list-group-item">
                Bitcoin rate for {this.props.bpi.EUR.description}:
                <span className="bage badge-primary">{this.props.bpi.EUR.code}</span>
                <strong>{this.props.bpi.EUR.rate}</strong>
            </li >;
        }
        return (
            <div>
                <ul className="list-group">
                    {list}
                </ul>
                <br />
                <select onChange={e => this.setState({ currency: e.target.value })} className="form-control">
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        )
    }
}

export default Prices;
```

* Shows you different bitcoin prices
