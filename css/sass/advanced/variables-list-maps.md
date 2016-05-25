# Better Variables with List-maps

Very common practice you will see a lot
```
// establish a core color
$core-gray: #333;

// assign core color to semantic variable
$input-disabled-color: $core-gray;

// Use semantic variable as assigned to additional semantics
$input-disabled-background:    lighten($input-disabled-color, 75%);
$input-disabled-border:        lighten($input-disabled-color, 50%);
$input-disabled-text:          lighten($input-disabled-color, 50%);

input[disabled] {
  background-color: $input-disabled-background;
  border-color: $input-disabled-border;
  color: $input-disabled-text;
}
```

Output

```
input[disabled] {
  background-color: #f2f2f2;
  border-color: #b3b3b3;
  color: #b3b3b3; }
```

## Improve on above using map-get

**Note: Sass 3.4 requires colons**

```
// establish a core color
$core-gray: #333;

// assign core color to semantic variable
$input-disabled-color: $core-gray;

// Use semantic variable as assigned to additional semantics
$input: (
  disabled-background: lighten($input-disabled-color, 75%),
  disabled-border: lighten($input-disabled-color, 50%),
  disabled-text: lighten($input-disabled-color, 5%)
);

input[disabled] {
  background-color: map-get($input, disabled-background);
  border-color: map-get($input, disabled-border);
  color: map-get($input, disabled-text);
}
```

* Now you can make changes in the $input map and it will update in the `input[disabled]`

## Nesting Lists

```
$var: (
 key: value,
 key: value,
 key (
  key value
  )
)
```

## map-get-z() function
