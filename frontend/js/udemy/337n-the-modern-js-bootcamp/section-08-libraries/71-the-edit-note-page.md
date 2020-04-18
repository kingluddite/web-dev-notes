# The Edit Note Page
* Time to wire up the page that allows us to edit our notes
* This will let us change the note title and body

## What we need to do
* We'll create a 2nd html document
* We'll send the user from one to the other based off the actions they take
* We'll focus on getting that second html page set up
* We'll also focus on getting the user over to that page when they interact with the current page
    - We'll send the end user over to the edit note page when they click a title or they click the create note button

### Edit Note
`edit-note.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edit Note</title>
</head>
<body>
 This is the edit note page 
</body>
</html>
```

* **note** We had one page named `index.html`, that name `index.html` is special in that if we point to a folder on our server it will by default serve up the file named `index.html`
* If you manually browsed to:

`http://127.0.0.1:8080/index.html`

* It would take you to the exact same page
* But if we want to view another HTML document we will be required to provide the name (**tip** Make sure you are in the note app and not the todo app!)

`http://127.0.0.1:8080/edit-note.html`

* Now you'll see the other html page

## Stuff we need to do
* We'll wire the Create note button to redirect the user
* And we'll also add a link for titles to get the user over to our `edit-note.html` page

## Static link
`edit-note.html`

```
// MORE CODE
<body>
 This is the edit note page 
 <a href="https://google.com">Google</a>
</body>
</html>
```

## Relative vs Absolute URLs
* Above is an absolute URL
* I am testing on `http://127.0.0.1:8080/edit-note.html`
    - But that `http://127.0.0.1:8080` is just for me and my own development
    - I don't want to link to that absolute URL so that is why I need to use `relative URLS` which are relative to where you are in your server

## Relative URL
```
// MORE CODE

<body>
 This is the edit note page 
 <a href="/index.html">Google</a>
</body>
</html>

// MORE CODE
```

* That will link to the home page
* We can also just use `/` which will link us to the same home page

```
// MORE CODE

<body>
 This is the edit note page 
 <a href="/">Google</a>
</body>
</html>

// MORE CODE
```

## Challenge
* Create anchor tags that link our titles to the edit-note.html page

```
// MORE CODE

const generateNoteDOM = function(note) {
  const noteEl = document.createElement('div');
  // Make it an anchortag
  const textEl = document.createElement('a'); // add line
  const button = document.createElement('button');

  // MORE CODE

  // link to edit note page
  textEl.setAttribute('href', '/edit-note.html'); // add line
  noteEl.appendChild(button);
  return noteEl;
};

// MORE CODE
```

* Now note titles are all links that link to the edit note page

## Now we want to redirect based on a button link
* We will use the global `location` object
* Since it is global you can type it into the client console to see what's inside it

![location in console](https://i.imgur.com/t2NE928.png)

* You could do the same for the global `document` object

![document in console](https://i.imgur.com/o25XALp.png)

### Let's look at the location MDN documentation
* [location MDN documenation](https://developer.mozilla.org/en-US/docs/Web/API/Location)

#### How to change the location (The Location.assign() method)
* `Location.assign()` - Loads the resource at the URL provided in parameter
* It takes a string similar to what we would put in as an href attribute value

##### Absolute redirect
* Type in console

`> location.assign('https://google.com')`

##### Relative URL

`> location.assign('/edit-note.html')`

* Try both in the browser and you'll see how they redirect you to google or your website edit note page

## Challenge
* When user creates a note, redirect them to the edit-note.html page

`index.html`

* Change google to home

```
// MORE CODE

<body>
 This is the edit note page 
 <a href="/index.html">Home</a>
</body>
</html>

// MORE CODE
```

* Now add redirect link programmatically

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  notes.push({
    id: uuidv4(),
    title: '',
    body: '',
  });
  saveNotes(notes);
  location.assign('/edit-note.html');
  // renderNotes(notes, filters);
});

// MORE CODE
```

* Now when you add a link you are redirect to `edit-note.html`
* I also removed the renderNotes() function call as we no longer need it

### Test in UI
* Click to add note, you will be redirected to edit-note.html
* Click to go back home and you'll see the new note has been added to the list of notes

### How can we send a user to the edit-note.html page with a unique identifier for that note?
* This way we can know which note we need to edit
* This is simple, we will just add the note `id` to the link

### Adding a hash
* We will add to the URL what is known as the `hash`
* `http://localhost:8080/edit-note.html#d1b2994b-e0df-4ef2-b836-6b9b86e4b69e`
* If you view in client console `location` you will see a hash property with the id of that note

## Challenge
1. Setup link `href` to include hash with `id`
2. Setup the assign call to include hash with id (when you create a new note)

```
// Generate DOM structure for a Note
const generateNoteDOM = function(note) {
  const id = note.id;

  // MORE CODE

  // link to edit-note page and send note id in URL
  textEl.setAttribute('href', `/edit-note.html#${id}`);
  noteEl.appendChild(button);
  return noteEl;
};
```

### Getting hash on new note
* I grab the `id` of the last note created
* Then add into URL

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  notes.push({
    id: uuidv4(),
    title: '',
    body: '',
  });

  const lastNoteId = notes[notes.length - 1].id;
  saveNotes(notes);
  location.assign(`/edit-note.html#${lastNoteId}`);
  // renderNotes(notes, filters);
});

// MORE CODE
```

* Now both note links and creating a new note take you to edit-note.html page but also supply that page with the unique hash

## A better way
* Store the `id` first

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  const id = uuidv4();
  notes.push({
    id,
    title: '',
    body: '',
  });

  saveNotes(notes);
  location.assign(`/edit-note.html#${id}`);
});

// MORE CODE
```

* Works just like it did before but it is structured better

## Next - continue working on the notes form
