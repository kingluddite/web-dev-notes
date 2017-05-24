# Rendering Notes Part 2
Exercise

* Write a test case that renders `NoteListHeader`
* Pass in a `spy` as the **Meteor.call** `prop`
    - Make sure `spy` gets called with correct argument
* Then you click the button (_simulate that click_)

```
// create test file

// import test modules

// if on client, setup describe block

// it should call meteorCall on click

// 1. create spy
// 2. render component with spy
// 3. simulate button click
// 4. assert spy was called correctly
```

<details>
  <summary>Solution</summary>
```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader', function() {
    it('should call meteorCall on click', function() {
      const spy = expect.createSpy();
      const wrapper = mount( <NoteListHeader meteorCall={spy} />);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalledWith('notes.insert');
    });
  });
}
```

Check and the NoteListHeader 'should call meteorCall on click' test should pass
</details>

## Git it done
"The best time to plant a tree was 15 years ago but the next best time is now"

* But the git we are using is from our boilerplate
* `$ git remote -v`
* We don't want to push up to our boilerplate meteor/react repo because we have a new app and we need a new repo

## Remove a Git origin
`$ git remote remove origin`

Test with `$ git remote -v` (it will be empty which means you removed your boilerplate github origin repo from this folder - it is still on github but our folder now knows nothing about it)

## Hub create (homebrew install)
`$ hub create notes-meteor-react`

## Commit Early and often
`$ git status`

* Shows us a ton of stuff we added
* Not committing early and often negates the value of version control
* If you just have two commits in your repo it is hard to see how your code evolved over time
* What came first? How did the code base change?
`$ git add .`

`$ git commit -m 'add meteor methods and basic react components'`

`$ git push`

Check out the code on Github in your repo and you will scroll and see all the changes and this is proof how difficult limited commits destroys the readability of your version control
