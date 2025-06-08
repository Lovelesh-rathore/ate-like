
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Pin, Calendar, Users, Plus } from 'lucide-react';

const Announcements: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: 'Swimming Pool Maintenance',
      content: 'The swimming pool will be closed for maintenance from December 10-12. We apologize for any inconvenience.',
      author: 'Building Management',
      date: '2024-12-08',
      time: '10:00 AM',
      priority: 'high',
      category: 'Maintenance',
      pinned: true,
      likes: 15,
      views: 45
    },
    {
      id: 2,
      title: 'Holiday Celebration',
      content: 'Join us for the community Christmas celebration on December 25th at 6:00 PM in the clubhouse. Snacks and drinks will be provided.',
      author: 'Community Committee',
      date: '2024-12-07',
      time: '2:30 PM',
      priority: 'medium',
      category: 'Events',
      pinned: false,
      likes: 28,
      views: 67
    },
    {
      id: 3,
      title: 'New Security Guidelines',
      content: 'Updated security protocols are now in effect. All visitors must be pre-approved through the app. Please ensure compliance.',
      author: 'Security Team',
      date: '2024-12-06',
      time: '9:15 AM',
      priority: 'high',
      category: 'Security',
      pinned: true,
      likes: 12,
      views: 89
    },
    {
      id: 4,
      title: 'Parking Space Allocation',
      content: 'New parking space allocations have been updated. Please check your assigned space in the resident portal.',
      author: 'Building Management',
      date: '2024-12-05',
      time: '4:45 PM',
      priority: 'low',
      category: 'General',
      pinned: false,
      likes: 8,
      views: 34
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Maintenance': return '🔧';
      case 'Events': return '🎉';
      case 'Security': return '🛡️';
      case 'General': return '📢';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Announcements</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest community news and updates
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
                <p className="text-2xl font-bold">{announcements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Pin className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pinned</p>
                <p className="text-2xl font-bold">
                  {announcements.filter(a => a.pinned).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className={announcement.pinned ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {announcement.pinned && (
                    <Pin className="h-5 w-5 text-primary mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{getCategoryIcon(announcement.category)}</span>
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      By {announcement.author} • {announcement.date} at {announcement.time}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{announcement.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4">{announcement.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>👍 {announcement.likes} likes</span>
                  <span>👁️ {announcement.views} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    Like
                  </Button>
                  <Button variant="ghost" size="sm">
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
