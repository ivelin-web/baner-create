import React from "react";
import { Container } from "react-bootstrap";

import BanerList from "../../components/baner/BanerList";

export default function Home() {
    return (
        <section className="py-4">
            <Container>
                <h1 className="text-center text-primary mb-5">Baners</h1>
                <BanerList />
            </Container>
        </section>
    );
}
