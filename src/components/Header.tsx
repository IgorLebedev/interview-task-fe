import { ConnectButton } from '@mysten/dapp-kit-react/ui';

export const Header = () => {
  return (
    <div className="w-full justify-end flex p-2">
      <ConnectButton />
    </div>
  );
};
