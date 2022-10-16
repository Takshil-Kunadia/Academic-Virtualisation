import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { showAlert, hideAlert } from "../static/js/alerts";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) history.push("/register");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [enrollid, setEnrollid] = useState();
  const [sem, setSem] = useState();
  const [year, setYear] = useState();
  const [course, setCourse] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/users/signup",
        {
          name,
          email,
          password,
          passwordConfirm,
          enrollid,
          sem,
          year,
          course,
        },
        config
      );

      showAlert("success", "Logged in successfully!");
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      window.setTimeout(() => {
        history.push("/home");
      }, 1500);
      //
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="wrapper" style={{ backgroundColor: "#1e2e3b" }}>
        <div className="inner">
          <div className="image-holder">
            {/* <img className="login-img" src="static/./../login.png" alt="Login Image" style="visibility: hidden;"> */}
          </div>
          <form className="special-className form--register">
            <h2 className="sign-up-heading">SIGN UP</h2>
            <div className="form-flex">
              <div className="form-wrapper">
                <input
                  className="form-control"
                  id="sg_name"
                  type="text"
                  placeholder="Full Name"
                  required="required"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-wrapper">
                <input
                  className="form-control"
                  id="sg_email"
                  type="email"
                  placeholder="Email"
                  required="required"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="zmdi zmdi zmdi-email"></i>
              </div>
              <div className="form-wrapper">
                <input
                  className="form-control"
                  id="sg_password"
                  type="password"
                  placeholder="Password"
                  required="required"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="zmdi zmdi zmdi-lock"></i>
              </div>
              <div className="form-wrapper">
                <input
                  className="form-control"
                  id="sg_conf_password"
                  type="password"
                  placeholder="Confirm Password"
                  required="required"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <i className="zmdi zmdi zmdi-lock"></i>
              </div>
              <div className="flex-two">
                <input
                  className="form-control"
                  id="sg_enrid"
                  type="number"
                  placeholder="Enrollment ID"
                  required="required"
                  onChange={(e) => setEnrollid(e.target.value)}
                />
                <select
                  className="form-control select-pad sg_course"
                  name="course"
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="Select Course">Select Course</option>
                  <option value="Automobile Engineering">
                    Automobile Engineering
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Computer Engineering">
                    Computer Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Electronics &amp; Communication Engineering">
                    Electronics &amp; Communication Engineering
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                </select>
              </div>
              <div className="flex-two">
                <select
                  className="form-control select-pad sg_sem"
                  name="sem"
                  onChange={(e) => setSem(e.target.value)}
                >
                  <option value="Select Sem">Select Sem</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                <select
                  className="form-control select-pad sg_year"
                  name="year"
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="Select Year">Select Year</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="Third">Third</option>
                  <option value="Fourth">Fourth</option>
                </select>
              </div>
              <div className="flex-side">
                <div className="form-check form-check-inline input-radio flex-radio">
                  <input
                    className="form-check-input"
                    id="student"
                    type="radio"
                    name="role"
                    value="student"
                    checked={true}
                  />
                  <label className="form-check-label" htmlFor="student">
                    Student
                  </label>
                </div>
                <div className="form-check form-check-inline input-radio1 flex-radio">
                  <input
                    className="form-check-input"
                    id="teacher"
                    type="radio"
                    name="role"
                    value="teacher"
                  />
                  <label className="form-check-label" htmlFor="teacher">
                    Teacher
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group container-login100-form-btn">
              <button id="btn-signup" type="submit" onClick={submitHandler}>
                Sign Up<i className="zmdi zmdi-arrow-right"></i>
              </button>
            </div>
            <div className="w-full text-center">
              <a className="text-dark" href="/">
                Already have an account? Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
