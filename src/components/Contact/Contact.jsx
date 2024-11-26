import React, { useContext, useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { themeContext } from "../../Context";
const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const form = useRef();
  const [done, setDone] = useState(false)

  // emailjs.send("service_6vnnfs4","template_xahly7k"); olMhqzqkB-akJZlcC

  const sendEmail = (e) => {
    e.preventDefault();

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
          setDone(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-form" id="contact">
      {/* left side copy and paste from work section */}
      <div className="w-left">
        <div className="awesome">
          {/* darkMode */}
          <span style={{ color: darkMode ? 'white' : '' }}>Get in Touch</span>
          <span className="contactme">Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
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
          <input type="submit" value="Send" className="button" />
          <span className="spanemail">{done && "Thank You For Contacting Me"}</span>
          {/* <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div> */}
        </form>
      </div>
    </div>
  );
};

export default Contact;
