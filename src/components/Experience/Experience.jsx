import React, { useContext } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { themeContext } from "../../Context";
import experienceData from "./Experience.json";
import { motion } from "framer-motion";
import "./Experience.css";

const ExperienceB = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    
    <motion.div 
    id="experiance" 
    className="experience-container"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    // transition={{ duration: 1, type: "spring" }}
    transition={{ duration: 1.5, delay: 0.3, type: "spring" }}>
      <div className="experience-header2">
        <span style={{ color: darkMode ? "white" : "" }}>Work</span>
        <span className="">Experience</span>
      </div>
      <VerticalTimeline lineColor={darkMode ? "#fff" : "#5eb939"}>
        {experienceData.map((experience, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "#5fbd3a",
              color: darkMode ? "#000" : "#000",
            }}
            contentArrowStyle={{
              borderRight: darkMode
                ? "7px solid #fff"
                : "7px solid rgb(73, 145, 44)",
            }}
            date={experience.date}
            iconStyle={{
              background: "#fff",
              color: "#fff",
            }}
            icon={
              <div className="icon-containerExp ">
                <img
                  src={experience.image}
                  alt={experience.companyName}
                  className="icon-image"
                />
              </div>
            }
          >
            <h3 className="vertical-timeline-element-title">{experience.role}</h3>
            <h4 className="vertical-timeline-element-subtitle">{experience.companyName}</h4>
            <p className="despar">{experience.description}</p>
            <div className="skills">
              {experience.skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <img src={skill.icon} alt={skill.name} className="skill-icon" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </motion.div>
  );
}

export default ExperienceB










