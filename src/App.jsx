import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Portfolio from './components/Portfolio/Portfolio';
import Navbar from "./components/Navbar/Navbar";
// import Navbar2 from './components/Navbar/Navbar2';
import Contact from './components/Contact/Contact';
import Services from "./components/Services/Services";
import Intro from "./components/Intro/Intro";
import About from './components/About/About';
import Footer from './components/Footer/Footer'
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import './App.css'
// import "./index.css"
import { useContext } from "react";
import { themeContext } from "./Context";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="App "
      style={{
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : "",
      }}>
      <Navbar currentSectionActive={currentSection} />
      {/* <Navbar /> */}
      <section id="Navbar">
        <Intro />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="experience">
        <Experience />
      </section>
      
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  )
}

export default App
