import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import fire from "./fire";

export const Context = React.createContext();

// const UserProvider = UserContext.Provider;
// const UserConsumer = UserContext.Co

export const UserProvider = (props) => {
  const [isAuth, setAuth] = useState("");

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("context true : " + user);
        setAuth("true");
      } else {
        console.log("context false : " + user);
        setAuth("false");
      }
    });
  }, [isAuth, setAuth]);

  return (
    <Context.Provider value={[isAuth, setAuth]}>
      {props.children}
    </Context.Provider>
  );
};
