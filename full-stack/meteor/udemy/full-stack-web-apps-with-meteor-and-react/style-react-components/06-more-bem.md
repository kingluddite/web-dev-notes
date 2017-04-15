# BEM Challenges

Pass a `prop` of `slogan` to `TitleBar`

`<TitleBar title={this.props.title} slogan="You can only win if someone keeps score!"/>`

## Exercise
Create a slogan BEM element for the TitleBar block

`_title-bar.scss`

```
.title-bar
{
    color: #fff;
    background: #e35557;
}
.title-bar__slogan
{
    font-size: 1.3rem;
    font-weight: 200;
    font-style: italic;
}
```

`TitleBar`

`return <h2 className="title-bar__slogan">{this.props.slogan}</h2>;`

## Exercise
* Use BEM to create a player block
* Create Elements for **name**, **stats** and **action**

`_player.scss`

```
// block
.player
{
    //
}
// Elements
.player__name
{
    //
}

.player__stats
{
    //
}

.player__actions
{
    //
}
```
