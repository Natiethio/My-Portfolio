import React from "react";
import "./Footer.css";
import Github from "@iconscout/react-unicons/icons/uil-github";
import Telegram from "@iconscout/react-unicons/icons/uil-telegram";
import Linkedin from "@iconscout/react-unicons/icons/uil-linkedin";

const Footer2 = () => {
    return (
        <footer className="footer">
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
                    <a href="https://github.com/Natiethio" target="_blank" rel="noopener noreferrer">
                        <Github size="30" color="#ffffff" />
                    </a>
                    <a href="https://www.linkedin.com/in/natnael-berhanu-272533254" target="_blank" rel="noopener noreferrer">
                        <Linkedin size="30" color="#ffffff" />
                    </a>
                    <a href="https://t.me/nat_man_o" target="_blank" rel="noopener noreferrer">
                        <Telegram size="30" color="#ffffff" />
                    </a>
                </div>
            </div>
            <hr className="footer-divider" />
            <p className="footer-bottom">
                © Natnael Berhanu, All Right Reserved
            </p>
        </footer>
    )
}

export default Footer2
