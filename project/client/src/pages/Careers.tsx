import React from 'react';
import { MapPin, Clock, Users, Heart, Briefcase, GraduationCap } from 'lucide-react';

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Product Manager',
      department: 'Product',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Lead product development and strategy for our innovative menstrual health products.',
      requirements: ['Product management experience', 'Healthcare industry knowledge', 'User research skills']
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Drive digital marketing campaigns and grow our online community of empowered women.',
      requirements: ['Digital marketing experience', 'Social media expertise', 'Content creation skills']
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Ensure exceptional customer experience and build lasting relationships with our community.',
      requirements: ['Customer service experience', 'Communication skills', 'Problem-solving abilities']
    },
    {
      id: 4,
      title: 'Software Engineer',
      department: 'Engineering',
      location: 'Pune, India',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Build and maintain our e-commerce platform and mobile applications.',
      requirements: ['React/Node.js experience', 'E-commerce knowledge', 'Mobile development skills']
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs'
    },
    {
      icon: GraduationCap,
      title: 'Learning & Development',
      description: 'Professional development budget, conference attendance, and skill-building opportunities'
    },
    {
      icon: Users,
      title: 'Inclusive Culture',
      description: 'Diverse, inclusive workplace where everyone can bring their authentic selves'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, remote work options, and generous time-off policies'
    }
  ];

  const values = [
    {
      title: 'Empowerment',
      description: 'We believe in empowering women through education, products, and community support.'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to create better, more sustainable solutions for menstrual health.'
    },
    {
      title: 'Inclusivity',
      description: 'We create an inclusive environment where everyone feels valued and heard.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to environmental responsibility in everything we do.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Mission
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Help us revolutionize menstrual health and empower women across India. 
              Join a team that's passionate about making a positive impact.
            </p>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Work With Us</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-4 group-hover:from-pink-200 group-hover:to-purple-200">
                      <IconComponent className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Open Positions</h2>
            
            <div className="space-y-6">
              {openPositions.map((position) => (
                <div key={position.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <h3 className="text-2xl font-semibold text-gray-800">{position.title}</h3>
                        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                          {position.department}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{position.experience}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{position.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {position.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Culture</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    At CareSakhi, we believe that our people are our greatest asset. We've built a culture 
                    that celebrates diversity, encourages innovation, and supports personal growth.
                  </p>
                  <p>
                    We're a team of passionate individuals who are committed to making a positive impact 
                    on women's lives. We work hard, but we also believe in maintaining a healthy work-life balance.
                  </p>
                  <p>
                    Whether you're working from our offices or remotely, you'll be part of a supportive 
                    community that values collaboration, creativity, and continuous learning.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Team culture"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Don't see a position that fits? We're always looking for talented individuals 
              who share our passion for women's health and empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Send Us Your Resume
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;