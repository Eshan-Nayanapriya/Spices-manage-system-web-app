const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  }
});

const DeliveryInfo = mongoose.model("DeliveryInformation", AddressSchema);

module.exports = DeliveryInfo;
