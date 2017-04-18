# Style Player with Flexbox

![wireframe](https://i.imgur.com/ggp5NOo.png)

* **Flexbox** is a new layout module
* Makes it real easy to create grid-like layouts

## Let's use Flexbox on the AddPlayer Component
![form tag and input](https://i.imgur.com/qvuraqr.png)

* We have a `form` tag and an `input`
* We want `input` to be same height as `button`
* We want the `input` to take up all the extra space
    - We'll move the `button` to the right and the input should take up all the rest of the space and it should flex its width depending on the total box size
* Using **Flexbox** is pretty simple and we'll write a lot less code then if we were not using **Flexbox**

Create `_form.scss` and import it and `_player.scss` into `_main.scss`

`_main.scss`

```
// more code
@import './components/title-bar';
@import './components/wrapper';
@import './components/item';
@import './components/button';
@import './components/player'; // add this line
@import './components/form'; // add this line
```

### Add Flexbox to our form
`_form.scss`

```
.form
{
    display: flex;
}
```

### Add class to AddPlayer
`<form className="form" onSubmit={this.handleSubmit.bind(this)}>`

#### View in browser
![flexbox](https://i.imgur.com/ISmfQv3.png)

* Now they are by default the same height (_input and button_)
* By default **Flexbox** items flow left to right
* All elements have equal height
    - This is great when making column-based layout because you want all the heights to be equal

### Parent-child relationship with Flexbox
When you apply `flex` to an element, that element is known as the `container`

We do that here:

`<form className="form" onSubmit={this.handleSubmit.bind(this)}>`

So `form` has `flex` on it and it is now known as a `flex container` and its children, it's direct decedents (_input and button_) are known as `flex items`

* We can add CSS properties to either the **flex container** or the **flex item**

`_form.scss`

```
.form
{
    display: flex;
}

.form__input {
  flex-grow: 1;
}
```

`flex-grow` is for **flex items** and it by default is set to `0` and that means if there is extra space left over, ignore it. When we set `flex-grow` to `1` for an element we want to take over that space

`AddPlayer`

`<input className="form__input" type="text" name="playerName" placeholder="Player Name"/>`

## View in browser
![flex-grow](https://i.imgur.com/Z65lB9D.png)

```
.form
{
    display: flex;
}

.form__input
{
    padding: 0 1.3rem;

    border: 1px solid #e8e8e8;

    flex-grow: 1;
}
```

![padding and border added](https://i.imgur.com/IZUMXQ7.png)

## Touch up form with more styles
`_main.scss`

```
input,
button,
select
{
    font-size: 1.3rem;
}
```

![smaller font size](https://i.imgur.com/6W0CEkq.png)

We are finished with our form. Now let's work on our players

## Player
### div on the left and a div on the right!
* We need to work on improving our HTML structure and add our **BEM** class names
* We want a `div` on the left and a `div` on the right. The **name** and **stats** will be in `div` on the left and the buttons will be in a `div` on the right

![Player layout](https://i.imgur.com/PP1LbW5.png)

`Player`

```
  render() {

    const { player } = this.props;

    return (
        <div key={player._id} className="item">
          <div className="player">
            <div>
              <h3 className="player__name">{player.name}</h3>
              <p className="player__stats">
                {player.score} {this.checkPoints(player.score)}.
              </p>
            </div>
            <div className="player__actions">
              <button className="button button--round" onClick={() => {
                Players.update( player._id, { $inc: { score: 1} } );
              }}>+1</button>
              <button className="button button--round" onClick={() => {
                Players.update( player._id, { $inc: { score: -1} } );
              }}>-1</button>
              <button className="button button--round" onClick={() =>  Players.remove(player._id)}>X</button>
            </div>
          </div>
        </div>
    );
  }
```

`_player.scss`

```
.player
{
    display: flex;
}
```

Will give us the name on the left and buttons on the right like:

![new layout](https://i.imgur.com/6bo32so.png)

### Flex and justify-content
Let's you specify where the elements should be positioned

`_player.scss`

```
.player
{
    display: flex;

    justify-content: center;
}
```

![justify center](https://i.imgur.com/8yeXBYG.png)

```
.player
{
    display: flex;

    justify-content: space-around;
}
```

![justify space-around](https://i.imgur.com/xLCyWVT.png)

```
.player
{
    display: flex;

    justify-content: space-between;
}
```

![space-between justify](https://i.imgur.com/giXsSGT.png)

### Space for h3
`_main.scss`

```
// more code
h3,
p
{
    margin: 0;
    padding: 0;
}
// more code
```

## Problem
What if you add a really long name?

![buttons stack](https://i.imgur.com/rMFOYMU.png)

The `buttons` stack and our layout breaks. We want to say "_Hey, this buttons, that flex item, we don't want it to shrink no matter other things in the flex container get_"

## Honey I shrunk the divs
`_player.scss`

```
// more code
.player__actions
{
    flex-shrink: 0;
}
```

This tells **Flex** to never shrink that item no matter how big other stuff gets

![it is fixed](https://i.imgur.com/0nhmL99.png)

## Center of attention
Our buttons look nice but they need to be centered too

`_player.scss`

```
.player
{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

This will center all of the items vertically

![center items vertically](https://i.imgur.com/w00KUKM.png)

## Center text inside buttons
If you look at our buttons you will see they are not exactly centered

![not centered buttons](https://i.imgur.com/4BwOVIO.png)

`_button.scss`

```
.button
{
    font-weight: 600;
    line-height: 1; // add this line
// more code
```

That rule says we don't have to worry about `line-height` for these buttons because there are not multiple lines

![centered buttons](https://i.imgur.com/AHbq04i.png)

### Next
3rd-Party React Components!
