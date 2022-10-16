import { showAlert, hideAlert } from "../static/js/alerts";
import axios from "axios";

export const logout = async () => {
  try {
    if (window.confirm("Do you want to log out") === true) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.get("/api/v1/users/logout", config);

      showAlert("error", `LOGOUT successfully!`);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      window.setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Error logging out! Try again.");
  }
};

export const protect = async () => {
  try {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        Authorization: `Bearer=${userToken}`,
      },
    };
    await axios.get("/api/v1/users/protect", config);
  } catch (err) {
    console.log(err);
    showAlert("error", "Route not protected");
  }
};
