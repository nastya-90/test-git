import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/login";
import Main from "../components/main";
import NavBar from "../components/navBar";

import Users from "../components/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId?"
                    render={(props) => <Users {...props} />}
                />
            </Switch>
        </div>
    );
}

export default App;
