import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { dAppKit } from './dapp-kit';
import { queryClient } from '@/lib';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <div className="bg-accent rounded-2xl p-4 flex flex-col justify-center gap-2 items-center">
            <h2 className="text-3xl font-bold">Oops</h2>
            <p className="text-destructive">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <Button onClick={resetErrorBoundary}>Refresh</Button>
          </div>
        </div>
      )}
      onError={(error) => console.log('error boundary:', error)}
      children={
        <QueryClientProvider client={queryClient}>
          <DAppKitProvider dAppKit={dAppKit}>
            {children}
            <Toaster />
          </DAppKitProvider>
        </QueryClientProvider>
      }
    />
  );
};
