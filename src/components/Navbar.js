import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    useEffect(() => {
        // Add any side effects here if necessary based on location
    }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">News Monkey</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">General</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/business" ? "active" : ""}`} to="/business">Business</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/entertainment" ? "active" : ""}`} to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/health" ? "active" : ""}`} to="/health">Health</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/science" ? "active" : ""}`} to="/science">Science</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/sports" ? "active" : ""}`} to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === "/technology" ? "active" : ""}`} to="/technology">Technology</Link></li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
