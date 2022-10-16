let valueCheck = [];

export const generate = function (gradient) {
  let x;

  const colorValue = [
    ["#ffa8a8", "#ff6b6b", "#c92a2a"],
    ["#faa2c1", "#f06595", "#a61e4d"],
    ["#e599f7", "#cc5de8", "#862e9c"],
    ["#b197fc", "#845ef7", "#5f3dc4"],
    ["#91a7ff", "#5c7cfa", "#364fc7"],
    ["#74c0fc", "#339af0", "#1864ab"],
    ["#66d9e8", "#22b8cf", "#0b7285"],
    ["#63e6be", "#20c997", "#087f5b"],
    ["#8ce99a", "#51cf66", "#2b8a3e"],
    ["#c0eb75", "#94d82d", "#5c940d"],
    ["#ffe066", "#fcc419", "#e67700"],
    ["#ffc078", "#ff922b", "#d9480f"],
  ];

  do {
    x = Math.floor(Math.random() * colorValue.length);
    if (valueCheck.length === colorValue.length) {
      valueCheck = [];
      break;
    }
  } while (valueCheck.includes(x));

  valueCheck.push(x);

  let [colorOne, colorTwo, colorThree] = [
    colorValue[x][0],
    colorValue[x][1],
    colorValue[x][2],
  ];

  gradient = `linear-gradient(to right bottom, ${colorOne} 0%, ${colorTwo} 50%, ${colorThree} 100%)`;

  return gradient;
};

/** FOR MOBILE NAVIGATION */
// const btnNav = document.querySelector(".nav-btn");
// const container = document.querySelector(".container");

// console.log(btnNav);

// if (btnNav) {
//   console.log("navigation");
//   btnNav.addEventListener("click", function () {
//     console.log("hello");
//     container.classList.toggle("nav-open");
//   });
// }
/** MOBILE NAV END */

/** FOR MODAL AND OVERLAY */
// const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
// const btnCloseModal = document.querySelector(".close-modal");
// const btnOpenModal = document.querySelectorAll(".view-btn");

// const openModal = function () {
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };

// const closeModal = function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// };

// for (let i = 0; i < btnOpenModal.length; i++) {
//   btnOpenModal[i].addEventListener("click", openModal);
// }

// if (btnCloseModal) {
//   btnCloseModal.addEventListener("click", closeModal);
// }

// document.addEventListener("keydown", function (event) {
//   if (event.key === "Escape" && !modal.classList.contains("hidden")) {
//     closeModal();
//   }
// });
/** MODAL OVERLAY END */

/** EDIT BUTTON */
// const passwordModal = document.querySelector(".password-modal");

// const passwordModalOpen = function () {
//   passwordModal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };

// const passwordModalClose = function () {
//   passwordModal.classList.add("hidden");
//   overlay.classList.add("hidden");
// };

// const editDetails = document.querySelector(".edit-info--details");
// const editOverlay = document.querySelector(".edit-overlay");

// if (editDetails) {
//   editDetails.addEventListener("click", openModal);
//   editOverlay.addEventListener("click", closeModal);
// }

// const editPass = document.querySelector(".edit-info--pass");

// if (editPass) {
//   editPass.addEventListener("click", passwordModalOpen);
//   editOverlay.addEventListener("click", passwordModalClose);
// }
/** EDIT END */

/** MYUPLOADS AND UPLOAD BUTTONS */
// const myUploads = document.querySelector(".my-uploads");
// const upload = document.querySelector(".upload");
// const uploadedNotes = document.querySelector(".uploaded-notes");
// const uploadNote = document.querySelector(".upload-note");

// if (myUploads) {
//   myUploads.addEventListener("click", function () {
//     myUploads.classList.add("upload-active");
//     upload.classList.remove("upload-active");
//     upload.classList.add("upload-hover");

//     uploadedNotes.classList.remove("hide");
//     uploadNote.classList.add("hide");
//   });
// }

// if (upload) {
//   upload.addEventListener("click", function () {
//     upload.classList.add("upload-active");
//     myUploads.classList.remove("upload-active");
//     myUploads.classList.add("upload-hover");

//     uploadNote.classList.remove("hide");
//     uploadedNotes.classList.add("hide");
//   });
// }
/** MYUPLOADS AND UPLOAD BUTTONS END*/

/** SAVE AND UNSAVE */
// const save = document.querySelector(".save");
// const saveCountText = document.querySelector(".save-count");
// let saveCount;

// if (saveCountText) {
//   saveCount = Number(saveCountText.textContent);
// }

// if (save) {
//   save.addEventListener("click", function () {
//     if (save.classList.contains("note-save")) {
//       save.classList.remove("note-save");
//       save.classList.add("note-unsave");
//       saveCount++;

//       saveCountText.innerHTML = saveCount;
//       save.textContent = "Unsave";
//       //
//     } else if (save.classList.contains("note-unsave")) {
//       save.classList.remove("note-unsave");
//       save.classList.add("note-save");
//       saveCount--;

//       saveCountText.innerHTML = saveCount;
//       save.textContent = "Save";
//     }
//   });
// }
/** SAVE UNSAVE END */

/** FOLLOW UNFOLLOW */
// const followBtn = document.querySelectorAll(".follow-btn");

// if (followerCountText) {

// }

// if (followBtn) {
//   for (let i = 0; i < followBtn.length; i++) {
//     followBtn[i].addEventListener("click", function () {
//       if (followBtn[i].classList.contains("follow-btn")) {
//         followBtn[i].classList.remove("follow-btn");
//         followBtn[i].classList.add("unfollow-btn");

//         followBtn[i].innerHTML = `<i class="ph-user-minus"></i>Unfollow`;
//         //
//       } else if (followBtn[i].classList.contains("unfollow-btn")) {
//         followBtn[i].classList.remove("unfollow-btn");
//         followBtn[i].classList.add("follow-btn");

//         followBtn[i].innerHTML = `<i class="ph-user-plus"></i>Follow Me`;
//       }
//     });
//   }
// }
/** FOLLOW UNFOLLOW END */

/** MINOR CHNAGE IN CSS FOR FILE UPLOAD */
// const fileUploadInput = document.getElementById("pdf");
// const divForLabel = document.querySelector(".div-for-label");

// if (fileUploadInput) {
//   fileUploadInput.addEventListener("mouseenter", function () {
//     divForLabel.style.background = `linear-gradient(45deg, #fc8778, #ff1540)`;
//   });

//   fileUploadInput.addEventListener("mouseleave", function () {
//     divForLabel.style.background = `linear-gradient(45deg, #ef8172, #ff4668)`;
//   });
// }

// const label = document.querySelector(".custom-file-upload");
// if (fileUploadInput) {
//   fileUploadInput.addEventListener("change", function (e) {
//     var fileName = "";

//     fileName = e.target.value.split("\\");

//     if (fileName[0] !== "") label.innerHTML = fileName[2];
//     else label.innerHTML = `<i class="ph-upload-simple"></i>Upload Note File`;
//   });
// }
/** MINOR CHANGE END */

/** COMMUNITY BUTTON */
// const communityBtn = document.querySelectorAll(".community-child");
// const commModal = document.querySelectorAll(".community-modal");
// const comCloseModal = document.querySelectorAll(".com-close-modal");

// if (communityBtn) {
//   for (let i = 0; i < communityBtn.length; i++) {
//     communityBtn[i].addEventListener("click", function () {
//       commModal[i].classList.remove("hidden");
//       overlay.classList.remove("hidden");
//     });

//     comCloseModal[i].addEventListener("click", function () {
//       commModal[i].classList.add("hidden");
//       overlay.classList.add("hidden");
//     });
//   }
// }
// ${profileModal ? "" : "hidden"}
/** COMMUNITY BUTTON END */

/** MYNOTE BUTTON */
// const mynoteBtn = document.querySelectorAll(".mynote-btn");
// const mynoteModal = document.querySelectorAll(".mynote-modal");
// const mynoteCloseModal = document.querySelectorAll(".mynote-close-modal");

// if (mynoteBtn) {
//   for (let i = 0; i < mynoteBtn.length; i++) {
//     mynoteBtn[i].addEventListener("click", function () {
//       mynoteModal[i].classList.remove("hidden");
//       overlay.classList.remove("hidden");
//     });

//     mynoteCloseModal[i].addEventListener("click", function () {
//       mynoteModal[i].classList.add("hidden");
//       overlay.classList.add("hidden");
//     });
//   }
// }
/** MYNOTE BUTTON END */

/** MYNOTE BUTTON */
// const noteBtn = document.querySelectorAll(".note-btn");
// const noteModal = document.querySelectorAll(".note-modal");
// const noteCloseModal = document.querySelectorAll(".note-close-modal");

// if (noteBtn) {
//   for (let i = 0; i < noteBtn.length; i++) {
//     noteBtn[i].addEventListener("click", function () {
//       noteModal[i].classList.remove("hidden");
//       overlay.classList.remove("hidden");
//     });

//     noteCloseModal[i].addEventListener("click", function () {
//       noteModal[i].classList.add("hidden");
//       overlay.classList.add("hidden");
//     });
//   }
// }
/** MYNOTE BUTTON END */

/** SAVEDNOTES BUTTON */
// const savednoteBtn = document.querySelectorAll(".savednotes-btn");
// const savednoteModal = document.querySelectorAll(".savednotes-modal");
// const savednoteCloseModal = document.querySelectorAll(
//   ".savednotes-close-modal"
// );

// if (savednoteBtn) {
//   for (let i = 0; i < savednoteBtn.length; i++) {
//     savednoteBtn[i].addEventListener("click", function () {
//       savednoteModal[i].classList.remove("hidden");
//       overlay.classList.remove("hidden");
//     });

//     savednoteCloseModal[i].addEventListener("click", function () {
//       savednoteModal[i].classList.add("hidden");
//       overlay.classList.add("hidden");
//     });
//   }
// }
/** SAVEDNOTES BUTTON END */

/** RANDOM GRADIENT GENERATOR */
// const communityArticle = document.querySelectorAll(".community-article");

// for (let i = 0; i < communityArticle.length; i++) {
//   const gradient = generate();
//   communityArticle[i].style.background = gradient;
// }
/** GRADIENT END */
