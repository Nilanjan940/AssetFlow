import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Check, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent } from '@/components/common/Card/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { AppDispatch, RootState } from '@/store';
import { formatDate, cn } from '@/utils/helpers';

export const Allocations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);

  // Mock data for demo
  const allocations = [
    {
      id: '1',
      assetName: 'Dell XPS 15',
      assetTag: 'AF-0114',
      allocatedTo: 'Priya Sharma',
      department: 'Engineering',
      expectedReturn: '2026-08-15',
      status: 'ACTIVE',
    },
    {
      id: '2',
      assetName: 'Epson Projector',
      assetTag: 'AF-0023',
      allocatedTo: 'Marketing Dept',
      department: 'Marketing',
      expectedReturn: '2026-07-30',
      status: 'OVERDUE',
    },
    {
      id: '3',
      assetName: 'Toyota Innova',
      assetTag: 'AF-0089',
      allocatedTo: 'Sales Team',
      department: 'Sales',
      expectedReturn: '2026-07-28',
      status: 'ACTIVE',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; className: string }> = {
      ACTIVE: { variant: 'info', className: 'bg-info/10 text-info' },
      OVERDUE: { variant: 'error', className: 'bg-destructive/10 text-destructive' },
      RETURNED: { variant: 'success', className: 'bg-success/10 text-success' },
      TRANSFERRED: { variant: 'warning', className: 'bg-warning/10 text-warning' },
    };

    const config = variants[status] || variants.ACTIVE;
    return (
      <Badge variant="outline" className={cn('capitalize', config.className)}>
        {status.toLowerCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Asset Allocations</h1>
          <p className="text-sm text-muted-foreground">
            Manage asset assignments, transfers, and returns
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Allocate Asset
        </Button>
      </div>

      {/* Allocations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Allocated To</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{allocation.assetName}</div>
                      <div className="text-xs text-muted-foreground">{allocation.assetTag}</div>
                    </div>
                  </TableCell>
                  <TableCell>{allocation.allocatedTo}</TableCell>
                  <TableCell>{allocation.department}</TableCell>
                  <TableCell>{formatDate(allocation.expectedReturn)}</TableCell>
                  <TableCell>{getStatusBadge(allocation.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Check className="h-4 w-4 mr-1" />
                        Return
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Transfer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Allocate Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Allocate Asset"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Asset *</label>
            <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
              <option value="">Select Asset</option>
              <option>AF-0023 - Epson Projector</option>
              <option>AF-0089 - Toyota Innova</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Allocate To *</label>
            <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
              <option value="">Select Employee</option>
              <option>Priya Sharma</option>
              <option>Rahul Sharma</option>
              <option>Sarah Johnson</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Expected Return Date *</label>
            <input type="date" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea rows={2} className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Allocate Asset</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};