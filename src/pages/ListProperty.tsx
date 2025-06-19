
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Bed, Users, Plus, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Property } from '@/types';
import { toast } from '@/hooks/use-toast';

const ListProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'room' as 'house' | 'room' | 'seat',
    price: '',
    location: '',
    area: '',
    amenities: [] as string[],
    imageUrl: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const availableAmenities = [
    'Wi-Fi', 'AC', 'Parking', 'Security', 'Housekeeping', 'Kitchen', 
    'Gym', 'Swimming Pool', 'Laundry', 'Food', 'Metro Access', 'Bus Service',
    'Power Backup', 'Water Supply', 'CCTV', 'Furnished'
  ];

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.userType !== 'owner') {
      toast({
        title: "Access Denied",
        description: "Only property owners can list properties.",
        variant: "destructive",
      });
      navigate('/search');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.area.trim()) newErrors.area = 'Area is required';
    else if (isNaN(Number(formData.area)) || Number(formData.area) <= 0) {
      newErrors.area = 'Please enter a valid area';
    }
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const newProperty: Property = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        type: formData.type,
        price: Number(formData.price),
        location: formData.location,
        area: Number(formData.area),
        amenities: formData.amenities,
        images: [formData.imageUrl],
        ownerId: user!.id,
        ownerName: user!.name,
        ownerPhone: user!.phone || '',
        ownerEmail: user!.email,
        available: true,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingProperties = JSON.parse(localStorage.getItem('bachelorious_properties') || '[]');
      const updatedProperties = [...existingProperties, newProperty];
      localStorage.setItem('bachelorious_properties', JSON.stringify(updatedProperties));

      toast({
        title: "Property Listed Successfully!",
        description: "Your property has been listed and is now visible to potential tenants.",
      });

      navigate('/search');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to list property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'house': return <Home className="w-5 h-5" />;
      case 'room': return <Bed className="w-5 h-5" />;
      case 'seat': return <Users className="w-5 h-5" />;
      default: return <Home className="w-5 h-5" />;
    }
  };

  if (!user || user.userType !== 'owner') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">List Your Property</CardTitle>
            <p className="text-gray-600 mt-2">Share your space with bachelors looking for quality accommodation</p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Type */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Property Type</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <RadioGroupItem value="house" id="house" />
                    <Label htmlFor="house" className="flex items-center space-x-2 cursor-pointer">
                      <Home className="w-5 h-5 text-blue-600" />
                      <span>House</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <RadioGroupItem value="room" id="room" />
                    <Label htmlFor="room" className="flex items-center space-x-2 cursor-pointer">
                      <Bed className="w-5 h-5 text-blue-600" />
                      <span>Room</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <RadioGroupItem value="seat" id="seat" />
                    <Label htmlFor="seat" className="flex items-center space-x-2 cursor-pointer">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>Seat</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Modern Single Room in HSR Layout"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`input-modern ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., HSR Layout, Bangalore"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`input-modern ${errors.location ? 'border-red-500' : ''}`}
                  />
                  {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 15000"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`input-modern ${errors.price ? 'border-red-500' : ''}`}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft) *</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className={`input-modern ${errors.area ? 'border-red-500' : ''}`}
                  />
                  {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property, its features, and what makes it special for bachelors..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`min-h-24 ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Property Image URL *</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  className={`input-modern ${errors.imageUrl ? 'border-red-500' : ''}`}
                />
                {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
                <p className="text-sm text-gray-500">
                  You can use image URLs from Unsplash, Google Images, or your own hosting service
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <Label htmlFor={amenity} className="text-sm cursor-pointer">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full btn-primary py-3 text-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Listing Property...' : 'List Property'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListProperty;
