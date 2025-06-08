
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, CreditCard, Download, AlertCircle, CheckCircle } from 'lucide-react';

const Payments: React.FC = () => {
  const paymentStats = {
    totalDue: 5200,
    paid: 2500,
    pending: 2700,
    nextDueDate: '2024-12-15'
  };

  const paymentHistory = [
    {
      id: 1,
      type: 'Maintenance Fee',
      amount: 2500,
      date: '2024-11-01',
      status: 'paid',
      method: 'UPI',
      receipt: 'RCP001'
    },
    {
      id: 2,
      type: 'Parking Fee',
      amount: 500,
      date: '2024-11-01',
      status: 'paid',
      method: 'Card',
      receipt: 'RCP002'
    },
    {
      id: 3,
      type: 'Maintenance Fee',
      amount: 2500,
      date: '2024-12-01',
      status: 'pending',
      method: '',
      receipt: ''
    },
    {
      id: 4,
      type: 'Amenity Booking',
      amount: 200,
      date: '2024-12-05',
      status: 'pending',
      method: '',
      receipt: ''
    }
  ];

  const upcomingPayments = [
    {
      type: 'Maintenance Fee',
      amount: 2500,
      dueDate: '2024-12-15',
      description: 'Monthly maintenance charges'
    },
    {
      type: 'Security Deposit',
      amount: 5000,
      dueDate: '2024-12-20',
      description: 'Annual security deposit renewal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const paymentProgress = (paymentStats.paid / (paymentStats.totalDue)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Management</h1>
          <p className="text-muted-foreground">
            Track and manage your community payments
          </p>
        </div>
        <Button>
          <CreditCard className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Due</p>
                <p className="text-2xl font-bold">₹{paymentStats.totalDue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold">₹{paymentStats.paid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">₹{paymentStats.pending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Next Due</p>
                <p className="text-lg font-bold">{paymentStats.nextDueDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>
            Your payment completion status for this period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completed</span>
              <span>{paymentProgress.toFixed(1)}%</span>
            </div>
            <Progress value={paymentProgress} />
            <p className="text-sm text-muted-foreground">
              ₹{paymentStats.paid.toLocaleString()} of ₹{paymentStats.totalDue.toLocaleString()} paid
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Your recent payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{payment.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {payment.date} {payment.method && `• ${payment.method}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{payment.amount.toLocaleString()}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        {payment.receipt && (
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>
                Payments due in the coming period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{payment.type}</h4>
                      <p className="text-sm text-muted-foreground">{payment.description}</p>
                      <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{payment.amount.toLocaleString()}</p>
                      <Button size="sm" className="mt-2">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Receipts</CardTitle>
              <CardDescription>
                Download and view your payment receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Payment receipts and invoices will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
