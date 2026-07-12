import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, X } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { formatDate, cn } from '@/utils/helpers';

export const Bookings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bookings = [
    {
      id: '1',
      resource: 'Conference Room B2',
      bookedBy: 'Priya Sharma',
      date: '2026-07-12',
      startTime: '10:00',
      endTime: '11:00',
      status: 'UPCOMING',
    },
    {
      id: '2',
      resource: 'Projector - Hall A',
      bookedBy: 'Raj Kumar',
      date: '2026-07-12',
      startTime: '14:30',
      endTime: '16:00',
      status: 'CONFIRMED',
    },
    {
      id: '3',
      resource: 'Toyota Innova',
      bookedBy: 'Sales Team',
      date: '2026-07-12',
      startTime: '09:00',
      endTime: '12:00',
      status: 'ONGOING',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; className: string }> = {
      UPCOMING: { variant: 'info', className: 'bg-info/10 text-info' },
      CONFIRMED: { variant: 'success', className: 'bg-success/10 text-success' },
      ONGOING: { variant: 'warning', className: 'bg-warning/10 text-warning' },
      COMPLETED: { variant: 'default', className: 'bg-muted/10 text-muted-foreground' },
      CANCELLED: { variant: 'error', className: 'bg-destructive/10 text-destructive' },
    };

    const config = variants[status] || variants.UPCOMING;
    return (
      <Badge variant="outline" className={cn('capitalize', config.className)}>
        {status.toLowerCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Resource Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Book shared resources and manage time slots
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Book Resource
        </Button>
      </div>

      {/* Today's Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Today's Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center p-2 rounded bg-muted/50">
              <span className="text-sm">Conference Room B2</span>
              <span className="text-sm font-medium">10:00 - 11:00</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/50">
              <span className="text-sm">Projector - Hall A</span>
              <span className="text-sm font-medium">14:30 - 16:00</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/50">
              <span className="text-sm">Toyota Innova</span>
              <span className="text-sm font-medium">09:00 - 12:00</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center p-2 rounded bg-muted/50">
              <span className="text-sm">Conference Room B2</span>
              <span className="text-sm font-medium">Tomorrow 10:00</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/50">
              <span className="text-sm">Meeting Room C</span>
              <span className="text-sm font-medium">Jul 20, 15:00</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Booked By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.resource}</TableCell>
                  <TableCell>{booking.bookedBy}</TableCell>
                  <TableCell>{formatDate(booking.date)}</TableCell>
                  <TableCell>{booking.startTime} - {booking.endTime}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Book Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Book Resource"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Resource *</label>
            <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
              <option value="">Select Resource</option>
              <option>Conference Room B2</option>
              <option>Projector - Hall A</option>
              <option>Toyota Innova</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Booking Title *</label>
            <input type="text" placeholder="e.g., Team Meeting" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date *</label>
            <input type="date" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time *</label>
              <input type="time" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Time *</label>
              <input type="time" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Purpose</label>
            <textarea rows={2} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Book Resource</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};