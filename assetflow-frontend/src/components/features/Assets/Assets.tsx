import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Modal } from '@/components/common/Modal/Modal';
import { AssetForm } from './AssetForm';
import { fetchAssets, deleteAsset } from '@/store/slices/asset.slice';
import { AppDispatch, RootState } from '@/store';
import { cn, formatDate, getStatusColor } from '@/utils/helpers';

export const Assets: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { assets, pagination, loading } = useSelector((state: RootState) => state.assets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  useEffect(() => {
    dispatch(fetchAssets({
      page: 0,
      size: 10,
    }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(fetchAssets({
      page: page - 1,
      size: 10,
      search: searchQuery,
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(fetchAssets({
      page: 0,
      size: 10,
      search: query,
    }));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      await dispatch(deleteAsset(id));
      dispatch(fetchAssets({ page: 0, size: 10 }));
    }
  };

  const handleCreate = () => {
    setModalMode('create');
    setSelectedAsset(null);
    setIsModalOpen(true);
  };

  const handleEdit = (asset: any) => {
    setModalMode('edit');
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleView = (asset: any) => {
    setModalMode('view');
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const color = getStatusColor(status);
    return (
      <Badge variant="outline" className={cn('capitalize', color)}>
        {status.toLowerCase().replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Assets</h1>
          <p className="text-sm text-muted-foreground">
            Register, track, and manage all organizational assets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Register Asset
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search assets by name, tag, or serial..."
              className="flex-1"
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSearch('')}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Tag</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Holder</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : assets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No assets found. Register your first asset!
                  </TableCell>
                </TableRow>
              ) : (
                assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.assetTag}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.categoryName || 'Uncategorized'}</TableCell>
                    <TableCell>{getStatusBadge(asset.status)}</TableCell>
                    <TableCell>
                      {asset.currentHolder ? 
                        `${asset.currentHolder.firstName} ${asset.currentHolder.lastName}` : 
                        '—'
                      }
                    </TableCell>
                    <TableCell>{asset.location || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(asset)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(asset)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(asset.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {assets.length} of {pagination.totalElements} assets
          </div>
          <Pagination
            currentPage={pagination.page + 1}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Card>

      {/* Asset Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={modalMode === 'create' ? 'Register Asset' : modalMode === 'edit' ? 'Edit Asset' : 'Asset Details'}
        size="lg"
      >
        <AssetForm
          mode={modalMode}
          asset={selectedAsset}
          onSuccess={() => {
            setIsModalOpen(false);
            dispatch(fetchAssets({ page: 0, size: 10 }));
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};