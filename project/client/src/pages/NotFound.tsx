import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-emerald-200 mb-4">404</div>
            <div className="relative">
              <div className="w-32 h-32 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-16 h-16 text-emerald-400" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for seems to have wandered off. 
            Don't worry, it happens to the best of us!
          </p>

          {/* Suggestions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Here are some suggestions:
            </h2>
            <ul className="text-left space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Check the URL for any typos</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Go back to the previous page</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Visit our homepage to start fresh</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Use the search function to find what you need</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                About Us
              </Link>
              <Link
                to="/blog"
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Still need help?
            </h3>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to assist you.
            </p>
            <Link
              to="/contact"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;