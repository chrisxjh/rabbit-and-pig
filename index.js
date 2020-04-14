const express = require('express');
const bodyParser = require('body-parser');
const gomoku = require('./games/gomoku');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

const logger = (req, res, next) => {
  const requestData = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    queryParams: req.query,
  };

  console.log(JSON.stringify(requestData));

  next();
};

app.use(cors());
app.use(bodyParser.json());
// app.use(logger);

app.use('/gomoku', gomoku);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
