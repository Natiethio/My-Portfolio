import React from "react";
import "./Footer.css";
import Github from "@iconscout/react-unicons/icons/uil-github";
import Telegram from "@iconscout/react-unicons/icons/uil-telegram";
import Linkedin from "@iconscout/react-unicons/icons/uil-linkedin";
import { motion } from "framer-motion";
const Footer2 = () => {
    return (
        <motion.footer className="footer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.3, delay: 0.2, type: "spring" }}>
            <div className="footer-content">
                <h2 className="footer-title">Natnael Berhanu</h2>
                <p className="footer-location">Addis Abeba, Ethiopia</p>
                <p className="footer-contact">
                    <a href="tel:+251970951608" className="footer-email">+251-970-9516-08</a> |{" "}
                    <a href="mailto:natman093@gmail.com" className="footer-email">
                        natman093@gmail.com
                    </a>
                </p>
                <div className="footer-icons">
                    <a className="Link" href="https://github.com/Natiethio" target="_blank" rel="noopener noreferrer">
                        <Github size="30"  />
                    </a>
                    <a className="Link" href="https://www.linkedin.com/in/natnael-berhanu-272533254" target="_blank" rel="noopener noreferrer">
                        <Linkedin size="30"  />
                    </a>
                    <a className="Link" href="https://t.me/nat_man_o" target="_blank" rel="noopener noreferrer">
                        <Telegram size="30" />
                    </a>
                </div>
            </div>
            <hr className="footer-divider" />
            <p className="footer-bottom">
                © Natnael Berhanu, All Right Reserved
            </p>
        </motion.footer>
    )
}

export default Footer2
