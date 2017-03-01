# :before and :after
:before and :after selectors. These selectors are used to add something before or after a selected element. In the following example, a :before selector is used to add a rectangle to an element with the class heart:

```css
.heart:before {
  content: "";
  background-color: yellow;
  border-radius: 25%;
  position: absolute;
  height: 50px;
  width: 70px;
  top: -50px;
  left: 5px;
}
```

For the `:before` and `:after` selectors to function properly, they must have a defined content property.

* It usually has content such as a photo or text
* When the `:before` and `:after` selectors add shapes, the content property is still required, but it's set to an empty string
