import Web3AuthConnectorInstance from '@/components/Web3AuthInstance';
import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
  const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');

  return createConfig({
    chains: [baseSepolia],
    connectors: [Web3AuthConnectorInstance([baseSepolia])],
    ssr: false,
    transports: {
      [baseSepolia.id]: http(baseSepoliaUrl),
      [base.id]: http(baseUrl),
    },
  });
}
