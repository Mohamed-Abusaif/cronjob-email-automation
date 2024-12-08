const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema(
  {
    text: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    
  },
  { timestamps: false }
);

const Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;
