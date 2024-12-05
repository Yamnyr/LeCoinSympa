import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-blue-600 text-white p-2">
            <ul className="flex justify-center space-x-6">
                <li>
                    <Link
                        to="/"
                        className="hover:text-blue-200 transition duration-300"
                    >
                        Home
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;