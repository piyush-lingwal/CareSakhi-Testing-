import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Heart, Tag, Clock } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would be fetched based on the slug
  const post = {
    id: 1,
    title: 'The Complete Guide to Menstrual Cups: Everything You Need to Know',
    slug: 'complete-guide-menstrual-cups',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    category: 'education',
    image: 'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '8 min read',
    content: `
      <p>Menstrual cups have revolutionized period care for millions of women worldwide. If you're considering making the switch from traditional tampons and pads, this comprehensive guide will provide you with everything you need to know about menstrual cups.</p>

      <h2>What is a Menstrual Cup?</h2>
      <p>A menstrual cup is a reusable, bell-shaped cup made from medical-grade silicone or rubber that collects menstrual fluid rather than absorbing it. Unlike tampons and pads, menstrual cups can be used for up to 12 hours and last for several years with proper care.</p>

      <h2>Benefits of Using Menstrual Cups</h2>
      <h3>Environmental Impact</h3>
      <p>One of the most significant advantages of menstrual cups is their environmental benefit. A single cup can replace thousands of tampons and pads over its lifetime, dramatically reducing waste.</p>

      <h3>Cost-Effective</h3>
      <p>While the initial investment may seem higher, menstrual cups pay for themselves within a few months. Over their 5-10 year lifespan, they can save you hundreds of dollars.</p>

      <h3>Convenience and Comfort</h3>
      <p>Once properly inserted, menstrual cups are virtually undetectable. They can be worn for up to 12 hours, making them perfect for busy lifestyles, travel, and overnight use.</p>

      <h2>Choosing the Right Size</h2>
      <p>Most menstrual cup brands offer two main sizes:</p>
      <ul>
        <li><strong>Small/Size 1:</strong> Typically recommended for women under 30 who haven't given birth vaginally</li>
        <li><strong>Large/Size 2:</strong> Usually recommended for women over 30 or those who have given birth vaginally</li>
      </ul>

      <h2>How to Use a Menstrual Cup</h2>
      <h3>Insertion</h3>
      <p>There are several folding techniques to make insertion easier:</p>
      <ul>
        <li><strong>C-Fold:</strong> Fold the cup in half to create a C shape</li>
        <li><strong>Punch-Down Fold:</strong> Push one side of the rim down into the cup</li>
        <li><strong>7-Fold:</strong> Fold one side down diagonally to create a 7 shape</li>
      </ul>

      <h3>Removal</h3>
      <p>To remove your cup, wash your hands thoroughly, then gently pinch the base of the cup to break the seal. Slowly pull it out while keeping it upright to avoid spills.</p>

      <h2>Care and Maintenance</h2>
      <p>Proper care ensures your menstrual cup lasts for years:</p>
      <ul>
        <li>Rinse with cold water immediately after removal</li>
        <li>Wash with mild, unscented soap</li>
        <li>Sterilize between cycles by boiling for 5-10 minutes</li>
        <li>Store in a breathable cotton bag</li>
      </ul>

      <h2>Common Concerns and Solutions</h2>
      <h3>Leaking</h3>
      <p>If you experience leaking, it may be due to improper insertion, wrong size, or the cup being full. Ensure the cup has fully opened and created a seal.</p>

      <h3>Discomfort</h3>
      <p>A properly inserted cup should not cause discomfort. If you feel the cup, it may not be inserted far enough or may be the wrong size.</p>

      <h2>Making the Switch</h2>
      <p>Transitioning to a menstrual cup may take a few cycles to master. Be patient with yourself and don't hesitate to reach out to customer support or online communities for advice.</p>

      <p>Remember, every body is different, and what works for one person may not work for another. The key is finding the right cup and technique that works for you.</p>
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Sustainable Periods: How to Reduce Your Environmental Impact',
      slug: 'sustainable-periods-environmental-impact',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: 'Period Pain Management: Natural Remedies That Actually Work',
      slug: 'period-pain-management-natural-remedies',
      image: 'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      title: 'Breaking Period Taboos: Creating Open Conversations',
      slug: 'breaking-period-taboos-open-conversations',
      image: 'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back to Blog */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-white bg-opacity-90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Education</span>
              </span>
            </div>
          </div>

          {/* Article Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-4 pb-8 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Share:</span>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-700 leading-relaxed"
            />
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-start space-x-4">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.author}</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dr. Sarah Johnson is a women's health specialist and the founder of Wecare+. 
                  With over 15 years of experience in gynecology, she's passionate about educating 
                  women about menstrual health and sustainable period products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Related Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;