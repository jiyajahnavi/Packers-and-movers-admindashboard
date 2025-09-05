import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter,
  Eye,
  Edit,
  MapPin,
  Clock,
  Phone,
  User,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  amount: string;
  items: string;
}

const bookingsData: Booking[] = [
  {
    id: 'BK001',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    pickupLocation: 'Connaught Place, New Delhi',
    dropLocation: 'Bandra West, Mumbai',
    date: '2024-01-25',
    time: '09:00 AM',
    status: 'confirmed',
    amount: '₹8,500',
    items: '2 BHK Household'
  },
  {
    id: 'BK002',
    customerName: 'Priya Sharma',
    customerPhone: '+91 87654 32109',
    pickupLocation: 'Koramangala, Bangalore',
    dropLocation: 'T. Nagar, Chennai',
    date: '2024-01-26',
    time: '08:30 AM',
    status: 'pending',
    amount: '₹6,200',
    items: '1 BHK Household'
  },
  {
    id: 'BK003',
    customerName: 'Amit Patel',
    customerPhone: '+91 76543 21098',
    pickupLocation: 'Shivaji Nagar, Pune',
    dropLocation: 'HITEC City, Hyderabad',
    date: '2024-01-27',
    time: '10:00 AM',
    status: 'in-progress',
    amount: '₹7,800',
    items: '3 BHK Household'
  },
  {
    id: 'BK004',
    customerName: 'Sunita Gupta',
    customerPhone: '+91 65432 10987',
    pickupLocation: 'Park Street, Kolkata',
    dropLocation: 'Khandagiri, Bhubaneswar',
    date: '2024-01-28',
    time: '07:00 AM',
    status: 'completed',
    amount: '₹4,500',
    items: '1 BHK Household'
  },
  {
    id: 'BK005',
    customerName: 'Ravi Singh',
    customerPhone: '+91 54321 09876',
    pickupLocation: 'Sector 62, Noida',
    dropLocation: 'Golf Course Road, Gurgaon',
    date: '2024-01-29',
    time: '11:00 AM',
    status: 'pending',
    amount: '₹3,200',
    items: 'Office Relocation'
  },
  {
    id: 'BK006',
    customerName: 'Meera Joshi',
    customerPhone: '+91 43210 98765',
    pickupLocation: 'Andheri East, Mumbai',
    dropLocation: 'Whitefield, Bangalore',
    date: '2024-01-30',
    time: '06:00 AM',
    status: 'confirmed',
    amount: '₹9,800',
    items: '2 BHK Household'
  },
  {
    id: 'BK007',
    customerName: 'Deepak Verma',
    customerPhone: '+91 32109 87654',
    pickupLocation: 'Civil Lines, Jaipur',
    dropLocation: 'Satellite, Ahmedabad',
    date: '2024-01-31',
    time: '08:00 AM',
    status: 'cancelled',
    amount: '₹5,600',
    items: '1 BHK Household'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'in-progress':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'completed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return '✓';
    case 'pending':
      return '⏳';
    case 'in-progress':
      return '🚛';
    case 'completed':
      return '✅';
    case 'cancelled':
      return '❌';
    default:
      return '?';
  }
};

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredBookings, setFilteredBookings] = useState(bookingsData);

  // Filter bookings based on search term and status
  React.useEffect(() => {
    let filtered = bookingsData;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600 mt-1">Manage all your customer bookings and their status.</p>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by booking ID, customer name, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                All Bookings ({filteredBookings.length})
              </CardTitle>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Booking ID</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Customer</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Pickup Location</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Drop Location</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Amount</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr 
                      key={booking.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900">{booking.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900 flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {booking.customerName}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {booking.customerPhone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                          <span className="max-w-32 truncate">{booking.pickupLocation}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="max-w-32 truncate">{booking.dropLocation}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <p className="font-medium">{booking.date}</p>
                            <p className="text-xs text-gray-500">{booking.time}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge 
                          className={cn(
                            'border text-xs font-medium px-2.5 py-1',
                            getStatusColor(booking.status)
                          )}
                        >
                          <span className="mr-1">{getStatusIcon(booking.status)}</span>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900">{booking.amount}</span>
                        <p className="text-xs text-gray-500">{booking.items}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-primary hover:text-white transition-colors"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-primary hover:text-white transition-colors"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{bookingsData.filter(b => b.status === 'pending').length}</div>
              <div className="text-sm text-gray-600">Pending Bookings</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{bookingsData.filter(b => b.status === 'confirmed').length}</div>
              <div className="text-sm text-gray-600">Confirmed Bookings</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{bookingsData.filter(b => b.status === 'in-progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-600">{bookingsData.filter(b => b.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
