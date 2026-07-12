import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  size = 'md',
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-50 w-full max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%]',
            'bg-background border rounded-lg shadow-lg',
            'data-[state=open]:animate-scale-in',
            sizeClasses[size],
            className
          )}
        >
          {title && (
            <Dialog.Header className="flex items-center justify-between p-6 border-b">
              <div>
                <Dialog.Title className="text-lg font-semibold">
                  {title}
                </Dialog.Title>
                {description && (
                  <Dialog.Description className="text-sm text-muted-foreground">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </Dialog.Header>
          )}
          <div className="p-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};