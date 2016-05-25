# Variables

Using a border radius in multiple places

Create a variable
`_variables.scss`

```
// Border radius
$br: 10px
```

### Asset variables
_variables.scss

```
// Asset paths
$path-img          : '../img';
```

and in the `_header.scss` file

```
.main-header {
  @extend %centered;
  padding-top: 170px;
  height: 850px;
  background: linear-gradient($color-prim, transparent 90%),
              linear-gradient(0deg, $color-body, transparent),
              $color-prim url('#{$path-img}/mountains.jpg') no-repeat center;
  background-size: cover;
}
```

this uses `interpolation` because the string value is inserted inside a string
