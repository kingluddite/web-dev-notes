# Troubleshooting
* When making a sfc using the snippet VS code library it uses curly braces instead of parenthesees

* Don't do this:
```
const NavbarAuth = () => {}
```

* Do this:

```
const NavbarAuth = () => ()
```

## Quickly create a SFC
* `rfce` + tab
