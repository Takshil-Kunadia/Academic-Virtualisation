// import "@babel/polyfill";
import axios from "axios";
// import { login, logout } from "./login";
// import { showAlert } from "./alerts.cjs";
// import { updateSettings } from "./updateSettings";

// LOGIN
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelectorAll(".log-out");
// UPDATE INFO AND PASSWORD
const userDataForm = document.querySelector(".form--update");
const userPasswordForm = document.querySelector(".form--pass");
// REGISTER USER
const registerForm = document.querySelector(".form--register");
// FOLLOW AND UNFLLOW
const followForm = document.querySelectorAll(".form--follow");
const followBtn = document.querySelectorAll(".follow-btn");
const unfollowForm = document.querySelectorAll(".form--unfollow");
const unfollowBtn = document.querySelectorAll(".unfollow-btn");
// NOTE UPLOAD
const noteUploadForm = document.querySelector(".form--note");
// SAVE AND UNSAVE
const saveForm = document.querySelectorAll(".form--save");
const saveBtn = document.querySelectorAll(".note-save");
const noteSaveHidden = document.querySelectorAll(".noteSaveHidden");
const unsaveForm = document.querySelectorAll(".form--unsave");
const unsaveBtn = document.querySelectorAll(".note-unsave");
const noteUnsaveHidden = document.querySelectorAll(".noteUnsaveHidden");
// DELETE NOTE
const deleteNoteForm = document.querySelectorAll(".form--delete");
const deleteNoteBtn = document.querySelectorAll(".note-delete");

/** ----------------------------------ALL FUNCTIONS (LOGIN,LOGOUT,PASSCHANGE,INFOCHANGE) ----------------------------------*/
/** LOGIN FUNCTION*/
const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3500/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        window.open("/home");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** LOGIN END*/

/** REGISTER FUNCTION*/
const register = async (
  name,
  email,
  password,
  passwordConfirm,
  enrollid,
  course,
  sem,
  year
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3500/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
        enrollid,
        course,
        sem,
        year,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        window.open("/home");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** REGISTER END*/

/** LOGOUT FUNCTION*/
const logout = async (req, res) => {
  try {
    if (window.confirm("Do you want to log out") === true) {
      const resp = await axios({
        method: "GET",
        url: "http://127.0.0.1:3500/api/v1/users/logout",
      });
      if ((resp.data.status = "success")) {
        showAlert("error", "Logged Out successfully!");
        window.location.reload(true);
      }
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Error logging out! Try again.");
  }
};
/** LOGOUT END*/

/** UPDATE PASS OR INFO */
const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "http://127.0.0.1:3500/api/v1/users/updateMyPassword"
        : "http://127.0.0.1:3500/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
      window.window.location.reload(true);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** UPDATE END */

/** NOTE UPLOAD FUNCTION */
const noteUploadData = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3500/api/v1/notes/uploadNote",
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", "Note Uploaded successfully!");
      window.setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    window.setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  }
};
/** NOTE UPLOAD END */

/** SAVE */
const save = async (userId, noteId) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3500/api/v1/users/save",
      data: {
        userId,
        noteId,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", `Saved Successfully`);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** SAVE END*/

/** UNSAVE */
const unsave = async (userId, noteId) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3500/api/v1/users/unsave",
      data: {
        userId,
        noteId,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", `Unsave Successfully`);
      window.setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** UNSAVE END*/

/** FOLLOW */
const follow = async (userId) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3500/api/v1/users/follow",
      data: {
        userId,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", `Followed Successfully`);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** FOLLOW END*/

/** UNFOLLOW */
const unfollow = async (userId) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3500/api/v1/users/unfollow",
      data: {
        userId,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", `Unfollowed Successfully`);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** UNFOLLOW END*/
const deleteNote = async (noteId) => {
  try {
    if (window.confirm("Do you want to delete this note?") === true) {
      const res = await axios({
        method: "DELETE",
        url: "http://127.0.0.1:3500/api/v1/notes/deleteNote",
        data: {
          noteId,
        },
      });

      if (res.status === 204) {
        showAlert("error", `Deleted Successfully`);
        window.setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      }
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
/** DELETE */

/** DELETE END */
/** ---------------------------------- ALL FUNCTIONS END ----------------------------------*/

/**---------------------------------- ALL FORM EVENT ----------------------------------*/
/** LOGIN FUNCTION*/
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("si_email").value;
    const password = document.getElementById("si_password").value;
    login(email, password);
  });
}
/** LOGIN END*/

/** REGISTER FUNCTION*/
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("sg_name").value;
    const email = document.getElementById("sg_email").value;
    const password = document.getElementById("sg_password").value;
    const passwordConfirm = document.getElementById("sg_conf_password").value;
    const enrollid = document.getElementById("sg_enrid").value;
    const course = document.querySelector(".sg_course").value;
    const sem = document.querySelector(".sg_sem").value;
    const year = document.querySelector(".sg_year").value;

    register(
      name,
      email,
      password,
      passwordConfirm,
      enrollid,
      course,
      sem,
      year
    );
  });
}
/** REGISTER FUNCTION*/

/** LOGOUT FUNCTION*/
if (logOutBtn) {
  for (let i = 0; i < logOutBtn.length; i++) {
    logOutBtn[i].addEventListener("click", logout);
  }
}
/** LOGOUT END*/

/** FOLLOW UNFOLLOW FUNCTION */
for (let i = 0; i < followForm.length; i++) {
  followForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = followBtn[i].attributes.value.value;

    follow(userId);
  });
}

for (let i = 0; i < unfollowForm.length; i++) {
  unfollowForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = unfollowBtn[i].attributes.value.value;

    unfollow(userId);
  });
}
/** FOLLOW UNFOLLOW END */

/** SAVE UNSAVE FUNCTION */
for (let i = 0; i < saveForm.length; i++) {
  saveForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = saveBtn[i].attributes.value.value;
    const noteId = noteSaveHidden[i].attributes.value.value;
    save(userId, noteId);
  });
}

for (let i = 0; i < unsaveForm.length; i++) {
  unsaveForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = unsaveBtn[i].attributes.value.value;
    const noteId = noteUnsaveHidden[i].attributes.value.value;
    unsave(userId, noteId);
  });
}
/** SAVE UNSAVE END */

/** UPDATE DATA FUNCTION */
if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-data").textContent = "Updating...";

    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    const enrollid = document.getElementById("edit-enrollment").value;
    const course = document.querySelector(".edit-course").value;
    const sem = document.querySelector(".edit-sem").value;
    const year = document.querySelector(".edit-year").value;
    const interest = document.getElementById("edit-interest").value;
    const extra = document.getElementById("edit-extra_curr").value;
    updateSettings(
      { name, email, enrollid, course, sem, year, interest, extra },
      "data"
    );

    document.querySelector(".btn--save-data").textContent = "Submit";
  });
/** UPDATE DATA END*/

/** CHANGE PASSWORD FUNCTION*/
if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );

    document.querySelector(".btn--save-password").textContent = "Submit";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
/** CHANGE PASSWORD END*/

/** NOTE UPLOAD */
if (noteUploadForm) {
  noteUploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", document.getElementById("up-title").value);
    form.append("description", document.getElementById("up-desc").value);
    form.append("pdf", document.getElementById("pdf").files[0]);

    noteUploadData(form);
  });
}
/** NOTE UPLOAD END*/

/** DELETE */
for (let i = 0; i < deleteNoteForm.length; i++) {
  deleteNoteForm[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const noteId = deleteNoteBtn[i].attributes.value.value;

    deleteNote(noteId);
  });
}
/** DELETE END */
/**----------------------------------FORM END ----------------------------------*/

/** ----------------------------------SHOW ALERT ----------------------------------*/
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
/**---------------------------------- SHOW ALERT END ----------------------------------*/
