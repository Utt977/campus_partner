import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRegEnvelope } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Footer = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const screenHeight = window.screen.height;
      setIsKeyboardOpen(windowHeight < screenHeight * 0.7);
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`bg-gradient-to-r from-primary to-secondary text-base-100 relative ${isKeyboardOpen ? "pb-12" : ""}`}>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 bg-accent rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-bounce"
        >
          <FaArrowUp className="w-6 h-6 text-white" />
        </button>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Campus Partner</h3>
            <p className="text-sm opacity-90">
              Connecting students across campuses for better collaboration and networking.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <Link to="/contact-us" className="block opacity-90 hover:text-accent transition-colors">Contact Us</Link>
            <Link to="/#" className="block opacity-90 hover:text-accent transition-colors">Blog</Link>
            <Link to="/#" className="block opacity-90 hover:text-accent transition-colors">Careers</Link>
            <Link to="/#" className="block opacity-90 hover:text-accent transition-colors">Partners</Link>
          </div> */}

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <Link to="/privacy-policy" className="block opacity-90 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="block opacity-90 hover:text-accent transition-colors">Terms & Conditions</Link>
            <Link to="/contact-us" className="block opacity-90 hover:text-accent transition-colors">Contact Us</Link>
            {/* <Link to="/shipping-and-delivery" className="block opacity-90 hover:text-accent transition-colors">Shipping & Delivery</Link> */}
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="flex items-center gap-2 opacity-90">
              <RiCustomerService2Fill className="w-5 h-5" />
              <span>Support: 24/7</span>
            </div>
            <div className="flex items-center gap-2 opacity-90">
              <FaRegEnvelope className="w-5 h-5" />
              <span>help@campuspartner.com</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm opacity-90">
            © {new Date().getFullYear()} Campus Partner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;