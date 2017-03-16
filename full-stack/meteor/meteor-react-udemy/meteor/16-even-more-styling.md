# Even More Styling!

## Let's add Bootstrap
`$ meteor add twbs:bootstrap@3.3.6`

### View in browser
Once bootstrap is installed, our page instantaneously looks better. We look best in mobile because we are styling with mobile first and would have to add additinal responsive code for other devices

## Fix our bugs
We need to address the unique key error again. Remember how **MongoDB** added that `_id`? Well, that is a super unique key that we can use as our key!

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
    </div>
  )
};
// More code
```

### Next Challenge
We will add **Flexbox** to make our `EmployeeDetails` more flexible
