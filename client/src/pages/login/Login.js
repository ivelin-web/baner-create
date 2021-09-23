import React, { useContext, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";

import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/auth/AuthContext";
import { LoginFailed, LoginStart, LoginSuccess } from "../../context/auth/AuthActions";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { isFetching, dispatch } = useContext(AuthContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(LoginStart());

        const userCredentials = { email, password };

        // Login, then get logged user and dispatch to reducer
        AuthService.login(userCredentials)
            .then((loginRes) => {
                AuthService.getAuthUser()
                    .then((userRes) => {
                        dispatch(LoginSuccess(userRes.data));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                dispatch(LoginFailed());
                setPassword("");
                setError(err.response.data.message);
            });
    };

    return (
        <section className="position-relative" style={{ height: "calc(100vh - 61.6px)" }}>
            <Container className="col-8 col-md-6 col-lg-4 shadow-lg p-4 position-absolute start-50 top-50" style={{ transform: "translate(-50%, -50%)" }}>
                <h3 className="text-center text-primary mb-4">Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control onChange={handleEmailChange} value={email} type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control onChange={handlePasswordChange} value={password} type="password" placeholder="Password" />
                    </Form.Group>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Button disabled={isFetching} className="bg-primary" type="submit" style={{ width: "80px" }}>
                        {isFetching ? (
                            <Spinner size="sm" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Form>
            </Container>
        </section>
    );
}
