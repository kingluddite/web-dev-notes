# Inline Event Handlers
* **note** In the latest incarnation (2021) of React there was an abstraction layer added to events so keep that in mind for this part
* You can always open the type definition to see the current state of the documentation and what types are expected

```
const EventComponent: React.FC = () => {
  return (
    <div>
      <input onChange={(e) => console.log(e)} />
    </div>
  );
};

export default EventComponent;
```

* Bring into `index.js` to show it in UI

## Move from inline
* Instead of defining our event inline we will define it separately inside our component

```
const EventComponent: React.FC = () => {
  const onChange = (e) => {
    console.log(e);
  };
  return (
    <div>
      <input onChange={onChange} />
    </div>
  );
};

export default EventComponent;
```

* But now we get an error with our `e` defined as 'any' which we want to avoid in TS whenever we can
* But why no error when inline but an error when defined separately?
    - Because of the type inference system in TS
    - **remember** TS is always trying to determine the types of values blowing around your app
        + One tool it has to do that is the `type inference system`
* But if we define the function ahead of time, the `type inference system` is not applied
    - **GOOD TO KNOW** Type Inference is only applied if we define that event inline

```
const EventComponent: React.FC = () => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <div>
      <input onChange={onChange} />
      <div draggable onDragStart={onDragStart}>
        Drag Me
      </div>
    </div>
  );
};

export default EventComponent;
```

* <kbd>cmd</kbd> + click on `DragEvent` and you will be taken to all the event definition types
