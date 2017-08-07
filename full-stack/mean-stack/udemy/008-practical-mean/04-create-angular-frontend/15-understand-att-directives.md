# Understanding Attribute Directives
## Two types of Directives
1. Attribute Directives
    * Attached like normal HTML attributes

`message.component.html`

```html
<article class="panel panel-default" [ngStyle]="{backgroundColor: 'red'}">
 // more code
</article><!-- /.panel panel-default -->
```

* If you want to use normal CSS instead of camelCase

```html
<article class="panel panel-default" [ngStyle]="{'background-color': 'red'}">
 // more code
</article><!-- /.panel panel-default -->
```

![attribute style directive](https://i.imgur.com/bOPwHS1.png)

* We could also use normal CSS to style this
* But with attribute Directives we can bind to a **property**

```html
<article class="panel panel-default" [ngStyle]="{'background-color': color}">
 // more code
</article><!-- /.panel panel-default -->
```

* And define the `color` property

`message.component.ts`

```js
// more code
export class MessageComponent {
  @Input() message: Message;
  @Output() editClicked = new EventEmitter<string>();

  color = 'blue';

  onEdit() {
    this.editClicked.emit('Some other new value');
  }
}
```

* And if you save you will see the color is now blue
* And if you want to improve by adding an event that on hover changes the color to green:


```html
<article class="panel panel-default" [ngStyle]="{backgroundColor: color}" (mouseenter)="color = 'green'">
 // more code
</article><!-- /.panel panel-default -->
```

2. Structural Directives
    * Attached like normal HTML attributes
    * But they also change the structure of the DOM and not just the element on which they site (e.g. `*ngIf`)

* Remove all Directive Attribute code as it was just to show as an example
