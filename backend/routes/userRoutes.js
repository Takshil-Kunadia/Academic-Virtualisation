const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/follow", userController.follow);
router.patch("/unfollow", userController.unfollow);
router.patch("/save", userController.save);
router.patch("/unsave", userController.unsave);
router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);
router.route("/").get(userController.getAllUsers);

// FOR VIEW
router.get("/getUserProfiles", userController.getUserProfiles);
router.get("/followers", userController.followers);
router.get("/following", userController.following);
router.get("/protect", authController.protect);
// router.use(authController.restrictTo("admin"));
router.route("/").post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
