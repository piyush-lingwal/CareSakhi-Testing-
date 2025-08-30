import React, { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, Edit, Save, X, MapPin, Wallet as WalletIcon, Users, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 89.99,
      items: [
        { name: 'EcoFlow Cup', quantity: 1, price: 45 },
        { name: 'ComfortMax Brief', quantity: 2, price: 32 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 52.00,
      items: [
        { name: 'PureFlex Cup', quantity: 1, price: 52 }
      ]
    }
  ];

  const mockWishlist = [
    {
      id: 3,
      name: 'Travel Kit Pro',
      price: 25,
      image: 'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 5,
      name: 'ActiveFlow Brief',
      price: 38,
      image: 'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'map', name: 'Find Stores', icon: MapPin },
    { id: 'wallet', name: 'Wallet', icon: WalletIcon },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Sidebar */}
              <div className="md:w-64 bg-gray-50 border-r">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <img
                      src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800">{user?.name}</h2>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {tabs.map(tab => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span>{tab.name}</span>
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={profileData.city}
                          onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={profileData.state}
                          onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>
                    
                    <div className="space-y-6">
                      {mockOrders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-800">Order {order.id}</h3>
                              <p className="text-sm text-gray-600">Placed on {order.date}</p>
                            </div>
                            <div className="text-right">
                              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status}
                              </div>
                              <div className="text-lg font-bold text-gray-800 mt-1">
                                ${order.total}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'map' && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Nearby Stores</h1>
                    
                    {/* User Profiles Section */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Community Profiles</h2>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-pink-600" />
                            Fellow Customers
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                              <div className="flex items-center space-x-3">
                                <img
                                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                                  alt="Priya Sharma"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <div className="font-medium text-gray-800">Priya Sharma</div>
                                  <div className="text-sm text-gray-600">Mumbai, Maharashtra</div>
                                  <div className="text-xs text-pink-600">Active user • 4.8★</div>
                                </div>
                              </div>
                              <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                                Connect
                              </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                              <div className="flex items-center space-x-3">
                                <img
                                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                                  alt="Anjali Patel"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <div className="font-medium text-gray-800">Anjali Patel</div>
                                  <div className="text-sm text-gray-600">Delhi, India</div>
                                  <div className="text-xs text-pink-600">New member • 5.0★</div>
                                </div>
                              </div>
                              <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                                Connect
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-purple-600" />
                            Top Distributors
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                              <div className="flex items-center space-x-3">
                                <img
                                  src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100"
                                  alt="Meera Gupta"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <div className="font-medium text-gray-800">Meera Gupta</div>
                                  <div className="text-sm text-gray-600">Bangalore, Karnataka</div>
                                  <div className="text-xs text-purple-600">Gold Level • 1,250 coins</div>
                                </div>
                              </div>
                              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                View
                              </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                              <div className="flex items-center space-x-3">
                                <img
                                  src="https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=100"
                                  alt="Kavya Singh"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <div className="font-medium text-gray-800">Kavya Singh</div>
                                  <div className="text-sm text-gray-600">Chennai, Tamil Nadu</div>
                                  <div className="text-xs text-purple-600">Silver Level • 890 coins</div>
                                </div>
                              </div>
                              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-8 text-center mb-6">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</h3>
                      <p className="text-gray-600 mb-6">
                        Find nearby New Age Distributers and Pharmacies
                      </p>
                      <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                        Enable Location
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-800 mb-3">New Age Distributers</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">CareSakhi Store - Central</div>
                              <div className="text-sm text-gray-600">0.5 km away</div>
                            </div>
                            <button className="text-pink-600 hover:text-pink-700 font-medium">
                              Visit
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">CareSakhi Store - North</div>
                              <div className="text-sm text-gray-600">1.2 km away</div>
                            </div>
                            <button className="text-pink-600 hover:text-pink-700 font-medium">
                              Visit
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-800 mb-3">Partner Pharmacies</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">HealthPlus Pharmacy</div>
                              <div className="text-sm text-gray-600">0.8 km away</div>
                            </div>
                            <button className="text-pink-600 hover:text-pink-700 font-medium">
                              Visit
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">MediCare Pharmacy</div>
                              <div className="text-sm text-gray-600">1.5 km away</div>
                            </div>
                            <button className="text-pink-600 hover:text-pink-700 font-medium">
                              Visit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'wallet' && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">CareSakhi Wallet</h1>
                    
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
                          <div className="text-3xl font-bold">₹250.00</div>
                        </div>
                        <WalletIcon className="w-12 h-12 opacity-80" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Add Money
                          </button>
                          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            View Transactions
                          </button>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Cashback received</span>
                            <span className="text-green-600 font-medium">+₹25</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Purchase payment</span>
                            <span className="text-red-600 font-medium">-₹45</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Wishlist</h1>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockWishlist.map(item => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-gray-800">${item.price}</span>
                              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
                        <div className="space-y-4">
                          <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" defaultChecked />
                            <span className="ml-3 text-gray-700">Email notifications for orders</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" defaultChecked />
                            <span className="ml-3 text-gray-700">Marketing emails</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                            <span className="ml-3 text-gray-700">SMS notifications</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy</h3>
                        <div className="space-y-4">
                          <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" defaultChecked />
                            <span className="ml-3 text-gray-700">Make profile public</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                            <span className="ml-3 text-gray-700">Share data for analytics</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h3>
                        <p className="text-red-600 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;