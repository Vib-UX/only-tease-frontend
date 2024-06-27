import { useQuery } from '@tanstack/react-query';
import { useWeb3Auth } from '@web3auth/modal-react-hooks';

import { API_ROUTES, API_URL, fetchJSON } from '@/utils';
import { IndianModelCardData, modelCardData } from '@/utils/modelData';

const filterMatchingIds = (array1: any, array2: any) => {
  const filteredArray = array1.filter((item1: any) => {
    return array2.some((item2: any) => {
      return item1.modelId === item2.id.toString() && !item1.isListed;
    });
  });

  return filteredArray;
};


const useFetchUserDetails = (
  modelId?: string
) => {
  const { userInfo } = useWeb3Auth()

  return useQuery({
    queryKey: ["user-data", modelId, userInfo],
    enabled: !!userInfo,
    queryFn: async () => {
      const data = await fetchJSON(API_URL + `/` + API_ROUTES.USER_INFO + `?email=${userInfo.email}`, {
        method: "GET"
      })
      try {
        if (data.success) {
          const isUnlocked = !!data.data.subscriptions.find((s: {
            modelId: string
          }) => s.modelId.toString() === modelId?.toString())
          return {
            isFound: true,
            subscriptions: filterMatchingIds(data.data.subscriptions, [...IndianModelCardData, ...modelCardData]).map((s) => {
              const modelData = [...IndianModelCardData, ...modelCardData].find(m => m.id.toString() === s.modelId)
              return {
                ...s,
                modeldata: modelData
              }
            }),
            isUnlocked: isUnlocked ?? false,
            open_ai_id: data.data.user.openAi_tokenId,
            ipfs: data.data.user.ipfs_url
          }
        }
      } catch (error) {
        return {
          subscriptions: [],
          isFound: false,
          isUnlocked: false,
        }
      }
    }
  })
}

export default useFetchUserDetails