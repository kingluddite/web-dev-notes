# Provide default text for user without genalogies
`UserGenealogies.js`

```
// MORE CODE

return (
      <ul>
        <h3>Your Genealogies</h3>
        {!data.getUserGenealogies.length && (
          <p>
            <strong>You have not added any genealogies yet</strong>
          </p>
        )}

// MORE CODE
```

## Test
* Remove all genealogies and you'll get warning message that you have no genealogies
