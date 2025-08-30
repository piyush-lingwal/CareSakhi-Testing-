import React from 'react';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Mail } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: 'By accessing and using CareSakhi\'s website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: 'Use License',
      icon: Scale,
      content: 'Permission is granted to temporarily download one copy of the materials on CareSakhi\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.'
    },
    {
      title: 'Product Information',
      icon: FileText,
      content: 'We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. All products are subject to availability.'
    },
    {
      title: 'Privacy and Data Protection',
      icon: Shield,
      content: 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our services. By using our services, you agree to the collection and use of information in accordance with our Privacy Policy.'
    },
    {
      title: 'Prohibited Uses',
      icon: AlertTriangle,
      content: 'You may not use our products or services for any illegal or unauthorized purpose, to violate any international, federal, provincial, or state laws, to transmit or procure the sending of any advertising or promotional material, or to impersonate or attempt to impersonate the company.'
    }
  ];

  const userResponsibilities = [
    'Provide accurate and complete information',
    'Maintain the security of your account',
    'Use products as intended and follow care instructions',
    'Respect intellectual property rights',
    'Comply with all applicable laws and regulations'
  ];

  const limitations = [
    'Products are not medical devices and should not replace professional medical advice',
    'Individual results may vary based on personal anatomy and usage',
    'We are not liable for damages resulting from misuse of products',
    'Service availability may vary by location',
    'Prices and promotions are subject to change without notice'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using our services
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: January 15, 2024
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to CareSakhi</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") govern your use of CareSakhi's website, mobile application, 
              and services. By accessing or using our services, you agree to be bound by these Terms. 
              If you disagree with any part of these terms, then you may not access our services.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-pink-100 rounded-full">
                      <IconComponent className="w-6 h-6 text-pink-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              );
            })}
          </div>

          {/* User Responsibilities */}
          <div className="bg-green-50 rounded-2xl p-8 mt-8 border border-green-200">
            <h2 className="text-2xl font-semibold text-green-800 mb-6">Your Responsibilities</h2>
            <ul className="space-y-3">
              {userResponsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-orange-50 rounded-2xl p-8 mt-8 border border-orange-200">
            <h2 className="text-2xl font-semibold text-orange-800 mb-6">Limitations and Disclaimers</h2>
            <ul className="space-y-3">
              {limitations.map((limitation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center">
            <Mail className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions About These Terms?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms of Service, please contact our legal team.
            </p>
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
              Contact Legal Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;