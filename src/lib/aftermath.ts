import { Aftermath } from 'aftermath-ts-sdk';

let sdkPromise: Promise<Aftermath> | null = null;

async function getAftermathSdk() {
  if (!sdkPromise) {
    sdkPromise = (async () => {
      const sdk = new Aftermath('MAINNET');
      await sdk.init();
      return sdk;
    })();
  }
  return sdkPromise;
}

export async function getStaking() {
  const sdk = await getAftermathSdk();
  return sdk.Staking();
}

export async function getCoin() {
  const sdk = await getAftermathSdk();
  return sdk.Coin();
}
