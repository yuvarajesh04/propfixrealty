import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "../index.css";

const Navbar: React.FC = () => {
    const location = useLocation();

    const admin = localStorage.getItem('token');

    const menuItems = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/projects", label: "Projects" },
        { path: "/contact", label: "Contact" },
        ...(admin ? [{ path: "admin/add-project", label: "Add Project" }] : [])
    ];


    return (
        <nav
            className="navbar navbar-expand-lg navbar-light py-3"
            style={{
                backgroundColor: "var(--primary-color)",
                position: "sticky",
                top: 0,
                width: "100%",
                zIndex: 1000,
            }}
        >
            <div
                className="container"
                style={{ position: "relative", height: "100%" }}
            >
                {/* Left - Logo */}
                <div
                    className="logo-div d-flex justify-content-center align-items-center"
                    style={{ position: "relative", height: "100%", width: "150px" }}
                >
                    <Link
                        className="navbar-brand text-dark"
                        to="/"
                        style={{ position: "absolute" }}
                    >
                        <img
                            src={logo}
                            alt="Propfix Realty Logo"
                            style={{
                                height: "200px",
                                width: "auto",
                                marginLeft: '100px'
                            }}
                        />
                    </Link>
                </div>

                {/* Toggle button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Offcanvas / Collapse */}
                <div
                    className="offcanvas offcanvas-start d-lg-flex flex-lg-row align-items-lg-center justify-content-lg-between bg-lg-white offcanvas-lg offcanvas-end"
                    tabIndex={-1}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    {/* Header for mobile */}
                    <div className="offcanvas-header d-lg-none">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            Menu
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-dark"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Menu Items */}
                    <div className="offcanvas-body d-lg-flex w-100 justify-content-between align-items-center py-lg-0">
                        <ul className="navbar-nav flex-grow-1 justify-content-lg-center pe-3">
                            {menuItems.map((item) => (
                                <li className="nav-item" key={item.path}>
                                    <Link
                                        className={`nav-link fw-semibold ${location.pathname === item.path ? "active" : ""
                                            }`}
                                        to={item.path}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>


                        {/* Contact Info */}
                        <div className="text-lg-end mt-3 mt-lg-0">
                            <p className="mb-0 fw-semibold">
                                <i
                                    className="bi bi-telephone-fill me-1"
                                    style={{ color: "var(--primary-blue)" }}
                                ></i>
                                <a
                                    href="tel:+91 9789360885"
                                    style={{
                                        color: "var(--text-dark)",
                                        textDecoration: "none",
                                    }}
                                >
                                    +91 9789360885
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
