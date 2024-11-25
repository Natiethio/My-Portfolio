import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa"; // Import Hamburger and X icons
import Toggle from "../Toggle/Toggle";
import "./Navbar2.css";

const Navbar2 = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0); // Detect scrolling
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    // Close dropdown if clicked outside
    const closeMenuOnClickOutside = (e) => {
      if (!e.target.closest(".n-right")) {
        setIsMenuOpen(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("click", closeMenuOnClickOutside);
      return () => window.removeEventListener("click", closeMenuOnClickOutside);
    }, []);

  return (
    <div className={`n-wrapper navbar ${isScrolled ? "scrolled" : ""}`} id="Navbar">
      {/* Left Section */}
      <div className="n-left">
        <div className="n-name">Natnael</div>
        <Toggle />
      </div>

      {/* Right Section */}
      <div className="n-right">
        {/* Hamburger Menu for smaller screens */}
        <div
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} color="#5eb939" /> : <FaBars size={24} color="#5eb939" />}
        </div>

        {/* Links (Responsive) */}
        <div className={`n-list ${isMenuOpen ? "show" : ""}`}>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link activeClass="active" to="Navbar" spy={true} smooth={true}>
                Home
              </Link>
            </li>
            <li>
              <Link to="services" spy={true} smooth={true}>
                Services
              </Link>
            </li>
            <li>
              <Link to="works" spy={true} smooth={true}>
                Experience
              </Link>
            </li>
            <li>
              <Link to="portfolio" spy={true} smooth={true}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="contact" spy={true} smooth={true}>
                <button className="button n-button">Contact</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Navbar2