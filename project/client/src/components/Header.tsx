import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Download, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Period Tracker', href: '/period-tracker' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 lg:py-4 min-h-[80px] lg:min-h-[100px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group ml-2 lg:ml-8 flex-shrink-0">
            <img 
             src="/navbar logo2.png" 
              alt="CareSakhi Logo" 
              className="h-16 lg:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300 max-w-[200px] lg:max-w-none"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium text-sm xl:text-base transition-all duration-300 hover:text-pink-600 relative whitespace-nowrap ${
                  isActive(item.href) 
                    ? 'text-pink-600' 
                    : 'text-gray-700'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4 mr-2 lg:mr-8 flex-shrink-0">
            {/* App Download Button */}
            <button className="hidden xl:flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 xl:px-4 py-2 rounded-full font-medium text-xs xl:text-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors flex-shrink-0"
            >
              <ShoppingCart className="w-5 h-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 lg:space-x-2 p-2 text-gray-700 hover:text-pink-600 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden lg:block font-medium text-sm xl:text-base truncate max-w-[100px] xl:max-w-none">{user.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-44 lg:w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <Link
                      to="/account"
                      className="block px-3 lg:px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/wallet"
                      className="block px-3 lg:px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      Wallet
                    </Link>
                    {user.userType === 'distributer' && (
                      <Link
                        to="/distributer-dashboard"
                        className="block px-3 lg:px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.userType === 'pharmacy' && (
                      <Link
                        to="/pharmacy-dashboard"
                        className="block px-3 lg:px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 lg:px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 font-medium text-sm lg:text-base transition-colors whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-600 text-white px-3 lg:px-4 py-2 rounded-full font-medium text-sm lg:text-base hover:bg-pink-700 transition-colors whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors ml-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 bg-white">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 mx-2 rounded-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-pink-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile App Download */}
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium mt-4 mx-2">
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </button>

              {/* Mobile User Actions */}
              {user ? (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2 mx-2">
                  <Link
                    to="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded-lg transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/wallet"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded-lg transition-colors"
                  >
                    Wallet
                  </Link>
                  {user.userType === 'distributer' && (
                    <Link
                      to="/distributer-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded-lg transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.userType === 'pharmacy' && (
                    <Link
                      to="/pharmacy-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded-lg transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2 mx-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-pink-600 text-white rounded-lg font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;