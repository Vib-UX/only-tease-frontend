import { parseUnits } from 'ethers/lib/utils';
import { encodeFunctionData, getAddress } from 'viem';

import { useMockUSDContract } from '@/hooks/contracts/useMockUSD';
import { useNftMarketplaceAutomationContract } from '@/hooks/contracts/useNftMarketplaceAutomation';
import { useOnlyTeaseNFTContract } from '@/hooks/contracts/useOnlyTeaseNFTContract';
import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';
import useGetListedSubscriptions from '@/hooks/user/useGetListedSubscriptions';

import useGlobalStore from '@/hooks/store/useGlobalStore';
import { API_ROUTES, API_URL, createFetchOptions, fetchJSON, publicClient } from '@/utils';
import { PaymasterMode } from '@biconomy/paymaster';
import { useState } from 'react';


const updateSubscription = async ({ price, tokenId, listingId }: {
  price: string, listingId: string, tokenId: string
}) => {
  const fetchOptions = createFetchOptions("PATCH", {
    price: price,
    listingId: listingId,
    tokenId: tokenId,
  })
  return await fetchJSON(API_URL + "/" + API_ROUTES.LIST_SUBSCRIPTION_BASE, fetchOptions)
}

const useNFTListContract = ({ amount, tokenId, onSuccess }: {
  amount: string, tokenId: string, onSuccess?: () => void
}) => {
  const { refetch: refetchUser } = useFetchUserDetails()
  const { refetch } = useGetListedSubscriptions()
  const mockUsdContract = useMockUSDContract()
  const nftMarketPlaceContract = useNftMarketplaceAutomationContract()
  const onlyTease = useOnlyTeaseNFTContract()
  const [txHash, setTxHash] = useState("")

  const { smartAccount, smartAddress } = useGlobalStore()
  const listNFT = async () => {
    try {
      if (mockUsdContract.status === "ready" && nftMarketPlaceContract.status === "ready" && onlyTease.status === "ready" && smartAccount && smartAddress) {
        const listingId = await publicClient.readContract({
          abi: nftMarketPlaceContract.abi,
          address: nftMarketPlaceContract.address,
          functionName: "listingId",
        })

        const allowance = await publicClient.readContract({
          abi: onlyTease.abi,
          address: onlyTease.address,
          functionName: "isApprovedForAll",
          args: [getAddress(smartAddress), onlyTease.address]
        })

        let contracts = []

        if (allowance) {
          const txData1 = encodeFunctionData({
            abi: nftMarketPlaceContract.abi,
            functionName: 'listNft',
            args: [BigInt(tokenId), parseUnits(amount.toString(), 6).toBigInt()],
          })
          const tx1 = {
            to: nftMarketPlaceContract.address,
            data: txData1
          }
          contracts = [
            tx1
          ]
        } else {
          const txData1 = encodeFunctionData({
            abi: onlyTease.abi,
            functionName: "setApprovalForAll",
            args: [nftMarketPlaceContract.address, true]
          })
          const tx1 = {
            to: onlyTease.address,
            data: txData1
          }
          const txData2 = encodeFunctionData({
            abi: nftMarketPlaceContract.abi,
            functionName: 'listNft',
            args: [BigInt(tokenId), parseUnits(amount.toString(), 6).toBigInt()],
          })
          const tx2 = {
            to: nftMarketPlaceContract.address,
            data: txData2
          }
          contracts = [
            tx1,
            tx2,
          ]
        }

        const userOpResponse = await smartAccount.sendTransaction(contracts, {
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
          price: amount,
          listingId: listingId.toString(),
          tokenId: tokenId
        })
        await refetch()
        await refetchUser()
        onSuccess && onSuccess()
      }
    } catch (error) {
      throw new Error("purchase failed")
    }
  }
  return {
    listNFT,
    isLoading: false,
    txHash: txHash
  }
}

export default useNFTListContract