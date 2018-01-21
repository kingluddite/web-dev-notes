# Filtering By Dates
* We will now use the range picker from react-dates library
* [airbnb react dates](https://github.com/airbnb/react-dates)
* [link to rangepicker demo](http://airbnb.io/react-dates/?selectedKind=PresetDateRangePicker&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)
    - Enables us to pick a start date and end date

`filters.js`

```js
import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
};
// MORE CODE
```

* Change the default date for start date and end date
    - We want start date to be at beginning of current month
        + moment **Start of Time** [docs](http://momentjs.com/docs/#/manipulating/start-of/)
        + moment **End of Time** [docs](http://momentjs.com/docs/#/manipulating/end-of/)
    - We want the end date to be at the end of the current month

## Wire up date range picker
