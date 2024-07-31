import { BiconomySmartAccountV2 } from '@biconomy/account';
import { create } from 'zustand';
export interface UserInfo {
  firstName: string;
  lastName: string;
  dob: Date;
  profileImage: string;
  idDoc: string;
  kycDoc: string;
}

interface GlobalStore {
  smartAccount: BiconomySmartAccountV2 | null;
  setSmartAccount: (smartAccount: BiconomySmartAccountV2) => void;
  smartAddress: string | null;
  setSmartAddress: (smartAccount: string | null) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: Partial<UserInfo>) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
  smartAccount: null,
  setSmartAccount: (smartAccount) => set({ smartAccount: smartAccount }),
  smartAddress: null,
  setSmartAddress: (smartAddress) => set({ smartAddress: smartAddress }),
  userInfo: {
    firstName: '',
    lastName: '',
    dob: new Date(),
    profileImage: '',
    idDoc: '',
    kycDoc: '',
  },
  setUserInfo: (userInfo) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...userInfo },
    })),
}));

export default useGlobalStore;
