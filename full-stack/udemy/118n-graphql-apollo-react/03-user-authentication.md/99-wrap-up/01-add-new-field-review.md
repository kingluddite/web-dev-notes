# Add new field (review)
* We want a drop down

## This will be a homework assignment
### Add a new field that will enable user to enter a category for the cologne
* The default category will be `not selected`

```
<label htmlFor="category">Category of Cologne</label>
<select
  name="category"
  onChange={this.handleChange}
  value={category}
>
  <option value="Floral">Floral</option>
  <option value="Oriental">Oriental</option>
  <option value="Woody">Woody</option>
  <option value="Fresh">Fresh</option>
  <option value="Not Selected">Not Selected</option>
</select>
```

