# Click Handlers
We will add a button at the bottom of our list that a user can click to add more users

* When someone clicks on the button, we don't want to destroy the existing 20 records, we just want to add an additional 20 records

## Add an event handler in React
**tip** Whenever you want to add an event in **React**, think of the event you want to listen for (_example: `click`_), capitalize it (`Click`) and then add the word `on` before it (`onClick`) and then you pass that `prop` a **function** `onClick={someFunc}`

`EmployeeList.js`

```
// More code
const EmployeeList = (props) => {
  // props.employees => an array of employee objects

  return (
    <div>
      <div className="employee-list">
        {props.employees.map(employee =>
          <EmployeeDetail key={employee._id} employee={employee}/>)}
      </div>
      <button onClick={() => console.log('clicked') } 
        className="btn btn-primary">
        Load More...
      </button>
    </div>
  )
};
// More code
```

### Test in browser
Scroll to the bottom, click the button and you should see `clicked` appear and increment every time you click it

## Next Up
We will modify the click handler to load more records when it is clicked

