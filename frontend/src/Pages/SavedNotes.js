import React, { useState } from "react";
import Helmet from "react-helmet";
import nimg from "./../static/img/note-image.jpeg";
import pimg from "./../static/img/profile-icon.png";
import { logout, protect } from "./logout.js";

const SavedNotes = () => {
  protect();
  function Logout() {
    logout();
  }

  const [isActive, setActive] = useState(false);
  const [noteModal, setNoteModal] = useState(false);

  function openNav() {
    setActive(!isActive);
  }

  function openNoteInfo() {
    setNoteModal(true);
  }

  function closeNoteInfo() {
    setNoteModal(false);
  }
  return (
    <>
      <Helmet>
        <title>Saved Notes</title>
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
          <button className="log-out" onClick={Logout}>
            LOG OUT
          </button>
        </section>
        <div>
          <h3 class="title">
            <a href="/myprofile">MY PROFILE</a> &gt; SAVED NOTES
          </h3>
          <section class="main savednotes-main">
            <article>
              <figure class="note-img-hover">
                <img src={nimg} alt="Note Image" />
              </figure>
              <div class="note-info">
                <h3 class="note-name">Computer Engineering</h3>
                <p class="author-name">Author: Akhed Jenish</p>
                <p className="save-css">
                  Saves: <span className="save-count">0</span>
                </p>
                <button class="view-btn" onClick={openNoteInfo}>
                  VIEW
                </button>
              </div>
            </article>

            <div class={`modal savednotes-modal ${noteModal ? "" : "hidden"}`}>
              <button
                class="close-modal savednotes-close-modal"
                onClick={closeNoteInfo}
              >
                <i class="ph-x"></i>
              </button>
              <div class="modal-body">
                <div class="user-details">
                  <figure class="note-img-hover">
                    <img src={nimg} alt="Note Image" />
                  </figure>
                  <div class="note-info">
                    <h3 class="note-name">Computer Engineering</h3>
                    <p class="author-name">
                      <strong>Author:</strong> Akhed Jenish
                    </p>
                    <p class="posted-on">
                      <strong>Posted On:</strong> 2022-09-02
                    </p>
                    <p>
                      <strong>Saves:</strong> <span class="save-count">1</span>
                    </p>
                  </div>
                </div>
                <div class="description">
                  <h3>DESCRIPTION:</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo, deserunt eveniet cumque obcaecati assumenda mollitia
                    labore recusandae explicabo? Quia esse tempore architecto
                    labore reiciendis enim repellendus delectus pariatur error
                    laudantium. Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Magnam, repellat nemo. Esse, sint.
                    Quisquam, labore rerum. Officia, nulla, illo quibusdam magni
                    labore, similique eos quos magnam accusantium dolores ea
                    ipsum. Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Tempora nihil libero ex accusamus fugit aliquam neque
                    iusto cupiditate repellendus molestias odit porro
                    architecto, ipsum rerum delectus amet dolores quas! Ab.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam labore excepturi maiores eligendi enim mollitia quae
                    et similique. Dicta tenetur ducimus nam enim quo praesentium
                    tempora dolorem blanditiis maiores incidunt.
                  </p>
                </div>
                <div class="buttons">
                  <div></div>
                  <div className="save-download-btns">
                    <form class="form--unsave">
                      <input
                        class="noteUnsaveHidden"
                        type="hidden"
                        name="noteId"
                      />
                      <button class="save note-unsave" type="submit">
                        Unsave
                      </button>
                    </form>
                    <form class="form--download">
                      <a
                        class="note-download"
                        href="pdf"
                        download="download"
                        target="_blank"
                      >
                        Download
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class={`overlay ${noteModal ? "" : "hidden"}`}></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SavedNotes;
