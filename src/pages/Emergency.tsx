
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Shield, AlertTriangle, Heart, Settings, Users } from 'lucide-react';

const Emergency: React.FC = () => {
  const [sosMessage, setSosMessage] = useState('');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyContacts = [
    {
      id: 1,
      name: 'Security Control Room',
      number: '+91-9876543210',
      type: 'security',
      available: true,
      description: '24/7 Community Security'
    },
    {
      id: 2,
      name: 'Medical Emergency',
      number: '108',
      type: 'medical',
      available: true,
      description: 'Ambulance & Medical Help'
    },
    {
      id: 3,
      name: 'Fire Department',
      number: '101',
      type: 'fire',
      available: true,
      description: 'Fire & Rescue Services'
    },
    {
      id: 4,
      name: 'Police Emergency',
      number: '100',
      type: 'police',
      available: true,
      description: 'Police Emergency Services'
    },
    {
      id: 5,
      name: 'Building Manager',
      number: '+91-9876543211',
      type: 'management',
      available: true,
      description: 'Building Management Office'
    },
    {
      id: 6,
      name: 'Maintenance Team',
      number: '+91-9876543212',
      type: 'maintenance',
      available: false,
      description: 'Emergency Repairs'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'security',
      message: 'Security alert raised from A-101',
      time: '2 hours ago',
      status: 'resolved',
      responder: 'Security Team'
    },
    {
      id: 2,
      type: 'medical',
      message: 'Medical assistance requested',
      time: '1 day ago',
      status: 'resolved',
      responder: 'Medical Team'
    },
    {
      id: 3,
      type: 'maintenance',
      message: 'Water leakage emergency in B-204',
      time: '2 days ago',
      status: 'resolved',
      responder: 'Maintenance Team'
    }
  ];

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-5 w-5" />;
      case 'medical': return <Heart className="h-5 w-5" />;
      case 'fire': return <AlertTriangle className="h-5 w-5" />;
      case 'police': return <Shield className="h-5 w-5" />;
      case 'management': return <Users className="h-5 w-5" />;
      case 'maintenance': return <Settings className="h-5 w-5" />;
      default: return <Phone className="h-5 w-5" />;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'security': return 'text-blue-600 bg-blue-100';
      case 'medical': return 'text-red-600 bg-red-100';
      case 'fire': return 'text-orange-600 bg-orange-100';
      case 'police': return 'text-purple-600 bg-purple-100';
      case 'management': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSOS = () => {
    setIsEmergencyActive(true);
    // Simulate emergency alert
    setTimeout(() => {
      setIsEmergencyActive(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Emergency Services</h1>
          <p className="text-muted-foreground">
            Quick access to emergency contacts and SOS alerts
          </p>
        </div>
        <Badge variant="outline" className="text-red-600 border-red-200">
          Emergency Ready
        </Badge>
      </div>

      {/* SOS Alert Section */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Emergency SOS Alert
          </CardTitle>
          <CardDescription>
            Send immediate alert to security and emergency contacts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEmergencyActive && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                Emergency alert sent! Security has been notified and help is on the way.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="sosMessage">Optional Message</Label>
            <Textarea
              id="sosMessage"
              value={sosMessage}
              onChange={(e) => setSosMessage(e.target.value)}
              placeholder="Describe your emergency (optional)"
              className="resize-none"
            />
          </div>
          
          <Button 
            className="w-full bg-red-600 hover:bg-red-700"
            size="lg"
            onClick={handleSOS}
            disabled={isEmergencyActive}
          >
            <Phone className="h-5 w-5 mr-2" />
            {isEmergencyActive ? 'Alert Sent - Help Coming!' : 'SEND SOS ALERT'}
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>
            Quick dial emergency services and community contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getContactColor(contact.type)}`}>
                    {getContactIcon(contact.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                    <p className="text-sm font-mono">{contact.number}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={contact.available ? "default" : "secondary"}>
                    {contact.available ? "Available" : "Offline"}
                  </Badge>
                  <Button 
                    size="sm" 
                    disabled={!contact.available}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Emergency Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Emergency Alerts</CardTitle>
          <CardDescription>
            Community emergency alert history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getContactColor(alert.type)}`}>
                    {getContactIcon(alert.type)}
                  </div>
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.time} • Responded by {alert.responder}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(alert.status)}>
                  {alert.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Guidelines</CardTitle>
          <CardDescription>
            Important information for emergency situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">🚨 In Case of Fire:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Stay calm and alert others</li>
                <li>• Use stairs, never elevators</li>
                <li>• Call fire department (101)</li>
                <li>• Follow evacuation routes</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">🏥 Medical Emergency:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Call 108 for ambulance</li>
                <li>• Provide first aid if trained</li>
                <li>• Clear airway and check breathing</li>
                <li>• Stay with the person</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">🛡️ Security Threat:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Use SOS alert immediately</li>
                <li>• Stay in secure location</li>
                <li>• Don't confront intruders</li>
                <li>• Wait for security team</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">⚡ Power/Gas Emergency:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Turn off main switches</li>
                <li>• Ventilate the area</li>
                <li>• Contact maintenance team</li>
                <li>• Evacuate if necessary</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Emergency;
