# Loading Sample Data
<!-- MarkdownTOC -->

- [Alfred App \(MacOs\)](#alfred-app-macos)
- [Easy way to load seed data into sanity](#easy-way-to-load-seed-data-into-sanity)
  - [How can we load sample data into sanity?](#how-can-we-load-sample-data-into-sanity)
- [Watch out for null error](#watch-out-for-null-error)
  - [West Practice \(Troubleshooting\)](#west-practice-troubleshooting)
- [How to export sanity data](#how-to-export-sanity-data)
- [Some CSS styling and CSS subgrid](#some-css-styling-and-css-subgrid)

<!-- /MarkdownTOC -->

## Alfred App (MacOs)
* This app saved me so much time (snippets is cool but searching through bookmarks is even cooler - [Here is a resource to find Alfred App like apps in in Windows](https://www.makeuseof.com/free-windows-alternatives-to-macs-alfred-app/))
* I added snippets to quickly load
    - sanity local server, http://localhost:3333 using `!san`
    - gatsby local server, http://localhost:8000 using `!gat`
    - gatsby local GraphQL server, http://localhost:8000/___graphql using `!gpg`

## Easy way to load seed data into sanity

### How can we load sample data into sanity?
* Make sure you are in the sanity folder

`$ sanity dataset import ./sample-data/all-sample-data.gz production`

* This is what you will see:

![terminal after loading seed data into sanity](https://i.imgur.com/CkIL9nf.png)

* If you run again you can replace the data with the `--replace` option

`$ sanity dataset import ./sample-data/all-sample-data.gz production --replace`

## Watch out for null error
* If you are loading images (or any asset) from sanity or any Headless CMS and one of the images or assets is missing you will get a `TypeError` pointing to a null value
* Example:

```js
// MORE CODE

<Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
// MORE CODE
```

* If the image doesn't exist and we try to load it we'll get a `null` TypeError

### West Practice (Troubleshooting)
* Stop gatsby and restart
* Comment out offending code
* Log out the problem

```js
// MORE CODE

function SinglePizza({ pizza }) {
  console.log(pizza.image, pizza.name);

  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        {/* <Img fluid={pizza.image.asset.fluid} alt={pizza.name} /> */}
      </Link>
    </div>
  );
}

// MORE CODE
```

* Sometimes a restart is all you need to fix an issue (make that your first troubleshoot option)

## How to export sanity data
* A Slack I posted to our channel

```
the .gz file used to import the assets is cool quick way to seed data. I wanted to see how the .gz file was created. A quick glance at the videos and I didn't see any export from sanity but I assumed this was how it was done.

I dove down the rabbit hole and found two cool things:

1. export data from sanity is easy - https://www.sanity.io/blog/5-cool-things-you-can-do-with-the-sanity-cli#9875197cf349

sanity dataset export production

2. And you can do all kinds of cool things with gzip

https://coderwall.com/p/l8byfq/using-gzip-in-os-x
```

## Some CSS styling and CSS subgrid
