import {faker} from '@faker-js/faker';
import express from 'express';
import cors from 'cors';

const server = express();
const port = 4000;

server.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// middleware gets executed for every request to the server
server.use(function (req, res, next) {
  res.setHeader('charset', 'utf-8');
  res.setHeader('Content-Type', 'application/json');
  next();
});

server.get('/', (_, res) => {
  res.send({data: 'Server up and running!'});
});

server.get('/names', (req, res) => {
  const count = parseInt(req.query.count ?? 10);
  const names = [];
  for (let idx = 1; idx <= count; idx++) {
    names.push(faker.name.findName());
  }
  res.send({data: names.join(', ')});
});

server.get('/namesStartWith', (req, res) => {
  const count = req.query.count;
  const prefix = req.query.prefix;
  const names = [];
  for (let idx = 1; idx <= count; idx++) {
    names.push(faker.name.findName(prefix));
  }
  res.send({data: names.join(', ')});
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
