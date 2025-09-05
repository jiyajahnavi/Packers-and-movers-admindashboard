import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  User,
  Phone,
  Mail,
  Shield,
  UserPlus,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff' | 'driver';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  dateJoined: string;
  lastLogin: string;
}

const usersData: User[] = [
  {
    id: 'USR001',
    name: 'Rajesh Kumar',
    role: 'admin',
    email: 'rajesh@swiftmovers.com',
    phone: '+91 98765 43210',
    status: 'active',
    dateJoined: '2023-01-15',
    lastLogin: '2024-01-25 09:30 AM'
  },
  {
    id: 'USR002',
    name: 'Priya Sharma',
    role: 'staff',
    email: 'priya@swiftmovers.com',
    phone: '+91 87654 32109',
    status: 'active',
    dateJoined: '2023-03-20',
    lastLogin: '2024-01-25 08:45 AM'
  },
  {
    id: 'USR003',
    name: 'Amit Patel',
    role: 'driver',
    email: 'amit@swiftmovers.com',
    phone: '+91 76543 21098',
    status: 'active',
    dateJoined: '2023-05-10',
    lastLogin: '2024-01-24 06:20 PM'
  },
  {
    id: 'USR004',
    name: 'Sunita Gupta',
    role: 'staff',
    email: 'sunita@swiftmovers.com',
    phone: '+91 65432 10987',
    status: 'inactive',
    dateJoined: '2023-07-01',
    lastLogin: '2024-01-20 03:15 PM'
  },
  {
    id: 'USR005',
    name: 'Ravi Singh',
    role: 'driver',
    email: 'ravi@swiftmovers.com',
    phone: '+91 54321 09876',
    status: 'active',
    dateJoined: '2023-08-15',
    lastLogin: '2024-01-25 07:10 AM'
  },
  {
    id: 'USR006',
    name: 'Meera Joshi',
    role: 'staff',
    email: 'meera@swiftmovers.com',
    phone: '+91 43210 98765',
    status: 'active',
    dateJoined: '2023-09-22',
    lastLogin: '2024-01-24 11:30 AM'
  }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'staff':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'driver':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'inactive':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Add User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    password: ''
  });

  // Filter users based on search term, role, and status
  React.useEffect(() => {
    let filtered = usersData;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, statusFilter]);

  const handleAddUser = () => {
    // Here you would typically make an API call to create the user
    console.log('Adding user:', newUser);
    
    // Reset form and close modal
    setNewUser({ name: '', role: '', email: '', phone: '', password: '' });
    setIsAddUserOpen(false);
    
    // Show success message (you could use a toast here)
    alert('User added successfully!');
  };

  const handleInputChange = (field: string, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = newUser.name && newUser.role && newUser.email && newUser.phone && newUser.password;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage your team members and their access permissions.</p>
          </div>
          
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={newUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddUserOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddUser}
                    disabled={!isFormValid}
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{usersData.length}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{usersData.filter(u => u.status === 'active').length}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{usersData.filter(u => u.role === 'staff').length}</div>
              <div className="text-sm text-gray-600">Staff Members</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{usersData.filter(u => u.role === 'driver').length}</div>
              <div className="text-sm text-gray-600">Drivers</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Team Members ({filteredUsers.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Role</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Contact</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Last Login</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={cn('border text-xs font-medium px-2.5 py-1', getRoleColor(user.role))}>
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-2" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-2" />
                            {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={cn('border text-xs font-medium px-2.5 py-1', getStatusColor(user.status))}>
                          <div className={cn('w-2 h-2 rounded-full mr-2', 
                            user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          )} />
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">
                          <p>{user.lastLogin}</p>
                          <p className="text-xs text-gray-500">
                            Joined: {new Date(user.dateJoined).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-primary hover:text-white transition-colors"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={cn(
                              'transition-colors',
                              user.status === 'active' 
                                ? 'hover:bg-red-500 hover:text-white' 
                                : 'hover:bg-green-500 hover:text-white'
                            )}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
