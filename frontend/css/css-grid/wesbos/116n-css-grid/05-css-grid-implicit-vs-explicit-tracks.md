# Implicit vs Explicit Tracks
* I create the explicit tracks (long bold dash)
* Autocreated tracks are implicit (light dash)

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
}
```

* So the 2 columns will be explicit
* The rows will be implicit
* Both are long dashes (row and column)
* Solid lines are where the explicit grid end

## What if we add 2 rows
* You will see they are implicit
    - Why?
    - Because we only defined 2 columns and 2 rows
    - The 3rd row added will be implicit

## How do you size implicit rows or columns?
* You will use `grid-auto-rows`

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
  grid-template-rows: 200px 400px;
  grid-auto-rows: 500px;
}
```

* So now any rows you don't create will have a 500px height
* But if you try to define multiple implicit rows (works in chrome not in firefox)

## How can you add auto columns
* You can't
* But `grid-auto-flow` can help with this

## Next - grid auto flow
