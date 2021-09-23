import React, { useRef, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BanerService from "../../services/BanerService";

export default function CreateBaner() {
    const [text, setText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmited, setIsSubmited] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fileRef = useRef();
    const history = useHistory();

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileSelect = () => {
        setSelectedFile(fileRef.current.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const data = new FormData();

        data.append("text", text);
        data.append("image", selectedFile);

        BanerService.add(data)
            .then((res) => {
                history.push("/");
                toast.success("Your baner was created successfully");
            })
            .catch((err) => {
                setIsSubmited(true);
                setIsLoading(false);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <section className="py-4 mt-5">
            <Container className="col-8 col-md-6 col-lg-4 shadow-lg p-4">
                <h1 className="text-center text-primary mb-5">Create New Baner</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control isValid={isSubmited && !errors?.text} isInvalid={errors?.text} onChange={handleTextChange} value={text} type="text" placeholder="Text" />
                        <Form.Control.Feedback type="invalid">{errors?.text?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control isValid={isSubmited && !errors?.image} isInvalid={errors?.image} onChange={handleFileSelect} ref={fileRef} type="file" />
                        <Form.Control.Feedback type="invalid">{errors?.image?.message}</Form.Control.Feedback>
                    </Form.Group>
                    {selectedFile && <img className="img-fluid d-block mb-3" src={URL.createObjectURL(selectedFile)} alt="Image Selected" style={{ objectFit: "contain", width: "100%" }} />}
                    <Button disabled={isLoading} className="bg-primary" type="submit" style={{ width: "130px" }}>
                        {isLoading ? (
                            <Spinner size="sm" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            "Create Banner"
                        )}
                    </Button>
                </Form>
            </Container>
        </section>
    );
}
