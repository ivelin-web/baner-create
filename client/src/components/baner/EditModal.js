import React, { useRef, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import BanerService from "../../services/BanerService";

export default function EditModal({ _id, onEdit, image, text, onHide }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [textInput, setTextInput] = useState(text);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const fileRef = useRef();

    const PF = process.env.REACT_APP_PF;

    const handleTextChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleFileSelect = () => {
        setSelectedFile(fileRef.current.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const data = new FormData();

        // Add text to data if text is changed
        textInput !== text && data.append("text", textInput);

        // Add image to data if image is changed
        selectedFile && data.append("image", selectedFile);

        BanerService.edit(data, _id)
            .then((res) => {
                onEdit();
                toast.success("Your baner was edited successfully");
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    toast.warning(err.response.data.message);
                    return;
                }

                setIsLoading(false);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Baner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control isInvalid={errors?.text} onChange={handleTextChange} value={textInput} type="text" placeholder="Text" />
                        <Form.Control.Feedback type="invalid">{errors?.text?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control isInvalid={errors?.image} onChange={handleFileSelect} ref={fileRef} className="form-control" type="file" />
                        <Form.Control.Feedback type="invalid">{errors?.image?.message}</Form.Control.Feedback>
                    </Form.Group>
                    {selectedFile ? <img className="img-fluid d-block mb-3" src={URL.createObjectURL(selectedFile)} alt="Image Selected" style={{ objectFit: "contain", width: "100%" }} /> : <img className="img-fluid d-block mb-3" src={`${PF}/baners/${image}`} alt="Image Selected" style={{ objectFit: "contain", width: "100%" }} />}
                    <div className="d-flex">
                        <Button disabled={isLoading || (textInput === text && !selectedFile)} className="bg-primary" type="submit" style={{ width: "130px" }}>
                            {isLoading ? (
                                <Spinner size="sm" animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : (
                                "Edit Banner"
                            )}
                        </Button>
                        <Button disabled={isLoading} className="ms-auto bg-primary" onClick={onHide}>
                            Close
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
