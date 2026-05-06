import React from 'react';

const Privacy = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="mb-6">
        <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="text-lg text-gray-700">
          At Cloth2Cash, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Personal information (name, email, phone number, address)</li>
        <li>Clothing items details and photos</li>
        <li>Payment and transaction information</li>
        <li>Usage data and website analytics</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Process your clothing sales and pickups</li>
        <li>Communicate with you about our services</li>
        <li>Improve our platform and user experience</li>
        <li>Send promotional offers (with your consent)</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h3>
      <p className="text-gray-700 mb-6">
        We implement industry-standard security measures to protect your personal information. 
        Your data is encrypted and stored securely on our servers.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h3>
      <p className="text-gray-700 mb-6">
        You have the right to access, update, or delete your personal information. 
        You can also opt-out of marketing communications at any time.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h3>
      <p className="text-gray-700">
        If you have any questions about this Privacy Policy, please contact us at sumanqaj9876@gmail.com
      </p>
    </div>
  );
};

export default Privacy;