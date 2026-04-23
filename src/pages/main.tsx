import { Staking } from '@/components/staking/';
import { Header } from '@/components/Header';

export const MainPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="items-center p-4 flex-1 flex justify-center">
        <Staking />
      </div>
    </div>
  );
};
