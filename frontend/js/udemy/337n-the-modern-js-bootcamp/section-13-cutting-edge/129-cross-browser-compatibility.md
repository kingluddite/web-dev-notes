# Cross-Browser Compatibility
* Introduce a few new tools that make our apps function better in a wider range of browsers

## Example
* Look at `const` MDN
    - [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
    - We see we can use `const` everywhere
* Look at `class` MDN
    - [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
    - We see IE does not explore the `class` syntax even in the latest version of IE
        + So if someone tried to use IE for our hangman game (which relies on `class`) our game would fail in that browser

## We need tooling to fix 2 key problems
1. Older browsers are never going to update to support these newer features
    * So if we want to use them (which we do) we have to figure a way to work around that
2. There are new JavaScript features that currently aren't supported by any browser (even the latest ones), our tooling that we'll set up will solve this problem too
