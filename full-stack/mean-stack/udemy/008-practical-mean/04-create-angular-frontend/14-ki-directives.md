# Directives
## What are Directives?
* Instructions in the code
* Directives are instructions Angulare 2 will execute
* Instructions are encountered by A2 at runtime and when it finds them it knows what to do

```
<section *ngIf="condtion">
        <h1>Hello</h1>
</section>

<my-component></my-component>
```

* `... *ngIf="condition"> **Instruction:** "Only attach this HTML element and all its children to the DOM if **condition** is met"
    - This allows us to conditionally attach or detach elements to the DOM
    - Important distiction
        + We are not **hiding** or **showing**, we are `attaching` or `detaching`

`<my-component></my-component>` -----> **Instruction** "Insert MyComponent here, this includes `template` and **logic**"

* Components are Directives (with a `View`, the template)

## Takeaway
* Directives enable us to change things on the DOM
* This is what makes our Application dynamic

## Selectors
* Directives use `selectors` to let Angular2 know which parts of the HTML code represent instructions

![selectors Angular2](https://i.imgur.com/qA1smdd.png)

* Selectors work like CSS selectors
    - my-component
        + Select element `<my-component>`
    - #myId
        + Select element `<any id="myId">`

## Takeaway
* We attach Directives to the DOM to make a part of the DOM dynamic and to change it at runtime 

