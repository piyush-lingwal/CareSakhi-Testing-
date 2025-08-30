import React from 'react';
import { Ruler, Info, CheckCircle } from 'lucide-react';

const SizeGuide = () => {
  const cupSizes = [
    {
      size: 'Small',
      diameter: '40mm',
      length: '45mm',
      capacity: '25ml',
      recommended: 'Under 30, no vaginal births',
      color: 'bg-pink-100 text-pink-800'
    },
    {
      size: 'Medium',
      diameter: '43mm',
      length: '50mm',
      capacity: '30ml',
      recommended: 'Over 30 or vaginal births',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      size: 'Large',
      diameter: '46mm',
      length: '55mm',
      capacity: '35ml',
      recommended: 'Heavy flow or larger anatomy',
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  const underwearSizes = [
    { size: 'XS', waist: '24-26"', hip: '34-36"' },
    { size: 'S', waist: '26-28"', hip: '36-38"' },
    { size: 'M', waist: '28-30"', hip: '38-40"' },
    { size: 'L', waist: '30-32"', hip: '40-42"' },
    { size: 'XL', waist: '32-34"', hip: '42-44"' },
    { size: 'XXL', waist: '34-36"', hip: '44-46"' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Size Guide</h1>
            <p className="text-xl text-gray-600">
              Find your perfect fit with our comprehensive sizing guide
            </p>
          </div>

          {/* Menstrual Cup Sizes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Ruler className="w-6 h-6 mr-2 text-pink-600" />
              Menstrual Cup Sizes
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {cupSizes.map((cup, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${cup.color}`}>
                    Size {cup.size}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diameter:</span>
                      <span className="font-semibold">{cup.diameter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Length:</span>
                      <span className="font-semibold">{cup.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-semibold">{cup.capacity}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Recommended for:</strong> {cup.recommended}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Period Underwear Sizes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Period Underwear Sizes</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Waist</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {underwearSizes.map((size, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold">{size.size}</td>
                      <td className="py-3 px-4">{size.waist}</td>
                      <td className="py-3 px-4">{size.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sizing Tips */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-pink-600" />
              Sizing Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">For Menstrual Cups:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Age and childbirth history are key factors</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Consider your cervix height and flow</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">When in doubt, start with Medium</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">For Period Underwear:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Measure at the widest part of your hips</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Choose snug fit for best leak protection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Consider sizing up for comfort</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;