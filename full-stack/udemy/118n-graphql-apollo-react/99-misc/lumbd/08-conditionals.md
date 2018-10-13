# Conditionals
* 3 main ways to use conditionals

1. Conditional above your render
    * Can be complex
    * Can use jsx
2. expression && jsx
    * If expression is true it will show jsx
3. ternary to show one or the other (very commonly used)

## Using let

`MovieDetail.js`

```
// MORE CODE

render() {
  let detail = 'hi';
  if (this.state.movie.title) {
    detail = 'hello';
  }

  const { movie } = this.state;
  return (
    <div>
      <div style={{ color: '#fff' }}>welcome</div>
      {this.state &&
        movie &&
        movie.poster_path !== undefined && (
          <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
            <MovieInfo>
              <Overdrive id={movie.poster_path}>
                <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
              </Overdrive>
              <div>
                {detail}
                <h1>{movie.title}</h1>

// MORE CODE
```

* That will show `hello` instead of `hi`

### jsx inside conditionals
```
// MORE CODE

render() {
  let detail = <h1>Hi</h1>;
  if (this.state.movie.title) {
    detail = <h1>Yo</h1>;
  }

  const { movie } = this.state;
  return (
    <div>
      <div style={{ color: '#fff' }}>welcome</div>
      {this.state &&
        movie &&
        movie.poster_path !== undefined && (
          <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
            <MovieInfo>
              <Overdrive id={movie.poster_path}>
                <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
              </Overdrive>
              <div>
                {detail}

// MORE CODE
```

* Will out html with our text

## We already used this
```
// MORE CODE

<div>
{this.state.movie.title && <h1>Hello</h1>}
<h1>something else</h1>

// MORE CODE
```

* That only shows if it is true

## What about the ternary operator?
* Show one or the other

`MovieDetail.js`

```
// MORE CODE

<div>
  {movie.title ? <h1>Hi</h1> : <h1>hello</h1>}
  <h1>{movie.title}</h1>
  <h2>{movie.release_date}</h2>
  <p>{movie.overview}</p>
</div>

// MORE CODE
```

