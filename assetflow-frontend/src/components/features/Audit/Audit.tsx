import React, { useState } from 'react';
import { Plus, Eye, Check, FileText } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent } from '@/components/common/Card/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { formatDate, cn } from '@/utils/helpers';

export const Audit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auditCycles = [
    {
      id: '1',
      title: 'Q3 2026 - IT Assets',
      scope: 'IT Department',
      auditor: 'Sarah Johnson',
      startDate: '2026-07-01',
      endDate: '2026-07-15',
      status: 'IN_PROGRESS',
      discrepancies: 3,
    },
    {
      id: '2',
      title: 'Q2 2026 - All Assets',
      scope: 'Organization-wide',
      auditor: 'Mike Chen',
      startDate: '2026-04-01',
      endDate: '2026-04-30',
      status: 'COMPLETED',
      discrepancies: 5,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string }> = {
      DRAFT: { className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
      IN_PROGRESS: { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      COMPLETED: { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      CLOSED: { className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    };
    const config = variants[status] || variants.DRAFT;
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
          <h1 className="text-2xl font-bold">Audit Management</h1>
          <p className="text-sm text-muted-foreground">
            Run structured audit cycles and track discrepancies
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Audit Cycle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Audits</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Assets</p>
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
                <p className="text-sm text-muted-foreground">Discrepancies Found</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit Cycle</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Discrepancies</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditCycles.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">{audit.title}</TableCell>
                  <TableCell>{audit.scope}</TableCell>
                  <TableCell>{audit.auditor}</TableCell>
                  <TableCell>
                    {formatDate(audit.startDate)} - {formatDate(audit.endDate)}
                  </TableCell>
                  <TableCell>{getStatusBadge(audit.status)}</TableCell>
                  <TableCell>
                    <span className={cn(
                      'font-medium',
                      audit.discrepancies > 0 ? 'text-red-600' : 'text-green-600'
                    )}>
                      {audit.discrepancies}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {audit.status === 'IN_PROGRESS' && (
                        <Button variant="outline" size="sm" className="text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Close
                        </Button>
                      )}
                      {audit.status === 'COMPLETED' && (
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Audit Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Create Audit Cycle"
        size="lg"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Audit Title *</label>
            <input
              type="text"
              placeholder="e.g., Q3 2026 IT Audit"
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Scope *</label>
            <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
              <option value="">Select Scope</option>
              <option>IT Department</option>
              <option>Marketing Department</option>
              <option>Organization-wide</option>
              <option>Finance Department</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date *</label>
              <input type="date" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date *</label>
              <input type="date" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Assign Auditor(s)</label>
            <select multiple className="w-full px-3 py-2 rounded-md border bg-background text-sm h-20">
              <option>John Doe</option>
              <option>Priya Sharma</option>
              <option>Rahul Sharma</option>
              <option>Sarah Johnson</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Start Audit Cycle</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};