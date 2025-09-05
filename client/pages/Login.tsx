import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

type LoginValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginValues>({ defaultValues: { email: '', password: '' } });

  function onSubmit(values: LoginValues) {
    const orgs = JSON.parse(localStorage.getItem('orgs') || '[]');
    const found = orgs.find((o: any) => o.email === values.email && o.password === values.password);
    if (found) {
      localStorage.setItem('currentOrg', JSON.stringify(found));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle>Organization Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...form.register('email', { required: 'Email required' })} />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...form.register('password', { required: 'Password required' })} />
                </FormControl>
                <FormMessage />
              </FormItem>

              <div className="flex items-center justify-between">
                <div>
                  Don't have an account? <Link to="/register" className="text-primary font-medium">Register</Link>
                </div>
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
