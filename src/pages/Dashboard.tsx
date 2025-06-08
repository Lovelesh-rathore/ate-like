
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Users, Calendar, Settings, Phone, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Visitors', value: '3', icon: Users, change: '+2 today' },
    { title: 'Pending Payments', value: '₹5,200', icon: Calendar, change: 'Due in 5 days' },
    { title: 'Service Requests', value: '2', icon: Settings, change: '1 completed' },
    { title: 'Announcements', value: '4', icon: Bell, change: '2 new today' },
  ];

  const recentActivity = [
    { type: 'visitor', message: 'Visitor John Smith approved for entry', time: '10 mins ago', status: 'success' },
    { type: 'payment', message: 'Maintenance payment of ₹2,500 received', time: '2 hours ago', status: 'success' },
    { type: 'service', message: 'Plumbing service request completed', time: '1 day ago', status: 'completed' },
    { type: 'announcement', message: 'Swimming pool maintenance scheduled', time: '2 days ago', status: 'info' },
  ];

  const quickActions = [
    { title: 'Pre-approve Visitor', icon: Users, href: '/visitors' },
    { title: 'Make Payment', icon: Calendar, href: '/payments' },
    { title: 'Book Amenity', icon: Calendar, href: '/amenities' },
    { title: 'Emergency Alert', icon: Phone, href: '/emergency' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your community today.
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {user?.flatNumber} • {user?.role}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used features for easy access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <action.icon className="h-6 w-6" />
                <span className="text-sm text-center">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates from your community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
