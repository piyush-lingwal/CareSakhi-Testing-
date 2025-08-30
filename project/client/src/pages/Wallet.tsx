import React, { useState } from 'react';
import { Wallet as WalletIcon, Plus, Minus, CreditCard, Gift, TrendingUp, History } from 'lucide-react';

const Wallet = () => {
  const [balance, setBalance] = useState(250.00);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 50.00,
      description: 'Cashback from purchase',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 32.00,
      description: 'Purchase - ComfortMax Brief',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 100.00,
      description: 'Wallet top-up',
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: 4,
      type: 'credit',
      amount: 25.00,
      description: 'Referral bonus',
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  const offers = [
    {
      id: 1,
      title: 'First Purchase Bonus',
      description: 'Get ₹50 cashback on your first purchase above ₹500',
      cashback: 50,
      validity: '31 Jan 2024'
    },
    {
      id: 2,
      title: 'Refer & Earn',
      description: 'Earn ₹25 for every friend you refer',
      cashback: 25,
      validity: 'Ongoing'
    },
    {
      id: 3,
      title: 'Monthly Subscription',
      description: 'Get 10% cashback on subscription orders',
      cashback: '10%',
      validity: 'Monthly'
    }
  ];

  const handleAddMoney = () => {
    if (amount && parseFloat(amount) > 0) {
      setBalance(prev => prev + parseFloat(amount));
      setAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">CareSakhi Wallet</h1>
            <p className="text-gray-600">Manage your wallet balance and transactions</p>
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <WalletIcon className="w-8 h-8" />
                  <h2 className="text-2xl font-semibold">Wallet Balance</h2>
                </div>
                <div className="text-4xl font-bold mb-2">₹{balance.toFixed(2)}</div>
                <p className="text-pink-100">Available for purchases</p>
              </div>
              <div className="text-right">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <TrendingUp className="w-8 h-8 mb-2" />
                  <div className="text-sm">This Month</div>
                  <div className="text-lg font-semibold">+₹125</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-green-600" />
                Add Money
              </h3>
              <div className="space-y-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <div className="grid grid-cols-3 gap-2">
                  {[100, 500, 1000].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className="py-2 px-4 border border-gray-300 rounded-lg hover:border-pink-500 hover:text-pink-600 transition-colors"
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddMoney}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Add Money
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Gift className="w-5 h-5 mr-2 text-pink-600" />
                Earn Rewards
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="text-gray-700">Refer a friend</span>
                  <span className="text-pink-600 font-semibold">+₹25</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Complete profile</span>
                  <span className="text-purple-600 font-semibold">+₹10</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">First purchase</span>
                  <span className="text-green-600 font-semibold">+₹50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', name: 'Overview', icon: WalletIcon },
                  { id: 'transactions', name: 'Transactions', icon: History },
                  { id: 'offers', name: 'Offers', icon: Gift }
                ].map(tab => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-pink-500 text-pink-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <div className="text-green-600 text-2xl font-bold">₹{balance.toFixed(2)}</div>
                    <div className="text-green-700 font-medium">Current Balance</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <div className="text-blue-600 text-2xl font-bold">₹125</div>
                    <div className="text-blue-700 font-medium">This Month Earned</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <div className="text-purple-600 text-2xl font-bold">₹87</div>
                    <div className="text-purple-700 font-medium">This Month Spent</div>
                  </div>
                </div>
              )}

              {activeTab === 'transactions' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <Plus className="w-4 h-4 text-green-600" />
                          ) : (
                            <Minus className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{transaction.description}</div>
                          <div className="text-sm text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'offers' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Available Offers</h3>
                  {offers.map(offer => (
                    <div key={offer.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-800">{offer.title}</h4>
                        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                          ₹{offer.cashback}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{offer.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Valid till: {offer.validity}</span>
                        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                          Claim Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;