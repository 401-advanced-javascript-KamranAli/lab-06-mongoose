require('dotenv').config();
require('./lib/models/connect')();
const express = require('express');
const app = express();
const Queen = require('./lib/models/queen');

app.use(express.json());

app.get('/api/queen', (req, res, next) => {
  Queen.find()
    .then(queen => {
      res.json(queen);
    })
    .catch(next);
});

app.get('/api/queen/:id', (req, res, next) => {
  Queen.findById(req.params.id)
    .then(queen => {
      res.json(queen);
    })
    .catch(next);
});

app.post('/api/queen', (req, res, next) => {
  Queen.create(req.body)
    .then(queen => {
      res.json(queen);
    })
    .catch(next);
});

app.put('/api/queen/:id', (req, res, next) => {
  Queen.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(queen => {
      res.json(queen);
    })
    .catch(next);
});

app.delete('/api/queen/:id', (req, res, next) => {
  Queen.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));