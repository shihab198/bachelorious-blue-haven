
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Home, Users, Shield, Star, MapPin, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Index = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Smart Search",
      description: "Find your perfect bachelor accommodation with advanced filters and location-based search."
    },
    {
      icon: <Home className="w-8 h-8 text-blue-600" />,
      title: "Verified Listings",
      description: "All properties are verified by our team to ensure quality and authenticity."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Bachelor Focused",
      description: "Specifically designed for young professionals and bachelors seeking quality accommodation."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Payments",
      description: "Safe and secure payment system for hassle-free reservations and bookings."
    }
  ];

  const testimonials = [
    {
      name: "Rahul Kumar",
      location: "Bangalore",
      rating: 5,
      comment: "Found an amazing room near my office. The process was smooth and the owner was very cooperative!"
    },
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Bachelorious helped me find the perfect shared accommodation. Highly recommended for working professionals."
    },
    {
      name: "Amit Patel",
      location: "Pune",
      rating: 5,
      comment: "Great platform for bachelor accommodation. Clean listings and verified owners make all the difference."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-blue-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Bachelor Accommodation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover premium rooms, houses, and shared spaces designed specifically for young professionals. 
              Your ideal bachelor accommodation is just a search away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button size="lg" className="btn-primary text-lg px-8 py-3">
                  <Search className="w-5 h-5 mr-2" />
                  Find Accommodation
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100 to-transparent opacity-50 rounded-l-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-blue-200 to-transparent opacity-30 rounded-tr-full"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bachelorious?
            </h2>
            <p className="text-xl text-gray-600">
              We make finding bachelor accommodation simple, safe, and reliable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 card-hover border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-xl opacity-90">Happy Bachelors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-xl opacity-90">Verified Properties</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl opacity-90">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real bachelors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of bachelors who have found their ideal accommodation through Bachelorious
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Today
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-600">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Bachelorious</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect bachelor accommodation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/search" className="hover:text-white transition-colors">Search Properties</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">List Property</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@bachelorious.com</li>
                <li>Phone: +91 9999 999 999</li>
                <li>Address: Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bachelorious. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
