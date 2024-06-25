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
import { PaymasterMode } from '@biconomy/paymaster';
import { useState } from 'react';

export const useNftMarketplaceAutomationContract = generateContractHook({
  abi: NFT_MARKETPLACE_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: NFT_MARKET_PLACE_ADDRESS,
  },
});


const updateSubscription = async ({ walletAddress, tokenId }: {
  walletAddress: string, tokenId: string
}) => {
  const fetchOptions = createFetchOptions("PATCH", {
    wallet_address: walletAddress,
    tokenId: tokenId,
  })
  return await fetchJSON(API_URL + "/" + API_ROUTES.UPDATE_SUBSCRIPTION_BASE, fetchOptions)
}

const useNFTSubscription = ({ amount, listingId, tokenId, onSuccess }: {
  amount: string, listingId: number, tokenId: string, onSuccess: () => void
}) => {
  const { refetch } = useFetchUserDetails()
  const mockUsdContract = useMockUSDContract()
  const nftMarketPlaceContract = useNftMarketplaceAutomationContract()
  const [txHash, setTxHash] = useState("")
  const { smartAccount, smartAddress } = useGlobalStore()

  const buyNFT = async () => {
    try {
      if (mockUsdContract.status === "ready" && nftMarketPlaceContract.status === "ready" && smartAddress && smartAccount) {
        const txData1 = encodeFunctionData(
          {
            abi: mockUsdContract.abi,
            functionName: "approve",
            args: [nftMarketPlaceContract.address, parseUnits(amount.toString(), 6).toBigInt()]
          }
        )
        const txData2 = encodeFunctionData(
          {
            abi: nftMarketPlaceContract.abi,
            functionName: 'buyNft',
            args: [BigInt(listingId)],
          }
        )

        const tx1 = {
          to: mockUsdContract.address,
          data: txData1,
        };

        const tx2 = {
          to: nftMarketPlaceContract.address,
          data: txData2,
        };
        const userOpResponse = await smartAccount.sendTransaction([tx1, tx2], {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        const { transactionHash } = await userOpResponse.waitForTxHash();
        console.log("Transaction Hash", transactionHash);
        const userOpReceipt = await userOpResponse.wait(1);
        if (userOpReceipt.success == "true") {
          console.log("UserOp receipt", userOpReceipt);
          console.log("Transaction receipt", userOpReceipt.receipt);
          setTxHash(userOpReceipt.receipt.transactionHash)
        } else {
          throw new Error("Tx failed")
        }
        await updateSubscription({
          walletAddress: smartAddress,
          tokenId: tokenId.toString(),
        })
        await refetch()
        onSuccess()
      }
    } catch (error) {
      throw new Error("purchase failed")
    }
  }
  return {
    buyNFT,
    txHash: txHash
  }
}

export default useNFTSubscription