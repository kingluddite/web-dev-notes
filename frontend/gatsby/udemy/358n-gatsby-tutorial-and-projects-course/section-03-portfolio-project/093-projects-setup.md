# Projects Setup
* You can pass a prop that has not been defined to a component
    - We pass `showLink` and by default it will be true
    - You can verify this in the React Dev Tools

`pages/index.js`

```
// MORE CODE

    <Layout>
      <Hero />
      <Services />
      <Jobs />
      <Projects projects={projects} title="featured projets" showLink />
    </Layout>
// MORE CODE
``` 
