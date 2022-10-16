import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import pimg from "./../static/img/profile-icon.png";
import { showAlert, hideAlert } from "../static/js/alerts";
import { UserState } from "../Context/UserData";
import axios from "axios";
import { logout, protect } from "./logout.js";

const MyProfile = () => {
  const { user } = UserState();
  protect();
  function Logout() {
    logout();
  }

  const [isActive, setActive] = useState(false);
  const [updateInfoModal, setUpdateInfoModal] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [passwordCurrent, setPasswordCurrent] = useState();
  const [enrollid, setEnrollid] = useState();
  const [interest, setInterest] = useState();
  const [extra, setExtra] = useState();
  const [sem, setSem] = useState();
  const [year, setYear] = useState();
  const [course, setCourse] = useState();

  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    console.log(name, email, enrollid, sem, year, course, interest, extra);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.patch(
        "/api/v1/users/updateMe",
        {
          name,
          email,
          enrollid,
          sem,
          year,
          course,
          interest,
          extra,
        },
        config
      );
      console.log(data.data.user);

      showAlert("success", `Data updated successfully!`);
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      //
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const submitPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.patch(
        "/api/v1/users/updateMyPassword",
        {
          passwordCurrent,
          password,
          passwordConfirm,
        },
        config
      );
      showAlert("success", `Password updated successfully!`);
      document.getElementById("password-current").value = "";
      document.getElementById("password").value = "";
      document.getElementById("password-confirm").value = "";

      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      //
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  function openNav() {
    setActive(!isActive);
  }

  function openUpdateInfo() {
    setUpdateInfoModal(true);
  }

  function closeUpdateInfo() {
    setUpdateInfoModal(false);
  }

  function openPasswordInfo() {
    setUpdatePasswordModal(true);
  }

  function closePasswordInfo() {
    setUpdatePasswordModal(false);
  }

  const courseArray = [
    "Select Course",
    "Automobile Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Electrical Engineering",
    "Electronics & Communication Engineering",
    "Information Technology",
    "Mechanical Engineering",
  ];

  const semArray = ["Select Sem", "1", "2", "3", "4", "5", "6", "7", "8"];
  const yearArray = ["Select Year", "First", "Second", "Third", "Fourth"];

  if (user) {
    return (
      <>
        <Helmet>
          <title>My Profile</title>
        </Helmet>
        <div className={`container ${isActive ? "nav-open" : ""}`}>
          <section className="nav">
            <div className="nav-profile">
              <img className="user-image" src={pimg} alt="user-image" />
              <p className="user-name">{user.name}</p>
            </div>
            <hr className="dash" />
            <menu className="menu">
              <p className="menu-name">MENU</p>
              <ul className="menu-items">
                <li>
                  <a href="/home">
                    <i className="ph-house"></i>Home
                  </a>
                </li>
                <li>
                  <a className="link1-im" href="#">
                    <i className="ph-telegram-logo"></i>Instant Messenger
                  </a>
                  <a className="link2-im" href="#">
                    <i className="ph-telegram-logo"></i>Instant
                    <br />
                    Messenger
                  </a>
                </li>
                <li>
                  <a href="/notes">
                    <i className="ph-note-pencil"></i>Notes
                  </a>
                </li>
                <li>
                  <a href="/community">
                    <i className="ph-users-three"></i>Community
                  </a>
                </li>
                <li>
                  <a href="/profiles">
                    <i className="ph-user-list"></i>Profile's
                  </a>
                </li>
                <li>
                  <a id="menu-active" href="/myprofile">
                    <i className="ph-user"></i>My Profile
                  </a>
                </li>
                <li className="nav-logout">
                  <a className="log-out" onClick={Logout}>
                    <i className="ph-sign-out"></i>LOG OUT
                  </a>
                </li>
              </ul>
            </menu>
            <a className="contact-us-btn contact-link" href="/contact">
              Contact Us
            </a>
          </section>
          <section className="search">
            <button className="nav-btn" onClick={openNav}>
              <i className="ph-list" name="open-nav"></i>
              <i className="ph-x" name="close-nav"></i>
            </button>
            <form className="search-bar" autoComplete="off">
              <input
                className="search-bar-input"
                type="text"
                placeholder="Search"
              />
              <button className="search-icon-btn">
                <i className="ph-magnifying-glass"></i>
              </button>
            </form>
            <button className="log-out" onClick={Logout}>LOG OUT</button>
          </section>
          <section className="main myprofile-main">
            <h3 className="title">MY PROFILE</h3>
            <div className="user-info">
              <img src={pimg} alt="user-image" className="user-image" />
              <p className="user-name">{user.name}</p>
              <div className="edit-div">
                <button
                  className="edit-info edit-info--details"
                  onClick={openUpdateInfo}
                >
                  Edit Details
                </button>
                <button
                  className="edit-info edit-info--pass"
                  onClick={openPasswordInfo}
                >
                  Update Password
                </button>
              </div>
            </div>
            <div className="college-info">
              <strong className="college-title">College:</strong>
              <p className="college-name">
                Sarvajanink College of Engineering & Technology
              </p>
              <strong className="course-title">Course:</strong>
              <p className="course-name">{user.course}</p>
              <strong className="email-title">Email:</strong>
              <p className="email-id">{user.email}</p>
              <strong className="year-title">Year:</strong>
              <p className="year-define">{user.year}</p>
              <strong className="id-title">ID:</strong>
              <p className="id-name">{user.enrollid}</p>
              <strong className="sem-title">Semester:</strong>
              <p className="sem-study">{user.sem}</p>
            </div>
            <div className="sub-menu">
              <a href="/mynotes" className="submenu-link">
                <i className="ph-note"></i>My Notes
              </a>
              <a href="/savednotes" className="submenu-link">
                <i className="ph-bookmark-simple"></i>Saved Notes
              </a>
              <a className="submenu-link sp-flex" href="/followers">
                <p className="num-followers">{user.followers.length}</p>
                <p className="sp-css">Followers</p>
              </a>
              <a className="submenu-link sp-flex" href="/following">
                <p className="num-following">{user.following.length}</p>
                <p className="sp-csss">Following</p>
              </a>
            </div>
            <div className="preferences">
              <h2 className="preferences-heading">PREFERENCES</h2>
              <div className="preferences-grid">
                <strong className="interest-title">Interest In:</strong>
                <p className="interest-info">{user.interest}</p>
                <strong className="extra-title">
                  Extra Curricular Activities:
                </strong>
                <p className="extra-info">{user.extra}</p>
              </div>
            </div>
          </section>
        </div>
        <div
          className={`modal myprofile-modal ${updateInfoModal ? "" : "hidden"}`}
        >
          <div className="form-header">
            <h1>Edit Profile Details</h1>
          </div>

          <form className="edit-grid form--update">
            <label htmlFor="Name">
              Full Name<sup>*</sup>:
            </label>
            <input
              type="text"
              placeholder="Full Name"
              name="lastname"
              id="edit-name"
              required
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">
              Your Email<sup>*</sup>:
            </label>
            <input
              type="email"
              placeholder="abcd@xyz.com"
              name="email"
              id="edit-email"
              required
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="Enrollment">
              Enrollment No<sup>*</sup>:
            </label>
            <input
              type="number"
              placeholder="Ex: 190420107001"
              id="edit-enrollment"
              name="enrollment"
              required
              defaultValue={user.enrollid}
              onChange={(e) => setEnrollid(e.target.value)}
            />

            <label htmlFor="College">
              College<sup>*</sup>:
            </label>
            <select name="college" id="college">
              <option defaultValue="01">
                Sarvajanik College of Engineering and Technology
              </option>
            </select>

            <label htmlFor="Course">
              Course<sup>*</sup>:
            </label>
            <select
              name="course"
              id="course"
              className="edit-course"
              defaultValue={user.course}
              onChange={(e) => setCourse(e.target.value)}
            >
              {courseArray.map((value, index) => {
                return (
                  <option defaultValue={value} key={index}>
                    {value}
                  </option>
                );
              })}
            </select>

            <label htmlFor="semester">
              Semester<sup>*</sup>:
            </label>
            <select
              name="sem"
              id="sem"
              className="edit-sem"
              defaultValue={user.sem}
              onChange={(e) => setSem(e.target.value)}
            >
              {semArray.map((value, index) => {
                return (
                  <option defaultValue={value} key={index}>
                    {value}
                  </option>
                );
              })}
            </select>

            <label htmlFor="Year">
              Year<sup>*</sup>:
            </label>
            <select
              name="year"
              id="year"
              className="edit-year"
              defaultValue={user.year}
              onChange={(e) => setYear(e.target.value)}
            >
              {yearArray.map((value, index) => {
                return (
                  <option defaultValue={value} key={index}>
                    {value}
                  </option>
                );
              })}
            </select>

            <label htmlFor="interest">Interest In:</label>
            <input
              type="text"
              name="interest"
              id="edit-interest"
              placeholder="Ex: (Data Science, Pyhton, Circuits)"
              defaultValue={user.interest}
              onChange={(e) => setInterest(e.target.value)}
            />

            <label htmlFor="extra_curr">Extra Curricular Activities</label>
            <input
              type="text"
              id="edit-extra_curr"
              name="extra_curr"
              placeholder="Ex: (Dancing, Singing, Piano)"
              defaultValue={user.extra}
              onChange={(e) => setExtra(e.target.value)}
            />

            <button className="submit" onClick={submitUpdateHandler}>
              Submit
            </button>
          </form>
        </div>
        <div
          className={`overlay edit-overlay ${updateInfoModal ? "" : "hidden"}`}
          onClick={closeUpdateInfo}
        ></div>

        <div
          className={`modal myprofile-modal password-modal ${
            updatePasswordModal ? "" : "hidden"
          }`}
        >
          <div className="form-header">
            <h1>Edit Password</h1>
          </div>

          <form className="edit-grid form--pass">
            <label htmlFor="currentpassword">
              Current Password<sup>*</sup>:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="currentpassword"
              id="password-current"
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />

            <label htmlFor="password">
              Password<sup>*</sup>:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">
              Confirm Password<sup>*</sup>:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
              id="password-confirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            <button
              className="submit btn--save-password"
              type="submit"
              onClick={submitPasswordHandler}
            >
              Submit
            </button>
          </form>
        </div>
        <div
          className={`overlay edit-overlay ${
            updatePasswordModal ? "" : "hidden"
          }`}
          onClick={closePasswordInfo}
        ></div>
      </>
    );
  }
};

export default MyProfile;
