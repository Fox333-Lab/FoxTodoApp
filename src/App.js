import React from "react";
import "./App.css";
import AddTodo from "./todocomponents/addtodo";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faQuestionCircle,
  faEnvelope,
  faLock,
  faSpinner,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserLogin from "./userauthcomponent/userlogin";
import { UserProvider } from "./context";

library.add(
  faCheckCircle,
  faQuestionCircle,
  faEnvelope,
  faLock,
  faSpinner,
  faSignOutAlt
);

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <UserProvider>
        <div className="App">
          <div className="container pt-5">
            <Switch>
              <Route path="/" exact component={UserLogin} />
              <Route path="/todo" component={AddTodo} />
            </Switch>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
