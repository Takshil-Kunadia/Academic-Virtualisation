import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import pimg from "./../static/img/profile-icon.png";
import { showAlert, hideAlert } from "../static/js/alerts";
import { UserState } from "../Context/UserData";
import axios from "axios";
import { logout, protect } from "./logout.js";

const Home = () => {
  protect();
  const { user } = UserState();

  const [isActive, setActive] = useState(false);

  function openNav() {
    setActive(!isActive);
  }

  function Logout() {
    logout();
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
                <a id="menu-active" href="/home">
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
          <button className="log-out" onClick={Logout}>
            LOG OUT
          </button>
        </section>
        <section className="main home-main">
          <h1 className="home-heading">WELCOME BACK,</h1>
          <h2 className="home-sub-heading">
            Hope You have An Inspiring Day!!🤗
          </h2>
        </section>
      </div>
    </>
  );
};

export default Home;
