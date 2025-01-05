import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import 'bootstrap/dist/css/bootstrap.min.css';
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

// import "./index.css"
import { useContext } from "react";
import { themeContext } from "./Context";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const offlineToastId = "offline-toast"; // Unique ID for the offline toast

  const [currentSection, setCurrentSection] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineToastVisible, setOfflineToastVisible] = useState(false); // Track offline toast visibility

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

  useEffect(() => {
    // Show offline toast if offline on initial render
    

    // if (!navigator.onLine && !offlineToastVisible) {
    //   toast.error("Oops! You appear to be offline.", {
    //     toastId: offlineToastId,
    //     autoClose: false,
    //     draggable: true,
    //     style: { backgroundColor: "red", color: "#fff" },
    //   });
    //   setOfflineToastVisible(true); // Mark toast as visible
    // }

    const handleOnline = () => {
      if (offlineToastVisible) {
        toast.dismiss(offlineToastId); // Dismiss the offline toast
        setOfflineToastVisible(false); // Reset visibility state
      }

      toast.success("You're back online!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { backgroundColor: "green", color: "#fff" },
      });

      setIsOffline(false);
    };

    const handleOffline = () => {
      if (!offlineToastVisible) {
        toast.error("Oops! You appear to be offline.", {
          position: "top-right",
          toastId: offlineToastId,
          autoClose: false,
          draggable: true,
          style: { backgroundColor: "red", color: "#fff" },
        });
        setOfflineToastVisible(true);
      }

      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [offlineToastVisible]); // Dependency to keep toast visibility in sync

  return (
    <div
      className="App"
      style={{
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : "",
      }}>
      <ToastContainer position="top-center" />

      <Navbar currentSectionActive={currentSection} />
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
  );
}

export default App;
