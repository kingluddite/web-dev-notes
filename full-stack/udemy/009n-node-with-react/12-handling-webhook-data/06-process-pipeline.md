# Processing the Pipeline
![filter diagram](https://i.imgur.com/r8C0PWR.png)

* Above we configure a response we would get from our Sendgrid webhook
* 4 different events that the Sendgrid API would send to us
* We only care about 1 event (green)
    - One has a URL we don't care about
    - One has an event of bounce
    - The other one is a complete duplicate of the one we had before

![steps to filter data](https://i.imgur.com/bv7siWn.png)

![more steps filter data](https://i.imgur.com/YYh3vaC.png)

![even more steps filter data](https://i.imgur.com/yMtvXRV.png)

## Walk through the above steps
1. We receive a list of events
2. We will run a map function over the list of events
    * The map function takes an iterator function
    * That iterator will have some logic that will process every element in the original array
    * It will make a change to every element
    * It will return a value
    * After that process is done for every element in the array
    * The map function returns a new array with all the new values inside it
3. We first look at the event's URL value
    * We will just extract the route portion of the URL
        - example `/api/surveys/5971/yes`
4. We then try to extract:
    * The survey ID
    * The choice
    * `{ surveyId: '1212', choice: 'yes' }`
5. After we extract that data
    * We'll return just the:
        - survey ID
        - email
        - choice
    * All records that don't have all 3, we will discard
6. Then we have `undefined` for events we don't care about
    * But we still have duplicate events
    * **remember** How map functions work
        - A map function runs for every element and whatever you return is placed into a single array
        - And if we discard elements we don't care about (no survey ID, no choice, wrong event) then those items will be listed as `undefined` inside our new array from the map function
7. We will strip out all records that are `undefined`
8. Remove records with duplicate email and surveyId
