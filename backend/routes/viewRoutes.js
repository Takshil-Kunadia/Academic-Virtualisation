const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getLoginForm);
router.get(
  "/register",
  authController.isLoggedIn,
  viewsController.getRegisterForm
);

router.get("/home", authController.protect, viewsController.home);
router.get(
  "/community",
  authController.protect,
  viewsController.getUserProfiles
);
router.get("/myprofile", authController.protect, viewsController.myProfile);
router.get("/notes", authController.protect, viewsController.notes);
router.get("/savednotes", authController.protect, viewsController.savedNotes);
router.get("/mynotes", authController.protect, viewsController.myNotes);
router.get("/contact", authController.protect, viewsController.contact);
router.get("/followers", authController.protect, viewsController.followers);
router.get("/following", authController.protect, viewsController.following);

module.exports = router;
