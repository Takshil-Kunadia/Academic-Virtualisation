import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext();

const UserData = ({ children }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserData;
