import React, { useContext } from 'react';
import './Education.css';
import { motion } from "framer-motion";
import experienceData from './Education.json';
import { themeContext } from "../../Context";

const Experience = () => {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    return (
        <motion.div 
        id="education" 
        className="experience-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        // transition={{ duration: 1, type: "spring" }}
        transition={{ duration: 1.5, delay: 0.3, type: "spring" }}>
            <div className="experience-header">
                <span style={{ color: darkMode ? "white" : "" }}>My</span>
                <span className="">Education</span>
            </div>
            <div className="experience-wrapper">
                <div className="experience-image">
                    <img
                        src="/Images/Education1upd.png"
                        alt="Experience Illustration"
                    />
                </div>
                <div className="experience-list">
                    {experienceData.map((item, index) => (
                        <div key={index} className="experience-card">
                            <div className="image-container">
                                <img src={item.logo} alt={item.title} />
                            </div>
                            <div className="experience-content">
                                <span className="experience-date">{item.year}</span>
                                <h3 className="experience-title">{item.title}</h3>
                                <span className="experience-company">{item.institute}</span>
                                {/* <p className="experience-company">{item.description}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Experience;
