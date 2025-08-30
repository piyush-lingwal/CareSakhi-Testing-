import React from 'react';
import { Truck, Clock, MapPin, Package, Shield, CreditCard, Mail } from 'lucide-react';

const ShippingPolicy = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      duration: '5-7 business days',
      cost: 'Free on orders ₹1,500+',
      description: 'Regular delivery to your doorstep'
    },
    {
      name: 'Express Shipping',
      duration: '2-3 business days',
      cost: '₹150',
      description: 'Faster delivery for urgent orders'
    },
    {
      name: 'Same Day Delivery',
      duration: 'Within 24 hours',
      cost: '₹300',
      description: 'Available in select metro cities'
    }
  ];

  const deliveryZones = [
    { zone: 'Metro Cities', duration: '2-3 days', cities: 'Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune' },
    { zone: 'Tier 1 Cities', duration: '3-5 days', cities: 'Ahmedabad, Kolkata, Surat, Jaipur, Lucknow' },
    { zone: 'Tier 2 Cities', duration: '5-7 days', cities: 'Indore, Bhopal, Coimbatore, Kochi, Nagpur' },
    { zone: 'Other Areas', duration: '7-10 days', cities: 'All other serviceable locations' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Shipping Policy</h1>
            <p className="text-xl text-gray-600">
              Fast, reliable delivery across India
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <Truck className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.name}</h3>
                  <div className="text-2xl font-bold text-pink-600 mb-2">{option.duration}</div>
                  <div className="text-lg font-medium text-gray-700 mb-3">{option.cost}</div>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Zones */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-pink-600" />
              Delivery Zones
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Zone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Delivery Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((zone, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-800">{zone.zone}</td>
                      <td className="py-3 px-4 text-gray-600">{zone.duration}</td>
                      <td className="py-3 px-4 text-gray-600">{zone.cities}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2 text-pink-600" />
                Order Processing
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Processing Time</h3>
                    <p className="text-gray-600 text-sm">Orders are processed within 1-2 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Secure Packaging</h3>
                    <p className="text-gray-600 text-sm">Discreet, eco-friendly packaging for privacy</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Payment Confirmation</h3>
                    <p className="text-gray-600 text-sm">Orders ship after payment verification</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Important Notes</h2>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Free Shipping Threshold</h3>
                  <p className="text-gray-600 text-sm">
                    Enjoy free standard shipping on all orders above ₹1,500. 
                    Orders below this amount incur a ₹99 shipping fee.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Delivery Attempts</h3>
                  <p className="text-gray-600 text-sm">
                    We make up to 3 delivery attempts. If unsuccessful, 
                    the package will be returned to our facility.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Address Accuracy</h3>
                  <p className="text-gray-600 text-sm">
                    Please ensure your delivery address is complete and accurate. 
                    We are not responsible for delays due to incorrect addresses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center">
            <Mail className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Questions?</h2>
            <p className="text-gray-600 mb-6">
              Need help with your order or have questions about shipping? Our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Track Your Order
              </button>
              <button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;