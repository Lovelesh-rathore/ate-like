
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, QrCode, Clock, CheckCircle } from 'lucide-react';

const Visitors: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const todayVisitors = [
    { id: 1, name: 'John Smith', type: 'Guest', time: '10:30 AM', status: 'approved', qrCode: 'QR123456' },
    { id: 2, name: 'Amazon Delivery', type: 'Delivery', time: '02:15 PM', status: 'waiting', qrCode: 'QR789012' },
    { id: 3, name: 'Sarah Johnson', type: 'Service Provider', time: '04:00 PM', status: 'entered', qrCode: 'QR345678' },
  ];

  const preApproved = [
    { id: 4, name: 'Mike Wilson', type: 'Guest', date: 'Tomorrow, 6:00 PM', status: 'pre-approved' },
    { id: 5, name: 'Grocery Delivery', type: 'Delivery', date: 'Dec 10, 10:00 AM', status: 'pre-approved' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'entered': return 'bg-blue-100 text-blue-800';
      case 'pre-approved': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const VisitorCard = ({ visitor, showQR = true }: { visitor: any, showQR?: boolean }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{visitor.name}</h4>
              <p className="text-sm text-muted-foreground">{visitor.type}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(visitor.status)}>
              {visitor.status.replace('-', ' ')}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              {visitor.time || visitor.date}
            </p>
          </div>
        </div>
        {showQR && visitor.qrCode && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">QR Code: {visitor.qrCode}</span>
            <Button size="sm" variant="outline">
              <QrCode className="h-4 w-4 mr-2" />
              View QR
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visitor Management</h1>
          <p className="text-muted-foreground">
            Manage and track visitors to your community
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Pre-approve Visitor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pre-approve Visitor</DialogTitle>
              <DialogDescription>
                Create a visitor pass for advance approval
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="visitorName">Visitor Name</Label>
                <Input id="visitorName" placeholder="Enter visitor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitorType">Visitor Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visitor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guest">Guest</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitDate">Visit Date & Time</Label>
                <Input id="visitDate" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Generate Visitor Pass
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Visitors</TabsTrigger>
          <TabsTrigger value="preapproved">Pre-approved</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Today's Visitors
              </CardTitle>
              <CardDescription>
                Current visitor status and entry logs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayVisitors.map((visitor) => (
                <VisitorCard key={visitor.id} visitor={visitor} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preapproved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Pre-approved Visitors
              </CardTitle>
              <CardDescription>
                Visitors with advance approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {preApproved.map((visitor) => (
                <VisitorCard key={visitor.id} visitor={visitor} showQR={false} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitor History</CardTitle>
              <CardDescription>
                Past visitor records and entry logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Visitor history will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visitors;
