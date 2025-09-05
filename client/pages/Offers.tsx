import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tag, Plus, Edit, Trash2, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Offer {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'flat';
  usageLimit?: number;
  expiresAt?: string | null;
  active: boolean;
  createdAt: string;
}

const sampleOffers: Offer[] = [
  {
    id: 'OF-001',
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    usageLimit: 100,
    expiresAt: null,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'OF-002',
    code: 'FLAT500',
    discount: 500,
    type: 'flat',
    usageLimit: 50,
    expiresAt: null,
    active: false,
    createdAt: new Date().toISOString(),
  },
];

function generateId() {
  return 'OF-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>(sampleOffers);
  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const [form, setForm] = useState({
    code: '',
    discount: '',
    type: 'percentage',
    usageLimit: '',
    expiresAt: '',
    active: true,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return offers;
    return offers.filter((o) => o.code.toLowerCase().includes(q));
  }, [offers, query]);

  function resetForm() {
    setForm({ code: '', discount: '', type: 'percentage', usageLimit: '', expiresAt: '', active: true });
  }

  function createOffer(e?: React.FormEvent) {
    e?.preventDefault();
    const discount = Number(form.discount || 0);
    if (!form.code.trim() || !discount || discount <= 0) return alert('Please provide a valid code and discount');
    const newOffer: Offer = {
      id: generateId(),
      code: form.code.trim().toUpperCase(),
      discount,
      type: form.type as Offer['type'],
      usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
      expiresAt: form.expiresAt || null,
      active: Boolean(form.active),
      createdAt: new Date().toISOString(),
    };
    setOffers((s) => [newOffer, ...s]);
    resetForm();
    setShowCreate(false);
  }

  function removeOffer(id: string) {
    if (!confirm('Delete this offer?')) return;
    setOffers((s) => s.filter((o) => o.id !== id));
  }

  function toggleActive(id: string) {
    setOffers((s) => s.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Tag className="h-6 w-6 text-primary" />
              <span>Offers</span>
            </h1>
            <p className="text-gray-600 mt-1">Create and manage coupon offers for your customers.</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-md px-2">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <Input
                placeholder="Search code..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-0 px-0 py-2"
              />
            </div>
            <Button onClick={() => setShowCreate((s) => !s)}>
              <Plus className="h-4 w-4 mr-2" />
              New Offer
            </Button>
          </div>
        </div>

        {showCreate && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Create Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={createOffer} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Code</Label>
                  <Input value={form.code} onChange={(e) => setForm((s) => ({ ...s, code: e.target.value }))} />
                </div>
                <div>
                  <Label>Discount</Label>
                  <Input
                    value={form.discount}
                    onChange={(e) => setForm((s) => ({ ...s, discount: e.target.value }))}
                    placeholder="e.g. 10 for 10% or 500 for flat"
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select
                    onValueChange={(val) => setForm((s) => ({ ...s, type: val }))}
                    defaultValue={form.type}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{form.type}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Usage Limit</Label>
                  <Input
                    value={form.usageLimit}
                    onChange={(e) => setForm((s) => ({ ...s, usageLimit: e.target.value }))}
                    placeholder="optional"
                  />
                </div>

                <div>
                  <Label>Expires At</Label>
                  <Input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => setForm((s) => ({ ...s, expiresAt: e.target.value }))}
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <Button type="submit">Create</Button>
                  <Button variant="ghost" onClick={() => { resetForm(); setShowCreate(false); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Existing Offers</CardTitle>
              <div className="text-sm text-gray-500">{offers.length} total</div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Code</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Discount</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Expires</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Created</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((offer) => (
                    <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{offer.code}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">
                          {offer.type === 'percentage' ? `${offer.discount}%` : `₹${offer.discount}`}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{offer.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{offer.expiresAt ? format(new Date(offer.expiresAt), 'yyyy-MM-dd') : '—'}</td>
                      <td className="py-4 px-6">
                        <Badge className={offer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {offer.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{format(new Date(offer.createdAt), 'yyyy-MM-dd')}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toggleActive(offer.id)}>
                            {offer.active ? 'Disable' : 'Enable'}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => removeOffer(offer.id)}>
                            <Trash2 className="h-4 w-4" />
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
      </div>
    </DashboardLayout>
  );
}
