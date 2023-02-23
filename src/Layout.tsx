import { Outlet } from 'react-router-dom';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon,
} from 'wagmi/chains';
import {
  Web3Modal, Web3Button, Web3NetworkSwitch, useWeb3Modal,
} from '@web3modal/react';

const projectId = 'f029677387f3e1590dcb9afe7d6772b0';
// 2. Configure wagmi client
const chains = [mainnet, polygon, avalanche, arbitrum, bsc, optimism, gnosis, fantom];
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: '2', appName: 'wallet', chains, projectId,
  }),
  provider,
});
// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const Layout = () => {
  const { isOpen /* open, close, setDefaultChain, */ } = useWeb3Modal();
  console.log(isOpen);
  // Modal's open state
  // isOpen;

  // Open modal
  // interface Options {
  //   route?: "Account" | "ConnectWallet" | "Help" | "SelectNetwork";
  // }
  // await open(options ?: Options);

  // Close modal
  // close();

  // Sets the default chain BEFORE user is connected.
  // Use wagmi network get / switch action AFTER user is connected.
  // Default chain will be `mainnet` or first wagmi chain in config if `mainnet` is not available.
  // setDefaultChain(polygon);
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <div className="flex w-full justify-end p-1">
          <Web3Button icon="show" label="Connect Wallet" balance="show" />
          <Web3NetworkSwitch />
        </div>
        <Outlet />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
};
export default Layout;
