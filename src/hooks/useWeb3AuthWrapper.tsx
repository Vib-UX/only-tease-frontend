'use client'
import {
  createSmartAccountClient
} from "@biconomy/account";
import { useQuery } from "@tanstack/react-query";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { ethers } from "ethers";

import useGlobalStore from "@/hooks/store/useGlobalStore";


const BUNDLER_URL = "https://bundler.biconomy.io/api/v2/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
const PAYMASTER_API = "chmQxV0UK.535ba9a7-bd76-438c-ae3b-f21bfb14ed0b"

function useWeb3AuthWrapper() {
  const {
    initModal,
    web3Auth,
  } = useWeb3Auth();

  const { setSmartAccount, setSmartAddress } = useGlobalStore()

  return useQuery({
    queryKey: [!!web3Auth],
    queryFn: async () => {
      if (web3Auth) {
        await initModal()
        const web3authProvider = await web3Auth.connect();
        const ethersProvider = new ethers.providers.Web3Provider(
          web3authProvider as any
        );
        const web3AuthSigner = ethersProvider.getSigner();
        const biconomy_config = {
          biconomyPaymasterApiKey: PAYMASTER_API,
          bundlerUrl: BUNDLER_URL,
        };
        const smartWallet = await createSmartAccountClient({
          signer: web3AuthSigner,
          biconomyPaymasterApiKey: biconomy_config.biconomyPaymasterApiKey,
          bundlerUrl: biconomy_config.bundlerUrl,
          rpcUrl: "", // <-- read about this at https://docs.biconomy.io/Account/methods#createsmartaccountclient
        });
        setSmartAccount(smartWallet)
        const address = await smartWallet.getAccountAddress();
        setSmartAddress(address)
      }

    }
  })
}

export default useWeb3AuthWrapper;
