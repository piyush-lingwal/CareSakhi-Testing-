import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    products: [
      'Menstrual Cups',
      'Period Underwear',
      'Travel Kits',
      'Accessories',
      'Gift Cards'
    ],
    support: [
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'How to Use', path: '/how-to-use' },
      { name: 'Care Instructions', path: '/care-instructions' },
      { name: 'FAQ', path: '/faq' },
      'Contact Us'
    ],
    company: [
      { name: 'Our Story', path: '/about' },
      { name: 'Sustainability', path: '/sustainability' },
      { name: 'Reviews', path: '/reviews' },
      'Blog',
      { name: 'Careers', path: '/careers' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms-of-service' },
      { name: 'Shipping Policy', path: '/shipping-policy' },
      { name: 'Return Policy', path: '/return-policy' },
      { name: 'Accessibility', path: '/accessibility' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Join the Wecare+ Community
            </h3>
            <p className="text-lg lg:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto px-4">
              Get exclusive offers, period tips, and be the first to know about new products.
            </p>
            
            <div className="flex flex-col lg:flex-row max-w-md mx-auto gap-3 lg:gap-0 px-4">
              <input
                src="/navbar logo2.png" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 lg:py-4 rounded-full lg:rounded-r-none border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800 placeholder-gray-500"
              />
              <button className="bg-white text-emerald-600 px-6 lg:px-8 py-3 lg:py-4 rounded-full lg:rounded-l-none font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-emerald-100 mt-4 px-4">
              Join 100,000+ women in our community. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-6">
            {/* Brand Column */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/navbar logo.png" 
                  alt="CareSakhi Logo" 
                  className="h-20 lg:h-24 w-auto object-contain mx-auto lg:mx-0"
                />
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-sm lg:text-base">
                Your trusted companion for menstrual health with sustainable, comfortable, 
                and empowering products designed for Indian women.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm lg:text-base">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>1-800-WECARE-1</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>hello@caresakhi.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6 justify-center lg:justify-start">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition-all duration-300 hover:scale-110 transform"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Products */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-6 text-emerald-400">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-emerald-400 transition-colors text-sm lg:text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-6 text-emerald-400">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    {typeof link === 'object' ? (
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-emerald-400 transition-colors text-sm lg:text-base"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-gray-300 hover:text-emerald-400 transition-colors text-sm lg:text-base"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-6 text-emerald-400">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {typeof link === 'object' ? (
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-emerald-400 transition-colors text-sm lg:text-base"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        to="/blog"
                        className="text-gray-300 hover:text-emerald-400 transition-colors text-sm lg:text-base"
                      >
                        {link}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-6 text-emerald-400">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-emerald-400 transition-colors text-sm lg:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 text-center lg:text-left">
            <div className="text-gray-400 text-xs lg:text-sm">
              © 2025 Wecare+. All rights reserved. Revolutionizing periods, one woman at a time.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <span className="text-gray-400 text-xs lg:text-sm">B Corp Certified</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-gray-400 text-xs lg:text-sm">Made with care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;