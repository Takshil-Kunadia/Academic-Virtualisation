import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { showAlert, hideAlert } from "../static/js/alerts";
import axios from "axios";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line
const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const goToRegister = () => {
    history.push("/register");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data.token);
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
        <title>Login</title>
      </Helmet>
      <div className="wrapper" style={{ backgroundColor: "#1e2e3b" }}>
        <div className="inner">
          <div className="image-holder"></div>
          <form className="form--login">
            <h2 className="sign-up-heading">SIGN IN</h2>
            <h4 className="sign-up-heading">A Smarter Way To Connect</h4>
            <div className="form-flex w100">
              <div className="form-wrapper">
                <input
                  className="form-control"
                  id="si_email"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="zmdi zmdi zmdi-email"></i>
              </div>
              <div className="form-wrapper">
                <input
                  className="form-control"
                  id="si_password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="zmdi zmdi zmdi-lock"></i>
              </div>
            </div>
            <div className="form-group container-login100-form-btn">
              <button id="btn-signin" type="submit" onClick={submitHandler}>
                Sign In<i className="zmdi zmdi-arrow-right"></i>
              </button>
            </div>
            <div className="w-full text-center">
              <a className="text-dark" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="w-full text-center" style={{ marginTop: "17%" }}>
              <a className="text-dark" onClick={goToRegister}>
                Don&apos;t have an account? Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
