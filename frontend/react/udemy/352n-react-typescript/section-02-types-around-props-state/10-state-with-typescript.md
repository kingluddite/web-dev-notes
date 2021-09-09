# State with TypeScript
* We don't need angle brackets if we do not expect to receive any props

`GuestList.tsx`

```
const GuestList: React.FC = () => {
  return <div>Guest List</div>;
};

export default GuestList;
```

`index.tsx`

```
import ReactDOM from 'react-dom';
import GuestList from './state/GuestList';

const App = () => {
  return (
    <div>
      <GuestList />
      <h1>hello</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## Now we make our component use state
```
import { useState } from 'react';

const GuestList: React.FC = () => {
  const [name, setName] = useState('');

  return (
    <div>
      <h3>Guest List</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>Add Guest</button>
    </div>
  );
};

export default GuestList;
```

## And when we click add the guests into an array
* We need to tell TS that our guests will hold an array of strings using `<string[]>` as seen below:

```
import { useState } from 'react';

const GuestList: React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<string[]>([]);

  const onClick = () => {
    setName('');
    setGuests([...guests, name]);
  };

  return (
    <div>
      <h3>Guest List</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClick}>Add Guest</button>
    </div>
  );
};

export default GuestList;
```

* Test and we can see in RDTs that the guest gets added into the guests array

## Map out list of guests
```
import { useState } from 'react';

const GuestList: React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<string[]>([]);

  const onClick = () => {
    setName('');
    setGuests([...guests, name]);
  };

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {guests.map((guest, i) => {
          return <li key={`guest-${i}`}>{guest}</li>;
        })}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClick}>Add Guest</button>
    </div>
  );
};

export default GuestList;
```

## Type Unions
```
import { useState } from 'react';

const users = [
  { name: 'Manny', age: 30 },
  { name: 'Mo', age: 30 },
  { name: 'Jack', age: 30 },
];

const UserSearch: React.FC = () => {
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


