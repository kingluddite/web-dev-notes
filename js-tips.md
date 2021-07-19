# JavaScript tips
## How do I make sure my DOM is ready in vanilla JavaScript

```
// MORE CODE

document.addEventListener('DOMContentLoaded', () => {
  console.log('dom ready!!');
  console.log('test');
});

// MORE CODE
```

### JSON
```
{
    "portfolio" : [
        {
            "id" : 1,
            "projectname" : "WebSite",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        },
        {
            "id" : 2,
            "projectname" : "App",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        },
        {
            "id" : 3,
            "projectname" : "App",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        },
        {
            "id" : 4,
            "projectname" : "Web App",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        },
        {
            "id" : 5,
            "projectname" : "App",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        },
        {
            "id" : 6,
            "projectname" : "App",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        },
        {
            "id" : 7,
            "projectname" : "App",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        },
        {
            "id" : 8,
            "projectname" : "App",
            "desc" : "Molestias quam iure quia. Magni accusamus, itaque alias ipsa."
        }
    ]
}

```

### JavaScript
```
const loadPortfolio = () => {
  const url = 'data.json';

  fetch(url)
    .then((response) =>
      // console.log(response.json());
      response.json()
    )
    .then((data) => {
      let html = '';
      // console.log(data.portfolio);

      data.portfolio.forEach((item) => {
        html += `
          <div className="item">
              <img src="img/${item.id}.jpg" alt="${item.projectname}"/>
          <div className="content">
            <h3>${item.projectname}</h3>
            <p>${item.desc}</p>
          </div>
          </div>
      `;
      });
      // console.log(html);
      // after we build the template, we render the HTML

      document.querySelector('#portfolio').innerHTML = html;
    });
};

document.addEventListener('DOMContentLoaded', () => loadPortfolio());

```

### Style our dynamically generated HTML
#### CSS
```
// MORE CODE

/* portfolio */

.portfolio {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
}

.item:nth-child(3) {
  grid-row-end: span 2;
}

.portfolio h3::after {
  display: block;
  width: 2rem;
  height: 0.2rem;
  margin-top: 0.3rem;
  text-align: center;
  content: '';
  background-color: var(--primary);
}

// MORE CODE
```

