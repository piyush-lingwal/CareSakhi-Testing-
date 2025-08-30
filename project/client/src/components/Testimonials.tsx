import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      location: 'San Francisco, CA',
      rating: 5,
      text: "I've been using the EcoFlow Cup for over a year now, and it's completely changed my life. No more worrying about running out of supplies or contributing to landfill waste. The comfort is incredible!",
      product: 'EcoFlow Cup',
      image: 'https://as1.ftcdn.net/jpg/03/10/91/36/1000_F_310913673_87a8cktT3191EAv8t9jrVaZPEfHipOrn.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      age: 32,
      location: 'Austin, TX',
      rating: 5,
      text: "The ComfortMax Brief is a game-changer! I can finally sleep through the night without any anxiety. The fit is perfect and they're so comfortable I forget I'm even wearing them.",
      product: 'ComfortMax Brief',
      image: 'https://thumbs.dreamstime.com/b/simple-indian-girl-sweet-smile-happy-face-44021920.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Lisa Chen',
      age: 24,
      location: 'Seattle, WA',
      rating: 5,
      text: "As a college student, the cost savings have been incredible. I've already saved over $300 this year alone! Plus, knowing I'm helping the environment makes me feel great about my choice.",
      product: 'PureFlex Cup',
      image: 'https://media.istockphoto.com/id/155288041/photo/indian-girl-in-the-university.jpg?s=612x612&w=0&k=20&c=OPg_GzXdIMZ3btYu61HX79KxSBe7A6BYPSYYknNBafQ=',
      verified: true
    },
    {
      id: 4,
      name: 'Amanda Thompson',
      age: 35,
      location: 'Denver, CO',
      rating: 5,
      text: "After having two kids, I was skeptical about cups working for me. But the customer service team helped me find the perfect size, and now I recommend Wecare+ to all my mom friends!",
      product: 'EcoFlow Cup',
      image: 'https://www.girlsinc.org/wp-content/uploads/2023/12/front-page-hero-animated-v4-526x442.webp',
      verified: true
    },
    {
      id: 5,
      name: 'Rachel Kim',
      age: 29,
      location: 'Portland, OR',
      rating: 5,
      text: "I travel constantly for work, and these products have made my life so much easier. No more TSA liquid restrictions or emergency pharmacy runs. The Travel Kit Pro is essential!",
      product: 'Travel Kit Pro',
      image: 'https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?semt=ais_hybrid&w=740&q=80',
      verified: true
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '98%', label: 'Would Recommend' },
    { number: '2M+', label: 'Products Sold' }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
              What Our Community Says
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of women who've made the switch and transformed their period experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
                {/* Customer Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover shadow-lg"
                    />
                    {testimonials[currentIndex].verified && (
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center lg:text-left">
                  <Quote className="w-8 h-8 text-emerald-200 mb-4 mx-auto lg:mx-0" />
                  
                  <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 font-light">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center lg:justify-start space-x-1 mb-3">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <div className="text-lg font-semibold text-gray-800">
                      {testimonials[currentIndex].name}, {testimonials[currentIndex].age}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentIndex].location}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      Verified purchase: {testimonials[currentIndex].product}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-emerald-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text.slice(0, 120)}..."
              </p>
              
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-emerald-600 text-xs">
                    {testimonial.product}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;