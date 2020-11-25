const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApkSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  version: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  }
});

const Apk = mongoose.model('Apk', ApkSchema);
module.exports = Apk;