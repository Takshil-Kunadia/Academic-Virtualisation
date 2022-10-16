import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import "./static/css/all.css";
import "./static/css/login.css";
import "./static/css/icons.css";
import "./static/css/material-design-iconic-font/css/material-design-iconic-font.min.css";
import "./static/css/query.css";
import { BrowserRouter } from "react-router-dom";
import UserData from "./Context/UserData.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider resetCSS={false}>
    <BrowserRouter>
      <UserData>
        <App />
      </UserData>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
