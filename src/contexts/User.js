import React, { useState, createContext } from "react";

const UserContext = createContext({
  user: { userIdx: null, identification: null, token: null },
  dispatch: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({ userIdx, identification, token }) => {
    setUser({ userIdx, identification, token });
  };
  const value = { user, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
