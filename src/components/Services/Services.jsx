import React, { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "./Services.css";
import servicesData from "./Card.json";
import HeartEmoji from "/Images/heartemoji.png";
import Glasses from "/Images/glasses.png";
import Humble from "/Images/humble.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import Resume from './Natnael_Berhanu_Resume.pdf';
import Graphics from "/Images/Services/Graphics_Design.png"
import Illustrator from "/Images/Services/illustratoricon.png"
import PhotoShop from "/Images/Services/PhotoShopicon.png"
import Canva from "/Images/Services/canvaicon.png"
import InDesign from "/Images/Services/indesignicon.png"
const Services = () => {
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // transition
  const transition = {
    duration: 2,
    type: "spring",
  };

  const getInitialLeftValue = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 992) {
      return "8.7rem";
    } else if (screenWidth >= 768) {
      return "15rem";
    } else {
      return "5rem";
    }
  };

  // State initialized dynamically
  const [leftValue, setLeftValue] = useState(getInitialLeftValue);

  const [leftValue2, setLeftValue2] = useState(0);

  // Dynamic calculation of the left property
  useEffect(() => {
    const updateLeftValue = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1025) {
        setLeftValue("28.7rem");
        setLeftValue2("6rem") // Large screens
      } else if (screenWidth >= 768) {
        setLeftValue("15rem");
        setLeftValue2("0rem") // Medium screens
      } else {
        setLeftValue("28.7rem");
        setLeftValue2("0rem")
      }
    };
    updateLeftValue();
    window.addEventListener("resize", updateLeftValue);

    return () => {
      window.removeEventListener("resize", updateLeftValue);
    };
  }, []);

  return (
    <motion.div
      className="services"
      id="services"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1, type: "spring" }}
      >
      <div className="awesome">
        <span style={{ color: darkMode ? "white" : "" }}>My Current</span>
        <span className="service">Services</span>
        <spane className="">
          I specialize in creating modern and responsive user interfaces with React.js,
          TailwindCSS, Bootstrap, HTML, CSS, and JavaScript. On the back end, I develop
          scalable and secure applications using Laravel, PHP, and Node.js. Additionally,
          I craft visually appealing designs with Adobe Photoshop, Illustrator, Canva, and
          InDesign to enhance branding and user experiences.
        </spane>
        <a href={Resume} download>
          <button className="button s-button">Download CV</button>
        </a>
        <div className="blur s-blur1" style={{ background: darkMode ? "#000" :"#ABF1FF94" }}></div>
      </div>

      <div className="swiper-container">
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
        >
          {servicesData.map((service) => (
            <SwiperSlide key={service.id}>
              <motion.div
                // initial={{ left: leftValue }}
                // whileInView={{ left: leftValue2 }}
                // transition={transition}
                style={{ left: leftValue2 }}
                pagination={{
                  clickable: true,
                }}
                className="cards mySwiper "
              >
                <div className="card">
                  <img src={service.image} alt={service.title} className="service-img" />
                  <span className="service-title">{service.title}</span>
                  <span className="service-desc" style={{ fontSize: "20px" }}>{service.description}</span>
                  <div className="icon-container">
                    {service.tools.map((tool, index) => (
                      <>
                        <img
                          key={index}
                          src={tool.icon}
                          alt={tool.name}
                          className="icon"
                        />

                      </>

                    ))}
                  </div>

                </div>

              </motion.div>

            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination"></div>
      </div>
    </motion.div>
  );
};

export default Services;
