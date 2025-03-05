import React from 'react';
import { FaUndo, FaMoneyBillWave, FaRegTimesCircle, FaHeadset } from 'react-icons/fa';

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Cancellation & Refund Policy
          </h1>
          <p className="text-lg text-gray-600">
            Transparent processes for your peace of mind
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Cancellation Policy */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-xl">
                <FaUndo className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-base-content">Cancellation</h2>
            </div>
            <ul className="space-y-4 text-base-content">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>24-hour free cancellation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-danger/10 text-danger rounded-full flex items-center justify-center flex-shrink-0">
                  ✕
                </div>
                <span>No cancellation fees</span>
              </li>
            </ul>
          </div>

          {/* Refund Policy */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-secondary/10 rounded-xl">
                <FaMoneyBillWave className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-base-content">Refunds</h2>
            </div>
            <ul className="space-y-4 text-base-content">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>7-10 business day processing</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Full amount refund</span>
              </li>
            </ul>
          </div>

          {/* Exceptions */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-danger/10 rounded-xl">
                <FaRegTimesCircle className="w-8 h-8 text-danger" />
              </div>
              <h2 className="text-2xl font-bold text-base-content">Exceptions</h2>
            </div>
            <ul className="space-y-4 text-base-content">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-danger/10 text-danger rounded-full flex items-center justify-center flex-shrink-0">
                  ✕
                </div>
                <span>Non-refundable services</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-danger/10 text-danger rounded-full flex items-center justify-center flex-shrink-0">
                  ✕
                </div>
                <span>Special conditions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-8 text-center border border-base-300">
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-primary/10 rounded-full w-max mx-auto mb-6">
              <FaHeadset className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-base-content mb-4">
              Need Help with Cancellation?
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

export default CancellationAndRefund;