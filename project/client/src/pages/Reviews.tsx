import React, { useState } from 'react';
import { Star, ThumbsUp, Filter, Search } from 'lucide-react';

const Reviews = () => {
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      product: 'EcoFlow Cup',
      title: 'Life-changing product!',
      review: 'I\'ve been using the EcoFlow Cup for 6 months now and it has completely transformed my period experience. No more worrying about running out of supplies or contributing to waste. The comfort is incredible and I barely notice it\'s there.',
      verified: true,
      helpful: 24,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      rating: 5,
      date: '2024-01-12',
      product: 'ComfortMax Brief',
      title: 'Perfect for overnight protection',
      review: 'These period underwear are amazing! I can finally sleep through the night without any anxiety about leaks. The fit is perfect and they\'re so comfortable I forget I\'m even wearing them. Definitely buying more pairs.',
      verified: true,
      helpful: 18,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      rating: 4,
      date: '2024-01-10',
      product: 'PureFlex Cup',
      title: 'Great quality, took time to adjust',
      review: 'The cup itself is excellent quality and I love that it\'s environmentally friendly. It took me a couple of cycles to get the hang of insertion and removal, but now it\'s second nature. Customer service was very helpful with sizing questions.',
      verified: true,
      helpful: 15,
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 4,
      name: 'Amanda Thompson',
      rating: 5,
      date: '2024-01-08',
      product: 'Travel Kit Pro',
      title: 'Perfect for travel',
      review: 'This travel kit is a game-changer! I travel frequently for work and this kit has everything I need. The sterilizer is compact and the storage pouch is perfect. No more worrying about finding supplies while traveling.',
      verified: true,
      helpful: 12,
      image: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 5,
      name: 'Rachel Kim',
      rating: 5,
      date: '2024-01-05',
      product: 'ActiveFlow Brief',
      title: 'Great for active lifestyle',
      review: 'I\'m very active and these underwear keep up with my lifestyle perfectly. No shifting, no discomfort during workouts, and excellent protection. The moisture-wicking fabric is fantastic.',
      verified: true,
      helpful: 9,
      image: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 6,
      name: 'Jennifer Davis',
      rating: 4,
      date: '2024-01-03',
      product: 'EcoFlow Cup',
      title: 'Good product, learning curve',
      review: 'The cup works well once you get the hang of it. The material feels high quality and I appreciate the environmental benefits. The customer support team was very patient with my questions.',
      verified: true,
      helpful: 7,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default: // newest
        return new Date(b.date) - new Date(a.date);
    }
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Customer Reviews</h1>
            <p className="text-xl text-gray-600">
              See what our customers are saying about their CareSakhi experience
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                {/* Overall Rating */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {reviews.length} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Rating Distribution</h3>
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-600 w-6">{rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Rating
                    </label>
                    <select
                      value={filterRating}
                      onChange={(e) => setFilterRating(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="all">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort by
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="rating-high">Highest Rating</option>
                      <option value="rating-low">Lowest Rating</option>
                      <option value="helpful">Most Helpful</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">{review.name}</h3>
                            <div className="flex items-center space-x-2">
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Verified Purchase
                                </span>
                              )}
                              <span className="text-sm text-gray-500">{review.product}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                        <p className="text-gray-600 leading-relaxed mb-4">{review.review}</p>
                        
                        <div className="flex items-center justify-between">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">Helpful ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {sortedReviews.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No reviews found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;