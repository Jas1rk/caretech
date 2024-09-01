import React from "react";
import footerLogo from "../../../assets/Public/footerlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faWhatsapp,
  faTwitter,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer-container">
      <div className="footer-logo-container">
        <img src={footerLogo} alt="footer-logo" className="footer-logo" />
        <div className="contact-section-footer">
          <h2 className="contact-title-footer">GET IN TOUCH</h2>
          <div className="contact-container">
            <input type="text" placeholder="Comment your feedback" />
            <button>Send</button>
          </div>
        </div>
      </div>
    
      <div className="footer-bottom-container">
        <ul className="list-container">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="social-icons-container">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          <FontAwesomeIcon icon={faGoogle} className="social-icon" />
          <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />

        </div>
        <div className="footer-copyright">&copy; 2024 CareTech</div>
      </div>
    </div>
  );
};

export default Footer;
