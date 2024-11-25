import React, { useContext, useEffect, useState } from "react";
import "./About.css";
import AboutData from "./About.json";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { themeContext } from "../../Context";

const About = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const value = 0.66;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % AboutData.images.length);
    }, 4000); // 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      id="about"
      className="about-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="about-content">
        {/* About Section Grid */}
        <div className="about-grid">
          {/* Rotating Image Section */}
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
          {/* Text Section */}
          <div className="about-text">
            <h2 style={{ color: darkMode ? "white" : "" }}>About Me</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel sem vel nisi
              bibendum fermentum. Curabitur tincidunt at lacus eget efficitur. Proin quis tellus id
              turpis tincidunt egestas at a nisi.
            </p>

          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-grid">
          {AboutData.skills.map((skill, index) => {
            const [percentage, setPercentage] = useState(0);

            useEffect(() => {
              // Counting effect for percentage
              const interval = setInterval(() => {
                setPercentage((prev) => {
                  if (prev < skill.percentage) return prev + 1;
                  clearInterval(interval);
                  return skill.percentage;
                });
              }, 10);
              return () => clearInterval(interval);
            }, [skill.percentage]);

            return (
              <motion.div
                className="skill"
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {/* Circular Progress Bar */}
                <div className="circle">
                  <CircularProgressbar
                    counterClockwise={false}
                    value={percentage}
                    
                    text={` ${percentage}%`}
                    styles={buildStyles({
                      rotation: 0.25,
                      pathColor: "#5eb939",
                      textColor: "#5eb939",
                      trailColor: "#e0e0e0",
                      textSize: "25px",
                      pathTransitionDuration: 1.5,
                      strokeLinecap: "butt",
                      textStyle: {
                        transform: "rotate(0deg)",
                      },
                    })}
                  />
                </div>

                <p>{skill.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default About;

