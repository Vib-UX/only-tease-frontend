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

const updateSubscription = async ({
  walletAddress,
  tokenId,
}: {
  walletAddress: string;
  tokenId: string;
}) => {
  const fetchOptions = createFetchOptions('PATCH', {
    wallet_address: walletAddress,
    tokenId: tokenId,
  });
  return await fetchJSON(
    API_URL + '/' + API_ROUTES.UPDATE_SUBSCRIPTION_BASE,
    fetchOptions
  );
};

const useNFTSubscription = ({
  amount,
  listingId,
  tokenId,
  onSuccess,
}: {
  amount: string;
  listingId: number;
  tokenId: string;
  onSuccess: () => void;
}) => {
  console.log('Initializing useNFTSubscription hook with:', {
    amount,
    listingId,
    tokenId,
  });

  const { refetch } = useFetchUserDetails();
  const mockUsdContract = useMockUSDContract();
  const nftMarketPlaceContract = useNftMarketplaceAutomationContract();
  const [txHash, setTxHash] = useState('');
  const { smartAccount, smartAddress } = useGlobalStore();

  console.log('Contracts loaded:', {
    mockUsdContractStatus: mockUsdContract.status,
    nftMarketPlaceContractStatus: nftMarketPlaceContract.status,
  });
  console.log('User details from global store:', {
    smartAccount,
    smartAddress,
  });

  const buyNFT = async () => {
    console.log('Attempting to buy NFT with params:', {
      amount,
      listingId,
      tokenId,
    });
    try {
      if (
        mockUsdContract.status === 'ready' &&
        nftMarketPlaceContract.status === 'ready' &&
        smartAddress &&
        smartAccount
      ) {
        console.log(
          'Contracts and user details are ready to process the transaction.'
        );

        const txData1 = encodeFunctionData({
          abi: mockUsdContract.abi,
          functionName: 'approve',
          args: [
            nftMarketPlaceContract.address,
            parseUnits(amount.toString(), 6).toBigInt(),
          ],
        });
        console.log('Encoded txData1 for approve function:', txData1);

        const txData2 = encodeFunctionData({
          abi: nftMarketPlaceContract.abi,
          functionName: 'buyNft',
          args: [BigInt(listingId)],
        });
        console.log('Encoded txData2 for buyNft function:', txData2);

        const tx1 = {
          to: mockUsdContract.address,
          data: txData1,
        };
        const tx2 = {
          to: nftMarketPlaceContract.address,
          data: txData2,
        };
        console.log('Prepared transactions:', { tx1, tx2 });

        const userOpResponse = await smartAccount.sendTransaction([tx1, tx2], {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        const { transactionHash } = await userOpResponse.waitForTxHash();
        console.log('Transaction Hash received:', transactionHash);

        setTxHash(transactionHash || '');
        await updateSubscription({
          walletAddress: smartAddress,
          tokenId: tokenId.toString(),
        });
        console.log('Subscription updated successfully.');

        await refetch();
        console.log('User details refetched after transaction.');
        onSuccess();
        console.log('onSuccess callback executed.');
      }
    } catch (error) {
      console.error('Purchase failed with error:', error);
      throw error;
    }
  };
  return {
    buyNFT,
    txHash: txHash,
  };
};

export default useNFTSubscription;
