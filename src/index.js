import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createNewUser, getUserById } from './core/users';
import gameRouter from './games';
import { SUCCESS, NOT_AUTHORIZED } from './common/codes';

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

const validateUser = (req, res, next) => {
  const { userId } = req.query;
  const user = getUserById(userId);

  if (user === null) {
    res.send({ code: NOT_AUTHORIZED });
    return;
  }

  req.user = user;
  next();
};

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/game', validateUser, gameRouter);

app.use('/login', validateUser, (req, res) => {
  res.send({ code: SUCCESS, userId: req.user.getId() });
});

app.post('/signup', (req, res) => {
  const user = createNewUser();
  res.send({ code: SUCCESS, userId: user.getId() });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
