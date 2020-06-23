# The Grauniad Reader

[![Netlify Status](https://api.netlify.com/api/v1/badges/d0bc99da-7297-4cc0-b548-ac7479f6c5f9/deploy-status)](https://app.netlify.com/sites/kind-wilson-1fb857/deploys)

## A React App built to ingest the [Guardian Open Platform API](https://open-platform.theguardian.com/) and return snippets of articles matching search queries (with "Read More" links to full content on the Guardian website). Project also uses Bootstrap-like styles and FontAwesome.

This project was developed following as much React best-practice and style as possible given my current understanding and appreciation of JavaScript and React. This includes use of ES6+ (const/let, async-await, arrow functions, classes, destructuring), declaration of propTypes and defaultProps, use of functional and class based components as appropriate, use of local env variables, etc.

### Components implemented include:

- Articles + Article Items (grid)
- Navbar (static)
- Spinner (when loading search results)
- Searchbar (with Clear)

### In progress:

- Alerts
- React Router
- Article tags + details

### Potentially:

- Hooks, Context and Reducers
- Stylesheets redone (currently using Bootstrap cloned styles)
