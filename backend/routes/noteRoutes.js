const express = require("express");
const authController = require("./../controllers/authController");
const noteController = require("./../controllers/noteController");

const router = express.Router();
router.use(authController.protect);

router.post(
  "/uploadNote",
  noteController.uploadPdf,
  noteController.uploadNoteInfo
);

router.get("/", noteController.getAllNotes);
router.delete("/deleteNote", noteController.deleteOneNote);

module.exports = router;
