const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserEmailsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emails: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const UEmail = mongoose.model("UEmail", UserEmailsSchema);
module.exports = UEmail;
