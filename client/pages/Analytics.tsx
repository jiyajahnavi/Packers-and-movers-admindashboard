import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown,
  Calendar, 
  DollarSign, 
  Users,
  BarChart3,
  PieChart,
  MapPin,
  Star,
  Clock,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30days');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 256800,
      revenueChange: 18.5,
      totalBookings: 142,
      bookingsChange: 12.3,
      avgBookingValue: 1809,
      avgValueChange: 5.2,
      customerSatisfaction: 4.3,
      satisfactionChange: 0.2
    },
    monthlyRevenue: [
      { month: 'Jan', revenue: 45000, bookings: 35 },
      { month: 'Feb', revenue: 52000, bookings: 42 },
      { month: 'Mar', revenue: 48000, bookings: 38 },
      { month: 'Apr', revenue: 58000, bookings: 45 },
      { month: 'May', revenue: 63000, bookings: 48 },
      { month: 'Jun', revenue: 71000, bookings: 52 }
    ],
    topRoutes: [
      { route: 'Delhi → Mumbai', bookings: 23, revenue: 184000 },
      { route: 'Bangalore → Chennai', bookings: 18, revenue: 126000 },
      { route: 'Pune → Hyderabad', bookings: 15, revenue: 105000 },
      { route: 'Mumbai → Pune', bookings: 12, revenue: 72000 },
      { route: 'Chennai → Bangalore', bookings: 10, revenue: 58000 }
    ],
    bookingsByStatus: [
      { status: 'Completed', count: 89, percentage: 62.7 },
      { status: 'Confirmed', count: 25, percentage: 17.6 },
      { status: 'In Progress', count: 18, percentage: 12.7 },
      { status: 'Pending', count: 10, percentage: 7.0 }
    ],
    customerMetrics: {
      newCustomers: 45,
      returningCustomers: 28,
      customerRetentionRate: 38.4,
      averageRating: 4.3
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your business performance and insights.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 3 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(analyticsData.overview.totalRevenue)}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      +{analyticsData.overview.revenueChange}% from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {analyticsData.overview.totalBookings}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600">
                      +{analyticsData.overview.bookingsChange}% from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Booking Value</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(analyticsData.overview.avgBookingValue)}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-sm text-purple-600">
                      +{analyticsData.overview.avgValueChange}% from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {analyticsData.overview.customerSatisfaction}/5.0
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-yellow-600">
                      +{analyticsData.overview.satisfactionChange} from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.monthlyRevenue.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 text-sm text-gray-600">{data.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(data.revenue / 80000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(data.revenue)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {data.bookings} bookings
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booking Status Distribution */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Booking Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.bookingsByStatus.map((status) => (
                  <div key={status.status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge className={cn('text-xs px-2 py-1', getStatusColor(status.status))}>
                        {status.status}
                      </Badge>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${status.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {status.count}
                      </div>
                      <div className="text-xs text-gray-500">
                        {status.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Routes */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Top Performing Routes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Route</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Bookings</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topRoutes.map((route, index) => (
                      <tr key={route.route} className="border-b border-gray-100">
                        <td className="py-3 px-6">
                          <div className="flex items-center">
                            <div className={cn(
                              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white mr-3',
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-gray-400' :
                              index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                            )}>
                              {index + 1}
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              {route.route}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-sm font-medium text-gray-900">
                          {route.bookings}
                        </td>
                        <td className="py-3 px-6 text-sm font-medium text-gray-900">
                          {formatCurrency(route.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Customer Metrics */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Customer Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {analyticsData.customerMetrics.newCustomers}
                  </div>
                  <div className="text-sm text-gray-600">New Customers</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.customerMetrics.returningCustomers}
                  </div>
                  <div className="text-sm text-gray-600">Returning Customers</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Customer Retention Rate</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {analyticsData.customerMetrics.customerRetentionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analyticsData.customerMetrics.customerRetentionRate}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">Average Rating</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {analyticsData.customerMetrics.averageRating}/5.0
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Analytics Report
              </Button>
              <Button variant="outline" className="justify-start">
                <PieChart className="h-4 w-4 mr-2" />
                View Detailed Charts
              </Button>
              <Button variant="outline" className="justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
