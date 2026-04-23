import { Staking } from '@/components/staking/';
import { Header } from '@/components/Header';
import { useCurrentAccount } from '@mysten/dapp-kit-react';

export const MainPage = () => {
  const account = useCurrentAccount();
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="items-center p-4 flex-1 flex justify-center">
        <Staking key={account?.address} />
      </div>
    </div>
  );
};
