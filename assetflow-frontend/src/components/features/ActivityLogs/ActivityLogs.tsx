import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent } from '@/components/common/Card/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';

export const ActivityLogs: React.FC = () => {
  const logs = [
    {
      id: '1',
      timestamp: '2026-07-12 10:30:22',
      user: 'John Doe',
      action: 'REGISTERED',
      entity: 'Asset',
      details: 'Dell XPS 15 (AF-0114)',
    },
    {
      id: '2',
      timestamp: '2026-07-12 10:15:07',
      user: 'Priya Sharma',
      action: 'ALLOCATED',
      entity: 'Asset',
      details: 'AF-0114 → Priya Sharma',
    },
    {
      id: '3',
      timestamp: '2026-07-12 09:45:33',
      user: 'Rahul Sharma',
      action: 'MAINTENANCE',
      entity: 'Request',
      details: 'MNT-002 created for AF-0056',
    },
    {
      id: '4',
      timestamp: '2026-07-12 09:20:18',
      user: 'Sarah Johnson',
      action: 'BOOKED',
      entity: 'Resource',
      details: 'Conference Room B2 (10:00-11:00)',
    },
  ];

  const getActionBadge = (action: string) => {
    const variants: Record<string, { className: string }> = {
      REGISTERED: { className: 'bg-blue-100 text-blue-700' },
      ALLOCATED: { className: 'bg-green-100 text-green-700' },
      MAINTENANCE: { className: 'bg-yellow-100 text-yellow-700' },
      BOOKED: { className: 'bg-purple-100 text-purple-700' },
      RETURNED: { className: 'bg-indigo-100 text-indigo-700' },
      DELETED: { className: 'bg-red-100 text-red-700' },
    };
    const config = variants[action] || variants.REGISTERED;
    return (
      <Badge variant="outline" className={config.className}>
        {action}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Activity Logs</h1>
          <p className="text-sm text-muted-foreground">
            Complete audit trail of all system actions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search logs by user, action, or entity..."
              className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>{log.entity}</TableCell>
                  <TableCell className="text-sm">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};