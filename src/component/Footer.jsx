import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const screenHeight = window.screen.height;
      setIsKeyboardOpen(windowHeight < screenHeight * 0.7);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className={`bg-primary text-base-content p-4 w-full flex flex-col md:flex-row justify-between items-center transition-all duration-300 ${
        isKeyboardOpen ? "pb-12" : "pt-4"
      }`}
    >
      <aside className="text-center md:text-left">
        <p className="text-sm md:text-base">
          Copyright © {new Date().getFullYear()} - All rights reserved by Campus Partner
        </p>
      </aside>

      {/* Links Section */}
      <nav className="flex flex-wrap gap-2 justify-center md:justify-end">
        <Link to="/privacy-policy" className="text-sm md:text-base hover:underline">
          Privacy Policy
        </Link>
        <Link to="/terms-and-conditions" className="text-sm md:text-base hover:underline">
          Terms & Conditions
        </Link>
        <Link to="/cancellation-and-refund" className="text-sm md:text-base hover:underline">
          Cancellation & Refund
        </Link>
        <Link to="/shipping-and-delivery" className="text-sm md:text-base hover:underline">
          Shipping & Delivery
        </Link>
        <Link to="/contact-us" className="text-sm md:text-base hover:underline">
          Contact Us
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
