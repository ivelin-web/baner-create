import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Baner from "./Baner";

import BanerService from "../../services/BanerService";

export default function BanerList() {
    const [baners, setBaners] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getAllBaners();
    }, []);

    const getAllBaners = () => {
        if (!isFetching) {
            setIsFetching(true);
        }

        BanerService.get()
            .then((res) => {
                setBaners(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    const handleEditBaner = () => {
        getAllBaners();
    };

    if (isFetching) {
        return (
            <div className="position-absolute start-50 top-50" style={{ transform: "translate(-50%, -50%)" }}>
                <Spinner size="lg" animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (baners.length === 0) {
        return (
            <h5 className="text-center  ">
                No created baners, create first from <Link to="/create">here</Link>
            </h5>
        );
    }

    return (
        <div className="row justify-content-center gap-5">
            {baners.map((baner) => (
                <Baner onEdit={handleEditBaner} key={baner._id} {...baner} />
            ))}
        </div>
    );
}
