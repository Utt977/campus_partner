import { FaBalanceScale, FaUserLock, FaShieldAlt, FaFileContract } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          
        </div>

        {/* Main Content Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300">
          <div className="flex items-start gap-6 mb-8">
            <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
              <FaBalanceScale className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-xl text-base-content/80">
                By using Campus Partner, you agree to our terms of service. Please read them carefully.
              </p>
            </div>
          </div>

          {/* Permanent Content Section */}
          <div className="space-y-6">
            {/* Terms List */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Term 1 */}
              <div className="bg-base-200 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <FaUserLock className="w-6 h-6 text-secondary" />
                  <h3 className="text-lg font-bold text-base-content">User Conduct</h3>
                </div>
                <p className="text-base-content/80">
                  Respect all users and maintain appropriate behavior. Harassment or abuse will not be tolerated.
                </p>
              </div>

              {/* Term 2 */}
              <div className="bg-base-200 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <FaShieldAlt className="w-6 h-6 text-success" />
                  <h3 className="text-lg font-bold text-base-content">Platform Usage</h3>
                </div>
                <p className="text-base-content/80">
                  Do not misuse the platform for illegal activities or spam. Commercial use requires prior authorization.
                </p>
              </div>

              {/* Term 3 */}
              <div className="bg-base-200 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <FaFileContract className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-base-content">Data Handling</h3>
                </div>
                <p className="text-base-content/80">
                  We securely store necessary data to provide services. You retain ownership of your content.
                </p>
              </div>
            </div>

            {/* Additional Terms */}
            <div className="bg-base-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-base-content mb-4">Updates & Modifications</h3>
              <p className="text-base-content/80">
                We reserve the right to update these terms periodically. Continued use after changes constitutes acceptance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;