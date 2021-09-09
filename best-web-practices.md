# Best Web Practices


## HTML validator VC Code extension
https://marketplace.visualstudio.com/items?itemName=CelianRiboulet.webvalidator#review-details

## Preventing Automatic Favicon Requests
* This is a performance quick tip to get rid of that annoying favicon error
* [credit to source](https://webdesign.tutsplus.com/tutorials/prevent-automatic-favicon-requests--cms-34762)
### Why do we get the favicon error?
* Most we browsers make an automatic favicon request on each page load
* If you have a default favicon, you won't notice

### Solution - one line of HTML
`<link rel="icon" href="data:,">`

* Customize your Emmet Snippets in VSCode
  - (video showing you how)[https://www.youtube.com/watch?v=ePNT21D3d2M]

Sample `snippets.json` file to include boilerplate

```
{
  "html": {
    "snippets": {
      "!!": "{<!DOCTYPE html>}>html[lang='${lang}']>(head>meta[charset='${charset}']+meta[http-equiv='X-UA-Compatible'][content='IE=edge']+meta[name='viewport'][content='width=device-width,initial-scale=1.0']+link[rel=icon href=data:,]+link:css+title>{${title}${1}})+(body>(header>h1>{${title}})+(main>h2>{Page Title})+(footer>p>{&copy;})+script:src)",
    }
  }
}
```

* Restart VS Code and type `!!` and your new HTML boilerplate with the favicon request buster built in is genenerated

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
