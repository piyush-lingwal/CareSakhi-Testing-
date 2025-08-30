import React, { useState } from 'react';
import { Check, Gift, Truck, Calendar, Star } from 'lucide-react';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('quarterly');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 35,
      originalPrice: 45,
      savings: 10,
      badge: null,
      features: [
        'Free shipping',
        'Cancel anytime',
        'Expert support',
        'Exclusive member pricing'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: 90,
      originalPrice: 135,
      savings: 45,
      badge: 'Most Popular',
      features: [
        'Free shipping',
        'Cancel anytime',
        'Expert support',
        'Exclusive member pricing',
        'Free travel kit',
        'Priority customer service'
      ]
    },
    {
      id: 'annual',
      name: 'Annual',
      price: 300,
      originalPrice: 540,
      savings: 240,
      badge: 'Best Value',
      features: [
        'Free shipping',
        'Cancel anytime',
        'Expert support',
        'Exclusive member pricing',
        'Free travel kit',
        'Priority customer service',
        'Bonus wellness products',
        'Early access to new products'
      ]
    }
  ];

  const subscriptionProducts = [
    {
      id: 1,
      name: 'EcoFlow Cup',
      price: 45,
      image: 'https://m.media-amazon.com/images/I/61wyEsdAzeL._UF1000,1000_QL80_.jpg',
      category: 'Cups'
    },
    {
      id: 2,
      name: 'ComfortMax Brief',
      price: 32,
      image: 'https://assets.ajio.com/medias/sys_master/root/20230624/kLAT/64969b5deebac147fcf8c662/-473Wx593H-465254370-multi-MODEL.jpg',
      category: 'Underwear'
    },
    {
      id: 3,
      name: 'PureFlex Cup',
      price: 52,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKVsXpemHh-vl6N8VPLE3oMO1GpKNwZ5GSXRhkpUjGuoOkWC7-lLBk21vdiFnsQA5OXhDZdV4RlfBh3q089on-6CyXxE-uhA8m0aD2gUbgNURbdvxrFbzc-g',
      category: 'Cups'
    }
  ];

  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Always free shipping on all subscription orders'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Pause, skip, or modify your subscription anytime'
    },
    {
      icon: Gift,
      title: 'Exclusive Perks',
      description: 'Member-only discounts and early access to new products'
    },
    {
      icon: Star,
      title: 'Premium Support',
      description: 'Priority customer service and expert guidance'
    }
  ];

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section id="subscription" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
              Never Run Out Again
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our subscription service for convenient deliveries, exclusive discounts, and 
            the peace of mind that comes with always having your favorite products on hand.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full mb-4 group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all">
                  <IconComponent className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Subscription Plans */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Choose Your Subscription Plan
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                  selectedPlan === plan.id
                    ? 'border-emerald-500 shadow-emerald-100'
                    : 'border-gray-100 hover:border-emerald-200'
                } ${plan.badge ? 'ring-2 ring-emerald-500 ring-opacity-50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-gray-800">
                          ${plan.price}
                        </span>
                        <span className="text-gray-500">
                          /{plan.name.toLowerCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <span className="text-gray-400 line-through">
                          ${plan.originalPrice}
                        </span>
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                          Save ${plan.savings}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Selection */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Customize Your Subscription
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionProducts.map((product) => (
              <div
                key={product.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedProducts.includes(product.id)
                    ? 'border-emerald-500 transform scale-105'
                    : 'border-gray-100 hover:border-emerald-200'
                }`}
                onClick={() => toggleProductSelection(product.id)}
              >
                {/* Selection Indicator */}
                {selectedProducts.includes(product.id) && (
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-1 shadow-lg z-10">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="p-6">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm text-emerald-600 font-medium">
                      {product.category}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h4>
                    <div className="text-xl font-bold text-gray-800">
                      ${product.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of women who've made the sustainable switch. 
              Start your subscription today and never worry about running out again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                Start Subscription - ${plans.find(p => p.id === selectedPlan)?.price}
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300">
                Learn More
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Cancel anytime • Free shipping • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;