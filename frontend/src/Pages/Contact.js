import React, { useState } from "react";
import Helmet from "react-helmet";
import pimg from "./../static/img/profile-icon.png";
import { UserState } from "../Context/UserData";
import { logout, protect } from "./logout.js";

const Contact = () => {
  protect();
  function Logout() {
    logout();
  }

  const [isActive, setActive] = useState(false);
  console.log(isActive);
  function openNav() {
    setActive(!isActive);
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={`container ${isActive ? "nav-open" : ""}`}>
        <section className="nav">
          <div className="nav-profile">
            <img className="user-image" src={pimg} alt="user-image" />
            <p className="user-name">Akhed Jenish</p>
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
                <a href="/myprofile">
                  <i className="ph-user"></i>My Profile
                </a>
              </li>
              <li className="nav-logout">
                <a className="log-out">
                  <i className="ph-sign-out" onClick={Logout}></i>LOG OUT
                </a>
              </li>
            </ul>
          </menu>
          <a
            className="contact-us-btn contact-link contact-active"
            href="/contact"
          >
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
          <button className="log-out" onclick={Logout}>
            LOG OUT
          </button>
        </section>
        <section class="main contact-main">
          <div class="contactinfo">
            <div>
              <h2>Contact Info</h2>
              <ul class="info">
                <li>
                  <span>
                    <i class="ph-map-pin-line"></i>
                  </span>
                  <span>
                    Dr, R K Desai Marg, <br />
                    Opp. Mission Hospital, <br />
                    Athwalines, Surat, <br />
                    Gujarat 395001
                  </span>
                </li>
                <li>
                  <span>
                    <i class="ph-envelope-open"></i>
                  </span>
                  <span>academic.virtual@gmail.com</span>
                </li>
                <li>
                  <span>
                    <i class="ph-phone-call"></i>
                  </span>
                  <span>0261 224 0146</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="contactForm">
            <h2>Send a Message</h2>
            <div class="formBox">
              <div class="inputBox w50">
                <input type="text" name="" required />
                <span>First Name</span>
              </div>
              <div class="inputBox w50">
                <input type="text" name="" required />
                <span>Last Name</span>
              </div>
              <div class="inputBox w50">
                <input type="email" name="" required />
                <span>Email</span>
              </div>
              <div class="inputBox w100">
                <textarea name="" required></textarea>
                <span>Write your message here...</span>
              </div>
              <div class="inputBox w100">
                <input type="submit" value="Send" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
