import React from 'react';
import { FaClock, FaEnvelope, FaMoneyBillWave, FaHeadset } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-base-content">
            Simple and transparent refund process
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Refund Period Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <FaClock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-base-content mb-2">Refund Window</h2>
              <p className="text-base-content/80">
                Request refund within <strong className="text-primary">7 days</strong> of purchase
              </p>
            </div>
          </div>

          {/* Request Process Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-secondary/10 rounded-full mb-4">
                <FaEnvelope className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-xl font-bold text-base-content mb-2">How to Request</h2>
              <p className="text-base-content/80">
                Email us with order details at<br/>
                <a href="mailto:support@campuspartner.com" className="text-primary hover:text-primary/80">
                  support@campuspartner.com
                </a>
              </p>
            </div>
          </div>

          {/* Process Details Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-success/10 rounded-full mb-4">
                <FaMoneyBillWave className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-base-content mb-2">Refund Process</h2>
              <ul className="text-base-content/80 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success/10 text-success rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  Refund to original payment method
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success/10 text-success rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  3-5 business day processing
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-8 text-center border border-base-300">
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-primary/10 rounded-full w-max mx-auto mb-6">
              <FaHeadset className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-base-content mb-4">
              Need Help with Refund?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is available 24/7 to assist you
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;