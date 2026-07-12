import React, { useState } from 'react';
import { Building2, Tags, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';

export const Organization: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'departments' | 'categories' | 'employees'>('departments');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const departments = [
    { id: '1', name: 'Engineering', code: 'ENG', head: 'Dr. Ananya Patel', status: 'ACTIVE' },
    { id: '2', name: 'Marketing', code: 'MKT', head: 'Rahul Sharma', status: 'ACTIVE' },
    { id: '3', name: 'Sales', code: 'SAL', head: 'Priya Mehta', status: 'ACTIVE' },
  ];

  const categories = [
    { id: '1', name: 'Electronics', description: 'Laptops, projectors, etc.', fields: 'Warranty Period', status: 'ACTIVE' },
    { id: '2', name: 'Furniture', description: 'Desks, chairs, tables', fields: 'Material Type', status: 'ACTIVE' },
    { id: '3', name: 'Vehicles', description: 'Cars, vans, trucks', fields: 'License Plate, VIN', status: 'ACTIVE' },
  ];

  const employees = [
    { id: '1', name: 'John Doe', email: 'john@assetflow.com', department: 'Engineering', role: 'ADMIN', status: 'ACTIVE' },
    { id: '2', name: 'Priya Sharma', email: 'priya@assetflow.com', department: 'Engineering', role: 'DEPARTMENT_HEAD', status: 'ACTIVE' },
    { id: '3', name: 'Rahul Sharma', email: 'rahul@assetflow.com', department: 'Marketing', role: 'ASSET_MANAGER', status: 'ACTIVE' },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'departments':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Department Head</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.code}</TableCell>
                  <TableCell>{dept.head}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      {dept.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'categories':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Custom Fields</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.description}</TableCell>
                  <TableCell>{cat.fields}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      {cat.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'employees':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      {emp.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        Promote
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Organization Setup</h1>
          <p className="text-sm text-muted-foreground">
            Manage departments, categories, and employee directory
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        <button
          onClick={() => setActiveTab('departments')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'departments'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Building2 className="inline-block h-4 w-4 mr-2" />
          Departments
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'categories'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Tags className="inline-block h-4 w-4 mr-2" />
          Asset Categories
        </button>
        <button
          onClick={() => setActiveTab('employees')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'employees'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="inline-block h-4 w-4 mr-2" />
          Employee Directory
        </button>
      </div>

      {/* Tab Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg capitalize">{activeTab}</CardTitle>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add {activeTab.slice(0, -1)}
            </Button>
          </div>
        </CardHeader>
        <CardContent>{getTabContent()}</CardContent>
      </Card>

      {/* Add Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={`Add ${activeTab.slice(0, -1)}`}
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text"
              placeholder={`Enter ${activeTab.slice(0, -1)} name`}
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
            />
          </div>
          {activeTab === 'departments' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Code</label>
                <input
                  type="text"
                  placeholder="e.g., ENG"
                  className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department Head</label>
                <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
                  <option value="">Select Employee</option>
                  <option>John Doe</option>
                  <option>Priya Sharma</option>
                </select>
              </div>
            </>
          )}
          {activeTab === 'categories' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                rows={2}
                placeholder="Category description..."
                className="w-full px-3 py-2 rounded-md border bg-background text-sm"
              />
            </div>
          )}
          {activeTab === 'employees' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name *</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department *</label>
                <select className="w-full px-3 py-2 rounded-md border bg-background text-sm">
                  <option value="">Select Department</option>
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </>
          )}
          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add {activeTab.slice(0, -1)}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};