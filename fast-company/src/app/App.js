import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../layouts/login";
import Main from "../layouts/main";
import NavBar from "../components/navBar";

import Users from "../layouts/users";

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
