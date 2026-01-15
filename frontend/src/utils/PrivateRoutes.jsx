import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
    const isSignedIn = localStorage.getItem("token");

    if (!isSignedIn) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}

export default PrivateRoutes;
