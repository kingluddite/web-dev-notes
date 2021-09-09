# Apply Types to Refs
```
// MORE CODE

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>();
// MORE CODE
```

* <kbd>cmd</kbd> + click `HTMLInputElement` to see all the interfaces for every HTML element
    - It will open a window inside a window in VS code but you can click on the file URL and it will open up the file
    - Search for your form element to get the correct interface you need
* We still have an error
    - You need to account for `null` as your ref might not be referencing an element on the rendered page
    - And we give our ref a default value of `null`
```
// MORE CODE

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
// MORE CODE
```

```
import { useState, useRef } from 'react';

const users = [
  { name: 'Manny', age: 30 },
  { name: 'Mo', age: 30 },
  { name: 'Jack', age: 30 },
];

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  const onClick = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    setUser(foundUser);
  };
  return (
    <div>
      User Search
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClick}>Find User</button>
      <div>
        {user && user.name}
        {user && user.age}
      </div>
    </div>
  );
};

export default UserSearch;
```

## Let's make sure our ref isn't null and then wire it and show that the input is focused as soon as the component loads
```
import { useState, useRef, useEffect } from 'react';

const users = [
  { name: 'Manny', age: 30 },
  { name: 'Mo', age: 30 },
  { name: 'Jack', age: 30 },
];

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, []);

// MORE CODE
```

* Or a better way

```
// MORE CODE

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);
// MORE CODE
```

* Others mentioned option chaining

```
// MORE CODE


useEffect(() => {     inputRef.current?.focus(); }, []);
// MORE CODE
```


