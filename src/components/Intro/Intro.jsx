import React, { useState, useEffect, useContext } from 'react';
import "./Intro.css";

// import FloatinDiv from "../FloatingDiv/FloatingDiv";
import Github from "/Images/github.png";
import LinkedIn from "/Images/linkedin.png";
import Instagram from "/Images/instagram.png";
import Telegram from "/Images/Telegram.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ReactTyped } from "react-typed";
import image from "/Images/image2.png"
const Intro = () => {
    const transition = { duration: 2, type: "spring" };

    // context
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

    return (
        <div className="Intro" id="Intro">
            {/* left name side */}
            <motion.div className="i-left"
                initial={{ left: "-50%" }}
                whileInView={{ left: "0%" }}
                transition={transition}>
                <div className="i-name">
                    <span style={{ color: darkMode ? "white" : "#242D49" }} className=''>Hy! I Am</span>
                    {/* Typing effect for the name */}

                    <span className='typing' style={{ fontSize: "2rem", fontWeight: "bold", cursor: 50 }}>Natnael Berhanu</span>


                    <ReactTyped
                        strings={[
                            "Graphics Designer",
                            "Front End Developer",
                            "Back End Developer"
                        ]}
                        cursorClassName="cursor"
                        typeSpeed={100}      
                        backSpeed={100}       
                        backDelay={1000}    
                        loop               
                        style={{
                            fontSize: "1.4rem",
                            fontWeight: "bold",
                            cursor: 45          
                        }}
                        className="typing"/>


                    {/* <span className=''>Web Developer and Graphics Designer</span> */}
                </div>
                <Link to="contact" smooth={true} spy={true}>
                    <button className="button i-button ">Let's Connect</button>
                </Link>
                {/* social icons */}
                <div className="i-icons">
                    <a
                        href="https://github.com/Natiethio"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img src={Github} alt="GitHub" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/natnael-berhanu-272533254"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={LinkedIn} alt="LinkedIn" />
                    </a>
                    <a
                        href="https://t.me/nat_man_o"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img src={Telegram} width={110} height={110} alt="Telegram" />
                    </a>
                </div>

            </motion.div>
            {/* right image side */}
            <motion.div className="i-right"
                initial={{ right: "-50%" }}
                whileInView={{ right: "-2%" }}
                transition={transition}>
                <img src={image} alt="" />
            </motion.div>
        </div>
    )
}

export default Intro
