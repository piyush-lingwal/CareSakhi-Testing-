const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Create headers with auth token
const createHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...createHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  },

  register: async (name: string, email: string, password: string, userType: string = 'customer') => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ name, email, password, userType }),
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  },

  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  updateProfile: async (profileData: any) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
  }
};

// Products API
export const productsAPI = {
  getAll: async (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/products?${params}`);
  },

  getById: async (id: string) => {
    return apiRequest(`/products/${id}`);
  },

  getCategories: async () => {
    return apiRequest('/products/categories/list');
  },

  getReviews: async (productId: string) => {
    return apiRequest(`/products/${productId}/reviews`);
  },

  addReview: async (productId: string, rating: number, reviewText: string) => {
    return apiRequest(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ rating, review_text: reviewText }),
    });
  }
};

// Cart API
export const cartAPI = {
  get: async () => {
    return apiRequest('/cart');
  },

  add: async (productId: number, quantity: number = 1, size?: string, color?: string) => {
    return apiRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, size, color }),
    });
  },

  update: async (itemId: number, quantity: number) => {
    return apiRequest(`/cart/update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  remove: async (itemId: number) => {
    return apiRequest(`/cart/remove/${itemId}`, {
      method: 'DELETE',
    });
  },

  clear: async () => {
    return apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  }
};

// Orders API
export const ordersAPI = {
  create: async (orderData: any) => {
    return apiRequest('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiRequest('/orders');
  },

  getById: async (orderId: string) => {
    return apiRequest(`/orders/${orderId}`);
  },

  updateStatus: async (orderId: string, status: string) => {
    return apiRequest(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
};

// Period Tracking API
export const periodAPI = {
  saveTracking: async (trackingData: any) => {
    return apiRequest('/period/track', {
      method: 'POST',
      body: JSON.stringify(trackingData),
    });
  },

  getTracking: async () => {
    return apiRequest('/period/data');
  },

  getPredictions: async (lastPeriodDate: string, cycleLength: number) => {
    return apiRequest('/period/predict', {
      method: 'POST',
      body: JSON.stringify({ lastPeriodDate, cycleLength }),
    });
  },

  logSymptoms: async (date: string, symptoms: string[], notes?: string) => {
    return apiRequest('/period/symptoms', {
      method: 'POST',
      body: JSON.stringify({ date, symptoms, notes }),
    });
  }
};

// Wallet API
export const walletAPI = {
  getBalance: async () => {
    return apiRequest('/wallet/balance');
  },

  addMoney: async (amount: number) => {
    return apiRequest('/wallet/add-money', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },

  getTransactions: async () => {
    return apiRequest('/wallet/transactions');
  },

  processPayment: async (amount: number, description: string) => {
    return apiRequest('/wallet/pay', {
      method: 'POST',
      body: JSON.stringify({ amount, description }),
    });
  },

  addCashback: async (amount: number, description: string) => {
    return apiRequest('/wallet/cashback', {
      method: 'POST',
      body: JSON.stringify({ amount, description }),
    });
  },

  addCoins: async (coins: number, description: string) => {
    return apiRequest('/wallet/add-coins', {
      method: 'POST',
      body: JSON.stringify({ coins, description }),
    });
  },

  redeemCoins: async (coins: number) => {
    return apiRequest('/wallet/redeem-coins', {
      method: 'POST',
      body: JSON.stringify({ coins }),
    });
  }
};

// Location API
export const locationAPI = {
  saveBusinessLocation: async (locationData: any) => {
    return apiRequest('/location/business', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
  },

  getBusinessLocation: async () => {
    return apiRequest('/location/business');
  },

  getNearbyLocations: async (latitude: number, longitude: number, radius?: number) => {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      ...(radius && { radius: radius.toString() })
    });
    return apiRequest(`/location/nearby?${params}`);
  },

  getAllLocations: async () => {
    return apiRequest('/location/all');
  }
};

// Blog API
export const blogAPI = {
  getAll: async (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/blog?${params}`);
  },

  getBySlug: async (slug: string) => {
    return apiRequest(`/blog/${slug}`);
  },

  getCategories: async () => {
    return apiRequest('/blog/categories/list');
  }
};

// Users API
export const usersAPI = {
  getDashboard: async () => {
    return apiRequest('/users/dashboard');
  },

  getProfiles: async (type?: string) => {
    const params = type ? `?type=${type}` : '';
    return apiRequest(`/users/profiles${params}`);
  },

  getProfileById: async (id: number) => {
    return apiRequest(`/users/profile/${id}`);
  },

  getWishlist: async () => {
    return apiRequest('/users/wishlist');
  },

  addToWishlist: async (productId: number) => {
    return apiRequest(`/users/wishlist/${productId}`, {
      method: 'POST',
    });
  },

  removeFromWishlist: async (productId: number) => {
    return apiRequest(`/users/wishlist/${productId}`, {
      method: 'DELETE',
    });
  },

  getNotifications: async () => {
    return apiRequest('/users/notifications');
  }
};