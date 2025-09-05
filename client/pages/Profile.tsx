import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Edit,
  Save,
  Upload,
  X,
  Plus,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [serviceAreas, setServiceAreas] = useState(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']);
  const [newServiceArea, setNewServiceArea] = useState('');
  
  const [companyData, setCompanyData] = useState({
    name: 'Swift Movers Ltd',
    address: '123 Industrial Area, Sector 18, Gurgaon, Haryana 122015',
    phone: '+91 98765 43210',
    email: 'info@swiftmovers.com',
    website: 'www.swiftmovers.com',
    gst: 'GST123456789',
    operatingHours: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: '10:00 AM - 4:00 PM'
    },
    pricing: {
      localMin: '2000',
      localMax: '8000',
      intercityMin: '5000',
      intercityMax: '25000'
    },
    aboutUs: 'Swift Movers Ltd is a leading packers and movers company with over 6 years of experience in providing reliable and efficient relocation services across India. We specialize in household shifting, office relocation, vehicle transportation, and warehousing solutions. Our trained professionals ensure safe and timely delivery of your belongings with complete care and transparency.'
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCompanyData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setCompanyData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addServiceArea = () => {
    if (newServiceArea.trim() && !serviceAreas.includes(newServiceArea.trim())) {
      setServiceAreas([...serviceAreas, newServiceArea.trim()]);
      setNewServiceArea('');
    }
  };

  const removeServiceArea = (area: string) => {
    setServiceAreas(serviceAreas.filter(a => a !== area));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    console.log('Saving company data:', companyData, 'Service areas:', serviceAreas);
    setIsEditing(false);
    alert('Company profile updated successfully!');
  };

  // Mock stats data
  const stats = {
    averageRating: 4.3,
    totalReviews: 127,
    completedBookings: 856,
    activeCustomers: 234
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Banner */}
        <div className="relative">
          {/* Banner Image */}
          <div className="h-48 bg-gradient-to-r from-primary to-blue-600 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-6 text-white">
              <h1 className="text-3xl font-bold">{companyData.name}</h1>
              <p className="text-blue-100 mt-1">Established since 2018 • Licensed & Verified</p>
            </div>
            {isEditing && (
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute top-4 right-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Banner
              </Button>
            )}
          </div>

          {/* Company Logo */}
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 bg-white rounded-lg border-4 border-white shadow-lg flex items-center justify-center">
              <Building className="h-12 w-12 text-primary" />
              {isEditing && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full hover:bg-primary/90"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Edit/Save Button */}
          <div className="absolute top-4 right-4">
            {isEditing ? (
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-16">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Company Information */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gst">GST Number</Label>
                    <Input
                      id="gst"
                      value={companyData.gst}
                      onChange={(e) => handleInputChange('gst', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={companyData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input
                      id="phone"
                      value={companyData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={companyData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle>Service Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <Badge 
                      key={area} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {area}
                      {isEditing && (
                        <button
                          onClick={() => removeServiceArea(area)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new service area"
                      value={newServiceArea}
                      onChange={(e) => setNewServiceArea(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addServiceArea()}
                    />
                    <Button onClick={addServiceArea} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle>Operating Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weekdays">Weekdays (Mon - Fri)</Label>
                    <Input
                      id="weekdays"
                      value={companyData.operatingHours.weekdays}
                      onChange={(e) => handleInputChange('operatingHours.weekdays', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weekends">Weekends (Sat - Sun)</Label>
                    <Input
                      id="weekends"
                      value={companyData.operatingHours.weekends}
                      onChange={(e) => handleInputChange('operatingHours.weekends', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Details */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle>Pricing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Local Moving (Within City)</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="localMin">Minimum Price (₹)</Label>
                        <Input
                          id="localMin"
                          value={companyData.pricing.localMin}
                          onChange={(e) => handleInputChange('pricing.localMin', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="localMax">Maximum Price (₹)</Label>
                        <Input
                          id="localMax"
                          value={companyData.pricing.localMax}
                          onChange={(e) => handleInputChange('pricing.localMax', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Inter-City Moving</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="intercityMin">Minimum Price (₹)</Label>
                        <Input
                          id="intercityMin"
                          value={companyData.pricing.intercityMin}
                          onChange={(e) => handleInputChange('pricing.intercityMin', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="intercityMax">Maximum Price (₹)</Label>
                        <Input
                          id="intercityMax"
                          value={companyData.pricing.intercityMax}
                          onChange={(e) => handleInputChange('pricing.intercityMax', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Us */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle>About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={companyData.aboutUs}
                  onChange={(e) => handleInputChange('aboutUs', e.target.value)}
                  disabled={!isEditing}
                  rows={6}
                  placeholder="Tell customers about your company, experience, and services..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ratings Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Customer Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stats.averageRating}
                  </div>
                  <StarRating rating={Math.round(stats.averageRating)} />
                  <div className="text-sm text-gray-600 mt-2">
                    Based on {stats.totalReviews} reviews
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">5 stars</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <span className="text-gray-600 text-xs">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">4 stars</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-gray-600 text-xs">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">3 stars</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '8%'}}></div>
                      </div>
                      <span className="text-gray-600 text-xs">8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">2 stars</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '2%'}}></div>
                      </div>
                      <span className="text-gray-600 text-xs">2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">1 star</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '0%'}}></div>
                      </div>
                      <span className="text-gray-600 text-xs">0%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Stats */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Business Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm text-gray-600">Total Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stats.completedBookings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm text-gray-600">Active Customers</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stats.activeCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-gray-600">Years in Business</span>
                  </div>
                  <span className="font-semibold text-gray-900">6+</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  View All Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Update Pricing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Manage Service Areas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
