import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { cn } from '@/utils/helpers';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = true,
  siblingCount = 1,
}) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];
    const totalVisible = siblingCount * 2 + 3;

    if (totalPages <= totalVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSibling = Math.max(currentPage - siblingCount, 1);
      const rightSibling = Math.min(currentPage + siblingCount, totalPages);

      const showLeftEllipsis = leftSibling > 2;
      const showRightEllipsis = rightSibling < totalPages - 1;

      if (showFirstLast) {
        pages.push(1);
      }

      if (showLeftEllipsis) {
        pages.push('...');
      }

      for (let i = leftSibling; i <= rightSibling; i++) {
        pages.push(i);
      }

      if (showRightEllipsis) {
        pages.push('...');
      }

      if (showFirstLast) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {generatePages().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              …
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(page as number)}
            className={cn(
              'min-w-[2rem]',
              page === currentPage && 'pointer-events-none'
            )}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};