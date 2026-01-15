import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoutes from "../utils/PrivateRoutes";
import PublicRoutes from "../utils/PublicRoutes";
import Advising from "../pages/Advising";
import Courses from "../pages/Courses";
import Teacher from "../pages/Teacher";

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route
                    path="/signin"
                    element={
                        <PublicRoutes>
                            <SignIn />
                        </PublicRoutes>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicRoutes>
                            <SignUp />
                        </PublicRoutes>
                    }
                />
                <Route path="/teacher" element={<Teacher />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoutes>
                            <Home />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/advising"
                    element={
                        <PrivateRoutes>
                            <Advising />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/courses"
                    element={
                        <PrivateRoutes>
                            <Courses />
                        </PrivateRoutes>
                    }
                />
            </Routes>
        </div>
    );
}

export default AllRoutes;
