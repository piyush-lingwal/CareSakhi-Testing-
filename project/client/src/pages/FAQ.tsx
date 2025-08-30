import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'cups', name: 'Menstrual Cups' },
    { id: 'underwear', name: 'Period Underwear' },
    { id: 'shipping', name: 'Shipping & Returns' },
    { id: 'general', name: 'General' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'cups',
      question: 'How long can I wear a menstrual cup?',
      answer: 'You can safely wear a menstrual cup for up to 12 hours, depending on your flow. For heavy flow days, you may need to empty it more frequently.'
    },
    {
      id: 2,
      category: 'cups',
      question: 'How do I know what size cup to choose?',
      answer: 'Size selection typically depends on age, childbirth history, and cervix height. Generally, if you\'re under 30 and haven\'t given birth vaginally, choose small. If you\'re over 30 or have given birth vaginally, choose medium or large.'
    },
    {
      id: 3,
      category: 'cups',
      question: 'Can I sleep with a menstrual cup?',
      answer: 'Yes! Menstrual cups are perfect for overnight use. They provide up to 12 hours of protection, so you can sleep comfortably without worrying about leaks.'
    },
    {
      id: 4,
      category: 'underwear',
      question: 'How absorbent is period underwear?',
      answer: 'Our period underwear can absorb the equivalent of 2-4 tampons, depending on the style. They\'re perfect for light to medium flow days or as backup protection.'
    },
    {
      id: 5,
      category: 'underwear',
      question: 'How do I wash period underwear?',
      answer: 'Rinse with cold water first, then machine wash in cold water with regular detergent. Avoid fabric softeners and bleach. Air dry for best results.'
    },
    {
      id: 6,
      category: 'underwear',
      question: 'How many pairs do I need?',
      answer: 'We recommend having 3-5 pairs to rotate through your cycle. This allows you to wear one, wash one, and have backups ready.'
    },
    {
      id: 7,
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. Free shipping on orders over ₹2000.'
    },
    {
      id: 8,
      category: 'shipping',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused products in original packaging. For hygiene reasons, opened menstrual products cannot be returned unless defective.'
    },
    {
      id: 9,
      category: 'general',
      question: 'Are your products safe?',
      answer: 'Yes! All our products are made from medical-grade materials and are FDA-registered. Our cups are made from 100% medical-grade silicone, and our underwear uses safe, non-toxic materials.'
    },
    {
      id: 10,
      category: 'general',
      question: 'How long do the products last?',
      answer: 'Menstrual cups can last 5-10 years with proper care. Period underwear typically lasts 2-3 years with regular use and proper washing.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our products and services
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Categories */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-full p-2 shadow-lg flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 m-1 ${
                    activeCategory === category.id
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-pink-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                  </div>
                  {openItems.has(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openItems.has(faq.id) && (
                  <div className="px-6 pb-4">
                    <div className="pl-8 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No questions found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;