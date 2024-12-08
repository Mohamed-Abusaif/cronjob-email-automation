const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notes = require("./NotesModel");

const EmailSchema = new Schema(
  {
    week: {
      type: String,
      required: true,
    },
    emailDate: {
      type: Date,
      required: true,
    },
    notes: [Notes],
  },
  { timestamps: false }
);

const Email = mongoose.model("Email", EmailSchema);
module.exports = Email;
