import React, { lazy, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { AuthContext } from "./context/auth/AuthContext";

// Lazy load my pages
const Home = lazy(() => import("./pages/home/Home"));
const CreateBaner = lazy(() => import("./pages/create-baner/CreateBaner"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));

export default function AppRouter() {
    const { user } = useContext(AuthContext);

    return (
        <Switch>
            <Route exact path="/">
                {user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/create">
                {user ? <CreateBaner /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
                {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/register">
                {user ? <Redirect to="/" /> : <Register />}
            </Route>
            <Redirect to={user ? "/" : "/login"} />
        </Switch>
    );
}
