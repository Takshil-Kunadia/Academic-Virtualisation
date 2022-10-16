const multer = require("multer");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const Note = require("./../models/noteModel");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/pdf");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf" && req.body.status !== "error") {
    cb(null, true);
  } else {
    cb(new AppError("Not an pdf! Please upload only pdf.", 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 50000000 },
});

exports.uploadPdf = upload.single("pdf");

exports.uploadNoteInfo = catchAsync(async (req, res, next) => {
  const note = Note({
    title: req.body.title,
    description: req.body.description,
    user: req.user._id,
    pdf: req.file.filename,
  });
  await note.save();

  res.status(200).json({
    status: "success",
    data: note,
  });
});

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const note = await Note.find();

  res.status(200).json({
    status: "success",
    data: note,
  });
});

exports.deleteOneNote = catchAsync(async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.body.noteId);
  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
