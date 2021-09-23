import React, { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import "./Baner.css";

import { AuthContext } from "../../context/auth/AuthContext";
import EditModal from "./EditModal";
import BanerService from "../../services/BanerService";

const NOT_OWNER_MESSAGE = "You are not the owner of this baner";

export default function Baner({ _id, text, image, userId, onEdit }) {
    const [showEditModal, setShowEditModal] = useState(false);

    const { user } = useContext(AuthContext);

    // Public folder
    const PF = process.env.REACT_APP_PF;

    // Check if the current user is owner of the banner
    const isUserOwner = user._id === userId;

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleShowEditModal = () => {
        // Check if user is not owner of the banner
        if (!isUserOwner) {
            toast.warning(NOT_OWNER_MESSAGE);
            return;
        }

        setShowEditModal(true);
    };

    const handleDelete = () => {
        // Check if user is not owner of the banner
        if (!isUserOwner) {
            toast.warning(NOT_OWNER_MESSAGE);
            return;
        }

        confirmAlert({
            title: "Are you sure?",
            message: "You want to delete this baner?",
            buttons: [
                {
                    label: "Yes, Delete it!",
                    onClick: deleteBaner,
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const deleteBaner = () => {
        BanerService.remove(_id)
            .then((res) => {
                // Reload baners because change was made
                onEdit();

                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.warning(err.response.data.message || "Error");
            });
    };

    return (
        <>
            {showEditModal && <EditModal _id={_id} onEdit={onEdit} image={image} text={text} onHide={handleCloseEditModal} />}
            <Card className="p-0 col-10 shadow-lg">
                <Card.Body className="px-0">
                    <Card.Title className="text-center">{text}</Card.Title>
                    <Card.Img className="d-block img-fluid" style={{ objectFit: "cover", width: "100%", height: "25vh" }} variant="top" src={`${PF}/baners/${image}`} />
                </Card.Body>
                <Card.Footer className="d-flex">
                    <Button onClick={handleShowEditModal} disabled={!isUserOwner} variant="success">
                        Edit
                    </Button>
                    <Button disabled={!isUserOwner} onClick={handleDelete} variant="danger ms-auto">
                        Delete
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
}
