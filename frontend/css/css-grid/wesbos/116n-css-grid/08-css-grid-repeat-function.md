# Repeat function
* Saves you typing
* So this:

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

* Becomes this:

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
}
```

`repeat(how many times you want to repeat, what you are repeating)`

* If you want to alternate between 2 sets (say 1fr and 2fr)

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr 2fr); 
}
```

## Go crazy by mixing and matching with repeat
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 100px repeat(2, 1fr auto) 200px repeat(2, 5fr); 
}
```


