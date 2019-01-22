# First Tests and Shallow Rendering
* We will start with Item component
* No Queries or Mutations, all are passed in via props and then we display it

## What our plan is
1. Import the Item component into a test
2. We'll render it out
3. And we'll check that all of these things are working as we expect them to
    * The description is there
    * The title is there
    * The image is there
    * The price is being formatted properly

`frontend/__tests__/Item.test.js`

```
import { shallow } from 'enzyme';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'ABC123',
  title: 'A cool item',
  price: 5000,
  description: 'This is a cool item',
  image: 'dog.jpg',
  largeImage: 'large-dog.jpg',
};

describe('<Item />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    console.log(wrapper);
  });
});
```

* Test passes but we don't see anything

`Item.test.js`

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    console.log(wrapper.debug());
  });
});
```

* Now we see the HTML that will be output... something like:

```
console.log __tests__/Item.test.js:16
      <ItemStyles__Item>
        <img src="dog.jpg" alt="A cool item" />
        <Title>
          <Link href={{...}}>
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
        <div className="buttonList">
          <Link href={{...}}>
            <a>
              Edit ✏️
            </a>
          </Link>
          <AddToCart id="ABC123" image="dog.jpg" title="A cool item" price={5000} />
          <DeleteItem id="ABC123">
            Delete This Item
          </DeleteItem>
        </div>
      </ItemStyles__Item>
```

* [here are the docs to enzyme's shallow rendering](https://airbnb.io/enzyme/docs/api/shallow.html)
    - You can do traversal going in and out of your React component
    - Go up a level/down a level
    - Search inside using `.find(selector)`
    - Grab the first thing if there is multiple
    - Check if things are equal
    - Find children
    - (very similar to jQuery methods)

## Check our price tag
```
// MORE CODE

<PriceTag>$50</PriceTag>

// MORE CODE
```

* We need to grab that so we use:

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    console.log(PriceTag.debug());
  });
});
```

But how do we get the actual price?

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    console.log(PriceTag.text());
  });
});
```

But that just gives us:

```
<PriceTag />
```

* This is the difference between **shallow rendering** it and actually **mounting** it

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    console.log(wrapper.debug());
  });
});
```

* Look again at the code you see that is output to the terminal:

```
<ItemStyles__Item>
       <img src="dog.jpg" alt="A cool item" />
       <Title>
         <Link href={{...}}>
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
       <div className="buttonList">
         <Link href={{...}}>
           <a>
             Edit ✏️
           </a>
         </Link>
         <AddToCart id="ABC123" image="dog.jpg" title="A cool item" price={5000} />
         <DeleteItem id="ABC123">
           Delete This Item
         </DeleteItem>
       </div>
     </ItemStyles__Item>
```

* They are all just components and they are not getting rendered out to the true HTML because what shallow rendering does is it renders the top level component (in our example here it is `Item`) and it won't go any levels deeper, like it won't render out the `AddToCart` to a true button because we will separately test that AddToCart button ourselves (as we will with all the other elements - we will tests these buttons in separate tests to isolate them)
* But this is a problem because how to we get the text inside PriceTag?

### dive()
* One way to solve this is to dive and this will shallow render one level deeper

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    console.log(PriceTag.dive().text());
  });
});
```

* And that will give us `$50` (the text node)

## We could also use `.children()`
```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    console.log(PriceTag.children().text());
  });
});
```

* And this is how we pass the test

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    console.log(PriceTag.children().text);
    expect(PriceTag.children().text()).toBe('$50');
  });
});
```

* **note** Snapchat makes this traversal not necessary

## Let's test the Title
```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    // console.log(wrapper.debug());
    console.log(PriceTag.children().text);
    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe('A cool item');
  });
});
```

* It would be better to use the `fakeItem` object because if it ever changes we won't have to change our test

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    // console.log(wrapper.debug());
    console.log(PriceTag.children().text);
    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });
});
```

## Check the image
```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    // console.log(wrapper.debug());
    console.log(PriceTag.children().text);
    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const img = wrapper.find('img');
    console.log(img.debug());
  });
});
```

* That will output:

`<img src="dog.jpg" alt="A cool item" />`

* We need to check that the `src` and `alt` were set

## .props() will help us here
```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    // console.log(wrapper.debug());
    console.log(PriceTag.children().text);
    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const img = wrapper.find('img');
    console.log(img.props());
  });
});
```

* Will output with an object with all the props passed in:

`{ src: 'dog.jpg', alt: 'A cool item' }`

* So we check for `src` and `alt`

```
// MORE CODE

describe('<Item/>', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    // console.log(wrapper.debug());
    console.log(PriceTag.children().text);
    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const img = wrapper.find('img');
    // console.log(img.props());
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
});
```

* **tip** If you have several tests pertaining to image, put them all in one `it()`

```
// MORE CODE

describe('<Item/>', () => {
    it('renders the price tag and title properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const PriceTag = wrapper.find('PriceTag');
        // console.log(wrapper.debug());
        console.log(PriceTag.children().text);
        expect(PriceTag.children().text()).toBe('$50');
        expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });

  it('renders and image properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
});
```

## Render buttons out
```
// MORE CODE

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');
    console.log(buttonList);
  });
});
```

```
// MORE CODE

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    console.log(wrapper.debug());
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('AddToCart').exists()).toBe(true);
    expect(buttonList.find('DeleteItem').exists()).toBe(true);
    // expect(buttonList.find('AddToCart')).toBeTruthy();
    // console.log(buttonList.children());
  });
});
```

* That works but it is a bit brittle
* If you change the structure of your code, the tests will break
* Snapshot testing can improve on this

## Next - Snapshot testing
* This will greatly reduce the tests we write for our single items
