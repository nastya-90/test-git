import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    to="/"
                >
                    Main
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="#" to="/login">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="#" to="/users">
                    Users
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
