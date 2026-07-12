import React, { useState } from 'react';
import { Plus, Check, X, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent } from '@/components/common/Card/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { formatDate, cn } from '@/utils/helpers';

export const Maintenance: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maintenanceRequests = [
    {
      id: 'MNT-001',
      asset: 'HP Server Rack',
      assetTag: 'AF-0056',
      issue: 'Cooling fan failure',
      priority: 'HIGH',
      status: 'PENDING',
      requestedBy: 'IT Team',
      createdAt: '2026-07-12T10:30:00',
    },
    {
      id: 'MNT-002',
      asset: 'Dell XPS 15',
      assetTag: 'AF-0114',
      issue: 'Battery not charging',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      requestedBy: 'Priya Sharma',
      createdAt: '2026-07-12T09:15:00',
    },
    {
      id: 'MNT-003',
      asset: 'Epson Projector',
      assetTag: 'AF-0023',
      issue: 'Lamp replacement',
      priority: 'LOW',
      status: 'RESOLVED',
      requestedBy: 'Raj Kumar',
      createdAt: '2026-07-11T14:20:00',
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { className: string }> = {
      LOW: { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      MEDIUM: { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      HIGH: { className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
      CRITICAL: { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    };
    const config = variants[priority] || variants.MEDIUM;
    return (
      <Badge variant="outline" className={cn('capitalize', config.className)}>
        {priority.toLowerCase()}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string }> = {
      PENDING: { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      APPROVED: { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      REJECTED: { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
      IN_PROGRESS: { className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
      RESOLVED: { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    };
    const config = variants[status] || variants.PENDING;
    return (
      <Badge variant="outline" className={cn('capitalize', config.className)}>
        {status.toLowerCase().replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Maintenance Management</h1>
          <p className="text-sm text-muted-foreground">
            Raise, approve, and track maintenance requests
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Raise Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.asset}</div>
                      <div className="text-xs text-muted-foreground">{request.assetTag}</div>
                    </div>
                  </TableCell>
                  <TableCell>{request.issue}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>{formatDate(request.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {request.status === 'PENDING' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600">
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === 'IN_PROGRESS' && (
                        <Button variant="outline" size="sm" className="text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                      {request.status === 'RESOLVED' && (
                        <span className="text-xs text-muted-foreground">Completed</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Raise Maintenance Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Raise Maintenance Request"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Asset *</label>
            <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
              <option value="">Select Asset</option>
              <option>AF-0114 - Dell XPS 15</option>
              <option>AF-0056 - HP Server Rack</option>
              <option>AF-0023 - Epson Projector</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Issue Description *</label>
            <textarea
              rows={3}
              placeholder="Describe the issue in detail..."
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority *</label>
            <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
              <option>Low</option>
              <option selected>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Attach Photo</label>
            <input type="file" accept="image/*" className="w-full text-sm" />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};