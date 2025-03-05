import React from 'react';
import { FaInfoCircle, FaUserShield, FaDatabase, FaCog, FaEnvelope } from 'react-icons/fa';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-base-content">
            Your trust and security are our top priority
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Information Collection Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                <FaInfoCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-4">1. Information We Collect</h2>
                <p className="text-base-content/80">
                  We collect essential user data including name, email, and profile details 
                  to enhance your platform experience while maintaining maximum privacy.
                </p>
              </div>
            </div>
          </div>

          {/* Data Usage Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-secondary/10 rounded-xl flex-shrink-0">
                <FaDatabase className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-4">2. How We Use Your Data</h2>
                <ul className="list-disc pl-5 space-y-3 text-base-content/80">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    Create and manage user profiles
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    Facilitate secure connections between users
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    Continuously improve platform features and security
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-success/10 rounded-xl flex-shrink-0">
                <FaUserShield className="w-8 h-8 text-success" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-4">3. Data Protection</h2>
                <p className="text-base-content/80">
                  We implement military-grade encryption and strict access controls. 
                  Your information remains confidential and is never shared with 
                  third parties without explicit consent.
                </p>
              </div>
            </div>
          </div>

          {/* User Controls Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                <FaCog className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-4">4. User Controls</h2>
                <p className="text-base-content/80">
                  Maintain full control through your account settings:
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="w-6 h-6 bg-success/10 text-success rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    Real-time profile updates
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="w-6 h-6 bg-danger/10 text-danger rounded-full flex items-center justify-center">
                      ✕
                    </div>
                    Instant account deletion
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-secondary/10 rounded-xl flex-shrink-0">
                <FaEnvelope className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-4">5. Contact Us</h2>
                <p className="text-base-content/80">
                  For privacy concerns or data requests:
                </p>
                <div className="mt-4 flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                  <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    ✉
                  </div>
                  <a href="mailto:support@campuspartner.com" className="text-primary hover:text-primary/80">
                    support@campuspartner.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;