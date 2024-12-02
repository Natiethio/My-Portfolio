import React, { useState, useEffect, useContext } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Portfolio.css";
import portfolioData from "./Portfolio.json";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import Popup from 'reactjs-popup';



const Portfolio = () => {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    const [filteredData, setFilteredData] = useState(portfolioData);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const animationVariants = {
        hidden: { scale: 0.9, opacity: 0 }, // Initial state
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }, // Final state
    };

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredData(portfolioData);
        } else {
            setFilteredData(portfolioData.filter((item) => item.type === selectedCategory));
        }
        setCurrentPage(1); // Reset to page 1 on category change
    }, [selectedCategory]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <div id="portfolio" className="portfolio-container">
            <div className="portfolio-header">
                <span style={{ color: darkMode ? "white" : "" }}>My</span>
                <span className="">Portfolios</span>
            </div>
            <section className="portfolio-filter-buttons">
                {["All", "Web App", "Graphics", "DeskTop App", "AI Project"].map((category) => (
                    <button
                        key={category}
                        className={`filter-button ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>

                ))}
            </section>

            <motion.section
                className="portfolio-grid"
                key={paginatedData}
                initial="hidden"
                animate="visible"
                variants={animationVariants}>
                {paginatedData.map((item) => (
                   
                        <motion.div
                            key={item.id}
                            className="portfolio-card"
                            style={{ backgroundColor:darkMode? "#66cb3e": "white", border: darkMode? "none": "" }}
                            whileHover={{ scale: 1.03 }} 
                        >
                        <div className="image-wrapper"  style={{ backgroundColor:"white" }}>
                            <img src={item.image} alt={item.project_name} className="portfolio-image" />
                        </div>
                        
                        <div className="card-content">
                            <div className="project-title">{item.project_name}</div>
                            {/* <p className="project-description">{item.description}</p> */}
                            
                            <div className="frameworks-container">
                                {item.frameworks.map((framework, index) => (
                                    <div key={index} className="framework-item">
                                        <img
                                            src={framework.icon}
                                            alt={framework.name}
                                            className="framework-icon"
                                        />
                                        <span>{framework.name}</span>
                                    </div>
                                ))}
                            </div>
                           
                        </div>
                        <div className="card-actions" >
                            {item.github_link && (
                                <a
                                    href={item.github_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button view-button"
                                >
                                    View
                                </a>
                            )}
                            {item.demo_link && (
                                <a
                                    href={item.demo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button demo-button"
                                >
                                    Demo
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.section>
              

            <section className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    <FaChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? "active" : ""
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    <FaChevronRight />
                </button>
            </section>
        </div>
    );
}

export default Portfolio
