import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'education', name: 'Education' },
    { id: 'lifestyle', name: 'Lifestyle' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Menstrual Cups: Everything You Need to Know',
      slug: 'complete-guide-menstrual-cups',
      excerpt: 'Discover everything about menstrual cups, from choosing the right size to proper care and maintenance.',
      content: 'Full article content here...',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      category: 'education',
      image: 'https://m.media-amazon.com/images/I/61wyEsdAzeL._UF1000,1000_QL80_.jpg',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      title: 'Sustainable Periods: How to Reduce Your Environmental Impact',
      slug: 'sustainable-periods-environmental-impact',
      excerpt: 'Learn how switching to reusable menstrual products can significantly reduce your carbon footprint.',
      content: 'Full article content here...',
      author: 'Emily Chen',
      date: '2024-01-12',
      category: 'sustainability',
      image: 'https://images.healthshots.com/healthshots/en/uploads/2025/06/05131912/period-products.jpg',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 3,
      title: 'Period Pain Management: Natural Remedies That Actually Work',
      slug: 'period-pain-management-natural-remedies',
      excerpt: 'Explore effective natural methods to manage menstrual pain and discomfort.',
      content: 'Full article content here...',
      author: 'Dr. Maria Rodriguez',
      date: '2024-01-10',
      category: 'health',
      image: 'https://swisse.com.au/media/magefan_blog/What_s_The_Deal_With_Period_Pain.jpg',
      readTime: '5 min read',
      featured: false
    },
    {
      id: 4,
      title: 'Breaking Period Taboos: Creating Open Conversations',
      slug: 'breaking-period-taboos-open-conversations',
      excerpt: 'How to start meaningful conversations about menstruation and break down harmful stigmas.',
      content: 'Full article content here...',
      author: 'Lisa Thompson',
      date: '2024-01-08',
      category: 'lifestyle',
      image: 'https://images.apollo247.in/qamomandbaby/Adobe_Stock_881449689_a8ace65e6e/Adobe_Stock_881449689_a8ace65e6e.jpeg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%201200w',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Traveling with Your Period: Tips for Stress-Free Journeys',
      slug: 'traveling-with-period-stress-free-tips',
      excerpt: 'Essential tips and products for managing your period while traveling.',
      content: 'Full article content here...',
      author: 'Amanda Wilson',
      date: '2024-01-05',
      category: 'lifestyle',
      image: 'https://m.media-amazon.com/images/I/71PCJz+UfNL._UF350,350_QL80_.jpg',
      readTime: '4 min read',
      featured: false
    },
    {
      id: 6,
      title: 'Understanding Your Menstrual Cycle: A Comprehensive Guide',
      slug: 'understanding-menstrual-cycle-comprehensive-guide',
      excerpt: 'Learn about the phases of your menstrual cycle and what\'s normal for your body.',
      content: 'Full article content here...',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-03',
      category: 'health',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOT5VYOmUrFFsljCxZ569gTui_U1Lnr7dZog&s',
      readTime: '10 min read',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                CareSakhi Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert insights, tips, and stories about menstrual health, sustainability, and empowerment.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Categories */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-2 shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === 'all' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Article</h2>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                      <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-emerald-600 font-semibold group-hover:space-x-3 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Tag className="w-3 h-3" />
                        <span>{categories.find(c => c.id === post.category)?.name}</span>
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;