import { UserInfo } from '@/hooks/store/useGlobalStore';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}
export function onBoadingValidtion({
  userInfo,
  currentState,
}: {
  userInfo: UserInfo;
  currentState: number;
}) {
  if (currentState === 0 && (!userInfo.firstName || !userInfo.lastName)) {
    return false;
  }
  if (currentState === 1 && !userInfo.profileImage) {
    return false;
  }
  if (currentState === 2 && !userInfo.idDoc) {
    return false;
  }
  if (currentState === 3 && !userInfo.kycDoc) {
    return false;
  }
  return true;
}
