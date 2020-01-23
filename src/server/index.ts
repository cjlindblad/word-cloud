import express = require('express');

const app: express.Application = express();

app.get('/test', function(req, res) {
  res.json([
    {
      result: 'test data',
    },
  ]);
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
