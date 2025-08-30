import React from 'react';
import { Eye, Ear, Hand, Brain, Heart, Settings, CheckCircle } from 'lucide-react';

const Accessibility = () => {
  const features = [
    {
      icon: Eye,
      title: 'Visual Accessibility',
      description: 'High contrast colors, scalable fonts, and screen reader compatibility',
      details: [
        'WCAG 2.1 AA compliant color contrast ratios',
        'Scalable text up to 200% without loss of functionality',
        'Alternative text for all images and graphics',
        'Clear visual hierarchy and focus indicators'
      ]
    },
    {
      icon: Ear,
      title: 'Audio Accessibility',
      description: 'Audio descriptions and captions for multimedia content',
      details: [
        'Captions for all video content',
        'Audio descriptions for visual elements',
        'No auto-playing audio content',
        'Volume controls for all audio elements'
      ]
    },
    {
      icon: Hand,
      title: 'Motor Accessibility',
      description: 'Keyboard navigation and touch-friendly interfaces',
      details: [
        'Full keyboard navigation support',
        'Large touch targets (minimum 44px)',
        'No time-sensitive interactions',
        'Alternative input methods supported'
      ]
    },
    {
      icon: Brain,
      title: 'Cognitive Accessibility',
      description: 'Clear language, consistent navigation, and helpful error messages',
      details: [
        'Simple, clear language throughout',
        'Consistent navigation patterns',
        'Helpful error messages and guidance',
        'Progress indicators for multi-step processes'
      ]
    }
  ];

  const assistiveTech = [
    'Screen readers (JAWS, NVDA, VoiceOver)',
    'Voice recognition software',
    'Switch navigation devices',
    'Eye-tracking systems',
    'Keyboard-only navigation',
    'Mobile accessibility features'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Accessibility Statement</h1>
            <p className="text-xl text-gray-600">
              CareSakhi is committed to ensuring digital accessibility for all users
            </p>
          </div>

          {/* Commitment */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4">
              <Heart className="w-8 h-8 text-pink-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At CareSakhi, we believe that everyone deserves equal access to menstrual health information 
                  and products. We are committed to providing an inclusive digital experience that serves users 
                  of all abilities.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We continuously work to improve the accessibility of our website and mobile applications, 
                  following Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                </p>
              </div>
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-pink-100 rounded-full">
                      <IconComponent className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Assistive Technology */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-pink-600" />
              Supported Assistive Technologies
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assistiveTech.map((tech, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">{tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback and Contact */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Accessibility Feedback</h2>
              <p className="text-gray-600 mb-6">
                We welcome your feedback on the accessibility of our website. 
                Please let us know if you encounter accessibility barriers.
              </p>
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Report Accessibility Issue
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Accessibility Coordinator</h3>
                  <p className="text-gray-600 text-sm">accessibility@caresakhi.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone Support</h3>
                  <p className="text-gray-600 text-sm">1-800-CARE-ACCESS</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Response Time</h3>
                  <p className="text-gray-600 text-sm">We respond to accessibility inquiries within 2 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;