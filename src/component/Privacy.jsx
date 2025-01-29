import React from 'react';

const Privacy = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        At <strong>Campus Partner</strong>, we respect your privacy and ensure that your personal data is handled securely.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <p>
        We collect minimal user data such as name, email, and profile details to enhance your experience on our platform.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. How We Use Your Data</h2>
      <ul className="list-disc pl-5">
        <li>To create and manage user profiles.</li>
        <li>To facilitate connections between users.</li>
        <li>To improve platform features and security.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4">3. Data Protection</h2>
      <p>
        Your information is securely stored and never shared with third parties without consent.
      </p>
      <h2 className="text-xl font-semibold mt-4">4. User Controls</h2>
      <p>
        You can update or delete your profile information anytime through account settings.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Contact Us</h2>
      <p>
        If you have any privacy concerns, reach out at{' '}
        <strong>support@campuspartner.com</strong>.
      </p>
    </div>
  );
};

export default Privacy;

