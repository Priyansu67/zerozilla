const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

let clientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  agencyId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
});

clientSchema.plugin(findOrCreate);

const Client = mongoose.model("clients", clientSchema);

module.exports = Client;
