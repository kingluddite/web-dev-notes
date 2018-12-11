# Updating Permissions on the Server
* Our clickable area for checkbox is small
* Let's make it bigger to improve the usability of our site

`components/styles/Table.js`

```
// MORE CODE

  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 10px 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      background: red;
    }
  }

// MORE CODE
```

* View in browser and see checkboxes all labels have red bg

## Display full boxes for checkboxes
* Give the label a `display: block`

```
th {
  border-bottom: 1px solid ${props => props.theme.offWhite};
  border-right: 1px solid ${props => props.theme.offWhite};
  padding: 10px 5px;
  position: relative;
  &:last-child {
    border-right: none;
    width: 150px;
    button {
      width: 100%;
    }
  }
  label {
    background: red;
    display: block;
  }
}
```

* Still not working
* We need to match the label `id` with the input `id`

`Permissions.js`

```
// MORE CODE

          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input 
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={permissions.includes(permission)}
                value={permission}
                onChange={this.handlePermissionChange}
              />
            </label>
          </td>

// MORE CODE
```

* Check checkboxes from anywhere in box and it will be clickable
* Remove the red bg as you no longer need it
* **note** If you have a label `for` attribute that matches the `id` attribute for an `id` then you can check the label and the checkbox will fill in in the associated input

## Paddding Issue and other minor cosmetic adjustments
* The `td` has padding

`Table.js`

```
// MORE CODE

  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      display: block;
      padding: 10px 5px;
    }
  }

// MORE CODE
```

# Now we'll code the backend for our site




