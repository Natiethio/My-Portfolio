import React, { useContext, useEffect, useState } from "react";
import "./About.css";
import AboutData from "./About.json"
import { fadeIn } from '../variants'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { themeContext } from "../../Context"

const About = () => {

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const transition = { duration: 2, type: "spring" };
  const control = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % AboutData.images.length);
    }, 7000); // 7 seconds
    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    if (inView) {
        control.start("visible");
    } else {
        control.start("hidden");
    }
}, [control, inView]);


  return (
    <motion.div
      ref={ref}
      id="about"
      className="about-section"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={transition}
      viewport={{ once: true, amount: 0.2 }}
      >

      <div className="about-content">
        <div className="about-grid">
          <div className="about-image">
          {AboutData.images.map((image, index) => (
              <motion.img
                key={image.id}
                src={image.image}
                alt={`About Image ${index + 1}`}
                className={`image ${currentImageIndex === index ? "visible" : "hidden"}`}
                initial={{ opacity: 0 }}
                animate={currentImageIndex === index ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
              />
            ))}
          </div>
          <div className="about-text">
            <h2 style={{ color: darkMode ? "white" : "" }}>About Me</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vel sem vel nisi bibendum fermentum. Curabitur tincidunt at lacus
              eget efficitur. Proin quis tellus id turpis tincidunt egestas at
              a nisi.
            </p>
          </div>
          {/* <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div> */}
        </div>

        {/* Skills Section */}
        <div className="skills-grid">
          {AboutData.skills.map((skill, index) => (
            <div className="skill" key={index}>
              <div className="circle">
                <svg>
                  <circle cx="50" cy="50" r="45"></circle>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 45}`,
                      strokeDashoffset: `${2 * Math.PI * 45 * (1 - skill.percentage / 100)
                        }`,
                    }}
                  ></circle>
                </svg>
                <div className="percentage">{skill.percentage}%</div>
              </div>
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default About
