# Labeling of Units

`WeatherList`

```
const name = cityData.city.name;
const temps = cityData.list.map(weather => weather.main.temp);
const pressures = cityData.list.map(weather => weather.main.pressure);
const humidities = cityData.list.map(weather => weather.main.humidity);
```

And we generate our other Charts

```
return (
  <tr key={name}>
    <td>{name}</td>
    <td><Chart data={temps} color="orange" /></td>
    <td><Chart data={pressures} color="red" /></td>
    <td><Chart data={humidities} color="blue" /></td>
  </tr>
)
```

### Adding numeric values to our temperatures

Stop at 2:50 of labeling units video


