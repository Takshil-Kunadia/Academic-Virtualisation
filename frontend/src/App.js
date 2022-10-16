// import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Home from "./Pages/Home.js";
import Instant from "./Pages/Instant.js";
import Notes from "./Pages/Notes.js";
import Community from "./Pages/Community.js";
import Profiles from "./Pages/Profiles.js";
import MyProfile from "./Pages/MyProfile.js";
import SavedNotes from "./Pages/SavedNotes.js";
import MyNotes from "./Pages/MyNotes.js";
import Followers from "./Pages/Followers.js";
import Following from "./Pages/Following.js";
import Contact from "./Pages/Contact.js";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/home" component={Home} exact />
      <Route path="/instant" component={Instant} exact />
      <Route path="/notes" component={Notes} exact />
      <Route path="/community" component={Community} exact />
      <Route path="/profiles" component={Profiles} exact />
      <Route path="/myprofile" component={MyProfile} exact />
      <Route path="/savednotes" component={SavedNotes} exact />
      <Route path="/mynotes" component={MyNotes} exact />
      <Route path="/followers" component={Followers} exact />
      <Route path="/following" component={Following} exact />
      <Route path="/contact" component={Contact} exact />
    </div>
  );
}

export default App;
