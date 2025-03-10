import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 to-blue-500 py-12 px-6">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-300 animate-fade-in-down">
          Privacy Policy
        </h1>
        <p className="text-lg md:text-xl text-gray-200 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our Stock Prediction System.
        </p>
        <p className="text-sm text-gray-300 dark:text-gray-400 mt-2">
          Last Updated: March 02, 2025
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        {/* Section 1: Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to the Stock Prediction System ("we," "us," or "our"). This platform provides stock analysis and prediction tools for investors. We are committed to safeguarding your personal information and ensuring transparency in our data practices. This policy outlines how we handle your data in compliance with applicable laws.
          </p>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Personal Information:</strong> When you register, we may collect your name, email address, and preferences (e.g., watchlist stocks).
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Usage Data:</strong> We collect data on how you interact with our platform, such as search queries, page views, and clicked stocks.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Device Information:</strong> IP address, browser type, operating system, and device identifiers may be collected for security and optimization.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Financial Data:</strong> We do not store payment information directly; transactions are processed via secure third-party providers.
            </li>
          </ul>
        </section>

        {/* Section 3: How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
            <li>Provide personalized stock predictions and insights.</li>
            <li>Improve our algorithms and user experience.</li>
            <li>Send you updates, newsletters, or promotional offers (with your consent).</li>
            <li>Ensure the security and integrity of our platform.</li>
          </ul>
        </section>

        {/* Section 4: Data Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            4. Data Sharing
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
            <li>Third-party service providers (e.g., payment processors, analytics tools) under strict confidentiality agreements.</li>
            <li>Legal authorities if required by law or to protect our rights.</li>
          </ul>
        </section>

        {/* Section 5: Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            5. Data Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We implement industry-standard security measures, including encryption and access controls, to protect your data. However, no system is completely immune to breaches, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 6: Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            6. Your Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of marketing communications.</li>
            <li>Request a copy of your data in a portable format.</li>
            <li>
              Contact us at{" "}
              <a href="mailto:kadamajit2002@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">
                kadamajit2002@gmail.com
              </a>{" "}
              to exercise these rights.
            </li>
          </ul>
        </section>

        {/* Section 7: Cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            7. Cookies and Tracking
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use cookies to enhance your experience, track usage, and deliver targeted content. You can manage cookie preferences via your browser settings.
          </p>
        </section>

        {/* Section 8: Third-Party Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            8. Third-Party Links
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our platform may contain links to external sites (e.g., stock exchanges, news outlets). We are not responsible for their privacy practices.
          </p>
        </section>

        {/* Section 9: Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            9. Changes to This Policy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update this Privacy Policy periodically. Changes will be posted here with an updated "Last Updated" date. Continued use of the platform constitutes acceptance of the revised policy.
          </p>
        </section>

        {/* Section 10: Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            10. Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For questions or concerns about this Privacy Policy, please reach out to us at:
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Email:{" "}
            <a href="mailto:kadamajit2002@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">
              kadamajit2002@gmail.com
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Address: Stock Prediction System, 123 Market Street, Mumbai, India
          </p>
        </section>

        {/* Section 11: Disclaimer on Predictions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            11. Disclaimer on Predictions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The Stock Prediction System provides tools and insights based on historical data and predictive algorithms. However, these predictions may occasionally be inaccurate or provide misleading signals for buying or selling stocks. We strongly recommend that you recheck all information and consult with a financial advisor before making any financial decisions. We are not liable for any losses incurred due to reliance on our predictions.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 text-white py-6 px-6 text-center rounded-t-lg">
        <p className="text-sm">© 2025 Stock Prediction App. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Home
          </Link>
          <Link to="/about" className="text-blue-400 hover:text-blue-300">
            About
          </Link>
          <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;