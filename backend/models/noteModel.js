const mongoose = require("mongoose");
const validator = require("validator");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Title"],
      trim: true,
      maxlength: [40, "A title should be atmost 40 characters"],
      minlength: [5, "A title should be atleat 5 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      trim: true,
      maxlength: [1000, "A description should be atmost 1000 characters"],
      minlength: [30, "A description should be atleast 30 characters"],
    },
    author: String,
    postedOn: {
      type: Date,
      default: Date.now(),
    },
    pdf: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    saveNoteTotal: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
