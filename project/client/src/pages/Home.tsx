import React from 'react';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import Education from '../components/Education';
import Testimonials from '../components/Testimonials';
import Subscription from '../components/Subscription';

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductShowcase />
      <Education />
      <Testimonials />
      <Subscription />
    </div>
  );
};

export default Home;