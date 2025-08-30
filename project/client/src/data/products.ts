export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'EcoFlow Cup',
    category: 'cups',
    price: 3375, // ₹45 * 75 (approximate conversion)
    originalPrice: 4500, // ₹60 * 75
    rating: 4.8,
    reviews: 1234,
    image: 'https://m.media-amazon.com/images/I/61wyEsdAzeL._UF1000,1000_QL80_.jpg',
    images: [
      'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7319326/pexels-photo-7319326.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Our flagship menstrual cup made from premium medical-grade silicone. Designed for comfort and reliability, the EcoFlow Cup provides up to 12 hours of protection.',
    features: ['12hr Protection', 'Medical Grade Silicone', '10 Year Lifespan', 'Eco-Friendly', 'Easy to Clean'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Clear', 'Pink', 'Purple'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 2,
    name: 'ComfortMax Brief',
    category: 'underwear',
    price: 2400, // ₹32 * 75
    originalPrice: 3000, // ₹40 * 75
    rating: 4.9,
    reviews: 892,
    image: 'https://assets.ajio.com/medias/sys_master/root/20230624/kLAT/64969b5deebac147fcf8c662/-473Wx593H-465254370-multi-MODEL.jpg',
    images: [
      'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Ultra-absorbent period underwear that feels just like regular underwear. Perfect for light to heavy flow days with leak-proof protection.',
    features: ['Ultra Absorbent', 'Leak-Proof', 'Machine Washable', 'Comfortable Fit', 'Odor Control'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Nude', 'Navy'],
    inStock: true,
    isNew: true
  },
  {
    id: 3,
    name: 'Travel Kit Pro',
    category: 'accessories',
    price: 1875, // ₹25 * 75
    originalPrice: 2625, // ₹35 * 75
    rating: 4.7,
    reviews: 456,
    image: 'https://ec.nice-cdn.com/upload/image/product/large/default/174607_3f18a024.1024x1024.png',
    images: [
      'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Complete travel kit with sterilizer, storage pouch, and cleaning tablets. Perfect for maintaining hygiene on the go.',
    features: ['Sterilizer Included', 'Compact Design', 'Travel Friendly', 'Cleaning Tablets', 'Storage Pouch'],
    sizes: ['One Size'],
    colors: ['Pink', 'Blue', 'Green'],
    inStock: true
  },
  {
    id: 4,
    name: 'PureFlex Cup',
    category: 'cups',
    price: 3900, // ₹52 * 75
    originalPrice: 4875, // ₹65 * 75
    rating: 4.9,
    reviews: 2156,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKVsXpemHh-vl6N8VPLE3oMO1GpKNwZ5GSXRhkpUjGuoOkWC7-lLBk21vdiFnsQA5OXhDZdV4RlfBh3q089on-6CyXxE-uhA8m0aD2gUbgNURbdvxrFbzc-g',
    images: [
      'https://images.pexels.com/photos/7319326/pexels-photo-7319326.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Premium platinum silicone cup with extra-soft material for sensitive users. Features easy-grip stem and smooth removal.',
    features: ['Extra Soft', 'Easy Removal', 'Platinum Silicone', 'Hypoallergenic', 'Long-lasting'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Clear', 'Teal', 'Rose'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 5,
    name: 'ActiveFlow Brief',
    category: 'underwear',
    price: 2850, // ₹38 * 75
    rating: 4.8,
    reviews: 567,
    image: 'https://assets.ajio.com/medias/sys_master/root/20230624/kLAT/64969b5deebac147fcf8c662/-473Wx593H-465254370-multi-MODEL.jpg',
    images: [
      'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'High-performance period underwear designed for active lifestyles. Moisture-wicking and breathable fabric.',
    features: ['Moisture-Wicking', 'Breathable', 'Athletic Fit', 'Quick-Dry', 'Anti-Microbial'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    inStock: true
  },
  {
    id: 6,
    name: 'Starter Kit',
    category: 'kits',
    price: 6675, // ₹89 * 75
    originalPrice: 9000, // ₹120 * 75
    rating: 4.9,
    reviews: 234,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSJdARWX67I5r-VK3dhsaklsKKNON64A3VZw9OMhGK07PsX6YbpcJQmKf64AvgjSFTKBUfYnV4HJmhIDcUbfH8IfoKv12cdx4rJovCXL7yxA16RvLIIJMhl7g',
    images: [
      'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    description: 'Complete starter kit with cup, period underwear, and travel accessories. Perfect for first-time users.',
    features: ['Complete Kit', 'Beginner Friendly', 'Educational Guide', 'Multiple Products', 'Great Value'],
    sizes: ['Small Kit', 'Medium Kit', 'Large Kit'],
    colors: ['Mixed'],
    inStock: true,
    isNew: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'cups', name: 'Menstrual Cups', count: products.filter(p => p.category === 'cups').length },
  { id: 'underwear', name: 'Period Underwear', count: products.filter(p => p.category === 'underwear').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
  { id: 'kits', name: 'Starter Kits', count: products.filter(p => p.category === 'kits').length }
];