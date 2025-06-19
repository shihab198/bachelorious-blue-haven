
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MapPin, Home, Users, Bed, Phone, Mail, Calendar, CreditCard, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Property } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [paymentData, setPaymentData] = useState({
    months: 1,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  useEffect(() => {
    const properties = JSON.parse(localStorage.getItem('bachelorious_properties') || '[]');
    const foundProperty = properties.find((p: Property) => p.id === id);
    setProperty(foundProperty || null);
  }, [id]);

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'house': return <Home className="w-5 h-5" />;
      case 'room': return <Bed className="w-5 h-5" />;
      case 'seat': return <Users className="w-5 h-5" />;
      default: return <Home className="w-5 h-5" />;
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

  const handleContactOwner = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to contact the property owner.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Simulate sending message
    toast({
      title: "Message Sent!",
      description: "Your message has been sent to the property owner. They will contact you soon.",
    });
    setIsContactDialogOpen(false);
    setContactMessage('');
  };

  const handlePayment = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to reserve this property.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Simulate payment processing
    toast({
      title: "Payment Successful!",
      description: `Property reserved for ${paymentData.months} months. You will receive a confirmation email shortly.`,
    });
    setIsPaymentDialogOpen(false);
    setPaymentData({
      months: 1,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    });
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
            <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
            <Button 
              onClick={() => navigate('/search')} 
              className="mt-4 btn-primary"
            >
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/search')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Property Info */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{property.location}</span>
                    </div>
                    <Badge className="bg-blue-600 text-white">
                      {getPropertyIcon(property.type)}
                      <span className="ml-2">{getPropertyTypeLabel(property.type)}</span>
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{property.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {property.area}
                    </div>
                    <div className="text-sm text-gray-500">sq ft</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 mb-6">{property.description}</p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="justify-center p-2">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Owner</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {property.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{property.ownerName}</div>
                    <div className="text-sm text-gray-500">Property Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ₹{property.price.toLocaleString()}
                  </div>
                  <div className="text-gray-500">per month</div>
                </div>

                <div className="space-y-4">
                  <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full btn-primary">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Owner
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact Property Owner</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="message">Your Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Hi, I'm interested in this property..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={handleContactOwner}
                            className="flex-1 btn-primary"
                            disabled={!contactMessage.trim()}
                          >
                            Send Message
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsContactDialogOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Reserve Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reserve Property</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="months">Number of Months</Label>
                          <select
                            id="months"
                            value={paymentData.months}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, months: parseInt(e.target.value) }))}
                            className="w-full p-2 border rounded-lg mt-2"
                          >
                            {[1, 2, 3, 6, 12].map(month => (
                              <option key={month} value={month}>
                                {month} month{month > 1 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total Amount:</span>
                            <span className="text-blue-600">
                              ₹{(property.price * paymentData.months).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentData.cardNumber}
                              onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={paymentData.expiryDate}
                                onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={paymentData.cvv}
                                onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="nameOnCard">Name on Card</Label>
                            <Input
                              id="nameOnCard"
                              placeholder="John Doe"
                              value={paymentData.nameOnCard}
                              onChange={(e) => setPaymentData(prev => ({ ...prev, nameOnCard: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            onClick={handlePayment}
                            className="flex-1 btn-primary"
                            disabled={!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.nameOnCard}
                          >
                            Pay Now
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsPaymentDialogOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{property.ownerPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{property.ownerEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
