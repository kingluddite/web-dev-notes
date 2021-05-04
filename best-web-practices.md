# Best Web Practices
## CSS
* Style Guide - https://codeguide.co/

## Student Tips
* Add Git Bash to VS Code for windows
* https://stackoverflow.com/questions/42606837/how-do-i-use-bash-on-windows-from-the-visual-studio-code-integrated-terminal

## Client
* **tip** When tasked with implementing a new service, always check to see if they offer a sandbox environment or account that you can test with to see if it's a good fit for your project

## Accessibility
* You should always wrap `emojis` (like the shopping cart icon) in a `<span>` element that includes `role` and `aria-label` attributes
* Doing so will help **screen readers** understand the context of the `emoji`

```
// MORE CODE

if (!state.cartOpen) {
  return (
    <div className="cart-closed" onClick={toggleCart}>
      <span
        role="img"
        aria-label="trash">🛒</span>
    </div>
  );
}
// MORE CODE
```
coastmusicstaff@gmail.com
