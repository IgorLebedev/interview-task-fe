import { createDAppKit } from '@mysten/dapp-kit-react';
import { suiClient } from '@/lib';

export const dAppKit = createDAppKit({
  networks: ['mainnet'],
  defaultNetwork: 'mainnet',
  createClient: () => suiClient,
});

// Register types for hook type inference
declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: typeof dAppKit;
  }
}
