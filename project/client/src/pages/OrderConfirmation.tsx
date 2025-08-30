import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  const orderDetails = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    total: 127.99,
    items: [
      { name: 'EcoFlow Cup', quantity: 1, price: 45 },
      { name: 'ComfortMax Brief', quantity: 2, price: 32 },
      { name: 'Travel Kit Pro', quantity: 1, price: 25 }
    ],
    shipping: {
      method: 'Standard Shipping',
      address: '123 Main St, San Francisco, CA 94105',
      estimatedDelivery: '3-5 business days'
    }
  };

  const orderSteps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been received and confirmed',
      status: 'completed'
    },
    {
      icon: Package,
      title: 'Processing',
      description: 'We\'re preparing your items for shipment',
      status: 'current'
    },
    {
      icon: Truck,
      title: 'Shipped',
      description: 'Your order is on its way to you',
      status: 'pending'
    },
    {
      icon: Mail,
      title: 'Delivered',
      description: 'Your order has been delivered',
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your order. We've received your payment and will begin processing your items.
            </p>
            <p className="text-gray-500">
              Order #{orderId} • Placed on {orderDetails.date}
            </p>
          </div>

          {/* Order Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Order Status</h2>
            
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-8">
                {orderSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="relative flex items-center">
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                        step.status === 'completed' 
                          ? 'bg-green-600 border-green-600 text-white'
                          : step.status === 'current'
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="ml-6">
                        <h3 className={`text-lg font-semibold ${
                          step.status === 'completed' || step.status === 'current'
                            ? 'text-gray-800'
                            : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${
                          step.status === 'completed' || step.status === 'current'
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{(orderDetails.total / 1.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₹{(orderDetails.total * 0.08 / 1.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Shipping Method</h3>
                  <p className="text-gray-600">{orderDetails.shipping.method}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Delivery Address</h3>
                  <p className="text-gray-600">{orderDetails.shipping.address}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Estimated Delivery</h3>
                  <p className="text-gray-600">{orderDetails.shipping.estimatedDelivery}</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• You'll receive a shipping confirmation email with tracking information</li>
                  <li>• Track your order status in your account dashboard</li>
                  <li>• Contact us if you have any questions about your order</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account"
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>View Order Details</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/products"
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
            
            <p className="text-gray-600">
              Need help? <Link to="/contact" className="text-emerald-600 hover:text-emerald-700">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;