import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal information you provide when creating an account',
        'Health data you choose to track in our period tracker',
        'Purchase history and preferences',
        'Communication preferences and feedback',
        'Technical information about your device and usage patterns'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Provide and improve our products and services',
        'Personalize your experience and recommendations',
        'Process orders and handle customer support',
        'Send important updates about your account or orders',
        'Conduct research to improve menstrual health products'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We never sell your personal information to third parties',
        'Health data is encrypted and stored securely',
        'Anonymous, aggregated data may be used for research',
        'Information shared only with your explicit consent',
        'Legal compliance when required by law'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'Industry-standard encryption for all sensitive data',
        'Regular security audits and updates',
        'Secure payment processing through certified providers',
        'Limited access to personal information by employees',
        'Automatic logout and session management'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">
              Your privacy and data security are our top priorities
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: January 15, 2024
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4">
              <Eye className="w-8 h-8 text-pink-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  At CareSakhi, we understand that your health information is deeply personal. 
                  This Privacy Policy explains how we collect, use, protect, and share your information 
                  when you use our website, mobile app, and services. We are committed to maintaining 
                  the highest standards of privacy and security.
                </p>
              </div>
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-pink-100 rounded-full">
                      <IconComponent className="w-6 h-6 text-pink-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Your Rights */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Access & Control</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• View all data we have about you</li>
                  <li>• Update or correct your information</li>
                  <li>• Download your data</li>
                  <li>• Delete your account and data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Communication</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Opt out of marketing emails</li>
                  <li>• Control notification preferences</li>
                  <li>• Request data processing restrictions</li>
                  <li>• File privacy complaints</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center">
            <Mail className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions About Privacy?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Contact Privacy Team
              </button>
              <button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition-colors">
                Data Request Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;