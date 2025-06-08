
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Clock, Users, MapPin, Plus } from 'lucide-react';

const Amenities: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const amenities = [
    {
      id: 1,
      name: 'Swimming Pool',
      description: 'Olympic size swimming pool with lifeguard',
      capacity: 20,
      location: 'Block A, Ground Floor',
      available: true,
      price: 100,
      image: '🏊',
      facilities: ['Lifeguard', 'Changing Room', 'Shower'],
      timings: '6:00 AM - 10:00 PM'
    },
    {
      id: 2,
      name: 'Gymnasium',
      description: 'Fully equipped fitness center',
      capacity: 15,
      location: 'Block B, 1st Floor',
      available: true,
      price: 50,
      image: '🏋️',
      facilities: ['Cardio Equipment', 'Weight Training', 'AC'],
      timings: '5:00 AM - 11:00 PM'
    },
    {
      id: 3,
      name: 'Clubhouse',
      description: 'Event hall for parties and gatherings',
      capacity: 100,
      location: 'Central Block',
      available: false,
      price: 500,
      image: '🏛️',
      facilities: ['Audio System', 'Projector', 'Kitchen'],
      timings: '9:00 AM - 11:00 PM'
    },
    {
      id: 4,
      name: 'Tennis Court',
      description: 'Professional tennis court',
      capacity: 4,
      location: 'Sports Complex',
      available: true,
      price: 200,
      image: '🎾',
      facilities: ['Floodlights', 'Equipment Rental'],
      timings: '6:00 AM - 10:00 PM'
    },
    {
      id: 5,
      name: 'Kids Play Area',
      description: 'Safe play area for children',
      capacity: 30,
      location: 'Block C, Ground Floor',
      available: true,
      price: 0,
      image: '🎠',
      facilities: ['Soft Play', 'Slides', 'Safety Fence'],
      timings: '6:00 AM - 8:00 PM'
    },
    {
      id: 6,
      name: 'BBQ Area',
      description: 'Outdoor barbecue and picnic area',
      capacity: 25,
      location: 'Garden Area',
      available: true,
      price: 150,
      image: '🔥',
      facilities: ['BBQ Grills', 'Tables', 'Wash Basin'],
      timings: '10:00 AM - 10:00 PM'
    }
  ];

  const myBookings = [
    {
      id: 1,
      amenity: 'Swimming Pool',
      date: '2024-12-10',
      time: '6:00 PM - 8:00 PM',
      status: 'confirmed',
      price: 100,
      guests: 3
    },
    {
      id: 2,
      amenity: 'Gymnasium',
      date: '2024-12-12',
      time: '7:00 AM - 8:00 AM',
      status: 'confirmed',
      price: 50,
      guests: 1
    },
    {
      id: 3,
      amenity: 'Clubhouse',
      date: '2024-12-15',
      time: '7:00 PM - 11:00 PM',
      status: 'pending',
      price: 500,
      guests: 50
    }
  ];

  const timeSlots = [
    '6:00 AM - 8:00 AM',
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM',
    '8:00 PM - 10:00 PM'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Amenity Booking</h1>
          <p className="text-muted-foreground">
            Book community amenities and manage your reservations
          </p>
        </div>
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Quick Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Booking</DialogTitle>
              <DialogDescription>
                Book an amenity for today
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Amenity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose amenity" />
                  </SelectTrigger>
                  <SelectContent>
                    {amenities.filter(a => a.available).map(amenity => (
                      <SelectItem key={amenity.id} value={amenity.id.toString()}>
                        {amenity.image} {amenity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time Slot</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setIsBookingDialogOpen(false)}>
                Book Now
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="amenities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="amenities">Available Amenities</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="amenities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity) => (
              <Card key={amenity.id} className={!amenity.available ? "opacity-60" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span className="text-2xl">{amenity.image}</span>
                      <span>{amenity.name}</span>
                    </CardTitle>
                    <Badge variant={amenity.available ? "default" : "secondary"}>
                      {amenity.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <CardDescription>{amenity.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Capacity: {amenity.capacity} people</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{amenity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{amenity.timings}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Facilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {amenity.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {amenity.price === 0 ? 'Free' : `₹${amenity.price}/hour`}
                    </span>
                    <Button disabled={!amenity.available}>
                      {amenity.available ? 'Book Now' : 'Unavailable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>
                View and manage your amenity reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{booking.amenity}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{booking.guests} guests</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <p className="text-sm font-medium">₹{booking.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>
                  Choose a date to view availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Availability for {selectedDate?.toDateString()}</CardTitle>
                <CardDescription>
                  Available time slots for selected date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeSlots.map((slot, index) => (
                    <div key={slot} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{slot}</span>
                      <Badge variant={index % 3 === 0 ? "secondary" : "default"}>
                        {index % 3 === 0 ? "Booked" : "Available"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Amenities;
