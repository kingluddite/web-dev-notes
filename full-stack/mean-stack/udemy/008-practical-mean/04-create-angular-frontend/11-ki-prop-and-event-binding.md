# Property and Event Binding
## Two-Way data binding
`[()]`

### Where are the `[()]` coming from?
* They come from Property and Event Binding

![what property binding and event binding look like](https://i.imgur.com/aO2s3Jd.png)

#### Property Binding
[property]="expression"

* The expression will resolve to a value that we want to pass to the property
* Just as in JavaScript this could be a:
    - String
    - Number
    - Or a Function (method call)
        + returning something we want to pass

#### Event Binding
`(event)="expression"`

* The opposite of Property Binding
* The expression get executed whenever the event occurs
    - This could be a:
        + Method call
        + Could also be a short assignment `clicked = true`


## String interpolation to output data
`{{ }}`

## What can we bind to in Property Binding?
* DOM Properties (e.g. value, hidden)
* Directive Properties (e.g. ngStyle)
* Component Properties
    - Components are Directives (but with a template)
        + We can also bind to Components

### What are Directives
* Just instructions in the document
* A feature of Angular 2 that will allow you to manipulate the document

## What can we bind to in Event Binding
* User/DOM Events (e.g. click, mouseover)
* We can bind to our own events in Directive Events
* We can bind to our own events in Components

![property and event binding summary](https://i.imgur.com/7sXhkU3.png)

### Child components
![child components property and event binding]
* The expressions/syntax above is how we use the bindings in the parent Component
    - (_i.e. - the app component for the message component we just created_)

#### How would that look like in the Child Component?
* Which is the receiving end
        - (_Or in the case of the binding, the outputting end_)

#### Custom Property Binding
(_In Component or Directive_)

* `@Input('Alias') propertyName`
* alternative syntax: `inputs['propertyName:Alias']`
    - You put it in an array of all inputs that you want to make bindable

##### Usage
```
<my-component
[propertyName]="expression">
</my-component>
```

#### Custom Event Binding
(In Component or Directive)

* @Output('Alias') eventName
* alternative syntax: `outputs: ['eventName:Alias']`

##### Usage
```
<my-component
(eventName)="expression">
</my-component>
