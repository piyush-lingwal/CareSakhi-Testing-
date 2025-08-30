import React from 'react';
import { Droplets, Thermometer, Clock, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const CareInstructions = () => {
  const cupCare = [
    {
      icon: Droplets,
      title: 'Before First Use',
      description: 'Sterilize by boiling in water for 5-10 minutes',
      color: 'text-blue-600'
    },
    {
      icon: Thermometer,
      title: 'Daily Cleaning',
      description: 'Rinse with cold water, then wash with mild soap',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Between Cycles',
      description: 'Sterilize again before storing in breathable pouch',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Storage',
      description: 'Store in cotton pouch, never in airtight containers',
      color: 'text-orange-600'
    }
  ];

  const underwearCare = [
    {
      step: 1,
      title: 'Rinse Immediately',
      description: 'Rinse with cold water until water runs clear',
      tip: 'Cold water prevents stains from setting'
    },
    {
      step: 2,
      title: 'Machine Wash',
      description: 'Wash in cold water with regular detergent',
      tip: 'Avoid fabric softeners and bleach'
    },
    {
      step: 3,
      title: 'Air Dry',
      description: 'Hang dry or lay flat to maintain elasticity',
      tip: 'Avoid high heat from dryers'
    },
    {
      step: 4,
      title: 'Store Properly',
      description: 'Store in a clean, dry place',
      tip: 'Rotate between multiple pairs'
    }
  ];

  const dosDonts = {
    dos: [
      'Use mild, unscented soap',
      'Sterilize cups between cycles',
      'Store in breathable materials',
      'Replace cups every 5-10 years',
      'Wash underwear in cold water',
      'Air dry when possible'
    ],
    donts: [
      'Use harsh chemicals or bleach',
      'Store cups in airtight containers',
      'Use fabric softeners on underwear',
      'Put underwear in high heat dryer',
      'Share products with others',
      'Ignore signs of wear and tear'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Care Instructions</h1>
            <p className="text-xl text-gray-600">
              Proper care ensures your products last longer and stay hygienic
            </p>
          </div>

          {/* Menstrual Cup Care */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Menstrual Cup Care</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cupCare.map((care, index) => {
                const IconComponent = care.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <IconComponent className={`w-8 h-8 ${care.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{care.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{care.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Period Underwear Care */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Period Underwear Care</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {underwearCare.map((care, index) => (
                <div key={index} className="relative">
                  <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">
                    {care.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{care.title}</h3>
                  <p className="text-gray-600 mb-3">{care.description}</p>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <p className="text-sm text-pink-700">
                      <strong>Tip:</strong> {care.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dos and Don'ts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h2 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Do's
              </h2>
              <ul className="space-y-3">
                {dosDonts.dos.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <h2 className="text-2xl font-semibold text-red-800 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Don'ts
              </h2>
              <ul className="space-y-3">
                {dosDonts.donts.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Troubleshooting</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Cup Issues</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Discoloration</h4>
                    <p className="text-gray-600 text-sm">Normal after use. Soak in hydrogen peroxide solution.</p>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Odor</h4>
                    <p className="text-gray-600 text-sm">Boil for longer or try baking soda paste.</p>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Stiffness</h4>
                    <p className="text-gray-600 text-sm">Normal wear. Replace if comfort is affected.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Underwear Issues</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Staining</h4>
                    <p className="text-gray-600 text-sm">Rinse immediately with cold water and hydrogen peroxide.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Reduced Absorbency</h4>
                    <p className="text-gray-600 text-sm">Avoid fabric softeners. Strip wash occasionally.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Elastic Wear</h4>
                    <p className="text-gray-600 text-sm">Air dry to maintain elasticity. Replace when stretched.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareInstructions;