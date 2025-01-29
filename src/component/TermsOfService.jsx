import { useState } from "react";

const TermsOfService = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Terms of Service</h2>
      <div className="space-y-4">
        <p className="text-gray-700">
          By using this service, you agree to our terms. Please read carefully.
        </p>
        {expanded && (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Respect all users and their privacy.</li>
            <li>Do not misuse the platform.</li>
            <li>Your data may be stored securely.</li>
            <li>We reserve the right to update terms.</li>
          </ul>
        )}
        <button
          className="mt-4 text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default TermsOfService;
