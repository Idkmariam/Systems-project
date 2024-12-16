import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="about-us-section">
        <p className='about'>About Us</p>
        <p className='dd'>
          Welcome to Picancci! We are passionate about fashion and dedicated to bringing you the latest trends and timeless styles. Our mission is to help you express your unique style with our curated collection of high-quality products.
        </p>
        <p className='dd'>
          Whether you're looking for chic outerwear, elegant blouses, or classic accessories, we've got you covered. Thank you for choosing Picancci as your fashion destination!
        </p>
        <h6 className="contact">Contact us through our social media platforms :</h6>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaTwitter className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
