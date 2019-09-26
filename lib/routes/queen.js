// eslint-disable-next-line new-cap
const router = require('express').Router();
const Queen = require('../models/queen');

router
  .post('/', (req, res, next) => {
    Queen.create(req.body)
      .then(queen => res.json(queen))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Queen.findById(req.params.id)
      .then(queen => res.json(queen))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Queen.find()
      .then(queen => res.json(queen))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Queen.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(queen => res.json(queen))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Queen.findByIdAndRemove(req.params.id)
      .then(queen => res.json(queen))
      .catch(next);
  });
module.exports = router;