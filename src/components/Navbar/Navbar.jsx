import React, { useState, useEffect, useRef,useContext } from "react";
import Toggle from "../Toggle/Toggle";
import "./Navbar.css";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import { themeContext } from "../../Context";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Detect if scrolled from top
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const handleScroll2 = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 800; 
      const elementPosition = section.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <section id="Navbar">

    <div id="" className={`n-wrapper navbar ${isScrolled ? "scrolled" : ""}`} style={{ backgroundColor: darkMode ? "black" : "" }} >
      {/* left */}
      <div  className="n-left">
        <div className="n-name">Natnael</div>
        <Toggle />
      </div>
      
      {/* right */}
      <div className="n-right">
        <div className="n-list">
          <ul style={{ listStyleType: "none" }}>
          <li>
              <Link to="Navbar" spy={true} smooth={true}>
                Home
              </Link>
            </li>
            <li>
              <Link to="about"  spy={true} smooth={true}>
                About
              </Link>
            </li>
            <li>
              <Link to="services" spy={true} smooth={true}>
                Serivces
              </Link>
            </li>
            <li>
              <Link to="Home" spy={true} smooth={true}>
                Experience
              </Link>
            </li>
            <li>
              <Link to="portfolio" spy={true} smooth={true}>
                Protfolio
              </Link>
            </li>

          </ul>
        </div>
        <Link to="contact" spy={true} smooth={true}>
          <button className="button n-button">Contact</button>
        </Link>
        <div
          className="hamberger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} color="#5eb939" /> : <FaBars size={24} color="#5eb939" />}
        </div>



        {isMenuOpen && (
          <div className="dropdown-menu" ref={dropdownRef} id="Navbar">
            <ul>
              <li>
                <Link to="Navbar" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="about" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="services" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="works" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                  Experience
                </Link>
              </li>
              <li>
                <Link to="portfolio" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                  Portfolio
                </Link>
              </li>
            </ul>
            <Link to="contact" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
              <button className="button n-button-2">Contact</button>
            </Link>
          </div>
        )}

      </div>
    </div>
    </section>
  );
};

export default Navbar;
