import React, { useEffect, useState } from "react";
import fire from "../fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoList = () => {
  const [tlist, setTlist] = useState({});
  const getAllTodos = () => {
    /* get data once - starts */
    /*fire
      .firestore()
      .collection("todolist")
      .get()
      .then((snapshot) => {
        setTlist({
          ...snapshot.docs.map((doc) => doc.data()),
        });
        console.log("firestore : " + snapshot.docs.map((doc) => doc.data()));
      });*/
    /* get data once - ends */
    const unsubscribe = fire
      .firestore()
      .collection("todolist")
      .onSnapshot((snapshot) => {
        console.log(
          "Current data: ",
          snapshot.docs.map((doc) => doc.data())
        );
        setTlist({
          ...snapshot.docs.map((doc) => doc.data()),
        });
      });

    return () => unsubscribe();
  };
  const deleteHandler = (doc) => {
    doc = "item_" + doc;
    fire
      .firestore()
      .collection("todolist")
      .doc(doc)
      .delete()
      .then(() => {
        console.log(`deleted ${doc} successfully`);
      })
      .catch((err) => {
        console.log("delete error : " + err);
      });
    console.log(doc);
  };
  const changeStatus = (id, cstat) => {
    console.log("set id : ", id);
    console.log("set id : ", cstat);

    fire
      .firestore()
      .collection("todolist")
      .doc(`item_${id}`)
      .update({
        status: !cstat,
      })
      .then(() => {
        console.log("status changed");
      })
      .catch((err) => {
        console.log("set error : ", err);
      });
  };
  useEffect(() => {
    getAllTodos();
  }, []);
  return (
    <>
      {/* <div className="pt-5 pb-3"> */}
      <ul className="list-group list-group-flush mt-3 p-3">
        {Object.keys(tlist).map((k) => {
          return (
            <li
              className="list-group-item"
              // style={{
              //   backgroundColor:
              //     tlist[k].status === false ? "#ffcccc" : "#b3ffb3",
              // }}
              key={k}
            >
              <FontAwesomeIcon
                icon={
                  tlist[k].status === false ? "question-circle" : "check-circle"
                }
                className={
                  tlist[k].status === false ? "text-danger" : "text-success"
                }
              />
              <span
                role="button"
                style={{ cursor: "pointer" }}
                className="d-inline-block ml-2"
                onClick={() => changeStatus(tlist[k].id, tlist[k].status)}
              >
                {tlist[k].description}
              </span>

              <button
                type="button"
                className="close"
                onClick={() => deleteHandler(tlist[k].id)}
              >
                <span aria-hidden="true" title="delete">
                  &times;
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
