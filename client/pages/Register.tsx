import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

type RegisterFormValues = {
  organization: string;
  email: string;
  phone: string;
  address: string;
  vehicles: string;
  services: string;
  driversCount: number;
  requirements: string;
  logo?: FileList;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      organization: '',
      email: '',
      phone: '',
      address: '',
      vehicles: '',
      services: '',
      driversCount: 1,
      requirements: '',
      password: '',
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const onSubmit = (values: RegisterFormValues) => {
    const payload = { ...values } as any;
    if (values.logo && values.logo.length > 0) {
      const file = values.logo[0];
      payload.logoName = file.name;
    }

    // For now persist to localStorage as a simple stub
    const orgs = JSON.parse(localStorage.getItem('orgs') || '[]');
    orgs.push(payload);
    localStorage.setItem('orgs', JSON.stringify(orgs));

    alert('Organization registered successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Organization Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input {...form.register('organization', { required: 'Organization is required' })} />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    {...form.register('logo')}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files[0]) {
                        setLogoPreview(URL.createObjectURL(files[0]));
                        // update react-hook-form value
                        form.setValue('logo', files);
                      } else {
                        setLogoPreview(null);
                        form.setValue('logo', undefined as any);
                      }
                    }}
                    className={cn('w-full')}
                  />
                </FormControl>
                {logoPreview && (
                  <div className="mt-2">
                    <img src={logoPreview} alt="logo preview" className="h-20 w-20 object-contain rounded-md" />
                  </div>
                )}
              </FormItem>

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...form.register('email', { required: 'Email is required' })} />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...form.register('phone', { required: 'Phone is required' })} />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem className="md:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...form.register('address')} rows={3} />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Vehicles (describe)</FormLabel>
                <FormControl>
                  <Input {...form.register('vehicles')} placeholder="e.g. 10 trucks, 5 vans" />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Services Offered</FormLabel>
                <FormControl>
                  <Input {...form.register('services')} placeholder="comma separated e.g. packing, loading" />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Number of Drivers</FormLabel>
                <FormControl>
                  <Input type="number" {...form.register('driversCount', { valueAsNumber: true })} />
                </FormControl>
              </FormItem>

              <FormItem className="md:col-span-2">
                <FormLabel>Other Requirements / Notes</FormLabel>
                <FormControl>
                  <Textarea {...form.register('requirements')} rows={3} />
                </FormControl>
              </FormItem>

              <FormItem className="md:col-span-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...form.register('password', { required: 'Password required' })} />
                </FormControl>
                <FormMessage />
              </FormItem>

              <div className="md:col-span-2 flex items-center justify-between">
                <div>
                  Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Register</Button>
                  <Button variant="ghost" onClick={() => form.reset()} type="button">Reset</Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
