# Snapshot Testing
* enables you to take a phone of a component
* avoids traversals and spending time using them

`Item.test.js`

* Comment out all tests in this file

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and matches the snapshot', () => {
    const price = '$22.22';
    expect(price).toMatchSnapshot();
  });

// MORE CODE
```

* After running test

`$ npm run test` (make sure you are in the `frontend` folder)

* You will pass the test
* You will see a new `__snapshots__` folder that was created inside your `__tests__` folder

* Open that file up 

`Item.test.js.snap`

```
// MORE CODE

exports[` 1`] = `"$22.22"`;

exports[`<Item/> renders and matches the snapshot 1`] = `"$22.22"`;
// MORE CODE
```

* Now any time our file changes, our test will fail
* Change `$22.22` to `$22.21` in Item.test.js and the test will fail because the file is now different than the snapshot

## To pass test just update the snapshot
* If you are happy with the new changes (maybe you added a new button or something)

### How to update snapshot
`$ u`

* Test passes again and snapshot is updated with new value in code

## Get rid of snapshot
* You remove your snapshot code and you will see `1 snapshot obsolete`
* `$ u` and you will no longer have obsolete snapshot
    - The `__snapshots__` folder is now empty

## Snapshot of our component
```
// MORE CODE

exports[` 1`] = `"$22.22"`;

exports[`<Item/> renders and matches the snapshot 1`] = `"$22.22"`;
// MORE CODE
```

* **CAUTION** When you first snapshot a component you need to open it up and see the snapshot, it can put anything inside it and you need to make sure it is what you want
* Inside you will see a ton of code
* We need to just see what we need to see

## enzyme-to-json
* This will convert the react components to the html we expect to see

`Item.test.js`

```
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

// MORE CODE

describe('<Item/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

// MORE CODE
```

`$ u` to update snapshot

* Now you will see the snapshot is just our component

```
exports[`<Item/> renders and matches the snapshot 1`] = `
<ItemStyles__Item>
  <img
    alt="A cool item"
    src="dog.jpg"
  />
  <Title>
    <Link
      href={
        Object {
          "pathname": "/item",
          "query": Object {
            "id": "ABC123",
          },
        }
      }
    >
      <a>
        A cool item
      </a>
    </Link>
  </Title>
  <PriceTag>
    $50
  </PriceTag>
  <p>
    This is a cool item
  </p>
  <div
    className="buttonList"
  >
    <Link
      href={
        Object {
          "pathname": "update",
          "query": Object {
            "id": "ABC123",
          },
        }
      }
    >
      <a>
        Edit ✏️
      </a>
    </Link>
    <AddToCart
      id="ABC123"
      image="dog.jpg"
      price={5000}
      title="A cool item"
    />
    <DeleteItem
      id="ABC123"
    >
      Delete This Item
    </DeleteItem>
  </div>
</ItemStyles__Item>
`;
```

* Now any changes and we'll get errors in our snapshot
* Change price in component and you will see an error
* `$ u` will update the snapshot and pass the test

## Snapshots will be part of your git repo

## Snapshots on Git repos is very useful!
* Let's change our `Item.js`

```
// MORE CODE

<a>
              aaa
              {item.title}
            </a>
// MORE CODE
```

* I added `aaa` and our snapshot fails, letting me know about `aaa` addition
* So the changes will be in your commits
* You will see the logic of the code that changed
* And you will see the output of the code that changed
* This is very helpful when building an app

## Snapshot CartCount.js
* It takes in an amount
* It displays that amount inside a red Dot

```
// MORE CODE

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition unmountOnExit className="count" classNames="count" key={count} timeout={{ enter: 400, exit: 400 }}>
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);
// MORE CODE
```

* Make a new test for this
* Create in `__tests__` the file `CartCount.test.js`

## tip: first make sure that it renders out fine
* That way you know it fails the render test before it fails the snapshot test

`CartCount.test.js`

```
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('renders', () => {
    shallow(<CartCount count={10} />);
  });
});
```

* In this case we don't even need an `expect` because if something goes wrong with shallow rendering this than that will make our test fail

`CartCount.js`

```
// MORE CODE

);

// export default CartCount;
```

* I comment out the export and that fails the snapshot
* Tells us `you probably forgot to export your component from the file`

## Now we add our next test
```
// MORE CODE

describe('<CartCount/>', () => {
  it('renders', () => {
    shallow(<CartCount count={10} />);
  });

  it('matches the snapshot', () => {
    const wrapper = shallow(<CartCount count={10} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
```

* It passes the snapshot
* Open it up and examine the snapshot
* You'll see all the code that is generated in our Component
* If we change our count from `10` to `20` in `CartCount.test.js` it will fail and tell us our count has changed

`$ u` to update snapshot

## You don't have to snapshot the entire component
* You can just snapshot a piece of your component
* You could have snapshots of multiple pieces of your component

```
// MORE CODE

it('matches the snapshot', () => {
    const wrapper = shallow(<CartCount count={12} />);
    expect(toJSON(wrapper.find('span'))).toMatchSnapshot();
  });
// MORE CODE
```

## Test to make sure it updates it props properly
```
// MORE CODE

it('updates via props', () => {
    const wrapper = shallow(<CartCount count={50} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
```

* View snapshot and you'll see the first prop value and then the updated prop value

## Install Snapshot testing plugin for VS code

## Difference between mounting and shallow
```
// MORE CODE

  it('updates via props', () => {
    const wrapper = mount(<CartCount count={50} />);
    console.log(wrapper.debug());
    return;
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 20 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
// MORE CODE
```

* View the terminal and you'll see `spans` and `divs` and that's the difference, mounting will run it in a kind of browser while shallow will only go one level deep
* We will mostly use `mount` because our code will have nested mutations and queries where we do need to mount it 6 or 7 levels deep in order to to get the thing actually working
* Another benefit to `mounting` is you are actually running it as if you were running it in a browser (this is good because your tests should be as close to what is going on in the browser as you can get it)
* We can't mount just yet because we don't know how to mock our apollo store

## Make your code like this again:

```
// MORE CODE

  it('updates via props', () => {
    const wrapper = shallow(<CartCount count={50} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 20 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
```

* Update your snapshot `$ u`
* Make sure all your tests are passing

## Next - How to mock apollo
* So we can mount these things so we can trigger things like clicks



