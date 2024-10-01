import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "../MainPageChilds/Contact/Contact";
import Quiz from "../MainPageChilds/Quiz/Quiz";
import Home from "../MainPageChilds/Home/Home";
import { Home } from "@mui/icons-material";

function UserRoutes() {
    return (
        <div className="main-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz" element={<Quiz/>} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
        </div>
    );
}

export default UserRoutes;