const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const agencySchema = new mongoose.Schema({
  agencyId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

agencySchema.plugin(findOrCreate);

const Agency = mongoose.model("agencies", agencySchema);

module.exports = Agency;
