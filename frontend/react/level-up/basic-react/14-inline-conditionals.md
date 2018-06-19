# Inline Conditional
`MovieDetail.js`

```
// MORE CODE
  render() {
    const { movie } = this.state;

    let detail = 'hi';
    if (this.state.movie.title) {
      detail = 'hello';
    }

    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div>
            {detail}
            <h1>{movie.title}</h1>
            <h2>{movie.release_date}</h2>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;
// MORE CODE
```

* Will output `hello`

```
// MORE CODE
render() {
  const { movie } = this.state;

  let detail = <h1>Hi</h1>;
  if (this.state.movie.title) {
    detail = <h1>Hello</h1>;
  }

  return (
    <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
      <MovieInfo>
        <Overdrive id={movie.id}>
          <Poster
            src={`${POSTER_PATH}${movie.poster_path}`}
            alt={movie.title}
          />
        </Overdrive>
        <div>
          {detail}
// MORE CODE
```

## Or this way

```
// MORE CODE
<div>
  {this.state.movie.title && <h1>Hello</h1>}
  <h1>{movie.title}</h1>
  <h2>{movie.release_date}</h2>
  <p>{movie.overview}</p>
</div>

// MORE CODE
```

## Ternary operator is used all the time in React
```
// MORE CODE
<div>
  {this.state.movie.title ? <h1>Hello</h1> : <h1>Hi</h1>}
  <h1>{movie.title}</h1>
  <h2>{movie.release_date}</h2>
  <p>{movie.overview}</p>
</div>
// MORE CODE
```

