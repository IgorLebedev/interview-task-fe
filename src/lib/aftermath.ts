import { NETWORK } from '@/config/constants';
import { Aftermath } from 'aftermath-ts-sdk';

let sdkPromise: Promise<Aftermath> | null = null;

async function getAftermathSdk() {
  if (!sdkPromise) {
    sdkPromise = (async () => {
      const sdk = new Aftermath(NETWORK.toUpperCase());
      await sdk.init();
      return sdk;
    })();
  }
  return sdkPromise;
}

export const aftermath = {
  staking: async () => {
    const sdk = await getAftermathSdk();
    return sdk.Staking();
  },
  coin: async () => {
    const sdk = await getAftermathSdk();
    return sdk.Coin();
  },
};
