const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    }

});

const UserInfo = mongoose.model("UserInfo", UserSchema);

module.exports = UserInfo;