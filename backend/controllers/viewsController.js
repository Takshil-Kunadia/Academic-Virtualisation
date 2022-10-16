const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { append } = require("express/lib/response");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const Note = require("../models/noteModel");

exports.followers = catchAsync(async (req, res, next) => {
  let data_array = [];
  let data, id;

  for (const follow of req.user.followers) {
    id = new mongoose.Types.ObjectId(follow);
    data = await User.findOne({ _id: id });
    data_array.push(data);
  }

  res.status(200).render("followers", {
    title: "Followers",
    data_array,
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

  res.status(200).render("following", {
    title: "Following",
    data_array,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

exports.getRegisterForm = catchAsync(async (req, res, next) => {
  res.status(200).render("register", {
    title: "Register",
  });
});

exports.getUserProfiles = catchAsync(async (req, res, next) => {
  // 1) Get user data from collection
  const users = await User.find();
  console.log(users);
  // 2) Build template
  // 3) Render that template using user data from 1)
  res.status(200).render("community", {
    title: "Community",
    users,
  });
});

exports.home = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    title: "Home",
  });
});

exports.myProfile = catchAsync(async (req, res, next) => {
  res.status(200).render("myprofile", {
    title: "My Profile",
  });
});

exports.notes = catchAsync(async (req, res, next) => {
  let data_array = [];
  let aname, data, user;

  const notes = await Note.find();
  await User.findById();
  for (let note of notes) {
    user = await User.findById(note.user);

    aname = {
      aname: user.name,
    };

    data = Object.assign(note, aname);
    data_array.push(data);
  }

  res.status(200).render("notes", {
    title: "Notes",
    data_array,
  });
});

exports.myNotes = catchAsync(async (req, res, next) => {
  let data_array = [];
  let aname, data;

  const notes = await Note.find();
  for (let note of notes) {
    if (String(note.user) === String(req.user._id)) {
      aname = {
        aname: req.user.name,
      };

      data = Object.assign(note, aname);
      data_array.push(data);
    }
  }

  res.status(200).render("mynotes", {
    title: "My Notes",
    data_array,
  });
});

exports.savedNotes = catchAsync(async (req, res, next) => {
  let data_array = [];
  let data, id, user;
  // console.log(req.user);
  for (const note of req.user.saveNote) {
    id = new mongoose.Types.ObjectId(note);

    data = await Note.findOne({ _id: id });

    if (data === null) {
      // to remove deleted note from saveNote array
      const query = {
        _id: req.user._id,
        saveNote: { $elemMatch: { $eq: note } },
      };

      const update = {
        $pull: { saveNote: note },
      };

      await User.updateOne(query, update);
      //
    } else {
      user = await User.findById(data.user);

      aname = {
        aname: user.name,
      };

      data = Object.assign(data, aname);
      data_array.push(data);
    }
  }

  res.status(200).render("savednotes", {
    title: "Saved Notes",
    data_array,
  });
});

exports.contact = catchAsync(async (req, res, next) => {
  res.status(200).render("contact", {
    title: "Contact Us",
  });
});
