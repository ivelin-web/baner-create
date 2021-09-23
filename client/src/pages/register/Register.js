import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RegisterFailed, RegisterStart, RegisterSuccess } from "../../context/auth/AuthActions";
import { AuthContext } from "../../context/auth/AuthContext";
import AuthService from "../../services/AuthService";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);
    const [errors, setErrors] = useState({});

    const { isFetching, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(RegisterStart());

        const user = { email, password, confirmPassword };

        AuthService.register(user)
            .then((res) => {
                dispatch(RegisterSuccess());
                history.push("/login");
                toast.success("You have been registered successfully");
            })
            .catch((err) => {
                dispatch(RegisterFailed());
                setErrors(err.response.data.errors);

                if (!isSubmited) {
                    setIsSubmited(true);
                }
            });
    };

    return (
        <section className="position-relative" style={{ height: "calc(100vh - 61.6px)" }}>
            <Container className="col-8 col-md-6 col-lg-4 shadow-lg p-4 position-absolute start-50 top-50" style={{ transform: "translate(-50%, -50%)" }}>
                <h3 className="text-center text-primary mb-4">Register</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control isValid={isSubmited && !errors?.email} isInvalid={errors?.email} onChange={handleEmailChange} value={email} type="email" placeholder="Email" />
                        <Form.Control.Feedback type="invalid">{errors?.email?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control isValid={isSubmited && !errors?.password} isInvalid={errors?.password} onChange={handlePasswordChange} value={password} type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">{errors?.password?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                        <Form.Control isValid={isSubmited && !errors?.password && !errors?.confirmPassword} isInvalid={errors?.confirmPassword} onChange={handleConfirmPasswordChange} value={confirmPassword} type="password" placeholder="Repeat Password" />
                        <Form.Control.Feedback type="invalid">{errors?.confirmPassword?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Button disabled={isFetching} className="bg-primary" type="submit" style={{ width: "80px" }}>
                        {isFetching ? (
                            <Spinner size="sm" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            "Register"
                        )}
                    </Button>
                </Form>
            </Container>
        </section>
    );
}
