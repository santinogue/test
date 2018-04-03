const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const helpers = require('./helpers.js');

// Serve static files from the React app
app.use((req, res, next) => {
  express.static(path.join(__dirname, 'client/build'));

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Pass to next layer of middleware
  next();
});

// Put all API endpoints under '/api'
app.get('/api/items', (req, res) => {
  const queryParam = req.query.q;

  if (!queryParam) {
    res.json([]);
  } else {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${queryParam}`)
      .then(response => {
        response.json().then(json => {
          res.json({
            categories: helpers.getCategories(json.filters),
            items: helpers.getItems(json.results),
          });
        })
      })
  }
});

app.get('/api/items/:id', (req, res) => {
  const itemId = req.params.id;

  if (!itemId) {
    res.json({});
  } else {
    fetch(`https://api.mercadolibre.com/items/${itemId}`)
      .then(itemResponse => {
        itemResponse.json().then(itemJson => {
          fetch(`https://api.mercadolibre.com/items/${itemId}/description`)
            .then(descriptionResponse => {
              descriptionResponse.json().then(descriptionJson => {
                fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${itemJson.title}`)
                  .then(searchResponse => {
                    searchResponse.json().then(searchJson => {
                      res.json({
                        item: helpers.getItemDetails(
                          itemJson,
                          descriptionJson,
                          searchJson.filters,
                        )
                      })
                    })
                  })
              })
            })
        })
      })
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
