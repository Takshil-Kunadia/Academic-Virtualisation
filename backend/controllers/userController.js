const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const ObjectId = require("mongodb").ObjectId;
const Note = require("./../models/noteModel");
const mongoose = require("mongoose");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUserProfiles = catchAsync(async (req, res, next) => {
  // 1) Get user data from collection
  const users = await User.find();
  // 2) Build template
  // 3) Render that template using user data from 1)
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.followers = catchAsync(async (req, res, next) => {
  let data_array = [];
  let data, id;

  for (const follow of req.user.followers) {
    id = new mongoose.Types.ObjectId(follow);
    data = await User.findOne({ _id: id });
    data_array.push(data);
  }

  res.status(200).json({
    status: "success",
    data: data_array,
  });
});

exports.following = catchAsync(async (req, res, next) => {
  let data_array = [];
  let data, id;

  for (const follow of req.user.following) {
    id = new mongoose.Types.ObjectId(follow);
    data = await User.findOne({ _id: id });
    data_array.push(data);
  }

  res.status(200).json({
    status: "success",
    data: data_array,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "name",
    "course",
    "sem",
    "year",
    "interest",
    "extra"
  );

  if (
    (req.body.sem === "1" || req.body.sem === "2") &&
    req.body.year !== "First"
  ) {
    return next(new AppError("Please choose valid year as per semester", 401));
  }

  if (
    (req.body.sem === "3" || req.body.sem === "4") &&
    req.body.year !== "Second"
  ) {
    return next(new AppError("Please choose valid year as per semester", 401));
  }

  if (
    (req.body.sem === "5" || req.body.sem === "6") &&
    req.body.year !== "Third"
  ) {
    return next(new AppError("Please choose valid year as per semester", 401));
  }

  if (
    (req.body.sem === "7" || req.body.sem === "8") &&
    req.body.year !== "Fourth"
  ) {
    return next(new AppError("Please choose valid year as per semester", 401));
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

exports.save = catchAsync(async (req, res, next) => {
  try {
    const id = new ObjectId(req.body.userId);

    // check if the id is a valid one
    if (!ObjectId.isValid(req.body.userId)) {
      return next(new AppError("Invalid ID", 404));
    }

    // check if your id doesn't match the id of the user you want to follow
    if (String(req.user._id) === String(id)) {
      return next(new AppError("You can't save your own note", 400));
    }

    // add note id to logedin users saveNote array
    const query = {
      _id: req.user._id,
      saveNote: { $not: { $elemMatch: { $eq: req.body.noteId } } },
    };

    const update = {
      $addToSet: { saveNote: req.body.noteId },
    };

    const updated = await User.updateOne(query, update);
    // console.log(updated);
    // add user id of who have saved the note
    const secondQuery = {
      _id: req.body.noteId,
      saveNoteTotal: { $not: { $elemMatch: { $eq: req.user._id } } },
    };

    const secondUpdate = {
      $addToSet: { saveNoteTotal: req.user._id },
    };

    const secondUpdated = await Note.updateOne(secondQuery, secondUpdate);
    // console.log(secondUpdated);
    res.status(200).json({
      status: "success",
      data: {
        note: secondUpdated,
      },
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

exports.unsave = catchAsync(async (req, res, next) => {
  try {
    const id = req.body.userId;

    // check if the id is a valid one
    if (!ObjectId.isValid(id)) {
      return next(new AppError("Invalid ID", 404));
    }

    // remove the id of the user you want to unfollow from following array
    const query = {
      _id: req.user._id,
      saveNote: { $elemMatch: { $eq: req.body.noteId } },
    };

    const update = {
      $pull: { saveNote: req.body.noteId },
    };

    const updated = await User.updateOne(query, update);

    // remove your id from the followers array of the user you want to unfollow
    const secondQuery = {
      _id: req.body.noteId,
      saveNoteTotal: { $elemMatch: { $eq: req.user._id } },
    };

    const secondUpdate = {
      $pull: { saveNoteTotal: req.user._id },
    };

    const secondUpdated = await Note.updateOne(secondQuery, secondUpdate);

    res.status(200).json({
      status: "success",
      data: {
        note: secondUpdated,
      },
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

exports.follow = catchAsync(async (req, res, next) => {
  try {
    const id = new ObjectId(req.body.userId);
    // check if the id is a valid one
    if (!ObjectId.isValid(req.body.userId)) {
      return next(new AppError("Invalid ID", 404));
    }

    // check if your id doesn't match the id of the user you want to follow
    if (String(req.user._id) === String(id)) {
      return next(new AppError("You can't follow yourself", 400));
    }

    // add the id of the user you want to follow in following array
    const query = {
      _id: req.user._id,
      following: { $not: { $elemMatch: { $eq: id } } },
    };

    const update = {
      $addToSet: { following: id },
    };

    const updated = await User.updateOne(query, update);
    // add your id to the followers array of the user you want to follow
    const secondQuery = {
      _id: id,
      followers: { $not: { $elemMatch: { $eq: req.user._id } } },
    };

    const secondUpdate = {
      $addToSet: { followers: req.user._id },
    };

    const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

    console.log(secondUpdated);
    if (!updated || !secondUpdated) {
      return next(new AppError("Unable to follow that user", 404));
    }

    const user = await User.findOne(req.user._id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

exports.unfollow = catchAsync(async (req, res, next) => {
  try {
    const id = req.body.userId;

    // check if the id is a valid one
    if (!ObjectId.isValid(id)) {
      return next(new AppError("Invalid ID", 404));
    }

    // check if your id doesn't match the id of the user you want to unfollow
    if (String(req.user._id) === id) {
      return next(new AppError("You can't unfollow yourself", 400));
    }

    // remove the id of the user you want to unfollow from following array
    const query = {
      _id: req.user._id,
      following: { $elemMatch: { $eq: id } },
    };

    const update = {
      $pull: { following: id },
    };

    const updated = await User.updateOne(query, update);

    // remove your id from the followers array of the user you want to unfollow
    const secondQuery = {
      _id: id,
      followers: { $elemMatch: { $eq: req.user._id } },
    };

    const secondUpdate = {
      $pull: { followers: req.user._id },
    };

    const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

    if (!updated || !secondUpdated) {
      return next(new AppError("Unable to unfollow that user", 404));
    }

    const user = await User.findOne(req.user._id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
