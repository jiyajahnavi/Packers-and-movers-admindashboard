import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Calendar,
  RefreshCw,
  Smartphone,
  Banknote,
  Wallet,
  Globe,
  Save,
  Link,
  Unlink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'success' | 'failed' | 'refunded' | 'pending';
  mode: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';
  bookingId: string;
  transactionId: string;
}

const transactionData: Transaction[] = [
  {
    id: 'TXN001',
    customerName: 'Rajesh Kumar',
    amount: 8500,
    date: '2024-01-25 14:30',
    status: 'success',
    mode: 'upi',
    bookingId: 'BK001',
    transactionId: 'pay_MvNRzHvOjQT8Ab'
  },
  {
    id: 'TXN002',
    customerName: 'Priya Sharma',
    amount: 6200,
    date: '2024-01-24 11:45',
    status: 'success',
    mode: 'card',
    bookingId: 'BK002',
    transactionId: 'pay_MvNRzHvOjQT8Ac'
  },
  {
    id: 'TXN003',
    customerName: 'Amit Patel',
    amount: 7800,
    date: '2024-01-23 09:20',
    status: 'failed',
    mode: 'netbanking',
    bookingId: 'BK003',
    transactionId: 'pay_MvNRzHvOjQT8Ad'
  },
  {
    id: 'TXN004',
    customerName: 'Sunita Gupta',
    amount: 4500,
    date: '2024-01-22 16:15',
    status: 'success',
    mode: 'wallet',
    bookingId: 'BK004',
    transactionId: 'pay_MvNRzHvOjQT8Ae'
  },
  {
    id: 'TXN005',
    customerName: 'Ravi Singh',
    amount: 3200,
    date: '2024-01-21 13:30',
    status: 'refunded',
    mode: 'upi',
    bookingId: 'BK005',
    transactionId: 'pay_MvNRzHvOjQT8Af'
  },
  {
    id: 'TXN006',
    customerName: 'Meera Joshi',
    amount: 9800,
    date: '2024-01-20 10:45',
    status: 'success',
    mode: 'card',
    bookingId: 'BK006',
    transactionId: 'pay_MvNRzHvOjQT8Ag'
  },
  {
    id: 'TXN007',
    customerName: 'Deepak Verma',
    amount: 5600,
    date: '2024-01-19 15:20',
    status: 'pending',
    mode: 'netbanking',
    bookingId: 'BK007',
    transactionId: 'pay_MvNRzHvOjQT8Ah'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-600" />;
    case 'refunded':
      return <RefreshCw className="h-4 w-4 text-blue-600" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'failed':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'refunded':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getModeIcon = (mode: string) => {
  switch (mode) {
    case 'upi':
      return <Smartphone className="h-4 w-4" />;
    case 'card':
      return <CreditCard className="h-4 w-4" />;
    case 'netbanking':
      return <Globe className="h-4 w-4" />;
    case 'wallet':
      return <Wallet className="h-4 w-4" />;
    case 'cash':
      return <Banknote className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

export default function Payment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState(transactionData);
  
  // Integration settings
  const [isConnected, setIsConnected] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [integrationData, setIntegrationData] = useState({
    apiKey: '',
    secretKey: '',
    webhookUrl: 'https://swiftmovers.com/webhook/razorpay'
  });

  // Filter transactions
  React.useEffect(() => {
    let filtered = transactionData;

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    if (modeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.mode === modeFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case '7days':
          filterDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          filterDate.setDate(now.getDate() - 90);
          break;
      }
      
      if (dateFilter !== 'all') {
        filtered = filtered.filter(transaction => 
          new Date(transaction.date) >= filterDate
        );
      }
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, modeFilter, dateFilter]);

  const handleSaveIntegration = () => {
    // Here you would typically make an API call to save integration settings
    console.log('Saving integration data:', integrationData);
    setIsConnected(true);
    alert('Razorpay integration saved successfully!');
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIntegrationData({ apiKey: '', secretKey: '', webhookUrl: integrationData.webhookUrl });
    alert('Razorpay integration disconnected successfully!');
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Transaction ID', 'Customer Name', 'Amount', 'Date', 'Status', 'Mode', 'Booking ID'].join(','),
      ...filteredTransactions.map(t => [
        t.transactionId,
        t.customerName,
        t.amount,
        t.date,
        t.status,
        t.mode,
        t.bookingId
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Manage payment integrations and track transaction history.</p>
        </div>

        {/* Payment Integration Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Payment Integration</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Razorpay Integration */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-primary/5 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23528FF0' d='M22.436 0H1.564C.7 0 0 .7 0 1.564v20.872C0 23.3.7 24 1.564 24h20.872C23.3 24 24 23.3 24 22.436V1.564C24 .7 23.3 0 22.436 0zM7.735 17.688c0 .434-.352.785-.785.785H4.652c-.434 0-.785-.351-.785-.785V6.312c0-.434.351-.785.785-.785H6.95c.433 0 .785.351.785.785v11.376zm11.613 0c0 .434-.352.785-.785.785h-2.298c-.434 0-.785-.351-.785-.785V6.312c0-.434.351-.785.785-.785h2.298c.433 0 .785.351.785.785v11.376zm-4.134-5.688c0 .434-.352.785-.785.785h-2.298c-.434 0-.785-.351-.785-.785V6.312c0-.434.351-.785.785-.785h2.298c.433 0 .785.351.785.785V12z'/%3E%3C/svg%3E" 
                    alt="Razorpay" 
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Razorpay Integration</h3>
                  <p className="text-sm text-gray-600">Connect your Razorpay account to accept online payments</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="relative">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        placeholder="Enter your Razorpay API Key"
                        value={integrationData.apiKey}
                        onChange={(e) => setIntegrationData(prev => ({ ...prev, apiKey: e.target.value }))}
                        disabled={isConnected}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secretKey">Secret Key</Label>
                    <div className="relative">
                      <Input
                        id="secretKey"
                        type={showSecretKey ? "text" : "password"}
                        placeholder="Enter your Razorpay Secret Key"
                        value={integrationData.secretKey}
                        onChange={(e) => setIntegrationData(prev => ({ ...prev, secretKey: e.target.value }))}
                        disabled={isConnected}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowSecretKey(!showSecretKey)}
                      >
                        {showSecretKey ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      value={integrationData.webhookUrl}
                      onChange={(e) => setIntegrationData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      disabled={isConnected}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    {!isConnected ? (
                      <Button 
                        onClick={handleSaveIntegration}
                        disabled={!integrationData.apiKey || !integrationData.secretKey}
                        className="flex-1"
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Connect Razorpay
                      </Button>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" onClick={handleDisconnect} className="flex-1">
                          <Unlink className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          Update Settings
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(transactionData.filter(t => t.status === 'success').reduce((sum, t) => sum + t.amount, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Collected</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {transactionData.filter(t => t.status === 'success').length}
              </div>
              <div className="text-sm text-gray-600">Successful Payments</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600">
                {transactionData.filter(t => t.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-600">Failed Payments</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(transactionData.filter(t => t.status === 'refunded').reduce((sum, t) => sum + t.amount, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Refunded</div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Payment History</CardTitle>
              <Button onClick={exportToCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by transaction ID, customer, or booking ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={modeFilter} onValueChange={setModeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Payment Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-40">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Transaction ID</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Customer Name</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Amount</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Mode</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6">
                        <div className="font-mono text-sm text-gray-900">
                          {transaction.transactionId}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">
                          {transaction.customerName}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString('en-IN')}
                          <div className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleTimeString('en-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={cn('border text-xs font-medium px-2.5 py-1', getStatusColor(transaction.status))}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1">
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          {getModeIcon(transaction.mode)}
                          <span>{transaction.mode.toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-primary font-medium">
                          {transaction.bookingId}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}

            {/* Showing results count */}
            {filteredTransactions.length > 0 && (
              <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                <span>
                  Showing {filteredTransactions.length} of {transactionData.length} transactions
                </span>
                <span>
                  Total: {formatCurrency(filteredTransactions.reduce((sum, t) => sum + t.amount, 0))}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
