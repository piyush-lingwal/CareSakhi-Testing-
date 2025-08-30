import React from 'react';
import { Leaf, Recycle, Globe, Award, TrendingDown, Users } from 'lucide-react';

const Sustainability = () => {
  const impactStats = [
    {
      icon: Leaf,
      number: '2.4M',
      label: 'Disposable products saved from landfills',
      color: 'text-green-600'
    },
    {
      icon: TrendingDown,
      number: '85%',
      label: 'Reduction in period-related waste',
      color: 'text-blue-600'
    },
    {
      icon: Globe,
      number: '500kg',
      label: 'CO2 emissions prevented per user',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      number: '50,000+',
      label: 'Women making sustainable choices',
      color: 'text-pink-600'
    }
  ];

  const initiatives = [
    {
      title: 'Carbon Neutral Shipping',
      description: 'All our shipments are carbon neutral through verified offset programs.',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Plastic-Free Packaging',
      description: 'Our packaging is 100% recyclable and made from sustainable materials.',
      image: 'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Tree Planting Program',
      description: 'We plant a tree for every 10 products sold through our reforestation partners.',
      image: 'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const certifications = [
    { name: 'B Corp Certified', description: 'Meeting highest standards of social and environmental performance' },
    { name: 'Carbon Neutral', description: 'Certified carbon neutral operations and shipping' },
    { name: 'Plastic Negative', description: 'Removing more plastic from the environment than we use' },
    { name: 'Fair Trade', description: 'Ethical sourcing and fair labor practices' }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Our Commitment to Sustainability
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe that caring for your body and caring for the planet go hand in hand. 
              Every product we create is designed with sustainability at its core.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Environmental Impact</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4 group-hover:from-green-100 group-hover:to-green-200">
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                    <p className="text-gray-600 leading-relaxed">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">The Problem We're Solving</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    The average woman uses over 11,000 disposable menstrual products in her lifetime. 
                    These products take 500-800 years to decompose, creating a massive environmental burden.
                  </p>
                  <p>
                    In India alone, over 12 billion sanitary pads are disposed of annually, 
                    most ending up in landfills or being incinerated, releasing harmful toxins.
                  </p>
                  <p>
                    The plastic in conventional pads and tampons contributes to ocean pollution, 
                    affecting marine life and entering our food chain.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Environmental impact"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src="https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sustainable products"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Sustainable Solution</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Our reusable menstrual products offer a sustainable alternative that doesn't compromise on comfort or protection.
                  </p>
                  <p>
                    Made from medical-grade silicone and organic materials, our products last for years, 
                    dramatically reducing waste and saving money.
                  </p>
                  <p>
                    By choosing CareSakhi, you're not just making a personal health choice – 
                    you're joining a movement toward a more sustainable future.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">10 Years</div>
                    <div className="text-sm text-gray-600">Product Lifespan</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹50,000</div>
                    <div className="text-sm text-gray-600">Lifetime Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Green Initiatives</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {initiatives.map((initiative, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{initiative.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{initiative.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Certifications</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-lg">
                  <Award className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{cert.name}</h3>
                    <p className="text-gray-600">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Join the Sustainable Period Movement</h2>
            <p className="text-xl mb-8 opacity-90">
              Make the switch to sustainable period products and be part of the solution. 
              Together, we can create a healthier planet for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Shop Sustainable Products
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;