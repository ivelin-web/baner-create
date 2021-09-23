import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { AuthContextProvider } from "./context/auth/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={""}>
            <Router>
                <AuthContextProvider>
                    <ToastContainer position="bottom-left" autoClose={3500} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Flip} theme="dark" />
                    <App />
                </AuthContextProvider>
            </Router>
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);
