
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, MapPin, Home, Users, Bed, Filter, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Property, SearchFilters } from '@/types';

const Search = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: '',
    location: '',
    minPrice: 0,
    maxPrice: 100000,
    minArea: 0,
    maxArea: 5000,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample property data
  useEffect(() => {
    const sampleProperties: Property[] = [
      {
        id: '1',
        title: 'Modern Single Room in HSR Layout',
        description: 'Fully furnished single room with attached bathroom, Wi-Fi, and all amenities included.',
        type: 'room',
        price: 15000,
        location: 'HSR Layout, Bangalore',
        area: 120,
        amenities: ['Wi-Fi', 'AC', 'Parking', 'Security', 'Housekeeping'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'],
        ownerId: '1',
        ownerName: 'Rajesh Kumar',
        ownerPhone: '+91 9876543210',
        ownerEmail: 'rajesh@example.com',
        available: true,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Spacious 1BHK for Bachelors',
        description: 'Independent 1BHK apartment with kitchen, perfect for working professionals.',
        type: 'house',
        price: 25000,
        location: 'Koramangala, Bangalore',
        area: 450,
        amenities: ['Kitchen', 'Wi-Fi', 'Parking', 'Security', 'Gym'],
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500'],
        ownerId: '2',
        ownerName: 'Priya Sharma',
        ownerPhone: '+91 9876543211',
        ownerEmail: 'priya@example.com',
        available: true,
        createdAt: '2024-01-10'
      },
      {
        id: '3',
        title: 'Shared Seat in Tech Park Area',
        description: 'Clean bed space in shared room near tech parks with all facilities.',
        type: 'seat',
        price: 8000,
        location: 'Whitefield, Bangalore',
        area: 80,
        amenities: ['Wi-Fi', 'Food', 'Laundry', 'Security', 'Bus Service'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'],
        ownerId: '3',
        ownerName: 'Amit Patel',
        ownerPhone: '+91 9876543212',
        ownerEmail: 'amit@example.com',
        available: true,
        createdAt: '2024-01-12'
      },
      {
        id: '4',
        title: 'Premium 2BHK Near Metro',
        description: 'Luxurious 2BHK apartment with modern amenities, perfect for sharing.',
        type: 'house',
        price: 35000,
        location: 'Indiranagar, Bangalore',
        area: 850,
        amenities: ['Metro Access', 'Swimming Pool', 'Gym', 'Wi-Fi', 'Parking'],
        images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500'],
        ownerId: '4',
        ownerName: 'Sneha Reddy',
        ownerPhone: '+91 9876543213',
        ownerEmail: 'sneha@example.com',
        available: true,
        createdAt: '2024-01-08'
      }
    ];

    // Load from localStorage or use sample data
    const savedProperties = localStorage.getItem('bachelorious_properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      setProperties(sampleProperties);
      localStorage.setItem('bachelorious_properties', JSON.stringify(sampleProperties));
    }
  }, []);

  // Filter and sort properties
  useEffect(() => {
    let filtered = properties.filter(property => {
      const matchesQuery = !filters.query || 
        property.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.query.toLowerCase()) ||
        property.description.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchesType = !filters.type || property.type === filters.type;
      const matchesLocation = !filters.location || 
        property.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
      const matchesArea = property.area >= filters.minArea && property.area <= filters.maxArea;

      return matchesQuery && matchesType && matchesLocation && matchesPrice && matchesArea && property.available;
    });

    // Sort properties
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'area':
          comparison = a.area - b.area;
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredProperties(filtered);
  }, [properties, filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'house': return <Home className="w-4 h-4" />;
      case 'room': return <Bed className="w-4 h-4" />;
      case 'seat': return <Users className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'house': return 'House';
      case 'room': return 'Room';
      case 'seat': return 'Seat';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by location, property name, or description..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="pl-10 input-modern"
              />
            </div>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="room">Room</SelectItem>
                <SelectItem value="seat">Seat</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input-modern"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                    className="input-modern"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 100000)}
                    className="input-modern"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minArea || ''}
                    onChange={(e) => handleFilterChange('minArea', parseInt(e.target.value) || 0)}
                    className="input-modern"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxArea || ''}
                    onChange={(e) => handleFilterChange('maxArea', parseInt(e.target.value) || 5000)}
                    className="input-modern"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <div className="flex space-x-2">
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Low to High</SelectItem>
                      <SelectItem value="desc">High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length} Properties Found
          </h2>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="card-hover overflow-hidden">
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">
                    {getPropertyIcon(property.type)}
                    <span className="ml-1">{getPropertyTypeLabel(property.type)}</span>
                  </Badge>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{property.price.toLocaleString()}<span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {property.area} sq ft
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {property.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{property.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <Link to={`/property/${property.id}`} className="block">
                  <Button className="w-full btn-primary">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search filters to find more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
