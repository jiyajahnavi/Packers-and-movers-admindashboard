import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

const stats = [
  {
    title: 'Total Bookings',
    value: '156',
    change: '+12%',
    changeType: 'increase' as const,
    icon: Calendar,
  },
  {
    title: 'Active Bookings',
    value: '23',
    change: '+5%',
    changeType: 'increase' as const,
    icon: TrendingUp,
  },
  {
    title: 'Revenue (This Month)',
    value: '₹1,24,500',
    change: '+18%',
    changeType: 'increase' as const,
    icon: DollarSign,
  },
  {
    title: 'New Customers',
    value: '42',
    change: '+8%',
    changeType: 'increase' as const,
    icon: Users,
  },
];

const recentBookings = [
  {
    id: 'BK001',
    customer: 'Rajesh Kumar',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2024-01-25',
    status: 'confirmed',
    amount: '₹8,500',
    phone: '+91 98765 43210',
  },
  {
    id: 'BK002',
    customer: 'Priya Sharma',
    from: 'Bangalore',
    to: 'Chennai',
    date: '2024-01-26',
    status: 'pending',
    amount: '₹6,200',
    phone: '+91 87654 32109',
  },
  {
    id: 'BK003',
    customer: 'Amit Patel',
    from: 'Pune',
    to: 'Hyderabad',
    date: '2024-01-27',
    status: 'in-progress',
    amount: '₹7,800',
    phone: '+91 76543 21098',
  },
  {
    id: 'BK004',
    customer: 'Sunita Gupta',
    from: 'Kolkata',
    to: 'Bhubaneswar',
    date: '2024-01-28',
    status: 'completed',
    amount: '₹4,500',
    phone: '+91 65432 10987',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in-progress':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Booking ID</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Route</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900">{booking.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{booking.customer}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {booking.phone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.from} → {booking.to}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.date}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900">{booking.amount}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/bookings">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add New Booking
                </Button>
              </Link>
              <Link to="/analytics">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link to="/users">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Swift Movers Ltd</p>
                  <p className="text-sm text-gray-500">Established since 2018</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  admin@swiftmovers.com
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  Delhi, Mumbai, Bangalore
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
