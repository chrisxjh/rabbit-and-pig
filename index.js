const express = require('express');
const bodyParser = require('body-parser');
const gomoku = require('./games/gomoku');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  const requestData = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    queryParams: req.query,
  };

  console.log(JSON.stringify(requestData));

  next();
});

app.use('/gomoku', gomoku);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
