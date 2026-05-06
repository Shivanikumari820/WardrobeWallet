import React from 'react';

const Terms = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="mb-6">
        <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="text-lg text-gray-700">
          Welcome to Cloth2Cash. These Terms of Service govern your use of our platform and services. 
          By using our services, you agree to these terms.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Description</h3>
      <p className="text-gray-700 mb-6">
        Cloth2Cash is a platform that enables users to sell their pre-owned clothing items. 
        We provide pickup services, evaluation, and payment processing for accepted items.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptable Items</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Clean, gently used clothing from accepted brands</li>
        <li>Items must be in good condition without significant wear</li>
        <li>No counterfeit or replica items</li>
        <li>Items must be authentic and original</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Terms</h3>
      <p className="text-gray-700 mb-6">
        Payment is processed within 5-7 business days after item evaluation. 
        We reserve the right to adjust pricing based on item condition and market demand.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">User Responsibilities</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Provide accurate information about items</li>
        <li>Ensure items are clean and ready for pickup</li>
        <li>Be available during scheduled pickup times</li>
        <li>Comply with all applicable laws and regulations</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
      <p className="text-gray-700 mb-6">
        Cloth2Cash is not liable for any indirect, incidental, or consequential damages 
        arising from the use of our services.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h3>
      <p className="text-gray-700">
        For questions regarding these terms, contact us at sumanqaj9876@gmail.com or +91 6299974421
      </p>
    </div>
  );
};

export default Terms;