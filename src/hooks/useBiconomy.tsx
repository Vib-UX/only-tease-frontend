import { getWalletClient } from "@wagmi/core";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useConfig } from 'wagmi';

import useGlobalStore from "@/hooks/store/useGlobalStore";
const BUNDLER_URL = "https://bundler.biconomy.io/api/v2/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
const PAYMASTER_API = "chmQxV0UK.535ba9a7-bd76-438c-ae3b-f21bfb14ed0b"

const biconomy_config = {
  biconomyPaymasterApiKey: PAYMASTER_API,
  bundlerUrl: BUNDLER_URL,
};

const useBiconomy = () => {
  const { initModal } = useWeb3Auth()
  const { setSmartAccount, setSmartAddress } = useGlobalStore()

  const config = useConfig()
  const createSmartAccount = async () => {
    await initModal()
    // debugger
    const walletClient = await getWalletClient(config)
    console.log(walletClient, "walletClient");

    // if (!walletClient) return
    // try {
    //   const smartWallet = await createSmartAccountClient({
    //     signer: walletClient,
    //     biconomyPaymasterApiKey: biconomy_config.biconomyPaymasterApiKey,
    //     bundlerUrl: biconomy_config.bundlerUrl,
    //   });
    //   const saAddress = await smartWallet.getAccountAddress();
    //   setSmartAddress(saAddress)
    //   setSmartAccount(smartWallet)
    // } catch (error) {
    //   debugger
    // }
  }

  return {
    createSmartAccount
  }
}

export default useBiconomy