import { parseUnits } from 'ethers/lib/utils';
import { encodeFunctionData } from 'viem';
import { baseSepolia } from 'viem/chains';

import { NFT_MARKETPLACE_ABI } from '@/hooks/abi/NFT_MARKETPLACE_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';
import { useMockUSDContract } from '@/hooks/contracts/useMockUSD';
import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';

import useGlobalStore from '@/hooks/store/useGlobalStore';
import { API_ROUTES, API_URL, createFetchOptions, fetchJSON } from '@/utils';
import { NFT_MARKET_PLACE_ADDRESS } from '@/utils/addresses';
import { getSubscriptionId } from '@/utils/getSubscriptionId';
import { PaymasterMode } from '@biconomy/paymaster';
import { useWeb3Auth } from '@web3auth/modal-react-hooks';
import { useState } from 'react';

export const useNftMarketplaceAutomationContract = generateContractHook({
  abi: NFT_MARKETPLACE_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: NFT_MARKET_PLACE_ADDRESS,
  },
});


const updateSubscription = async ({ email, subscriptionId, modelId }: {
  email: string, modelId: string, subscriptionId: number
}) => {
  const fetchOptions = createFetchOptions("POST", {
    email: email,
    modelId: modelId,
    tokenId: (
      BigInt(1e18) * BigInt(modelId) +
      BigInt(subscriptionId)
    ).toString(),
  })
  return await fetchJSON(API_URL + "/" + API_ROUTES.PURCHASE_SUBSCRIPTION_BASE, fetchOptions)
}

const useNftMarketPlaceAutomation = ({ amount, modelId, onSuccess }: {
  amount: string, modelId: number, onSuccess: () => void
}) => {
  const { smartAccount } = useGlobalStore()
  const { userInfo } = useWeb3Auth()
  const [txHash, setTxHash] = useState("")
  const { refetch } = useFetchUserDetails()
  const mockUsdContract = useMockUSDContract()
  const nftMarketPlaceContract = useNftMarketplaceAutomationContract()

  const purchaseSubscription = async () => {
    try {
      if (mockUsdContract.status === "ready" && nftMarketPlaceContract.status === "ready" && userInfo && smartAccount) {
        const subscriptionId = getSubscriptionId()
        const txData1 = encodeFunctionData({
          abi: mockUsdContract.abi,
          functionName: "approve",
          args: [nftMarketPlaceContract.address, parseUnits(amount.toString(), 6).toBigInt()]
        })

        const txData2 = encodeFunctionData({
          abi: nftMarketPlaceContract.abi,
          functionName: 'purchaseSubscription',
          args: [BigInt(modelId), BigInt(subscriptionId)],
        })

        const tx1 = {
          to: mockUsdContract.address,
          data: txData1,
        };

        const tx2 = {
          to: nftMarketPlaceContract.address,
          data: txData2,
        };
        // Send the transaction and get the transaction hash
        const userOpResponse = await smartAccount.sendTransaction([tx1, tx2], {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        const { transactionHash } = await userOpResponse.waitForTxHash();
        console.log("Transaction Hash", transactionHash);
        const userOpReceipt = await userOpResponse.wait();
        if (userOpReceipt.success == "true") {
          console.log("UserOp receipt", userOpReceipt);
          console.log("Transaction receipt", userOpReceipt.receipt);
          setTxHash(userOpReceipt.receipt.transactionHash)
        } else {
          throw new Error("Tx failed")
        }
        await updateSubscription({
          email: userInfo.email,
          modelId: modelId.toString(),
          subscriptionId: subscriptionId
        })
        await refetch()
        onSuccess()
      }
    } catch (error) {
      throw new Error("purchase failed")
    }
  }

  return {
    purchaseSubscription,
    isLoading: false,
    txHash: txHash
  }
}

export default useNftMarketPlaceAutomation