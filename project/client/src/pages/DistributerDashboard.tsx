import React, { useState } from 'react';
import { Package, TrendingUp, Users, MapPin, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const DistributerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'EcoFlow Cup',
      stock: 25,
      price: 45,
      sold: 15,
      status: 'active'
    },
    {
      id: 2,
      name: 'ComfortMax Brief',
      stock: 12,
      price: 32,
      sold: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'Travel Kit Pro',
      stock: 5,
      price: 25,
      sold: 3,
      status: 'low_stock'
    }
  ]);

  const orders = [
    {
      id: 'ORD-001',
      customer: 'Sarah Johnson',
      product: 'EcoFlow Cup',
      quantity: 2,
      amount: 90,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'ORD-002',
      customer: 'Emma Rodriguez',
      product: 'ComfortMax Brief',
      quantity: 1,
      amount: 32,
      status: 'completed',
      date: '2024-01-14'
    }
  ];

  const stats = [
    { title: 'Total Sales', value: '₹12,450', change: '+15%', icon: TrendingUp, color: 'green' },
    { title: 'Active Products', value: '12', change: '+2', icon: Package, color: 'blue' },
    { title: 'Customers', value: '48', change: '+8', icon: Users, color: 'purple' },
    { title: 'Orders Today', value: '6', change: '+3', icon: Package, color: 'pink' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">New Age Distributer Dashboard</h1>
            <p className="text-gray-600">Manage your inventory and track sales</p>
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
                  { id: 'orders', name: 'Orders' },
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
                  {/* Gamification Section */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">CareSakhi Rewards</h3>
                          <p className="text-gray-600">Earn coins for every successful order</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-600">{walletData.coins}</div>
                        <div className="text-sm text-gray-600">Available Coins</div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">₹845</div>
                        <div className="text-sm text-gray-600">Orders This Month</div>
                        <div className="text-xs text-green-600">+84 coins earned</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-gray-600">Successful Orders</div>
                        <div className="text-xs text-blue-600">This week</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">Level 3</div>
                        <div className="text-sm text-gray-600">Distributor Rank</div>
                        <div className="text-xs text-purple-600">Gold Status</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">How to Earn Coins:</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Coins className="w-4 h-4 text-yellow-600" />
                          <span>1 coin per ₹10 order value</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-600" />
                          <span>Bonus coins for customer reviews</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-600" />
                          <span>Monthly performance bonuses</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span>Referral rewards</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gamification Section */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">CareSakhi Rewards</h3>
                          <p className="text-gray-600">Earn coins for every successful order</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-600">{walletData.coins}</div>
                        <div className="text-sm text-gray-600">Available Coins</div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">₹845</div>
                        <div className="text-sm text-gray-600">Orders This Month</div>
                        <div className="text-xs text-green-600">+84 coins earned</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-gray-600">Successful Orders</div>
                        <div className="text-xs text-blue-600">This week</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">Level 3</div>
                        <div className="text-sm text-gray-600">Distributor Rank</div>
                        <div className="text-xs text-purple-600">Gold Status</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">New order from Sarah Johnson</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">Stock updated for EcoFlow Cup</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">Low stock alert: Travel Kit Pro</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                          Add New Product
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
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Sold</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b border-gray-100">
                            <td className="py-3 px-4">{product.name}</td>
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
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {product.status === 'active' ? 'Active' : 'Low Stock'}
                              </span>
                            </td>
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

              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Orders</h3>
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">Order {order.id}</h4>
                            <p className="text-gray-600">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.product} × {order.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-800">₹{order.amount}</div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Store Location</h3>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Update Your Location</h4>
                    <p className="text-gray-600 mb-6">
                      Set your store location to help customers find you easily
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

export default DistributerDashboard;