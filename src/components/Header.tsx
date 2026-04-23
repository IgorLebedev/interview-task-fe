import { ConnectButton } from '@mysten/dapp-kit-react/ui';

export const Header = () => {
  return (
    <div className="w-full justify-between gap-2 items-center flex px-5 py-3 border-b border-b-amber-50">
      <a href="/">
        <h1 className="text-white  text-balance text-xl md:text-4xl font-black">
          Aftermath staking
        </h1>
      </a>
      <ConnectButton />
    </div>
  );
};
