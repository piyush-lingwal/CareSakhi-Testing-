import React from 'react';
import { Heart, Users, Leaf, Award, Target, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'We believe every woman deserves access to safe, comfortable, and sustainable menstrual products.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Our products are designed to reduce environmental impact while providing superior protection.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive community where women can share experiences and support each other.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We use only the highest quality, medical-grade materials in all our products.'
    }
  ];

  const team = [
    {
      name: 'Natasha Gupta',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former healthcare professional passionate about women\'s health and sustainability.'
    },
    {
      name: 'Radhika Singh',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Product designer with 10+ years experience in sustainable consumer goods.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Marketing',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Marketing strategist focused on authentic brand storytelling and community building.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '2M+', label: 'Products Sold' },
    { number: '15', label: 'Countries Served' },
    { number: '98%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                Empowering Women's Health in India
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              At CareSakhi, we're on a mission to transform the way Indian women experience their periods. 
              Through innovative, sustainable products and education, we're creating a world where 
              every woman can feel confident, comfortable, and empowered during her menstrual cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Wecare+ was born from a simple yet powerful realization: the menstrual products 
                    available to women were outdated, unsustainable, and often uncomfortable. Our founder, 
                    Sarah Johnson, experienced this firsthand during her years as a healthcare professional.
                  </p>
                  <p>
                    After witnessing countless women struggle with traditional products and their 
                    environmental impact, Sarah decided to create a better solution. She assembled a 
                    team of passionate individuals who shared her vision of revolutionizing menstrual health.
                  </p>
                  <p>
                    Today, Wecare+ is proud to serve over 50,000 women worldwide with products that 
                    prioritize comfort, sustainability, and empowerment. We're not just a company – 
                    we're a movement toward a better future for women's health.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Our story"
                  className="w-full rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">2019</div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-emerald-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide innovative, sustainable menstrual products that empower women to live 
                  confidently and comfortably while reducing environmental impact. We strive to 
                  break down barriers and stigmas surrounding menstruation through education and advocacy.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Globe className="w-8 h-8 text-emerald-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  A world where every woman has access to safe, sustainable menstrual products and 
                  the knowledge to make informed choices about her health. We envision a future free 
                  from period poverty and menstrual stigma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full mb-4 group-hover:from-emerald-200 group-hover:to-emerald-300">
                      <IconComponent className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Our Impact</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-emerald-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                    <div className="text-emerald-600 font-medium mb-3">{member.role}</div>
                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8">
              Ready to make the switch to sustainable menstrual products? 
              Join thousands of women who've already transformed their period experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-colors">
                Shop Products
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;