const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    enrollid: {
      type: String,
      required: true,
      unique: true,
      minlength: [12, "Enrollment length must be of 12 and Unique"],
      maxlength: [12, "Enrollment length must be of 12 and Unique"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (el) {
          const str = el.split("@");
          return str[1] === "scet.ac.in";
        },
        message: "Not SCET ID",
      },
    },
    college: String,
    photo: String,
    course: {
      type: String,
      required: [true, "Please provide a valid course"],
      enum: [
        "Automobile Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Engineering",
        "Electrical Engineering",
        "Electronics & Communication Engineering",
        "Information Technology",
        "Mechanical Engineering",
      ],
    },
    year: {
      type: String,
      required: [true, "Please provide year of study"],
      enum: ["First", "Second", "Third", "Fourth"],
    },
    sem: {
      type: Number,
      required: [true, "Please provide sem of study"],
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    interest: String,
    extra: String,
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          console.log(this.password);
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    saveNote: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
