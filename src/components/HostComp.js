import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import HomePage from "./HomePage";
import NavBar from "./NavBar";

import { AuthAPIProvider } from "../contextAPI/AuthAPI";
import { DataAPiProvider } from "../contextAPI/dataAPI";
export default function HostComp() {
  return (
    <div>
      <AuthAPIProvider>
        <DataAPiProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route path="/HomePage" component={HomePage} />
            <Route path="/Login" component={Login} />
          </Switch>
        </DataAPiProvider>
      </AuthAPIProvider>
    </div>
  );
}
