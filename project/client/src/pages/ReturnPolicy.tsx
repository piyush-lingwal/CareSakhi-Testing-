import React from 'react';
import { RotateCcw, Clock, Shield, CheckCircle, AlertTriangle, Package } from 'lucide-react';

const ReturnPolicy = () => {
  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact our customer service within 30 days of purchase',
      icon: RotateCcw
    },
    {
      step: 2,
      title: 'Get Authorization',
      description: 'Receive return authorization number and shipping label',
      icon: Shield
    },
    {
      step: 3,
      title: 'Package Items',
      description: 'Pack items in original packaging with all accessories',
      icon: Package
    },
    {
      step: 4,
      title: 'Ship Back',
      description: 'Send items back using provided shipping label',
      icon: Clock
    }
  ];

  const eligibleItems = [
    'Unopened menstrual cups in original packaging',
    'Unused period underwear with tags attached',
    'Accessories and kits in original condition',
    'Gift cards and subscription services (within 7 days)'
  ];

  const nonEligibleItems = [
    'Opened or used menstrual cups (for hygiene reasons)',
    'Period underwear that has been worn',
    'Items damaged by misuse or normal wear',
    'Products purchased more than 30 days ago'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Return Policy</h1>
            <p className="text-xl text-gray-600">
              Easy returns within 30 days of purchase
            </p>
          </div>

          {/* Return Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Return Process</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full">
                        <IconComponent className="w-8 h-8 text-pink-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eligible vs Non-Eligible Items */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h2 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Eligible for Return
              </h2>
              <ul className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <h2 className="text-2xl font-semibold text-red-800 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Not Eligible for Return
              </h2>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Refund Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Time</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Credit/Debit Cards</span>
                    <span className="font-medium text-gray-800">5-7 business days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">UPI/Net Banking</span>
                    <span className="font-medium text-gray-800">3-5 business days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">CareSakhi Wallet</span>
                    <span className="font-medium text-gray-800">Instant</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Refund Amount</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800">Full Refund</h4>
                    <p className="text-green-700 text-sm">
                      100% refund for defective products or our error
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800">Partial Refund</h4>
                    <p className="text-blue-700 text-sm">
                      Shipping costs may be deducted for customer-initiated returns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Considerations */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Special Considerations</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Hygiene Products</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Due to the intimate nature of our products, opened menstrual cups and used period underwear 
                  cannot be returned for hygiene and safety reasons. We do accept returns for defective products.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Exchanges</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We offer size exchanges for unopened products within 30 days. 
                  Contact our customer service team to arrange an exchange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;