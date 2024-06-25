import { PaymasterMode } from '@biconomy/paymaster';
import { useMutation } from '@tanstack/react-query';
import { useWeb3Auth } from '@web3auth/modal-react-hooks';
import { encodeFunctionData } from 'viem';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';

import { USER_ONBOARDING_ABI } from '@/hooks/abi/USER_ONBOARDING_ABI';
import { generateContractHook } from '@/hooks/contracts/contracts';
import useGlobalStore from '@/hooks/store/useGlobalStore';

import { API_URL, createFetchOptions, fetchJSON, OPEN_AI_API_URL, publicClient } from '@/utils';
import { NULL_ADDRESS, USER_ONBOARDING_ADDRESS } from '@/utils/addresses';

export const useUserOnbordingContract = generateContractHook({
  abi: USER_ONBOARDING_ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: USER_ONBOARDING_ADDRESS,
  },
});


const register = async ({ session, tokenId, address }: {
  session: {
    name: string;
    email: string;
  }, tokenId: string, address: string
}): Promise<void> => {
  if (!session) throw new Error("")
  const fetchOptions = createFetchOptions('POST', {
    name: session.name,
    description: 'Welcome to Onlytease, with this NFT you gain access to our exclusive content! Enjoy (:',
  });

  const resp = await fetchJSON(OPEN_AI_API_URL + '/create-nft-pin-metadata', fetchOptions);

  if (resp.success) {
    const registerOptions = createFetchOptions('POST', {
      username: session.name,
      email: session.email,
      wallet_address: address,
      ipfs_url: resp.metadataIPFSUrl,
      openAi_tokenId: tokenId.toString(),
    });
    return fetchJSON(API_URL + '/register', registerOptions);
  }
};

const useUserOnBoarding = ({ onSuccess }: {
  onSuccess: () => void
}) => {
  const { userInfo } = useWeb3Auth()
  const { address } = useAccount()
  const { smartAccount } = useGlobalStore()
  const userOnboardingContract = useUserOnbordingContract()

  const onBoarding = async () => {
    try {
      if (!address || !smartAccount || !userInfo) throw new Error("")
      const fetchOptions = createFetchOptions("POST", {
        name: userInfo.name
      })
      await fetchJSON(OPEN_AI_API_URL + '/generate-avatar-openAI', fetchOptions);
      const txData = encodeFunctionData({
        abi: userOnboardingContract.abi,
        functionName: "sendRequest",
        args: [BigInt(85), [userInfo.name], 300000],
      })
      const tx = {
        to: userOnboardingContract.status === "ready" ? userOnboardingContract.address : NULL_ADDRESS,
        data: txData,
      };
      // Send the transaction and get the transaction hash
      const userOpResponse = await smartAccount.sendTransaction(tx, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);
      const userOpReceipt = await userOpResponse.wait();
      if (userOpReceipt.success == "true") {
        console.log("UserOp receipt", userOpReceipt);
        console.log("Transaction receipt", userOpReceipt.receipt.transactionHash);
      }

      const tokenId = await publicClient.readContract({
        abi: userOnboardingContract.abi,
        address: userOnboardingContract.status === "ready" ? userOnboardingContract.address : NULL_ADDRESS,
        functionName: 'getTokenId',
      });
      await register({
        address: address,
        session: {
          email: userInfo.email,
          name: userInfo.name
        },
        tokenId: tokenId.toString()
      })
      onSuccess()
    } catch (error) {
      console.error(error);
    }
  }

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["onboard"],
    mutationFn: onBoarding
  })
  return {
    onBoarding: mutateAsync, isLoading: isPending
  }
}

export default useUserOnBoarding