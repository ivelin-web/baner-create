import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import { Logout } from "../../../context/auth/AuthActions";
import { AuthContext } from "../../../context/auth/AuthContext";
import AuthService from "../../../services/AuthService";

export default function Header() {
    const { user, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        AuthService.logout()
            .then((res) => {
                dispatch(Logout());
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <header className="position-sticky top-0" style={{ zIndex: 999 }}>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Link className="nav-link text-white fs-5" to={user ? "/" : "/login"}>
                        Baner-Creator
                    </Link>
                    <Nav className="ms-auto align-items-center">
                        {user ? (
                            <>
                                <NavLink className="nav-link" activeClassName="active" exact to="/">
                                    Home
                                </NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/create">
                                    Create Baner
                                </NavLink>
                                <Button onClick={handleLogout} className="nav-link" to="/register" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <NavLink className="nav-link" activeClassName="active" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/register">
                                    Register
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}
