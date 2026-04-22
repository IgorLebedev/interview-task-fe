import { useDAppKit, useCurrentAccount, useCurrentNetwork } from '@mysten/dapp-kit-react';
import { ConnectButton } from '@mysten/dapp-kit-react/ui';


export const MainPage = () => {
	const dAppKit = useDAppKit();
	const currentAccount = useCurrentAccount();
	const currentNetwork = useCurrentNetwork();

	return (
		<div>
			<ConnectButton />
			<h1>Main</h1>
		</div>
	)
}