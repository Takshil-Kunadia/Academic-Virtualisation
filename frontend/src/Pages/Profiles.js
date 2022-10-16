import React, { useState, useEffect, useLayoutEffect } from "react";
import Helmet from "react-helmet";
import pimg from "./../static/img/profile-icon.png";
import { showAlert, hideAlert } from "../static/js/alerts";
import { UserState } from "../Context/UserData";
import axios from "axios";
import { generate } from "./../static/js/all.js";
import { logout, protect } from "./logout.js";

const Profiles = () => {
  protect();
  function Logout() {
    logout();
  }

  const { user } = UserState();
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [isActive, setActive] = useState(false);

  let userId;

  const getAllUsers = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get("/api/v1/users/getUserProfiles", config);
    console.log(data.data.users);
    setUsers(data.data.users);
    setFilteredUser(data.data.users);
    // console.log(users);
  };

  const follow = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.patch(
        "/api/v1/users/follow",
        {
          userId,
        },
        config
      );

      showAlert("success", `Follow successfully!`);
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      //
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const unfollow = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.patch(
        "/api/v1/users/unfollow",
        {
          userId,
        },
        config
      );

      showAlert("success", `Unfollow successfully!`);
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      //
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  function openNav() {
    setActive(!isActive);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  function searchChangeHandler(e) {

    if(e.target.value ===""){
          setFilteredUser(user)
    }

    let searchedUser = []
    users.map((user)=>{
        if(user.name.toLowerCase().includes(e.target.value.toLowerCase())){
          searchedUser.push(user)
        }
    })

    setFilteredUser(searchedUser)
  }

  function applyFilterHandler(e) {
    e.preventDefault()
    let semVal = document.getElementById("sem").value
    let courseVal = document.getElementById("course").value


    let filteredUser = []

    users.map(user=>{
    let filterCondition = user.sem.toString() ===semVal && user.course === courseVal

        if (semVal === "none" && courseVal ==="none"){
          filterCondition = true
        }else if(semVal === "none"  && courseVal !=="none"){
          filterCondition = user.course === courseVal
        }else if(semVal !== "none"  && courseVal ==="none"){
          filterCondition = user.sem.toString() ===semVal
        }

      if(filterCondition){
          filteredUser.push(user)
        }
    })

    setFilteredUser(filteredUser)

  }
  useLayoutEffect(() => {
    // COMMUNITY MODAL
    const communityArticle = document.querySelectorAll(".community-article");
    const communityBtn = document.querySelectorAll(".community-child");
    const commModal = document.querySelectorAll(".community-modal");
    const overlay = document.querySelector(".overlay");
    const comCloseModal = document.querySelectorAll(".com-close-modal");

    for (let i = 0; i < communityArticle.length; i++) {
      const gradient = generate();
      communityArticle[i].style.background = gradient;
    }

    for (let i = 0; i < communityBtn.length; i++) {
      communityBtn[i].addEventListener("click", function () {
        commModal[i].classList.remove("hidden");
        overlay.classList.remove("hidden");
      });

      comCloseModal[i].addEventListener("click", function () {
        commModal[i].classList.add("hidden");
        overlay.classList.add("hidden");
      });
    }
  }, [users]);

  useEffect(() => {
    // FOLLOW AND UNFLLOW
    const followForm = document.querySelectorAll(".form--follow");
    const followBtn = document.querySelectorAll(".follow-btn");
    const unfollowForm = document.querySelectorAll(".form--unfollow");
    const unfollowBtn = document.querySelectorAll(".unfollow-btn");

    /** FOLLOW UNFOLLOW FUNCTION */
    for (let i = 0; i < followForm.length; i++) {
      followForm[i].addEventListener("submit", (e) => {
        e.preventDefault();
        userId = followBtn[i].attributes.value.value;

        follow(userId);
      });
    }

    for (let i = 0; i < unfollowForm.length; i++) {
      unfollowForm[i].addEventListener("submit", (e) => {
        e.preventDefault();
        userId = unfollowBtn[i].attributes.value.value;

        unfollow(userId);
      });
    }
    /** FOLLOW UNFOLLOW END */
  }, [users]);

  const displayUsers = () => {
    if (filteredUser.length > 0) {
      return filteredUser.reverse().map((user, index) => {
        return (
          <div key={index}>
            <button role="button" className="community-child">
              <article className="community-article">
                <div className="user-info">
                  <img src={pimg} alt="user-image" className="user-image" />
                  <p className="user-name">{user.name}</p>
                </div>
                <div className="college-info">
                  <strong className="college-title">College:</strong>
                  <p className="college-name">SCET</p>
                  <strong className="id-title">ID:</strong>
                  <p className="id-name">{user.enrollid}</p>
                  <strong className="course-title">Course:</strong>
                  <p className="course-name">{user.course}</p>

                  <strong className="sem-title">Semester:</strong>
                  <p className="sem-study">{user.sem}</p>
                  <strong className="interest-title">Interest In:</strong>
                  <p className="interest-info">{user.interest}</p>
                  <strong className="extra-title">Extra C A:</strong>
                  <p className="extra-info">{user.extra}</p>
                </div>
                <div className="community-followers">
                  <i className="ph-users-four"></i>
                  <div>
                    <span className="follower-count">
                      {user.followers.length}
                    </span>
                    Followers
                  </div>
                </div>
              </article>
            </button>
            <div className={`modal community-modal hidden`}>
              <button className="close-modal com-close-modal">
                <i className="ph-x"></i>
              </button>
              <div className="modal-body">
                <div className="user-info">
                  <img src={pimg} alt="user-image" className="user-image" />
                  <div>
                    <p className="user-name">{user.name}</p>
                    <p className="follower-span">
                      <strong>Followers: </strong>
                      <span className="follower-count">
                        {user.followers.length}
                      </span>
                    </p>
                  </div>

                  <div className="follow-unfollow-forms">
                    <form className="form--follow">
                      <button
                        className="follow-btn"
                        type="submit"
                        value={`${user._id}`}
                      >
                        <i className="ph-user-plus"></i>Follow Me
                      </button>
                    </form>
                    <form className="form--unfollow">
                      <button
                        className="unfollow-btn"
                        type="submit"
                        value={`${user._id}`}
                      >
                        <i className="ph-user-minus"></i>Unfollow
                      </button>
                    </form>
                  </div>
                </div>

                <div className="college-info">
                  <strong className="college-title">College:</strong>
                  <p className="college-name">SCET</p>
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
                  <strong className="interest-title">Interest In:</strong>
                  <p className="interest-info">{user.interest}</p>
                  <strong className="extra-title">Extra C A:</strong>
                  <p className="extra-info">{user.extra}</p>
                </div>

                <div className="links">
                  <a href="/notes" className="note-link" target="_blank">
                    <i className="ph-note"></i>
                    <span>
                      FIND MY
                      <br />
                      NOTES HERE
                    </span>
                  </a>
                  <a href="/home" className="messenger-link" target="_blank">
                    <i className="ph-chats"></i>
                    <span>ASK ME!</span>
                  </a>
                </div>
              </div>
            </div>
            <div className={`overlay hidden`}></div>
          </div>
        );
      });
    } else {
      return <h3>No Users Yet</h3>;
    }
  };

  return (
    <>
      <Helmet>
        <title>User Profiles</title>
      </Helmet>
      <div className={`container ${isActive ? "nav-open" : ""}`}>
        <section className="nav">
          <div className="nav-profile">
            <img className="user-image" src={pimg} alt="user-image" />
            <p className="user-name">{user && user.name}</p>
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
                <a id="menu-active" href="/profiles">
                  <i className="ph-user-list"></i>Profile's
                </a>
              </li>
              <li>
                <a href="/myprofile">
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
              onChange={searchChangeHandler}
              className="search-bar-input"
              type="text"
              placeholder="Search"
            />
            <button className="search-icon-btn">
              <i className="ph-magnifying-glass"></i>
            </button>
          </form>
          <button className="log-out" onClick={Logout}>
            LOG OUT
          </button>
        </section>
        <section className="main community-main">
          <form className="filter-tags">
            <select name="sem" id="sem">
              <option value="none">Sem</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <select name="course" id="course">
              <option value="none">Course</option>
              <option value="Automobile Engineering">
                Automobile Engineering
              </option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Electronics & Communication Engineering">
                Electronics & Communication Engineering
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
            </select>

            <button onClick={applyFilterHandler} className="apply-filter">Apply Filter</button>
          </form>
          <div className="community-result">{displayUsers()}</div>
        </section>
      </div>
    </>
  );
};

export default Profiles;