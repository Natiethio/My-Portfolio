import React, { useState, useEffect, useContext } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Portfolio.css";
import portfolioData from "./Portfolio.json";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import Popup from 'reactjs-popup';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "react-bootstrap";
import { Autoplay, FreeMode, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";



const Portfolio = () => {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    const [filteredData, setFilteredData] = useState(portfolioData);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [graphicsImages, setGraphicsImages] = useState(portfolioData)
    const [loadingStates, setLoadingStates] = useState({});
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    const animationVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    };

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredData(portfolioData);
        } else {
            setFilteredData(portfolioData.filter((item) => item.type === selectedCategory));
        }
        setCurrentPage(1);
        setGraphicsImages(portfolioData.filter((item) => item.type === "Graphics"))
    }, [selectedCategory]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const images = paginatedData.map((item) => item.image);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    // useEffect(() => {



    //     const handleOnline = () => {
    //         setIsOffline(false);
           
    //     };

    //     const handleOffline = () => setIsOffline(true);

    //     window.addEventListener("online", handleOnline);
    //     window.addEventListener("offline", handleOffline);

    //     return () => {
    //         window.removeEventListener("online", handleOnline);
    //         window.removeEventListener("offline", handleOffline);
    //     };
    // }, []);

    // Reset loading states when data changes
    useEffect(() => {
        const initialLoadingStates = {};
        filteredData.forEach((item) => {
            item.image.forEach((_, idx) => {
                initialLoadingStates[`${item.id}-${idx}`] = false; // Initialize all images as "not loaded"
            });
        });
        setLoadingStates(initialLoadingStates);
    }, [filteredData]);

    const handleImageLoad = (id) => {
        setLoadingStates((prev) => ({
            ...prev,
            [id]: true, // Update the state for the specific image
        }));
    };




    return (
        <motion.div
            className="portfolio-container"
            id="portfolio"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.01 }}
            // transition={{ duration: 1, type: "spring" }}
            transition={{ duration: 1.5, delay: 0.3, type: "spring" }}
        >

            {/* {isOffline && (
                // <Alert variant="warning" className="d-flex justify-content-center align-items-center text-center">
                //     Opps! You appear to be offline. Please check your internet connection.
                // </Alert>
                // alert("Opps! You appear to be offline. Please check your internet connection")
                <p>jhjhhjjh</p>
            )} */}
            <div className="portfolio-header">
                <span style={{ color: darkMode ? "white" : "" }}>My</span>
                <span className="">Portfolios</span>
            </div>
            <section className="portfolio-filter-buttons">
                {["All", "Web App", "Graphics", "Logo", "DeskTop App", "AI Project"].map((category) => (
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
                {paginatedData.map((item, index) => (

                    <motion.div
                        key={index}
                        className="portfolio-card"
                        style={{ backgroundColor: darkMode ? "#66cb3e" : "white", border: darkMode ? "none" : "" }}
                        whileHover={{ scale: 1.03 }}>

                        <div className="image-wrapper" style={{ backgroundColor: "white" }}>
                            {item.image.length > 1 ? (
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    autoplay={{ delay: 3000 }}
                                    loop={true}
                                    pagination={{
                                        el: ".custom-pagination",
                                        clickable: true,
                                    }}
                                    speed={1500}
                                    className="image-wrapper"
                                >
                                    {item.image.map((image, id) => (
                                        <SwiperSlide key={item.id}>
                                            {/* <img
                                                src={image}
                                                alt={`${item.project_name} Image ${id + 1}`}
                                                style={{ cursor: "pointer" }}
                                            /> */}
                                            <div className="image-wrapper">
                                                {/* Show spinner while image is loading */}
                                                {!loadingStates[`${item.id}-${id}`] && (
                                                    <div className="spinner-container">
                                                        <div className="custom-spinner"></div>
                                                    </div>
                                                )}
                                                <img
                                                    src={image}
                                                    alt={`${item.project_name} Image ${id + 1}`}
                                                    style={{
                                                        cursor: "pointer",
                                                        display: loadingStates[`${item.id}-${id}`] ? "block" : "none",
                                                    }}
                                                    onLoad={() => handleImageLoad(`${item.id}-${id}`)}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="image-wrapper">
                                    {!loadingStates[`${item.id}-0`] && (
                                        <div className="spinner-container">
                                            <div className="custom-spinner"></div>
                                        </div>
                                    )}
                                    <img
                                        src={item.image[0]}
                                        alt={item.project_name}
                                        style={{
                                            cursor: "pointer",
                                            display: loadingStates[`${item.id}-0`] ? "block" : "none",
                                        }}
                                        onLoad={() => handleImageLoad(`${item.id}-0`)}
                                    />
                                </div>
                            )}
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
                            {item.type === "Graphics" ? (
                                <a
                                    href={item.image[0]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button demo-button"
                                >
                                    View
                                </a>
                            ) : (
                                item.demo_link && (
                                    <a
                                        href={item.demo_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button demo-button"
                                    >
                                        Demo
                                    </a>
                                )
                            )}
                            {/* {item.demo_link && (
                                <a
                                    href={item.demo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button demo-button"
                                >
                                    Demo
                                </a>
                            )} */}
                        </div>
                    </motion.div>
                ))}
            </motion.section>
            {/* Lightbox Component */}
            {/* {isLightboxOpen && (
                    <Lightbox
                        mainSrc={currentImage}
                        onCloseRequest={() => setIsLightboxOpen(false)}
                    />
                )} */}

            {/* {isOpen && (
                <Lightbox
                    mainSrc={paginatedData[currentImageIndex].image} // Current image
                    nextSrc={paginatedData[(currentImageIndex + 1) % paginatedData.length]?.src} // Next image
                    prevSrc={paginatedData[(currentImageIndex + paginatedData.length - 1) % paginatedData.length]?.image} // Previous image
                    onCloseRequest={() => setIsOpen(false)} // Close lightbox
                    onMovePrevRequest={() =>
                        setCurrentImageIndex((currentImageIndex + paginatedData.length - 1) % paginatedData.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentImageIndex((currentImageIndex + 1) % paginatedData.length)
                    }
                    imageTitle={`Image ${paginatedData[currentImageIndex].id}`} // Optional title or description
                    imageCaption={paginatedData[currentImageIndex].project_name} // Optional caption
                />
            )} */}



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
        </motion.div>

    );
}

export default Portfolio
