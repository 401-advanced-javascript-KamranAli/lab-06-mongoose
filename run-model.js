require('dotenv').config();
const connect = require('./lib/models/connect');
const mongoose = require('mongoose');

connect();

const Queen = require('./lib/models/queen');

Queen.findByIdAndUpdate(

  { yearsActive: 32 },
  { new: true }
)
  .then(queen => {
    console.log(cats);
  })
  .then(() => {
    mongoose.disconnect();
  })