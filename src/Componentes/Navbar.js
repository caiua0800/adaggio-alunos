import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Navbar.css";

export default function Navbar(props) {
    const { Nav_Links } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logo = "https://firebasestorage.googleapis.com/v0/b/adaggio-ee93a.appspot.com/o/adaggio-alunos%2Fadaggio-logo-removebg-preview.png?alt=media&token=7584edea-78cd-44e9-a418-1786ef8a4d3e";

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="Navbar">
            <button className="btn-dropdown" onClick={toggleDropdown}><img src={logo} alt="logo" /></button>
            {dropdownOpen && (
                <div className="dropdown-content">
                    {Nav_Links.map((nav_link, i) => (
                        <Link onClick={toggleDropdown} className="nav-link" to={nav_link === 'ALUNOS' ? '/' : '/cadastro'} key={i}>
                            {nav_link}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
