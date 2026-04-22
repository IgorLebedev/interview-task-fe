import { SuiGrpcClient } from '@mysten/sui/grpc';

const GRPC_URLS = {
  testnet: 'https://fullnode.testnet.sui.io:443',
  mainnet: 'https://fullnode.mainnet.sui.io:443',
};

export const suiClient = new SuiGrpcClient({ network: 'mainnet', baseUrl: GRPC_URLS['mainnet'] });
