import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const isLoggedIn = localStorage.getItem("authToken") !== null;
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        alert("Logged out successfully");
        navigate("/login");
    }
    return (
        <>
            <nav className="container navbar-expand-lg bg-light sticky-top">
                <div className="container">
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <Link class="nav-link " aria-current="page" to="/">To-Do List</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" aria-current="page" to="/">Home</Link>
                        </li>

                        {isLoggedIn ?
                            <>
                                <li class="nav-item">
                                    <button
                                        className={`nav-link btn btn-link ${localStorage.getItem("authToken") ? "active" : "disabled"}`}
                                        aria-current="page"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/addItem">Add Item</Link>
                                </li>
                            </>
                            : <li class="nav-item">
                                <Link class="nav-link" to="/login">Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
