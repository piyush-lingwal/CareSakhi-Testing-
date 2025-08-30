import React, { useState } from 'react';
import { Package, TrendingUp, Users, MapPin, Plus, Eye, Edit, Trash2, Clock } from 'lucide-react';

const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'EcoFlow Cup',
      stock: 15,
      price: 45,
      sold: 8,
      status: 'active',
      category: 'Menstrual Cups'
    },
    {
      id: 2,
      name: 'ComfortMax Brief',
      stock: 8,
      price: 32,
      sold: 5,
      status: 'active',
      category: 'Period Underwear'
    },
    {
      id: 3,
      name: 'Pain Relief Tablets',
      stock: 25,
      price: 15,
      sold: 12,
      status: 'active',
      category: 'Medication'
    }
  ]);

  const prescriptions = [
    {
      id: 'RX-001',
      patient: 'Sarah Johnson',
      doctor: 'Dr. Smith',
      medication: 'Pain Relief Tablets',
      quantity: 2,
      status: 'ready',
      date: '2024-01-15'
    },
    {
      id: 'RX-002',
      patient: 'Emma Rodriguez',
      doctor: 'Dr. Wilson',
      medication: 'Iron Supplements',
      quantity: 1,
      status: 'processing',
      date: '2024-01-14'
    }
  ];

  const stats = [
    { title: 'Daily Sales', value: '₹8,450', change: '+12%', icon: TrendingUp, color: 'green' },
    { title: 'Prescriptions', value: '24', change: '+6', icon: Package, color: 'blue' },
    { title: 'Customers', value: '156', change: '+18', icon: Users, color: 'purple' },
    { title: 'Pending Orders', value: '3', change: '-2', icon: Clock, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Pharmacy Dashboard</h1>
            <p className="text-gray-600">Manage your pharmacy inventory and prescriptions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className={`text-sm font-medium text-${stat.color}-600`}>{stat.change}</p>
                    </div>
                    <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                      <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', name: 'Overview' },
                  { id: 'products', name: 'Products' },
                  { id: 'prescriptions', name: 'Prescriptions' },
                  { id: 'customers', name: 'Customers' },
                  { id: 'location', name: 'Location' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-pink-500 text-pink-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">3 prescriptions filled</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">12 products sold</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">2 pending prescriptions</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                          Process Prescription
                        </button>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Update Inventory
                        </button>
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                          View Reports
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Product Inventory</h3>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Sold</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b border-gray-100">
                            <td className="py-3 px-4">{product.name}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {product.stock} units
                              </span>
                            </td>
                            <td className="py-3 px-4">₹{product.price}</td>
                            <td className="py-3 px-4">{product.sold}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'prescriptions' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Prescription Management</h3>
                  <div className="space-y-4">
                    {prescriptions.map(prescription => (
                      <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">Prescription {prescription.id}</h4>
                            <p className="text-gray-600">Patient: {prescription.patient}</p>
                            <p className="text-gray-600">Doctor: {prescription.doctor}</p>
                            <p className="text-sm text-gray-500">{prescription.medication} × {prescription.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-2">{prescription.date}</div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              prescription.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {prescription.status === 'ready' ? 'Ready for Pickup' : 'Processing'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Pharmacy Location</h3>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Update Your Location</h4>
                    <p className="text-gray-600 mb-6">
                      Set your pharmacy location to help customers find you easily
                    </p>
                    <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                      Set Location
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;