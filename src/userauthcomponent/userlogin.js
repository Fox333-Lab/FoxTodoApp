import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fire from "../fire";
import { Context } from "../context";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";

const UserLogin = () => {
  const authValues = {
    email: "",
    password: "",
  };
  const [isAuth, setAuth] = useContext(Context);
  var [values, setValues] = useState(authValues);
  const onInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onLogin = (e) => {
    e.preventDefault();
    if (values.email !== "" && values.password !== "") {
      fire
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          if (user) {
            console.log("login success");
            setAuth("true");
          }
        })
        .catch((err) => {
          console.log("login err : ", err);
          setAuth("false");
        });
      console.log(values);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      {isAuth === "" ? (
        <div
          className="col-md-1 text-center text-muted offset-md-5"
          style={{ marginTop: "100px" }}
        >
          <FontAwesomeIcon icon="spinner" spin size="2x" />
        </div>
      ) : isAuth === "false" ? (
        <div className="col-md-5 offset-md-3">
          <form autoComplete="off" onSubmit={onLogin}>
            <div className="form-group input-group mt-5">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <FontAwesomeIcon icon="envelope" />
                </div>
              </div>
              <input
                placeholder="email"
                name="email"
                type="email"
                className="form-control"
                onChange={onInputChange}
              />
            </div>
            <div className="form-group input-group mt-1">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <FontAwesomeIcon icon="lock" />
                </div>
              </div>
              <input
                placeholder="password"
                name="password"
                type="password"
                className="form-control"
                onChange={onInputChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="form-control btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Redirect to="/todo" />
      )}
    </>
  );
};

export default UserLogin;
