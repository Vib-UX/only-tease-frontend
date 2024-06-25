'use client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SessionProvider } from 'next-auth/react';
// import { ReactNode } from 'react';
// import { baseSepolia } from 'viem/chains';
// import { WagmiProvider, createConfig, http } from 'wagmi';

// import Web3AuthConnectorInstance from '@/components/Web3AuthInstance';
// import { createWagmiConfig } from '@/store/createWagmiConfig';

// type Props = { children: ReactNode };

// const queryClient = new QueryClient();

// const rpcUrl = '/api/rpc';

// const wagmiConfig = createWagmiConfig(rpcUrl);

// const config = createConfig({
//   chains: [baseSepolia],
//   transports: {
//     [baseSepolia.id]: http(),
//   },
//   connectors: [
//     Web3AuthConnectorInstance([baseSepolia]),
//   ],
// });

// function OnchainProviders({ children }: Props) {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         {/* <OnchainKitProvider chain={baseSepolia}> */}
//         <SessionProvider>
//           {children}
//         </SessionProvider>
//         {/* </OnchainKitProvider> */}
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// export default OnchainProviders;

// WAGMI Libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3AuthInnerContext, Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { createConfig, http,WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";

import { web3AuthContextConfig } from '@/components/web3AuthConfig';

const queryClient = new QueryClient()

// Set up client
const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

function OnchainProviders({ children }: {
  children: React.ReactNode
}) {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
}

export default OnchainProviders;