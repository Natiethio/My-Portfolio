import React, { useContext, useEffect, useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const form = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_6vnnfs4",
        "template_xahly7k",
        form.current,
        "PMxQaJR4gBlnAIkVg"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Thank you! I'll get back to you as soon as possible.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: darkMode ? "dark" : "light",
            style: { backgroundColor: "green", color: "#fff" },
          });
          form.current.reset();
          setLoading(false);
        },
        (error) => {
          console.error(error.text);
          toast.error("Error! Unable to send email. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: darkMode ? "dark" : "light",
            style: { backgroundColor: "red", color: "#fff" },
          });
          setLoading(false);
        }
      );
  };

  return (
    <motion.div
      className="contact-form"
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, delay: 0.3, type: "spring" }}
    >
      {/* left side */}
      <div className="w-left">
        <div className="awesome">
          <span style={{ color: darkMode ? "white" : "" }}>Get in Touch</span>
          <span className="contactme">Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: darkMode ? "#000" : "#ABF1FF94" }}
          ></div>
        </div>
      </div>
      {/* right side form */}
      <div className="c-right">
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            className="user"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="user_email"
            className="user"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="subject"
            className="user"
            placeholder="Subject"
            required
          />
          <textarea
            name="message"
            className="user"
            placeholder="Message"
            required
          />
          <button type="submit" className="button">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
