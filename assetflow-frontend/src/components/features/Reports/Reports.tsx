import React from 'react';
import { BarChart3, FileExport, Printer, Download } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Gain operational insights and export data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Asset Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Laptops</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Projectors</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Vehicles</span>
                  <span className="font-medium">70%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Furniture</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Frequency */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Maintenance Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>Electronics</span>
                <span className="font-medium">23 requests</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>Vehicles</span>
                <span className="font-medium">8 requests</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>Equipment</span>
                <span className="font-medium">15 requests</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>Furniture</span>
                <span className="font-medium">5 requests</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department-wise Allocation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Department-wise Allocation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">24</div>
                <div className="text-sm text-muted-foreground">Engineering</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">18</div>
                <div className="text-sm text-muted-foreground">Marketing</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <div className="text-sm text-muted-foreground">Sales</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-muted-foreground">HR</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-red-600">6</div>
                <div className="text-sm text-muted-foreground">Finance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};