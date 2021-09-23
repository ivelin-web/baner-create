import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import AppRouter from "./AppRouter";
import Header from "./components/common/header/Header";
import { GetUser } from "./context/auth/AuthActions";
import { AuthContext } from "./context/auth/AuthContext";
import AuthService from "./services/AuthService";

function App() {
    const [isFetching, setIsFetching] = useState(true);

    const { dispatch } = useContext(AuthContext);

    // When page was rendered check if there is a logged in user or not
    useEffect(() => {
        AuthService.getAuthUser()
            // Have logged in user
            .then((res) => {
                dispatch(GetUser(res.data));
            })
            // Don't have logged in user
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, []);

    if (isFetching) {
        return (
            <div className="position-absolute start-50 top-50" style={{ transform: "translate(-50%, -50%)" }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main>
                <AppRouter />
            </main>
        </>
    );
}

export default App;
