const mongoose = requie('mongoose');
const { Schema } = mongoose;

const queenSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  yearsActive: {
    type: Number,
    required: true,
    min: 32,
    max: 50
  },
  frontMan: {
    type: Boolean,
    default: true
  },
  alias: {
    type: Object,
    alias1: {
      type: String,
      required: true
    },
    alias2: {
      type: String,
      required: false
    }
  },
  media: [{
    type: String,
    enum: ['tv', 'internet', 'albums']
  }],

})

module.exports = mongoose.model('Queen', queenSchema);