import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles, Leaf, Shield, Download, Smartphone } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroContent = [
    {
      title: "Your Trusted Period Companion",
      subtitle: "Sustainable • Comfortable • Empowering",
      description: "Join thousands of women who trust CareSakhi for their menstrual health. Better for you, better for the planet."
    },
    {
      title: "Up to 10 Years of Protection",
      subtitle: "Premium Quality • Cost Effective",
      description: "Our medical-grade silicone cups and innovative period underwear provide long-lasting comfort and reliability."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-300 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-300 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium animate-bounce-subtle">
                  <Sparkles className="w-4 h-4" />
                  <span>Trusted by 50,000+ Women</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {heroContent[currentSlide].title}
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl font-semibold text-gray-700">
                  {heroContent[currentSlide].subtitle}
                </p>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  {heroContent[currentSlide].description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="group bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform inline-flex items-center justify-center"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Shop Now</span>
                    <ChevronDown className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link
                  to="/period-tracker"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center"
                >
                  Track Period
                </Link>
              </div>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Leaf className="w-5 h-5 text-pink-500" />
                  <span>Eco-Friendly</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-5 h-5 text-pink-500" />
                  <span>Medical Grade</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span>12hr Protection</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                  <img 
                    src="public\\unnamed.png"
                    alt="Sustainable menstrual products"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">10+</div>
                  <div className="text-sm text-gray-600">Years Protection</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-float-delay">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$2,000</div>
                  <div className="text-sm text-gray-600">Lifetime Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-20 bg-white rounded-3xl p-8 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Download CareSakhi App
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Track your periods, get personalized insights, and shop seamlessly with our mobile app.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Now</span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl">
                <Smartphone className="w-16 h-16 text-pink-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;