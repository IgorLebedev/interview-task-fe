import { Staking } from '@/components/Staking';
import { Header } from '@/components/Header';

export const MainPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="items-center flex-1 flex justify-center">
        <Staking />
      </div>
    </div>
  );
};
