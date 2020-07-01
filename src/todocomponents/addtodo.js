import React, { useState, useEffect, useContext } from "react";
import fire from "../fire";
import TodoList from "./todolist";
import { Context } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

const AddTodo = () => {
  var [todo, setTodo] = useState("");
  var [recordCount, setRecordCount] = useState(0);
  var [pending, setPending] = useState(0);
  const [isAuth, setAuth] = useContext(Context);

  const todoCounter = () => {
    // const unsubscribe = fire
    //   .firestore()
    //   .collection("todolist")
    //   .onSnapshot((snapshot) => {
    //     console.log("Current records: ", snapshot.docs.length);
    //     setRecordCount(snapshot.docs.length);
    //     setPending({
    //       ...snapshot.docs.map((doc) => doc.data()),
    //     });
    //     console.log("snaps : " + pending);
    //   });

    const unsubscribe = fire
      .firestore()
      .collection("todolist")
      .onSnapshot((snapshot) => {
        console.log(
          "Current data 1: ",
          snapshot.docs.map((doc) => doc.data())
        );
        setRecordCount(snapshot.docs.length);
        fire
          .firestore()
          .collection("todolist")
          .where("status", "==", false)
          .get()
          .then((qs) => {
            console.log("snaps 1 : ", qs.size);
            setPending(qs.size);
          })
          .catch((err) => {
            console.log("err snaps : " + err);
          });
        console.log("snaps : ");
      });

    return () => unsubscribe();
  };
  const addTodoHandler = (e) => {
    e.preventDefault();
    if (todo === "") {
      alert("enter a todo to add");
    } else {
      fire
        .firestore()
        .collection("todolist")
        .doc(`item_${Date.now().toString()}`)
        .set({
          id: Date.now().toString(),
          description: todo,
          status: false,
        })
        .then(() => {
          console.log("todo added success");
          setTodo("");
        })
        .catch((err) => {
          console.log("failed todo addition");
        });
      console.log("date : " + Date.now().toString());
    }
  };
  const inputChangeHandler = (e) => {
    setTodo(e.target.value);
    //console.log(todo);
  };
  const onSignOut = () => {
    fire.auth().signOut();
  };
  useEffect(() => {
    if (isAuth === "true") {
      todoCounter();
    }
  }, []);
  return (
    <>
      {isAuth === "" ? (
        ""
      ) : isAuth === "true" ? (
        <div className="card col-md-4 offset-md-4 mt-5 p-0">
          <div className="card-header text-center">Todo App</div>
          <form
            autoComplete="off"
            className="pt-5 pl-3 pr-3"
            onSubmit={addTodoHandler}
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="todo..."
                aria-label="todo"
                onChange={inputChangeHandler}
                name="todo"
                value={todo}
                style={{ boxShadow: "none" }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-success"
                  style={{ boxShadow: "none" }}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
            {/* <div className="row mt-2 pb-3">
            <span className="col">Total Todos : {recordCount}</span>
            <span className="col"> Pending : {pending}</span>
          </div> */}
          </form>
          <TodoList />
          <div className="card-footer mt-2">
            <div className="row">
              <div className="col-md-5">Total Todos : {recordCount}</div>
              <div className="col-md-5">Pending : {pending}</div>
              <div className="col-md-2">
                <div
                  className="d-block h-100 text-center"
                  title="logout"
                  role="button"
                  onClick={onSignOut}
                >
                  <FontAwesomeIcon icon="sign-out-alt" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default AddTodo;
