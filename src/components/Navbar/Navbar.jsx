import React, { useState, useEffect, useRef, useContext } from "react";
import Toggle from "../Toggle/Toggle";
import "./Navbar.css";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import { themeContext } from "../../Context";
const Navbar = ({ currentSectionActive }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentsection, setSection] = useState(null)
  const dropdownRef = useRef(null);



  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;


  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);

    if (section) {
      setSection(sectionId)
      const headerOffset = 30;
      const sectionPosition = section.offsetTop - headerOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScrolldropdown = () => {
      setIsScrolled(window.scrollY > 0); 
      setIsMenuOpen(false)
       setSection(null)
    };

    window.addEventListener("scroll", handleScrolldropdown);
    return () => window.removeEventListener("scroll", handleScrolldropdown);
  }, []);


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
        <div className="n-left">
          <div className="n-name">Natnael</div>
          <Toggle />
        </div>

        {/* right */}
        <div className="n-right">
          <div className="n-list">
            <ul style={{ listStyleType: "none" }}>
              <li>
                {/* <Link to="Navbar" className="nav-link" spy={true} smooth={true}>
                  Home
                </Link> */}
                <a href="#Navbar" 
                  className={`nav-link ${
                    currentSectionActive === "Navbar" ? "active" : ""
                  }`}
                  style={{
                    color:
                    currentSectionActive == "Navbar"
                        ? "#5eb939"
                        : darkMode
                        ? "#fff"
                        : "#242D49",
                  }}
                  onClick={(e) => handleScroll(e, "Navbar")}>Home
                </a>
              </li>
              <li>
                {/* <Link to="about" spy={true} smooth={true}>
                  About
                </Link> */}
                <a href="#about" 
                  className={`nav-link ${
                    currentSectionActive === "about" ? "active" : ""
                  }`}
                  style={{
                    color:
                    currentSectionActive == "about"
                        ? "#5eb939"
                        : darkMode
                        ? "#fff"
                        : "#242D49",
                  }}
                  onClick={(e) => handleScroll(e, "about")}>About
                </a>
              </li>
              <li>
                {/* <Link to="services" spy={true} smooth={true}>
                Serivces
              </Link> */}
                <a href="#services" 
                  className={`nav-link ${
                    currentSectionActive === "services" ? "active" : ""
                  }`}
                  style={{
                    color:
                    currentSectionActive == "services"
                        ? "#5eb939"
                        : darkMode
                        ? "#fff"
                        : "#242D49",
                  }}
                  onClick={(e) => handleScroll(e, "services")}>Services
                </a>
              </li>

              <li>
                {/* <Link to="services" spy={true} smooth={true}>
                Serivces
              </Link> */}
                <a href="#experience" 
                  className={`nav-link ${
                    currentsection || currentSectionActive === "education" ? "active" : ""
                  }`}
                  style={{
                    color:
                    currentSectionActive == "education"
                        ? "#5eb939"
                        : darkMode
                        ? "#fff"
                        : "#242D49",
                  }}
                  onClick={(e) => handleScroll(e, "experience")}>Experience
                </a>
              </li>

              <li>
                <Link to="portfolio" className="nav-link" spy={true} smooth={true}>
                  Protfolio
                </Link>
              </li>

            </ul>
          </div>
          <Link to="contact" spy={true} smooth={true}>
            <button className="button n-button" onClick={(e) => handleScroll(e, "contact")}>Contact</button>
          </Link>
          {/* <a href="#services" spy={true} smooth={true} style={{color: darkMode ?"#fff" : "#242D49" }} onClick={(e) => handleScroll(e, "services")}>Services</a> */}
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
                  <Link to="Navbar"  style={{ color:"#1a2135" }} spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  {/* <Link to="about" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                    About
                  </Link> */}
                  <a href="#about" style={{ color:"#1a2135" }} onClick={(e) => {
                    handleScroll(e, "about"),
                      setIsMenuOpen(false)
                  }}>About</a>
                </li>
                <li>
                  {/* <Link to="services" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                    Services
                  </Link> */}
                  <a href="#services"  style={{ color:"#1a2135" }} onClick={(e) => {
                    handleScroll(e, "services"),
                      setIsMenuOpen(false)
                  }}>Services</a>
                </li>
                <li>
                  {/* <Link to="works" spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                    Experience
                  </Link> */}
                  <a href="#education"  style={{ color:"#1a2135" }} onClick={(e) => {
                    handleScroll(e, "education"),
                      setIsMenuOpen(false)
                  }}>Education</a>
                </li>
                <li>

                  <a href="#experience"  style={{ color:"#1a2135" }} onClick={(e) => {
                    handleScroll(e, "experience"),
                      setIsMenuOpen(false)
                  }}>Experience</a>
                </li>
                <li>
                  <Link to="portfolio"  style={{ color:"#1a2135" }} spy={true} smooth={true} onClick={() => setIsMenuOpen(false)}>
                    Portfolio
                  </Link>
                </li>
              </ul>
              {/* <Link to="contact" spy={true} smooth={true} onClick={() => {
                setIsMenuOpen(false)
                }}>
                <button className="button n-button-2">Contact</button>
              </Link> */}
              <Link to="contact" spy={true} smooth={true}>
                <button className="button n-button-2" onClick={(e) => {
                  handleScroll(e, "contact")
                  setIsMenuOpen(false)
                }}
                >
                  Contact</button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Navbar;
