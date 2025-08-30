import React, { useState } from 'react';
import { Play, CheckCircle, AlertTriangle, Droplets } from 'lucide-react';

const HowToUse = () => {
  const [activeProduct, setActiveProduct] = useState('cup');

  const cupSteps = [
    {
      step: 1,
      title: 'Wash Your Hands',
      description: 'Always start with clean hands to maintain hygiene.',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      step: 2,
      title: 'Fold the Cup',
      description: 'Try the C-fold, punch-down fold, or 7-fold to make insertion easier.',
      image: 'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      step: 3,
      title: 'Insert Gently',
      description: 'Relax and insert at a 45-degree angle toward your tailbone.',
      image: 'https://images.pexels.com/photos/7319326/pexels-photo-7319326.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      step: 4,
      title: 'Check the Seal',
      description: 'Ensure the cup has opened fully and created a seal.',
      image: 'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const underwearSteps = [
    {
      step: 1,
      title: 'Choose Your Size',
      description: 'Select the right size for optimal comfort and protection.',
      image: 'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      step: 2,
      title: 'Wear Like Regular Underwear',
      description: 'Put on your period underwear just like regular underwear.',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      step: 3,
      title: 'Go About Your Day',
      description: 'Enjoy up to 12 hours of leak-proof protection.',
      image: 'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      step: 4,
      title: 'Rinse and Wash',
      description: 'Rinse in cold water, then machine wash with regular detergent.',
      image: 'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const tips = [
    {
      icon: CheckCircle,
      title: 'Practice Makes Perfect',
      description: 'It may take a few cycles to get comfortable with insertion and removal.',
      color: 'text-green-600'
    },
    {
      icon: Droplets,
      title: 'Stay Hydrated',
      description: 'Drinking water can help with easier insertion and overall comfort.',
      color: 'text-blue-600'
    },
    {
      icon: AlertTriangle,
      title: 'Listen to Your Body',
      description: 'If you feel discomfort, the cup may not be positioned correctly.',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">How to Use</h1>
            <p className="text-xl text-gray-600">
              Step-by-step guides for using your CareSakhi products
            </p>
          </div>

          {/* Product Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveProduct('cup')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeProduct === 'cup'
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                Menstrual Cups
              </button>
              <button
                onClick={() => setActiveProduct('underwear')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeProduct === 'underwear'
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                Period Underwear
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {(activeProduct === 'cup' ? cupSteps : underwearSteps).map((step, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Watch Our Tutorial Videos</h2>
              <p className="text-gray-600 mb-8">
                Visual guides to help you get started with confidence
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                  <img
                    src="https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Cup tutorial"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 p-4 rounded-full hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-pink-600 ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">Menstrual Cup Tutorial</h3>
                    <p className="text-sm opacity-90">5:30 minutes</p>
                  </div>
                </div>
                
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                  <img
                    src="https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Underwear tutorial"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 p-4 rounded-full hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-pink-600 ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">Period Underwear Guide</h3>
                    <p className="text-sm opacity-90">3:45 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Pro Tips</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {tips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 text-center">
                    <IconComponent className={`w-8 h-8 mx-auto mb-4 ${tip.color}`} />
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{tip.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;