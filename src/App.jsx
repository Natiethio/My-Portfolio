import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./components/Navbar/Navbar";
// import Navbar2 from './components/Navbar/Navbar2';
import Contact from './components/Contact/Contact';
import Services from "./components/Services/Services";
import Intro from "./components/Intro/Intro";
import About from './components/About/About';
import Footer from './components/Footer/Footer'
import './App.css'
// import "./index.css"
import { useContext } from "react";
import { themeContext } from "./Context";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div
      className="App "
      style={{
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : "",
      }}>
      <Navbar />
      {/* <Navbar2 /> */}
      <Intro />
      <About/>
      <Services />
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
