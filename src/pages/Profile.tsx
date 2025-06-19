
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { User, Home, Heart, Edit, Trash2, Eye, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Property } from '@/types';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    if (user) {
      const properties = JSON.parse(localStorage.getItem('bachelorious_properties') || '[]');
      const userProperties = properties.filter((p: Property) => p.ownerId === user.id);
      setMyProperties(userProperties);
    }
  }, [user]);

  const handleSaveProfile = () => {
    // Update user data in localStorage
    const savedUser = { ...user, ...profileData };
    localStorage.setItem('bachelorious_user', JSON.stringify(savedUser));
    
    // Update users array
    const users = JSON.parse(localStorage.getItem('bachelorious_users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user?.id ? { ...u, ...profileData } : u
    );
    localStorage.setItem('bachelorious_users', JSON.stringify(updatedUsers));

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleDeleteProperty = (propertyId: string) => {
    const properties = JSON.parse(localStorage.getItem('bachelorious_properties') || '[]');
    const updatedProperties = properties.filter((p: Property) => p.id !== propertyId);
    localStorage.setItem('bachelorious_properties', JSON.stringify(updatedProperties));
    setMyProperties(prev => prev.filter(p => p.id !== propertyId));
    
    toast({
      title: "Property Deleted",
      description: "Your property has been removed from listings.",
    });
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'house': return <Home className="w-4 h-4" />;
      case 'room': return <div className="w-4 h-4 bg-blue-600 rounded"></div>;
      case 'seat': return <User className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Please log in to view your profile</h2>
            <Link to="/login">
              <Button className="mt-4 btn-primary">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and property listings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                    <Badge className={user.userType === 'owner' ? 'bg-blue-600' : 'bg-green-600'}>
                      {user.userType === 'owner' ? 'Property Owner' : 'House Seeker'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="input-modern"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="input-modern"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="input-modern"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Input
                      value={user.userType === 'owner' ? 'Property Owner' : 'House Seeker'}
                      disabled
                      className="input-modern bg-gray-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSaveProfile} className="btn-primary">
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone || ''
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <Button 
                    variant="destructive" 
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="w-5 h-5" />
                    <span>My Properties ({myProperties.length})</span>
                  </CardTitle>
                  {user.userType === 'owner' && (
                    <Link to="/list-property">
                      <Button className="btn-primary">
                        Add New Property
                      </Button>
                    </Link>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {myProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Listed</h3>
                    <p className="text-gray-600 mb-4">
                      {user.userType === 'owner' 
                        ? "You haven't listed any properties yet. Start by adding your first property."
                        : "You're registered as a house seeker. Switch to property owner to list properties."
                      }
                    </p>
                    {user.userType === 'owner' && (
                      <Link to="/list-property">
                        <Button className="btn-primary">
                          List Your First Property
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myProperties.map((property) => (
                      <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-4 flex-1">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                {property.title}
                              </h4>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{property.location}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  {getPropertyIcon(property.type)}
                                  <span className="ml-1 capitalize">{property.type}</span>
                                </span>
                                <span>₹{property.price.toLocaleString()}/month</span>
                                <span>{property.area} sq ft</span>
                                <Badge variant={property.available ? "default" : "secondary"}>
                                  {property.available ? "Available" : "Unavailable"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Link to={`/property/${property.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Favorite Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start browsing properties and add them to your favorites for quick access.
                  </p>
                  <Link to="/search">
                    <Button className="btn-primary">
                      Browse Properties
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
