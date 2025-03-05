import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarker, FaHeadset, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-base-content">
            We're here to help you 24/7
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Email Card */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <FaEnvelope className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-base-content mb-2">Email Support</h2>
              <p className="text-base-content/80 mb-2">Quick response within 24 hours</p>
              <a href="mailto:support@campuspartner.com" className="text-primary hover:text-primary/80">
                support@campuspartner.com
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-secondary/10 rounded-full mb-4">
                <FaPhone className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-xl font-bold text-base-content mb-2">Phone Support</h2>
              <p className="text-base-content/80 mb-2">24/7 helpline availability</p>
              <a href="tel:+911234567890" className="text-secondary hover:text-secondary/80">
                +91 12345 67890
              </a>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-success/10 rounded-full mb-4">
                <FaMapMarker className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-base-content mb-2">Office Address</h2>
              <p className="text-base-content/80">
                Tech Park, Sector 62<br/>
                Noida, Uttar Pradesh<br/>
                India - 201309
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-8 border border-base-300">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
              Send us a Message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-base-content/80 mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg bg-base-200 border border-base-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-base-content/80 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg bg-base-200 border border-base-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-base-content/80 mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-base-200 border border-base-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2">
                <FaPaperPlane className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Live Support */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <FaHeadset className="w-6 h-6 text-primary" />
            <span className="text-base-content">
              Need immediate help? <a href="#" className="text-primary hover:text-primary/80">Start Live Chat</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;