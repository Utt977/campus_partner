import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
      <p>Request a refund within **7 days** of purchase.</p>

      <h2 className="text-lg font-semibold mt-4">How to Request</h2>
      <p>Email us at <strong>support@campuspartner.com</strong> with your order details.</p>

      <h2 className="text-lg font-semibold mt-4">Refund Process</h2>
      <ul className="list-disc pl-5">
        <li>Refunds to original payment method.</li>
      </ul>

      <p className="mt-4">For any queries, contact us at <strong>support@campuspartner.com</strong>.</p>
    </div>
  );
};

export default RefundPolicy;
